

class GameIntro extends Phaser.State {

  preload(){
    this.game.load.image('splash', 'assets/splash.png');
    this.game.load.image('start', 'assets/start.png');
  }

  init(params){
    this.params = params;
  }

  create(){
    const game = this.game;
    const params = this.params;
    const world = game.world;
    const center = getCenter(world);

    const splash = new Phaser.Sprite(game, center.x /2 - 200,
        center.y /2 - 150, 'splash');
    game.add.existing(splash);

    const start = new Phaser.Sprite(game, 400, 450, 'start');
    game.add.existing(start);

    start.inputEnabled = true;
    start.events.onInputDown.add(()=>{
      params.onStart();
    }, this);

  }
}

function getCenter({centerX, centerY}) {
  return {x: centerX, y: centerY};
}

export default GameIntro;