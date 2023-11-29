
class Ball {
    constructor(can,puddle){
        this.can = can;
        this.puddle = puddle;
        this.r = 6;
        this.x = this.puddle.x+this.puddle.w/2;
        this.y = this.puddle.y;
        this.xBef = this.x;
        this.yBef = this.y;

        this.release = false;
        this.speed = 5
        this.angle = 0;
        this.startAngle = Math.random()*-Math.PI/2 - Math.PI/4
        
        this.collisionNumber = 1
        this.collisionAreas = []
        

        this.refrectAng = 0;
    }
    render(){
        let dx = Math.cos(this.angle);
        let dy = Math.sin(this.angle);
        this.angle = Math.atan2(dy,dx)
        this.xBef = this.x;
        this.yBef = this.y;
        
        this.collisionAreas = []
        //離す前、後
        if(tStatus.swipe === "up" && !this.release){
            this.release = true;
            this.angle = this.startAngle;
        }else if(!this.release){
            this.x = this.puddle.x+this.puddle.w/2;
            this.y = this.puddle.y;
        }else{
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed
        }


        //あたり判定、次の場所までの間に等間隔に円を持たせ判定とする
        let lerpUnit = this.speed / this.collisionNumber;
        for(let i=0; i<this.collisionNumber; i++){
            let x = Math.cos(this.angle)*(lerpUnit*i)+this.xBef
            let y = Math.sin(this.angle)*(lerpUnit*i)+this.yBef
            this.collisionAreas.push({x:x,y:y,r:this.r})
        }

        //パドル反射
        
        
        this.refrectAng = this.puddle.dynamic*0.02 - Math.PI/2
        this.refrectAng = clamp(this.refrectAng,-Math.PI,0)
        if(this.y>this.puddle.y-this.r && this.x>this.puddle.x+this.r && this.x<this.puddle.x+this.puddle.w-this.r){

            this.angle = (-this.angle+this.refrectAng)/2
            this.y = this.puddle.y-this.r;
        }
        


        //下判定
        //else if(this.y+this.r>this.can.height)console.log("game over")


       //gCtx.strokeStyle = "black";
       //gCtx.beginPath();
       //gCtx.moveTo(this.puddle.x+this.puddle.w/2,this.puddle.y);
       //gCtx.lineTo(Math.cos(this.refrectAng)*50+this.puddle.x+this.puddle.w/2,Math.sin(this.refrectAng)*50+this.puddle.y)
       //gCtx.stroke();
       gCtx.lineWidth = 1
       gCtx.strokeStyle = "blue"
       gCtx.fillStyle = "#07F5E1";
       gCtx.beginPath();
       gCtx.arc(this.x,this.y,this.r,0,Math.PI*2)
       gCtx.fill();
       gCtx.stroke();
    }

    provisional(I,E,c){
        
        let angleA = Math.atan2(E.A.y-I.y,E.A.x-I.x)
        let angleB = Math.atan2(E.B.y-I.y,E.B.x-I.x)
        let ave = (angleA + angleB)/2

        let vtc = {x:this.x-I.x,y:this.y-I.y};
        let length = Math.sqrt(vtc.x**2+vtc.y**2)
        let scale = this.r / length;


        let inc = ave - this.angle
        
        this.angle += inc*2-Math.PI
        this.x = I.x + vtc.x*scale*c*1.2
        this.y = I.y + vtc.y*scale*c*1.2
    }
}
