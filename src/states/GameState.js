/* jshint esversion: 6 */

import MoveableObject from 'objects/MoveableObject';
import DraggableItem from 'objects/DraggableItem';

class GameState extends Phaser.State {

  preload() {
    this.game.load.image('background', 'assets/background.png');
    this.game.load.image('item', 'assets/item.png');
    this.game.load.spritesheet('moveableObject', 'assets/spritesheet.png', 45, 45, 10);
  }

  create() {
    // Physics enabled
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.8;
    var mainCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var secondCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.updateBoundsCollisionGroup();

    const center = getCenter(this.game.world);

    this.item = this.createToolbox(secondCollisionGroup);
    this.moveableObject = new MoveableObject(this.game, center.x, center.y, mainCollisionGroup);

    this.game.add.existing(this.moveableObject);
    this.game.add.existing(this.item);

    this.moveableObject.enablePhysics();
    this.item.enablePhysics();

    // Collisions
    this.item.body.collides([ mainCollisionGroup, secondCollisionGroup ]);
    this.moveableObject.body.collides([ mainCollisionGroup, secondCollisionGroup ]);
  }

  createToolbox(collisionGroup) {
    const center = getCenter(this.game.world);
    return new DraggableItem(this.game, center.x + 100, center.y, collisionGroup);
  }

}

function getCenter ({centerX, centerY}) {
  return { x: centerX, y: centerY };
}

export default GameState;
