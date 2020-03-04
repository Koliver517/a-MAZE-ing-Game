//timer setup
var m = document.getElementById("min");//the variable for the minutes
var s = document.getElementById("sec");//the variable for the seconds
var total = 0;//makes the timer start at 0
setInterval(setTime, 1000);//sets how fast the timer will go once it has started running

function setTime() {
++total;
s.innerHTML = pad(total % 60);//when the number of sec. reaches 60 it will start a new minute and make the seconds reset the # of sec back to zero
m.innerHTML = pad(parseInt(total / 60));//Makes it so that after the timer reaches 60 sec a new minute is added
} 

function pad(value) {
var valuestring = value + "";//makes sure that 
if (valuestring.length < 2) {
return "0" + valuestring;
} else {
return valuestring;
}
}



//game start
var loadOne = true;
var loadTwo = false;
var loadThree = false;
//The game board 1 = walls, 0 = free space, and -1 = the goal, 2 = chest

    var boardOne = [
        [ 0, 0, 4, 3, 2, 0, 0, 0, 0, 0, 1],
        [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
        [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
        [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, 0, 2, 1, 1, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1]
    ];

    var boardTwo = [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
        [ 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1],
        [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [ 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
        [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, 0, 2, 1, 1, 0, 1],
        [ 1, 1, 1, 0, 1, -1, 0, 0, 0, 0, 1]
    ];


    var boardThree = [
        [ 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
        [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [ 1, 0, 1, 0, 1, 0, 2, 1, 1, 0, 1],
        [ 1, 0, 1, 0, 1, -1, 0, 0, 0, 0, 1]
    ];
    var player = {
        x: 0,
        y: 0
    };
    var enemlione=
    {
        x: 1, y:1
    };
    var enemliTwo=
    {
        x: 9, y:1
    };
    board = boardOne
//Draw the game board
function draw(){

    var canvas = $('#GameBoardCanvas');
    var width = canvas.width();
    var height = canvas.height();
    var blockSizex = width/11;
    var blockSizey = height/board.length;
    var ctx = canvas[0].getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle="#027200";
    //Loop through the board array drawing the walls and the goal
    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            //Draw a wall
            if(board[y][x] === 1)
            {
                ctx.fillRect(x*blockSizex, y*blockSizey, blockSizex, blockSizey);
            }
            //Draw the goal
            else if(board[y][x] === -1)
            {
                var img = document.getElementById("win");
                ctx.drawImage(img,x*blockSizex, y*blockSizey, blockSizex, blockSizey);

            }
            //Draw the extra coins
            else if(board[y][x] === 2)
            {
                var img = document.getElementById("point");
                ctx.drawImage(img,x*blockSizex, y*blockSizey, blockSizex, blockSizey);
            }

            //Draw the first enemy
            else if(board[y][x] === 3)
            {
                var img = document.getElementById("emenyFour");
                ctx.drawImage(img,x*blockSizex, y*blockSizey, blockSizex, blockSizey);
            }
            //Draw the second enemy
            else if(board[y][x] === 4)
            {
                var img = document.getElementById("enemyOne");
                ctx.drawImage(img,x*blockSizex, y*blockSizey, blockSizex, blockSizey);
            }
             //Draw the third enemy
             else if(board[y][x] === 5)
             {
                var img = document.getElementById("enemyThree");
                ctx.drawImage(img,x*blockSizex, y*blockSizey, blockSizex, blockSizey);
            }

            
        }
    }
    //Draw the player and moving enemys
    var img = document.getElementById("enemyFive");
    ctx.drawImage(img,enemlione.x*blockSizex, enemlione.y*blockSizey, blockSizex, blockSizey);
    
    var img = document.getElementById("enemyTwo");
    ctx.drawImage(img,enemliTwo.x*blockSizex, enemliTwo.y*blockSizey, blockSizex, blockSizey);

    var img = document.getElementById("player");
    ctx.drawImage(img,player.x*blockSizex, player.y*blockSizey, blockSizex, blockSizey);


    //draw moving enemy


        
    }



//Check to see if the new space is inside the board and not a wall
function canMove(x, y){
    return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

//objects, coins, obstacles, finish
function win(x, y)
{
    if (board[y][x] == -1)
    {
        console.log("WOO! i win!!")
    }
}
function obstacleS(x, y)
{
    if (board[y][x] == 4 || board[y][x] == 3 ||board[y][x] == 5 || (player.x == enemlione.x && player.y == enemlione.y)  || (player.x == enemliTwo.x && player.y == enemliTwo.y))
    {
        console.log("ouch")
        document.getElementById("GameBoardCanvas").width = ("1100")
        document.getElementById("GameBoardCanvas").height = ("1900")
        draw(board = boardOne, player = {x: 0,y: 0});

    }  
}


$(document).keydown(function(e){
    win(player.x, player.y);
    obstacleS(player.x, player.y);
    if((e.which == 38) && canMove(player.x, player.y-1))
    {
        player.y--;
    }
        
    else if((e.which == 40) && canMove(player.x, player.y+1))
    {
        player.y++;
    }
    else if((e.which == 37) && canMove(player.x-1, player.y))
    {
        player.x--;
    }
    else if((e.which == 39) && canMove(player.x+1, player.y))
    {
        player.x++;
    }
    //enemy
    if((e.which == 37) && canMove(enemlione.x, enemlione.y-1))
    {
        enemlione.y--;
    }
    else if((e.which == 39) && canMove(enemlione.x, enemlione.y+1))
    {
        enemlione.y++;
    }
    //enemy two
    if((e.which == 38) && canMove(enemliTwo.x-1, enemliTwo.y))
    {
        enemliTwo.x--;
    }
    else if((e.which == 40) && canMove(enemliTwo.x+1, enemliTwo.y))
    {
        enemliTwo.x++;
    }

    draw();
    e.preventDefault();
});

$(document).keyup(function(e){
    obstacleS(player.x, player.y);
    win(player.x, player.y);
});

draw();



//level switch

function lOne ()
{
    document.getElementById("GameBoardCanvas").width = ("1100")
    document.getElementById("GameBoardCanvas").height = ("1900")
    draw(board = boardOne, player = {x: 0,y: 0});
}
function lTwo ()
{    
    document.getElementById("GameBoardCanvas").width = ("1100")
    document.getElementById("GameBoardCanvas").height = ("1000")
    draw(board = boardTwo, player = {x: 0,y: 0});
}
function lThree ()
{ 
    document.getElementById("GameBoardCanvas").width = ("1100")
    document.getElementById("GameBoardCanvas").height = ("1000")
    draw(board = boardThree, player = {x: 0,y: 0});
}