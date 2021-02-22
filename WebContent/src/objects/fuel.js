export class Fuel extends Phaser.GameObjects.Image {

    constructor (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'spritesBase', 'fuel');
    }

    place(i, j) {            
        this.y = i ;
        this.x = j ;
        this.setActive(true);
        this.setVisible(true);     
        this.setScale(0.2);  
    }
    update (time, delta)
    {
        
    }
}