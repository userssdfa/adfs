class BackGround{
    constructor(can){
        this.can = can
        this.ctx = can.getContext("2d")
        this.circleGrid = [];
        this.size = 8;
        this.width = can.width;
        this.height = can.height;
        this.row = this.height/this.size+1;
        this.col = this.width/this.size;

        this.celestialDirection = 0;
        this.dy = 0;

        this.init();
    }
    init(){
        for(let i=0; i<this.row; i++){
            let array = []
            for(let j=0; j<this.col; j++){
                array.push(0)
            }
            this.circleGrid.push(array)
        }
    }
    update(deltaTime){
        //天体の流れ
        if(true)this.dy += 0.2;//←ここに書く
        if(this.dy > this.size){
            this.celestialDirection=1;
            this.dy -= this.size;
        }else{this.celestialDirection=0}
        //グリッドの初期化
        for(let i=0; i<this.row; i++){
            for(let j=0; j<this.col; j++){
                this.circleGrid[i][j] = 0;
            }
        }


    }
    draw(){
        this.ctx.fillStyle = "#0F182C"
        this.ctx.fillRect(0,0,this.can.width,this.can.height)
        for(let i=0; i<this.row; i++){
            for(let j=0; j<this.col; j++){
                if(this.circleGrid[i][j] === 0 ||this.circleGrid[i][j] === 9){
                    this.ctx.fillStyle = "#111C34"
                }
                else if(this.circleGrid[i][j] === 1){
                    this.ctx.fillStyle = "#29747C"
                }
                else if(this.circleGrid[i][j] === 2){
                    this.ctx.fillStyle = "#49BE3F"
                }
                else if(this.circleGrid[i][j] === 3){
                    this.ctx.fillStyle = "#BBBF40"
                }
                else{throw new Error("カラー指定なし")}
                this.ctx.beginPath();
                this.ctx.arc(j*this.size+this.size/2,i*this.size+this.dy-this.size/2,this.size/3,0,Math.PI*2);
                this.ctx.fill();
            }
        }
    }
}


