/* jshint esversion: 6 */

class DraggableItem extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'item_rotated');
    game.add.existing(this);
    game.physics.p2.enable(this, true);
    this.enableCollisions();

  }

  enableCollisions() {
    this.body.clearShapes();
    this.body.loadPolygon('item_rotated', 'item_rotated');

    this.inputEnabled = true;
    this.input.enableDrag();
  }

}

export default DraggableItem;
