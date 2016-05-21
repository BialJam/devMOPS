/* jshint esversion: 6 */
const { Sprite } = Phaser;

class MoveableObject extends Sprite {

  constructor(game, x, y, collisionGroup) {
    super(game, x, y, 'moveableObject');
    this._collisionGroup = collisionGroup;
  }

  enablePhysics() {
    this.game.physics.p2.enable(this, true);
    const body = this.body;

    body.setCircle(0, 0);
    body.setCollisionGroup(this._collisionGroup);
    body.setZeroDamping();
    body.fixedRotation = false;
    enableAnimation(this);
    body.velocity.x = -100;
    body.velocity.y = 0;
  }

  update() {
    const body = this.body;
    body.damping = 0;
    body.angularDamping = 0;

    var angle = Math.atan2(body.velocity.y, body.velocity.x);
    body.angle = angle * 180 / Math.PI;
    body.angle += 180;

  }
}
function enableAnimation(obj) {
  const animations = obj.animations;
  animations.add('walk');
  animations.play('walk', 10, true);
}

export default MoveableObject;
