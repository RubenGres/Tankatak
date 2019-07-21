class player {

    constructor() {}

    create(x,y){
        this.lastshoot = new Date().getTime();

        /* add tank */
        let tank_body = game.add.sprite(0, 0, 'tank');
        this.tank_gun = game.add.sprite(10,-10, 'tank_gun').setOrigin(0, 0.5);

        this.container = game.add.container(x,y).setDepth(2);
        this.container.setSize(93, 48);
        game.physics.world.enable(this.container);
        
        /* add tank parts to the container */
        this.container.add(this.tank_gun);
        this.container.add(tank_body);
        this.container.body.setCollideWorldBounds(true);
    
        /* add tank collision */
        game.physics.add.collider(this.container, platform);


        /* animations */
        /* tank body animation */
        game.anims.create({
            key: 'move',
            frames: game.anims.generateFrameNumbers('tank', { start: 1, end: 4 }),
            frameRate: 2,
            repeat: -1
        });

        /* tank gun animations */
        game.anims.create({
            key: 'shoot',
            frames: game.anims.generateFrameNumbers('tank_gun', { start: 1, end: 5 }),
            frameRate: 50
        });

        game.anims.create({
            key: 'idle',
            frames: [ { key: 'tank_gun', frame: 0 } ],
            frameRate: 0
        });

        tank_body.anims.play('move', true);
        this.tank_gun.play('idle', true);
    }

    update(){
        /* shoot */
        if(keys.SPACE.isDown || keys.SHIFT.isDown) {
            this.shoot();
        }

        /* if the animaton has ended, return to idle state */
        this.tank_gun.on('animationcomplete', function (anim, frame) {
            tank.tank_gun.play('idle', true);
        }, this.tank_gun);

        /* movement body */    
        if (keys.Q.isDown) {
            this.container.body.setVelocityX(-TANKSPEED);        
        } else if (keys.D.isDown) {
            this.container.body.setVelocityX(TANKSPEED);
        } else {
            this.container.body.setVelocityX(0);
        }

        /* change gun angle*/
        if (keys.Z.isDown) {
            this.tank_gun.angle -= GUNSPEED;
        } else if (keys.S.isDown){
            this.tank_gun.angle += GUNSPEED;
        }

        /* limit gun angle*/
        if(this.tank_gun.angle < -90) {
            this.tank_gun.setAngle(-90);
        } else if(this.tank_gun.angle > 0) {
            this.tank_gun.setAngle(0);
        }            
    }

    shoot() {
        let now = new Date().getTime();
        if(now - this.lastshoot > RELOADTIME) {
            /* play shoot anim*/
            this.tank_gun.play('shoot');
            
            let x = this.tank_gun.x + this.container.x;
            let y = this.tank_gun.y+ this.container.y;

            /* create the bullet */
            let bullet = game.add.sprite(x, y, 'bullet').setOrigin(0,0.5).setDepth(1);
            game.physics.world.enable(bullet);
            
            this.tank_gun.depth = bullet.depth + 1;

            bullet.body.setCollideWorldBounds(true);
            bullet.body.onWorldBounds = true;

            bullet.body.setAllowGravity(false);
            bullet.setAngle(this.tank_gun.angle);

            bullet.body.setVelocityX(BULLETSPEED * Math.cos(this.tank_gun.angle * Math.PI / 180));
            bullet.body.setVelocityY(BULLETSPEED * Math.sin(this.tank_gun.angle * Math.PI / 180));

            /* world bound event listener */
            bullet.body.world.on('worldbounds', function(body) {
                if (body.gameObject == this) {
                    this.destroy();
                }
            }, bullet);

            /* update reload timer */
            this.lastshoot = now;
        }            
    }
}