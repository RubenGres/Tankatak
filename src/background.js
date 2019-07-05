class background {

    constructor() {
        this.layerPairs = [];
    }

    preload(name, path, layercount) {
        this.layercount = layercount;
        this.name = name;
               
        /*load backgrounds*/
        for(let i = 0; i < this.layercount;i++) {
            let layername = name + i;
            game.load.image(layername, path + '/' + i +'.png');
        }
    }

    create() {      
        for(let i = 0; i < this.layercount;i++) {
            let pair = [];
            let l1 = game.add.image(0,0,this.name+i).setOrigin(0);
            l1.displayHeight = config.height;
            l1.displayWidth = config.width;

            pair.push(l1);

            let l2 = game.add.image(config.width,0,this.name+i).setOrigin(0);
            l2.displayHeight = config.height;
            l2.displayWidth = config.width;
            
            pair[0] = l1;
            pair[1] = l2;
            this.layerPairs.push(pair);
        }
    }

    update() {
        /* scroll background with sweet parallax */
        for(let i = 0; i < this.layercount; i++){
            this.layerPairs[i][0].x -= SCROLLSPEED * (i/this.layercount);
            this.layerPairs[i][1].x -= SCROLLSPEED * (i/this.layercount);

            if(this.layerPairs[i][0].x < -config.width){
                this.layerPairs[i][0].x = 0;
                this.layerPairs[i][1].x = config.width;
            }
        }        
    }
}