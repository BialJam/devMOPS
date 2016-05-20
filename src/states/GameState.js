/* jshint esversion: 6 */

//import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {

	preload(){
		this.game.load.image('background', 'assets/background.png');
	}

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY };
		//let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		//text.anchor.set(0.5);

		this.game.add.sprite(0,0,'background');

	}

}

export default GameState;
