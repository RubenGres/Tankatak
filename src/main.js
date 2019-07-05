/** @type {import ("../typings/phaser")} */

var config = {
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

/* constants */
SCROLLSPEED = 2;
GROUNDLEVEL = config.height * 0.88;
TANKSPEED = 160;
GUNSPEED = 2.5;

/* create the game */
let game = new Phaser.Game(config);

/* reference the functions in files */
function preload(){
    game = this;
    this.load.image('tank_gun', 'assets/tank_gun.png');
    this.load.spritesheet('tank', 'assets/tank.png', { frameWidth: 93, frameHeight: 48 });
    
    /*backgrounds*/
    bkg_jungle = new background();
    bkg_jungle.preload('jungle', 'assets/bkg/jungle', 6);
}

function create(){
    bkg_jungle.create();
    
    addPlatform(0,GROUNDLEVEL,config.width,1);
    
    /* add player */
    player = new player(100, GROUNDLEVEL - 30, this);

    /* listen for keyboard input */
    cursors = this.input.keyboard.createCursorKeys();
}

function update(){
    player.update();
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