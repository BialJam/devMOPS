/* jshint esversion: 6 */
const { Sprite } = Phaser;

class MoveableObject extends Sprite {

  constructor(game, x, y, collisionGroup, team) {
    super(game, x, y, 'moveableObject');
    this._collisionGroup = collisionGroup;
    this._team = team;
    this.touched = false;
  }

  enablePhysics() {
    this.game.physics.p2.enable(this, true);
    const body = this.body;

    body.setCircle(40);
    body.setCollisionGroup(this._collisionGroup);
    body.setZeroDamping();
    body.fixedRotation = false;
    this.angle = 0;
    enableAnimation(this);
    body.velocity.x = -100;
    body.velocity.y = 0;
  }

  update() {
    const body = this.body;

    if (this._remove) {
      this.game.physics.p2.getConstraints().filter(e => {
        return e.bodyA.parent === body || e.bodyB.parent === body;
      }).forEach(e => {
        this.game.physics.p2.removeConstraint(e);
      });
      this.game.physics.p2.removeBody(body);
      this.destroy();
    }

    body.damping = 0;
    body.angularDamping = 0;

    var angle = Math.atan2(body.velocity.y, body.velocity.x);
    body.angle = angle * 180 / Math.PI;
    body.angle += 90;
   }

  destroyElement() {
    this._remove = true;
  }

  isMyTeam(team) {
    return this._team === team;
  }

  markTouched() {
    if (this.touched) {
      return false;
    }
    this.touched = true;
    return true;
  }
}
function enableAnimation(obj) {
  const animations = obj.animations;
  animations.add('walk');
  animations.play('walk', 10, true);
}

export default MoveableObject;
