/* jshint esversion: 6 */

class GameLogic {

  constructor(game, win, fail) {
    this._playNum = 0;
    this._win = win;
    this._fail = fail;
  }

  registerMeta(meta) {
    meta.win= (meta, walker) => {
      this._playNum--;
      this.checkWinning();
      walker.sprite.destroyElement();
    };
    meta.fail = (meta, walker) => {
      fail();
    };
  }

  registerWalker(walker) { 
    this._playNum++;
  }

  checkWinning() {
    if (this._playNum === 0) {
      if (this._win) { 
        this._win();
      }
    }
  }

  fail() {
    console.error("YOU FAIL");
    if (fail) {
      fail();
    }
  }

}

export default GameLogic;
