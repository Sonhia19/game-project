var Fuel = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Fuel (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'spritesBase', 'fuel');
    },
    place: function(i, j) {            
        this.y = i ;
        this.x = j ;
        this.setActive(true);
        this.setVisible(true);     
        this.setScale(0.2);  
    },
    update: function (time, delta)
    {
        
    }
});