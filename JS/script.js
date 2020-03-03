var canvas = $('#GameBoardCanvas');
//The game board 1 = walls, 0 = free space, and -1 = the goal
var boardOne = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1],
    [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1]
];
var player = {
    x: 0,
    y: 0
};

//Draw the game board
function draw(){
    var width = canvas.width();
    var blockSizex = width/11;
    var blockSizey = width/10;
    var ctx = canvas[0].getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0, 0);
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="white";
    //Loop through the board array drawing the walls and the goal
    for(var y = 0; y < boardOne.length; y++){
        for(var x = 0; x < boardOne[y].length; x++){
            //Draw a wall
            if(boardOne[y][x] === 1){
                ctx.fillRect(x*blockSizex, y*blockSizey, blockSizex, blockSizey);
            }
            //Draw the goal
            else if(boardOne[y][x] === -1){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "gold";
                ctx.moveTo(x*blockSizex, y*blockSizey);
                ctx.lineTo((x+1)*blockSizex, (y+1)*blockSizey);
                ctx.moveTo(x*blockSizex, (y+1)*blockSizey);
                ctx.lineTo((x+1)*blockSizex, y*blockSizey);
                ctx.stroke();
            }
        }
    }
    //Draw the player
    var half = blockSizex;
    var img = document.getElementById("scream");
    ctx.drawImage(img,player.x*blockSizex+half, player.y*blockSizey+half, -blockSizex, -blockSizey);

}

//Check to see if the new space is inside the board and not a wall
function canMove(x, y){
    return (y>=0) && (y<boardOne.length) && (x >= 0) && (x < boardOne[y].length) && (boardOne[y][x] != 1);
}

function win(x, y)
{
    if (boardOne[y][x] == -1)
    {
        console.log("hi")
    }
    

}

$(document).keydown(function(e){
    win(player.x, player.y);
    if((e.which == 38) && canMove(player.x, player.y-1) )//Up arrow
        player.y--;
        
    else if((e.which == 40) && canMove(player.x, player.y+1)) // down arrow
        player.y++;
    else if((e.which == 37) && canMove(player.x-1, player.y))
        player.x--;
    else if((e.which == 39) && canMove(player.x+1, player.y))
        player.x++;
    draw();
    e.preventDefault();
});

draw();