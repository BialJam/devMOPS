/* jshint esversion: 6 */

import DraggableItem from 'objects/DraggableItem';
import Meta from 'objects/Meta';
import GameLogic from 'logic/GameLogic';

import Generator from 'objects/Generator';

class GameState extends Phaser.State {

  preload() {
    this.game.load.image('background', 'assets/background.png');
    this.game.load.image('item_rotated', 'assets/belka.png');
    this.game.load.image('moveableObject', 'assets/ludzik.png');
    this.game.load.physics('belka', 'assets/belka.json');
    this.game.load.spritesheet('meta_yellow', 'assets/meta.png', 32, 32, 1);
  }

  create() {
    const game = this.game;
    const center = getCenter(game.world);
    const textStyle = { font: "65px Arial", fill: "#ff0044", align: "center" };
    const logic = new GameLogic(function () {
      game.add.text(getCenter(game.world).x - 150, getCenter(game.world).y - 33, "You WIN!", textStyle);
      console.log('win!');
    }, function () {
      game.add.text(getCenter(game.world).x - 150, getCenter(game.world).y - 33, "You LOOSE!", textStyle);
      console.log('loose!');
    });
    // Physics enabled
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.8;
    game.physics.p2.gravity.y = 0;
    game.physics.p2.gravity.x = 0;

    var mainCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var secondCollisionGroup = this.game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    game.physics.startSystem(Phaser.Physics.P2JS);

    this.item = this.createToolbox(secondCollisionGroup);
    this.meta = new Meta(this.game, center.x, center.y - 100, mainCollisionGroup, 'yellow');

    game.add.existing(this.item);
    game.add.existing(this.meta);

    const generator = new Generator('a', game, 250, 250, mainCollisionGroup, secondCollisionGroup, 'yellow', logic);
    const oppositeGenerator = new Generator('a', game, 150, 250, mainCollisionGroup, secondCollisionGroup, 'red', logic);

    this.item.enablePhysics();
    this.meta.enablePhysics();

    logic.registerMeta(this.meta);

    // Collisions
    this.item.body.collides([mainCollisionGroup, secondCollisionGroup]);

    this.mouseBody = new p2.Body();
    game.physics.p2.world.addBody(this.mouseBody);
    game.input.onDown.add(this.onDown, this);
    game.input.onUp.add(this.onUp, this);
    game.input.addMoveCallback(this.move, this);

    generator.start();
    oppositeGenerator.start();
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
    return new DraggableItem(this.game, center.x + 100, center.y, collisionGroup, 90);
  }


}

function getCenter({centerX, centerY}) {
  return {x: centerX, y: centerY};
}

export default GameState;
