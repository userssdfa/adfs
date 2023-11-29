
class Puddle {
    static width = 100;
    static height = 30;
    constructor(can){
        this.can = can;

        this.w = Puddle.width;
        this.h = Puddle.height;
        this.x = can.width/2 - this.w/2;
        this.y = can.height - 50;

        this.sx = this.x;
        this.sensitivity = 1.8

        this.befPos = this.x;
        this.moves = [];
        this.move = 0;

        this.dynamic = 0;
        this.maxDynamic = 200
        this.decrement = 3

        //パドルのグラデーション
        this.type = 1
        this.befType = this.type;
        this.wavePro = [[0,0],[0.5,4],[0.33,5],[0.25,6]]
        this.waves = []
        this.speed = 0.01
        this.mode = this.wavePro[this.type];
        for(let i=0; i<this.mode[1]; i++){
            this.waves.push(this.mode[0]*i)
        }
    }
    render(){
        this.dynamic += (this.x - this.befPos)*1.2
        this.dynamic += this.decrement*-Math.sign(this.dynamic)
        const dynamicAbs = Math.abs(this.dynamic);


        if(dynamicAbs<this.decrement)this.dynamic = 0
        if(dynamicAbs>this.maxDynamic)this.dynamic = this.maxDynamic*Math.sign(this.dynamic)
        this.befPos = this.x;

        //パドルを動かす処理、sensitivity = 感度
        let gap = tStatus.x - tStatus.sx;
        if(tStatus.start)this.sx = this.x;
        if(tStatus.touch)this.x = this.sx + gap*this.sensitivity
        
        //左右移動限界
        const ballSize = 5;
        const leftLimit = -this.w/2 + ballSize;
        const rightLimit = this.can.width - this.w/2 - ballSize
        if(this.x<leftLimit)this.x = leftLimit
        else if(this.x>rightLimit)this.x = rightLimit


        //color
        if(dynamicAbs===0)this.type = 0;
        else this.type = 2
        if(this.befType !== this.type){
            this.waves = []
            this.speed = Math.sign(this.dynamic)*0.01
            this.mode = this.wavePro[this.type];
            for(let i=0; i<this.mode[1]; i++){
                this.waves.push(this.mode[0]*i)
            }
        }
        this.befType = this.type
        this.draw();
    }
    draw(){
        const color = gCtx.createLinearGradient(this.x,0,this.w+this.x,0);
        color.addColorStop(0,"#0CF8E5")
        for(let i=0; i<this.waves.length; i++){
            this.waves[i] += this.speed;
            if(this.waves[i]>1+this.mode[0])this.waves[i] = -this.mode[0]
            if(this.waves[i]<-this.mode[0])this.waves[i] = 1+this.mode[0]
            color.addColorStop(clamp(this.waves[i]-this.mode[0]/2),"#0CF8E5")
            color.addColorStop(clamp(this.waves[i]),"#0BB2D9")
            color.addColorStop(clamp(this.waves[i]+this.mode[0]/2),"#0CF8E5")
        }
        color.addColorStop(1,"#0CF8E5")
        gCtx.fillStyle = color;
        gCtx.strokeStyle = "blue"
        gCtx.lineWidth = 2
        gCtx.fillRect(this.x,this.y,this.w,this.h)
        gCtx.strokeRect(this.x,this.y,this.w,this.h)
    }
}
