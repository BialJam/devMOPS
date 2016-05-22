/* jshint esversion: 6 */
import GameState from 'states/GameState';
import Levels from 'objects/Level'

class Game extends Phaser.Game {

  constructor() {
    super(800, 600, Phaser.AUTO, 'content', null);
    this.state.add('GameState', GameState, false);
    this.startLevel(0, this.state);
  }

  startLevel(currentLevel = 0, state) {

    const data = {};
    const levels = Levels.getLevels();

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
