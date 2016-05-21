/* jshint esversion: 6 */

//import MoveableObject from 'objects/MoveableObject';
import DraggableItem from 'objects/DraggableItem';
import Generator from 'objects/Generator';
import Toolbox from 'objects/Toolbox';

class GameState extends Phaser.State {

  preload() {
    this.game.load.image('background', 'assets/background.png');
    this.game.load.image('item_rotated', 'assets/item_rotated.png');
    this.game.load.image('toolbox', 'assets/toolbox.png');
    this.game.load.spritesheet('moveableObject', 'assets/spritesheet.png', 45, 45, 10);
    this.game.load.physics('item_rotated', 'assets/test.json');
  }

  create() {
    const game = this.game;
    // Physics enabled
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 1;
    var mainCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var secondCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var toolboxCollisionGroup = this.game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    game.physics.startSystem(Phaser.Physics.P2JS);

    this.item = this.createToolbox(secondCollisionGroup);

    var toolbox = new Toolbox(this.game, 250, 450, mainCollisionGroup, toolboxCollisionGroup);
    game.add.existing(toolbox);
    toolbox.enablePhysics();

    game.add.existing(this.item);
    const generator = new Generator('a', game, 0, 0, mainCollisionGroup, [mainCollisionGroup, secondCollisionGroup, toolboxCollisionGroup]);


    this.item.enablePhysics();

    // Collisions
    this.item.body.collides([mainCollisionGroup, secondCollisionGroup]);
    //this.moveableObject.body.collides([mainCollisionGroup, secondCollisionGroup]);

    this.mouseBody = new p2.Body();
    game.physics.p2.world.addBody(this.mouseBody);
    game.input.onDown.add(this.onDown, this);
    game.input.onUp.add(this.onUp, this);
    game.input.addMoveCallback(this.move, this);

    generator.start();

  }


  onDown(pointer) {
    this.item.onDown(pointer, this.mouseBody);
  }

  onUp() {
    this.item.onUp();
  }

  move(pointer) {
    this.item.move(pointer, this.mouseBody);
  }

  createToolbox(collisionGroup) {
    const center = getCenter(this.game.world);
    return new DraggableItem(this.game, center.x + 100, center.y, collisionGroup);
  }



}

function getCenter({centerX, centerY}) {
  return {x: centerX, y: centerY};
}

export default GameState;
