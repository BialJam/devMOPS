/* jshint esversion: 6 */

import MoveableObject from 'objects/MoveableObject';
import DraggableItem from 'objects/DraggableItem';
import Generator from 'object/Generator';

class GameState extends Phaser.State {

  preload() {
    this.game.load.image('background', 'assets/background.png');
    this.game.load.image('item_rotated', 'assets/item_rotated.png');
    this.game.load.spritesheet('moveableObject', 'assets/spritesheet.png', 45, 45, 10);
    this.game.load.physics('item_rotated', 'assets/test.json');
  }

  create() {
    const game = this.game;
    // Physics enabled
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.8;
    var mainCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var secondCollisionGroup = this.game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    const center = getCenter(this.game.world);
    game.physics.startSystem(Phaser.Physics.P2JS);
    this.createToolbox();

    this.item = this.createToolbox(secondCollisionGroup);
    //this.moveableObject = new MoveableObject(this.game, center.x, center.y, mainCollisionGroup);


    game.add.existing(this.item);


    this.item.enablePhysics();

    // Collisions
    this.item.body.collides([mainCollisionGroup, secondCollisionGroup]);
    //this.moveableObject.body.collides([mainCollisionGroup, secondCollisionGroup]);

    this.mouseBody = new p2.Body();
    game.physics.p2.world.addBody(this.mouseBody);
    game.input.onDown.add(this.onDown, this);
    game.input.onUp.add(this.onUp, this);
    game.input.addMoveCallback(this.move, this);

    const generator = new Generator('a', game, 0,0, mainCollisionGroup);
    generator.start();

  }


  onDown(pointer) {
    const game = this.game;
    var bodies = game.physics.p2.hitTest(pointer.position);

    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];

    if (bodies.length) {
      var clickedBody = bodies[0];

      if (!clickedBody.parent.sprite.draggable) {
        return;
      }

      var localPointInBody = [0, 0];
      // this function takes physicsPos and coverts it to the body's local coordinate system
      clickedBody.toLocalFrame(localPointInBody, physicsPos);

      // use a revoluteContraint to attach mouseBody to the clicked body
      this.mouseConstraint = game.physics.p2.createLockConstraint(this.mouseBody, clickedBody);
    }
  }

  createToolbox(collisionGroup) {
    const center = getCenter(this.game.world);
    return new DraggableItem(this.game, center.x + 100, center.y, collisionGroup);
  }

  onUp() {
    this.game.physics.p2.removeConstraint(this.mouseConstraint);
  }

  move(pointer) {
    this.mouseBody.position[0] = this.game.physics.p2.pxmi(pointer.position.x);
    this.mouseBody.position[1] = this.game.physics.p2.pxmi(pointer.position.y);
  }

}

function getCenter({centerX, centerY}) {
  return {x: centerX, y: centerY};
}

export default GameState;
