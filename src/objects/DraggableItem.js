/* jshint esversion: 6 */

class DraggableItem extends Phaser.Sprite {
    constructor(game, x, y, collisionGroup) {
        super(game, x, y, 'item');
        this._collisionGroup = collisionGroup;
    }

    enablePhysics() {
        this.game.physics.p2.enable(this, true);

        const body = this.body;
        body.setRectangle(60, 60);
        body.setCollisionGroup(this._collisionGroup);
    }

}

export default DraggableItem;
