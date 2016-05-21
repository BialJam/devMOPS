/* jshint esversion: 6 */

class GameLogic {

  constructor(game, win, fail) {
    this._playNum = 0;
    this._win = win;
    this._fail = fail;
  }

  registerMeta(meta) {
    var self = this;
    meta.win= (meta, walker) => {
      self._playNum--;
      self.checkWinning();
      walker.sprite.destroyElement();
      console.log(self._playNum);
    };
    meta.fail = (meta, walker) => {
      self.fail();
    };
  }

  registerWalker(walker) { 
    this._playNum++;
    console.log("adding" + this._playNum);
  }

  checkWinning() {
    if (this._playNum === 0) {
      console.log("WINNER");
      if (this._win) { 
        this._win();
      }
    }
  }

  fail() {
    if (fail) {
      fail();
    }
  }

}

export default GameLogic;
