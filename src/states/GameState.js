/* jshint esversion: 6 */

import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY };
		this._text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		this._text.anchor.set(0.5);
	}

  update() {
    this._text.x++;
    this._text.y--;
  }
}

export default GameState;
