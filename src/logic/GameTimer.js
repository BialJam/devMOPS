/* jshint esversion: 6 */

class GameTimer {

  constructor(phaserTimer, readySeconds, gameSeconds, tickCallback, timeoutCallback) {
    this._phaserTimer = phaserTimer;
    this._readySeconds = readySeconds;
    this._gameSeconds = gameSeconds;
    this._tickCallback = tickCallback;
    this._timeoutCallback = timeoutCallback;
  }

  start() {
    var secondsLeft = this._readySeconds;
    this._state = 'ready';
    let internalTickCallback = function () {
      // put game logic here;
      secondsLeft--;
      if (secondsLeft === 0 && this._state === 'ready') {
        this._state = 'game';
        secondsLeft = this._gameSeconds;
      } else if (secondsLeft === 0 && this._state === 'game') {
        this.stop();
        return this._timeoutCallback();
      }
      this._tickCallback(this._state, secondsLeft);
    };
    this._phaserTimer.loop(Phaser.Timer.SECOND, internalTickCallback, this);
    this._phaserTimer.start();
  }

  stop() {
    this._phaserTimer.removeAll();
  }

}

export default GameTimer;
