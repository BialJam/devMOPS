/* jshint esversion: 6 */
import GameState from 'states/GameState';
import Levels from 'objects/Level'
import GameIntro from 'states/GameIntro'

class Game extends Phaser.Game {

  constructor() {
    super(800, 600, Phaser.AUTO, 'content', null);
    this.state.add('Intro', GameIntro, false);
    this.state.add('GameState', GameState, false);
    //this.startLevel(0, this.state);
    this.state.start('Intro', true, true, {
      onStart:()=>{
        this.startLevel(0, this.state);
      }
    });
  }

  startLevel(currentLevel = 0, stateManager) {

    const data = {};
    const levels = Levels.getLevels();

    data.level = levels[currentLevel];
    data.onWin = ()=> {
      currentLevel++;

      if (currentLevel >= levels.length) {
        window.alert('Gratuluje!');
        return;
      }

      this.startLevel(currentLevel, stateManager);
    };

    data.onFail = ()=> {
      this.startLevel(currentLevel, stateManager);
    };

    stateManager.start('GameState', true, true, data);
  }

}

new Game();
