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

  init(params){
    this.params = params;
  }

  create() {
    var timeLeftText;
    const game = this.game;
    game.stage.backgroundColor = "#3d424c";
    const center = getCenter(game.world);
    const centerTextStyle = { font: "65px Arial", fill: "#aabbcc", align: "center" };
    const textStyle = { font: "30px Arial", fill: "#aabbcc", align: "right" };
    const timer = new GameTimer(game.time.create(false), 3, 5, function (state, secondsLeft) {
      if (state === 'ready') {
        timeLeftText.setText('READY: ' + secondsLeft);
      } else {
        timeLeftText.setText('HURRY: ' + secondsLeft); 
      }
    }, function () {
      game.add.text(getCenter(game.world).x - 150, getCenter(game.world).y - 40, "Time is up!!!", centerTextStyle);
      game.physics.p2.paused = true;
      this.success = 'timeout';
    });
    const logic = new GameLogic(function () {
      game.add.text(getCenter(game.world).x - 150, getCenter(game.world).y - 40, "You WIN!", centerTextStyle);
      game.physics.p2.paused = true;
      this.success = 'win';
      timer.stop();
    }, function () {
      game.add.text(getCenter(game.world).x - 190,  getCenter(game.world).y - 40, "You LOOSE!", centerTextStyle);
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

    // text to counting time out!
    timeLeftText = game.add.text(getCenter(game.world).x + 250, getCenter(game.world).y - 300, "READY!", textStyle);

    var mainCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var secondCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var toolboxCollisionGroup = this.game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    game.physics.startSystem(Phaser.Physics.P2JS);

    this.item = this.createToolbox(secondCollisionGroup);

    var toolbox = new Toolbox(this.game, 400, 560, mainCollisionGroup, toolboxCollisionGroup);
    game.add.existing(toolbox);
    toolbox.enablePhysics();
    game.add.existing(this.item);
    this.item.enablePhysics();

    this.params.teams.forEach(team => {
      const meta = new Meta(this.game, team.metaX, team.metaY, mainCollisionGroup, team.name);
      game.add.existing(meta);
      meta.enablePhysics();
      logic.registerMeta(meta);

      const generator = new Generator( game, team.posX, team.posY, mainCollisionGroup, [mainCollisionGroup, secondCollisionGroup,
        toolboxCollisionGroup], team.name, logic, team.rotation);
        generator.start();
    });

    // Collisions
    this.item.body.collides([mainCollisionGroup, secondCollisionGroup]);

    this.mouseBody = new p2.Body();
    game.physics.p2.world.addBody(this.mouseBody);
    game.input.onDown.add(this.onDown, this);
    game.input.onUp.add(this.onUp, this);
    game.input.addMoveCallback(this.move, this);
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
