/* jshint esversion: 6 */

import RainbowText from 'objects/RainbowText';
import MoveableObject from 'objects/MoveableObject';

class GameState extends Phaser.State {

  preload() {
    this.game.load.image('moveableObject', 'assets/spritesheet.png');
  }

  create() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY };
    this._text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
    this._text.anchor.set(0.5);

    let object = new MoveableObject(this.game, center.x, center.y);
    this.game.add.existing(object);
    this.game.physics.enable(object);
  }
}

export default GameState;
