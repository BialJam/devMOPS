/* jshint esversion: 6 */

class MoveableObject extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'moveableObject');
    game.physics.enable(this);
    this.body.mass = 100;
    this.body.velocity = new Phaser.Point(10, 1);
    this.body.worldBounce = new Phaser.Point(10, 1);
    this.animations.add('walk');
    this.animations.play('walk', 10, true);
  }

}

export default MoveableObject;
