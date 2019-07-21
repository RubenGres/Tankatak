/** @type {import ("../typings/phaser")} */

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    parent: 'tankatak',
    title: 'tankatak',
    backgroundColor: '#2d2d2d',    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    antialias: false
};

let keys;

/* constants */
SCROLLSPEED = 2;
GROUNDLEVEL = config.height * 0.88;
TANKSPEED = 160;
GUNSPEED = 2.5;
BULLETSPEED = 1000;
RELOADTIME = 250;

/* create the game */
let game = new Phaser.Game(config);

bkg_jungle = new background();
tank = new player();

/* reference the functions in files */
function preload(){
    game = this;
    this.load.image('bullet', '../assets/bullet2.png');
    this.load.spritesheet('tank_gun', '../assets/tank_gun2.png', { frameWidth: 32, frameHeight: 12 });
    this.load.spritesheet('tank', '../assets/tank.png', { frameWidth: 95, frameHeight: 48 });
    
    /*backgrounds*/
    bkg_jungle.preload('jungle', '../assets/bkg/jungle', 6);
}

function create(){
    addPlatform(0,GROUNDLEVEL,config.width,1);

    /* add background */
    bkg_jungle.create();
    
    /* add player */
    tank.create(100, GROUNDLEVEL - 30, this);    

    /* keyboard input */
    keys = {Z : this.input.keyboard.addKey('Z'),
    Q : this.input.keyboard.addKey('Q'),
    S : this.input.keyboard.addKey('S'),
            D : this.input.keyboard.addKey('D'),
            SPACE : this.input.keyboard.addKey('SPACE'),
            SHIFT : this.input.keyboard.addKey('SHIFT')
    }
}

function update(){
    tank.update();
    bkg_jungle.update();
}

function addPlatform(x,y,w,h) {
    /* cree la plateforme */
    platform = game.add.graphics();

    /* rajoute la plateforme au moteur physique */
    game.physics.add.existing(platform);
    platform.body.setSize(w,h);
    platform.body.allowGravity = false;
    platform.body.setImmovable(true);
    platform.body.setOffset(x,y);
}