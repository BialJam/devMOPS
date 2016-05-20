/**
 * Created by bartek on 20/05/16.
 */


class DraggableItem extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'item');

        this.inputEnabled = true;
        this.input.enableDrag();
        game.physics.enable(this);

        const body = this.body;
        body.collideWorldBounds = true;
    }

}

export default DraggableItem;
