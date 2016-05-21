/* jshint esversion: 6 */

class DraggableItem extends Phaser.Sprite {
    constructor(game, x, y, collisionGroup) {
        super(game, x, y, 'item_rotated');
        this._collisionGroup = collisionGroup;
    }

    enablePhysics() {
        this.game.physics.p2.enable(this, true);

        const body = this.body;
        body.clearShapes();
        body.loadPolygon('item_rotated', 'item_rotated');
        body.setCollisionGroup(this._collisionGroup);

        this.inputEnabled = true;
        this.input.enableDrag();
    }
}

export default DraggableItem;
