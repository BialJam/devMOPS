/* jshint esversion: 6 */

import DraggableItem from 'objects/DraggableItem';
import Meta from 'objects/Meta';
import GameLogic from 'logic/GameLogic';
import GameTimer from 'logic/GameTimer';

import Generator from 'objects/Generator';
import Toolbox from 'objects/Toolbox';

class GameState extends Phaser.State {

  preload() {
    this.game.load.image('background', 'assets/background.png');
    this.game.load.image('item_rotated', 'assets/belka.png');
    this.game.load.image('toolbox', 'assets/toolbox.png');
    this.game.load.image('moveableObject_red', 'assets/ludzik_red.png');
    this.game.load.image('moveableObject_green', 'assets/ludzik_green.png');
    this.game.load.image('start_green', 'assets/start_green.png');
    this.game.load.image('start_red', 'assets/start_red.png');

    this.game.load.physics('belka', 'assets/belka.json');
    this.game.load.spritesheet('meta_red', 'assets/meta_red.png');
    this.game.load.spritesheet('meta_green', 'assets/meta_green.png');

  }

  create() {
    const game = this.game;
    game.stage.backgroundColor = "#3d424c";
    const center = getCenter(game.world);
    const textStyle = { font: "65px Arial", fill: "#aabbcc", align: "center" };
    const timer = new GameTimer(game.time.create(false), 3, 5, function (state, secondsLeft) {
      console.log(state);
      console.log(secondsLeft);
    }, function () {
      game.add.text(getCenter(game.world).x - 150, getCenter(game.world).y - 40, "Time is up!!!", textStyle);
      game.physics.p2.paused = true;
      this.success = 'timeout';
    });
    const logic = new GameLogic(function () {
      game.add.text(getCenter(game.world).x - 150, getCenter(game.world).y - 40, "You WIN!", textStyle);
      game.physics.p2.paused = true;
      this.success = 'win';
      timer.stop();
    }, function () {
      game.add.text(getCenter(game.world).x - 190,  getCenter(game.world).y - 40, "You LOOSE!", textStyle);
      game.physics.p2.paused = true;
      this.success = 'loose';
      timer.stop();
    });
    timer.start();
    // Physics enabled
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 1;
    game.physics.p2.gravity.y = 0;
    game.physics.p2.gravity.x = 0;

    var mainCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var secondCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var toolboxCollisionGroup = this.game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    game.physics.startSystem(Phaser.Physics.P2JS);

    this.item = this.createToolbox(secondCollisionGroup);
    this.metaGreen = new Meta(this.game, center.x + 200, center.y - 100, mainCollisionGroup, 'green');
    this.metaRed = new Meta(this.game, center.x, center.y + 100, mainCollisionGroup, 'red');

    var toolbox = new Toolbox(this.game, 400, 560, mainCollisionGroup, toolboxCollisionGroup);
    game.add.existing(toolbox);
    toolbox.enablePhysics();
    game.add.existing(this.item);
    game.add.existing(this.metaGreen);
    game.add.existing(this.metaRed);

    const generator = new Generator( game, 250, 250, mainCollisionGroup, [mainCollisionGroup, secondCollisionGroup, toolboxCollisionGroup], 'green', logic, 180);
    const oppositeGenerator = new Generator( game, 150, 250, mainCollisionGroup, [mainCollisionGroup, secondCollisionGroup, toolboxCollisionGroup], 'red', logic, 270);

    this.item.enablePhysics();
    this.metaRed.enablePhysics();
    this.metaGreen.enablePhysics();

    logic.registerMeta(this.metaRed);
    logic.registerMeta(this.metaGreen);

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
