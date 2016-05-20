/**
 * Created by bartek on 20/05/16.
 */


class DraggableItem extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'item');

        this.inputEnabled = true;
        this.input.enableDrag();
        this.game.physics.enable(this);
        this.body.worldBounde = new Phaser.Point(1, 1);
    }

}

export default DraggableItem;