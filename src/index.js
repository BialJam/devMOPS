/* jshint esversion: 6 */
import GameState from 'states/GameState';

class Game extends Phaser.Game {

  getLevels() {
    return [{
      teams: [
        {
          name: 'red',
          count: 3,
          posX: 200,
          posY: 400,
          rotation: 0,
          metaX: 400,
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
    this.startLevel(0, this.state);
  }

  startLevel(currentLevel = 0, state) {

    const data = {};
    const levels = this.getLevels();

    data.level = levels[currentLevel];
    data.onWin = ()=> {
      currentLevel++;

      if (currentLevel >= levels.length) {
        window.alert('Gratuluje!');
        return;
      }

      this.startLevel(currentLevel);
    };

    data.onFail = ()=> {
      this.startLevel(0, state);
    }

    state.start('GameState', true, true, data);
  }

}

new Game();
