/* jshint esversion: 6 */
import GameState from 'states/GameState';

class Game extends Phaser.Game {

  getLevels(){
    return [{
      teams: [
        {
          name: 'red',
          count: 3,
          posX: 200,
          posY: 400,
          rotation: 0,
          metaX : 400,
          metaY: 200
        },

        {
          name: 'green',
          count: 3,
          posX: 100,
          posY: 200,
          rotation: 90,
          metaX: 700,
          metaY: 400
        }]

    }];
  }

  constructor() {
    super(800, 600, Phaser.AUTO, 'content', null);
    this.state.add('GameState', GameState, false);
    this.state.start('GameState', false, false, this.getLevels()[0]);
  }

}

new Game();
