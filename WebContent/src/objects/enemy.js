export class Enemy extends Phaser.GameObjects.Image{

    constructor(scene) 
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 0;
    }

    startOnPath  ()
    {
        this.follower.t = 0;
        this.hp = 100;
        
        path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);            
    }
    receiveDamage(damage) 
    {
        this.hp -= damage;           
        
        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false);      
        }
    }
    update (time, delta)
    {
        this.follower.t += ENEMY_SPEED * delta;
        path.getPoint(this.follower.t, this.follower.vec);
        
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }


    getEnemy(x, y, distance) {
    var enemyUnits = enemies.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {       
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
    }

    damageEnemy(enemy, bullet) {  
        // only if both enemy and bullet are alive
        if (enemy.active === true && bullet.active === true) {
            // we remove the bullet right away
            bullet.destroy();
            
            
            // decrease the enemy hp with BULLET_DAMAGE
            enemy.receiveDamage(BULLET_DAMAGE);
        }
    }
}