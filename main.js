var chess=document.getElementById('chess');
var context=chess.getContext('2d');
var flag=true;
var empty=[];
var wins=[];//赢法数组
var myWin=[];//赢法统计数组
var computerWin=[];
var gameOver=false;

for(var i=0;i<15;i++){
    empty[i]=[];
    for(var j=0;j<15;j++){
        empty[i][j]=0;
    }
}

//定义三维数组
for(var i=0;i<15;i++){
    wins[i]=[];
    for(var j=0;j<15;j++){
        wins[i][j]=[];
    }
}
//初始化赢法数组

//i，j只是用来控制五子的起始带你位置，k才是决定五子变动的方向以及数量

var count=0;
for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i][j+k][count]=true;
        }
        count++;
    }
}

for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[j+k][i][count]=true;
        }
        count++;
    }
}

for(var i=0;i<11;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i+k][j+k][count]=true;
        }
        count++;
    }
}

for(var i=0;i<11;i++){
    for(var j=14;j>3;j--){
        for(var k=0;k<5;k++){
            wins[i+k][j-k][count]=true;
        }
        count++;
    }
}
//赢法统计数组初始化
for(var i=0;i<count;i++){
    myWin[i]=0;
    computerWin[i]=0;
}

context.strokeStyle="#BFBFBF";
var logo =new Image();
logo.src="./src/chess.png"
logo.onload=function(){
    context.drawImage(logo,5,0,440,440);
    drawChessBoard();
}

var drawChessBoard=function(){
    for(var i=0;i<15;i++){
        context.moveTo(15+i*30,15);
        context.lineTo(15+i*30,435);
        context.stroke();
        context.moveTo(15,15+i*30);
        context.lineTo(435,15+i*30);
        context.stroke();
    }
}

var oneStep=function(i,j,me){
    
        //画棋子
        context.beginPath();
        context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
        context.closePath();
        var gradient=context.createRadialGradient(15+i*30,15+j*30,13,15+i*30,15+j*30,0);
        if(me){
            gradient.addColorStop(0,"#0A0A0A");
            gradient.addColorStop(1,"#636766");
        }else{
            gradient.addColorStop(0,"#D1D1D1");
            gradient.addColorStop(1,"#F9F9F9");
        }
        context.fillStyle=gradient;
        context.fill();
    
    
}

chess.onclick=function(e){
    if(gameOver){
        return;
    }
    var x=e.offsetX;
    var y=e.offsetY;
    var i=Math.floor(x/30);
    var j=Math.floor(y/30);
    if(empty[i][j]==0){
        //保证黑白棋子交替
        oneStep(i,j,flag);
        empty[i][j]=1;
        if(flag){
            empty[i][j]=1;
            for(var k=0;k<count;k++){
                if(wins[i][j][k]){
                    myWin[k]++;
                    computerWin[k]=6;
                    if(myWin[k]==5){
                        setTimeout(()=>{
                            alert("黑棋赢了！");
                        },700);
                        gameOver=true;
                    }
                }
            }
            if(!gameOver){
                flag=!flag;
            }
        }else{
            empty[i][j]=2;
            for(var k=0;k<count;k++){
                if(wins[i][j][k]){
                    computerWin[k]++;
                    myWin[k]=6;
                    if(computerWin[k]==5){
                        setTimeout(()=>{
                            alert("白棋赢了！");
                        },700);
                        gameOver=true;
                    }
                }
            }
            if(!gameOver){
                flag=!flag;
            }
        }
    }
}