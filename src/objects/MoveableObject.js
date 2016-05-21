/* jshint esversion: 6 */
const { Sprite, Point } = Phaser;

class MoveableObject extends Sprite {

  constructor(game, x, y, collisionGroup) {
    super(game, x, y, 'moveableObject');
    this._collisionGroup = collisionGroup;
  }

    // const body = this.body;
  enablePhysics() {
    this.game.physics.p2.enable(this, true);
    const body = this.body;

    body.setCircle(20, 20);
    body.setCollisionGroup(this._collisionGroup);
    enableAnimation(this);
  }

  update() {
    this.body.force.x = 100;
  }
}

function enableAnimation(obj) {
    const animations = obj.animations;
    animations.add('walk');
    animations.play('walk', 10, true);
}

export default MoveableObject;
