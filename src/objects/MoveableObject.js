/* jshint esversion: 6 */
import {Sprite, Point} from 'Phaser';

class MoveableObject extends Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'moveableObject');
    game.physics.enable(this);
    const body = this.body;
    body.mass = 100;
    body.velocity = new Point(10, 1);
    body.collideWorldBounds = true;
    body.worldBounce = new Point(1, 1);
    this.animations.add('walk');
    this.animations.play('walk', 10, true);
  }

}

export default MoveableObject;
