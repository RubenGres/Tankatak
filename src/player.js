class player {

    constructor(x,y) {
        
        /* add tank */
        let tank_body = game.add.sprite(0, 0, 'tank');
        this.tank_gun = game.add.sprite(10,-10, 'tank_gun').setOrigin(0, 0.5);
    
        this.container = game.add.container(x,y);
        this.container.setSize(93, 48);
        game.physics.world.enable(this.container);
        
        /* add tank parts to the container */
        this.container.add(this.tank_gun);
        this.container.add(tank_body);
        this.container.body.setCollideWorldBounds(true);
    
        /* add tank collision */
        game.physics.add.collider(this.container, platform);
    
        /* add tank animations */
        game.anims.create({
            key: 'move',
            frames: game.anims.generateFrameNumbers('tank', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        tank_body.anims.play('move', true);
    }

    update(){
        /* movement body */    
        if (cursors.left.isDown) {
            this.container.body.setVelocityX(-TANKSPEED);        
        } else if (cursors.right.isDown) {
            this.container.body.setVelocityX(TANKSPEED);
        } else {
            this.container.body.setVelocityX(0);
        }

        /* angle gun */
        if (cursors.up.isDown) {
            this.tank_gun.angle -= GUNSPEED;
        } else if (cursors.down.isDown){
            this.tank_gun.angle += GUNSPEED;
        }

        if(this.tank_gun.angle < -90) {
            this.tank_gun.setAngle(-90);
        } else if(this.tank_gun.angle > 0) {
            this.tank_gun.setAngle(0);
        }
    }
}