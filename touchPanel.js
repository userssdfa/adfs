
class TouchPanel {
    constructor(can){
        this.x = 0;
        this.y = 0;
        this.w = can.width;
        this.h = can.height;

        //drawDot
        this.dotInterval = 15;
        this.dotR = 2;
        this.dotColor = "gray"
        this.margin = 20

        this.can = can;
        this.canColor = "rgba(0,0,0,0.2)";
        
        //x,y:  現在触っている座標,
        //sx,sy:触り始めた座標
        //start:触れ初め最初のフレームのみtrueに
        //touch:触り続けている限りtrue
        //swipe:離したとき、触り始めの座標の差で
        //      どこに向かっているか示す(up,down,left,right)
        this.touch = {
            x:null,y:null,sx:null,sy:null,
            start:false,touch:false,
            swipe:null
        }

        window.addEventListener("keydown",e=>{
            this.debugOneFrame();
        })
        this.can.addEventListener("touchstart",e=>{
            const {x,y} = this.getOffset({ev:e,el:this.can})
            this.touch.start = true;
            this.touch.touch = true;
            this.touch.x = x;
            this.touch.y = y;
            this.touch.sx = x;
            this.touch.sy = y;
        })
        this.can.addEventListener("touchmove",e=>{
            this.debugOneFrame();

            const {x,y} = this.getOffset({ev:e,el:this.can})

            this.touch.touch = true;
            this.touch.x = x;
            this.touch.y = y;
        })
        this.can.addEventListener("touchend",e=>{
            const dx = this.touch.x - this.touch.sx;
            const dy = this.touch.y - this.touch.sy;

            if(Math.abs(dx)>Math.abs(dy)){
                this.touch.swipe = dx > 0 ? "right" : "left"
            }else{
                this.touch.swipe = dy > 0 ? "down" : "up"
            }
            this.touch.touch = false;
            this.touch.x = null;
            this.touch.y = null;
            this.touch.sx = null;
            this.touch.sy = null;
        })
    }
    getOffset({ev:ev,el:el}){
        //初めに触った所の座標を取得
        const posX = ev.changedTouches[0].clientX;
        const posY = ev.changedTouches[0].clientY;
        const rect = el.getBoundingClientRect();
        return {x:posX-rect.left,y:posY-rect.top}
    }
    update(){

        //touch Reset
        this.touch.start = false;
        this.touch.swipe = false;
    }
    draw(){

        const col = Math.floor((this.w-this.margin*2)/this.dotInterval);
        const row = Math.floor((this.h-this.margin*2)/this.dotInterval)

        const marginLeft = this.margin + (this.w-this.margin*2)%this.dotInterval /2
        const marginTop =  this.margin + (this.h-this.margin*2)%this.dotInterval /2

        tCtx.fillStyle = this.dotColor
        for(let y=0; y<=row; y++){
            for(let x=0; x<=col; x++){
                tCtx.beginPath();
                tCtx.arc(x*this.dotInterval+marginLeft,y*this.dotInterval+marginTop,this.dotR,0,Math.PI*2)
                tCtx.fill();
            }
        }

        tCtx.fillStyle = this.canColor;
        tCtx.fillRect(this.x,this.y,this.w,this.h)
    }
    debugOneFrame(){
        //gCtx.clearRect(0,0,gCan.width,gCan.height)
        //tCtx.clearRect(0,0,tCan.width,tCan.height)
        //game.render();
        //touchPanel.draw();
        //touchPanel.update();
    }
}
