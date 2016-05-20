/* jshint esversion: 6 */
const { Sprite, Point } = Phaser;

class MoveableObject extends Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'moveableObject');
    game.physics.enable(this);

    const body = this.body;
    body.mass = 100;
    body.velocity = new Point(10, 1);
    body.collideWorldBounds = true;
    body.worldBounce = new Point(1, 1);
    body.bounce.setTo(1,1);

    const animations = this.animations;
    animations.add('walk');
    animations.play('walk', 10, true);
  }

}

export default MoveableObject;
