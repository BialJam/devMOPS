/* jshint esversion: 6 */

class GameLogic {

  constructor(win, fail) {
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
    };
    meta.fail = (meta, walker) => {
      self.fail();
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
    if (this._fail) {
      this._fail();
    }
  }

}

export default GameLogic;
