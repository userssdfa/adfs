
class Block{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.speed = 0;
        this.around = {top:null,bottom:null,left:null,right:null}

        this.maxHp = 10
        this.hp = Math.floor(Math.random()*this.maxHp);
        this.S = "98%"
        this.L = "45%"
        this.H = ["black","coral","yellow","greenYellow","limeGreen","lightSeaGreen","blue","indigo","violet","#FFFFFF"]
        this.colors = []
        for(let i=0; i<this.maxHp; i++){
            this.colors.push(this.H[i])
        }

        this.type = "block"
    }
    draw(){
        gCtx.save();
        const shadowWidth = 7;
        gCtx.lineWidth = 3;

        gCtx.fillStyle = this.colors[this.hp];//矩形全体
        gCtx.beginPath();
        gCtx.moveTo(this.x,this.y)
        gCtx.lineTo(this.x+this.w,this.y)
        gCtx.lineTo(this.x+this.w,this.y+this.h)
        gCtx.lineTo(this.x,this.y+this.h)
        gCtx.closePath();
        gCtx.fill();
        
        gCtx.fillStyle = "rgba(0,0,0,0.3)";//右下影
        gCtx.beginPath();
        gCtx.moveTo(this.x+this.w,this.y);
        gCtx.lineTo(this.x+this.w,this.y+this.h);
        gCtx.lineTo(this.x,this.y+this.h);
        gCtx.lineTo(this.x+shadowWidth,this.y+this.h-shadowWidth);
        gCtx.lineTo(this.x+this.w-shadowWidth,this.y+this.h-shadowWidth);
        gCtx.lineTo(this.x+this.w-shadowWidth,this.y+shadowWidth);
        gCtx.lineTo(this.x+this.w,this.y);
        gCtx.fill();

        gCtx.fillStyle = "rgba(255,255,255,0.4)"//左上
        gCtx.beginPath();
        gCtx.moveTo(this.x,this.y+this.h);
        gCtx.lineTo(this.x,this.y);
        gCtx.lineTo(this.x+this.w,this.y);
        gCtx.lineTo(this.x+this.w-shadowWidth,this.y+shadowWidth);
        gCtx.lineTo(this.x+shadowWidth,this.y+shadowWidth);
        gCtx.lineTo(this.x+shadowWidth,this.y+this.h-shadowWidth);
        gCtx.fill();

        gCtx.strokeStyle = this.colors[this.hp];//角の線
        gCtx.lineWidth = 1
        gCtx.beginPath();
        gCtx.moveTo(this.x,this.y);
        gCtx.lineTo(this.x+shadowWidth,this.y+shadowWidth);
        gCtx.lineTo(this.x+this.w-shadowWidth,this.y+this.h-shadowWidth);
        gCtx.lineTo(this.x+this.w,this.y+this.h);
        gCtx.stroke();
        gCtx.beginPath();
        gCtx.moveTo(this.x+this.w,this.y);
        gCtx.moveTo(this.x+this.w-shadowWidth,this.y+shadowWidth);
        gCtx.moveTo(this.x+shadowWidth,this.y+this.h-shadowWidth);
        gCtx.lineTo(this.x,this.y+this.h);
        gCtx.stroke();
        gCtx.strokeStyle = this.strokeColor;
        gCtx.strokeRect(this.x,this.y,this.w,this.h)

        gCtx.restore();

        gCtx.lineWidth = 1
        gCtx.textAlign = "center"
        gCtx.textBaseline = "middle"
        gCtx.font = "italic bold 30px Arial"
        gCtx.fillStyle = "#111";
        gCtx.fillText(this.hp,this.x+this.w/2,this.y+this.h/2)
        gCtx.strokeStyle = "white";
        gCtx.strokeText(this.hp,this.x+this.w/2,this.y+this.h/2)
    }
}
