/* jshint esversion: 6 */

import MoveableObject from 'objects/MoveableObject';
import DraggableItem from 'objects/DraggableItem';



class GameState extends Phaser.State {

  preload() {
    this.game.load.image('background', 'assets/background.png');
    this.game.load.image('item_rotated', 'assets/item_rotated.png');
    this.game.load.spritesheet('moveableObject', 'assets/spritesheet.png', 45, 45, 10);
    this.game.load.physics('item_rotated', 'assets/test.json');
  }

  create() {
    const center = getCenter(this.game.world);
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.createToolbox();

    this.moveableObject = new MoveableObject(this.game, center.x, center.y);
    this.game.add.existing(this.moveableObject);

    this.game.physics.p2.enable([ this.item], true);

    //this.item.enableCollisions();

    const game = this.game;
    this.mouseBody = new p2.Body();
    game.physics.p2.world.addBody(this.mouseBody);
    game.input.onDown.add(this.onDown, this);
    game.input.onUp.add(this.onUp, this);
    game.input.addMoveCallback(this.move, this);
  }


  onDown(pointer) {
    const game = this.game;
    var bodies = game.physics.p2.hitTest(pointer.position);

    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    var physicsPos = [game.physics.p2.pxmi(pointer.position.x), this.game.physics.p2.pxmi(pointer.position.y)];

    if (bodies.length) {
      var clickedBody = bodies[0];

      var localPointInBody = [0, 0];
      // this function takes physicsPos and coverts it to the body's local coordinate system
      clickedBody.toLocalFrame(localPointInBody, physicsPos);

      // use a revoluteContraint to attach mouseBody to the clicked body
      this.mouseConstraint = this.game.physics.p2.createLockConstraint(this.mouseBody,  clickedBody);
          //[this.game.physics.p2.mpxi(localPointInBody[0]), this.game.physics.p2.mpxi(localPointInBody[1])]);
    }
  }

  onUp(pointer) {
    this.game.physics.p2.removeConstraint(this.mouseConstraint);
  }

  move(pointer) {
    this.mouseBody.position[0] = this.game.physics.p2.pxmi(pointer.position.x);
    this.mouseBody.position[1] = this.game.physics.p2.pxmi(pointer.position.y);
  }

  createToolbox() {
    const center = getCenter(this.game.world);
    const toolboxItem = new DraggableItem(this.game, center.x + 100, center.y);
    this.item = toolboxItem;
  }

  update() {
    // this.game.physics.arcade.collide(this.item, this.moveableObject);
  }
}

function getCenter({centerX, centerY}) {
  return {x: centerX, y: centerY};
}

export default GameState;
