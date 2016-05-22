/* jshint esversion: 6 */
const { Sprite } = Phaser;

class MoveableObject extends Sprite {

  constructor(game, x, y, collisionGroup, team, initialRotation = 0) {
    super(game, x, y, 'moveableObject_'+ team);
    this._collisionGroup = collisionGroup;
    this._team = team;
    this.touched = false;
    this.initialRotation = initialRotation;
  }

  enablePhysics() {
    this.game.physics.p2.enable(this);
    const body = this.body;

    body.setCircle(10);
    body.setCollisionGroup(this._collisionGroup);
    body.setZeroDamping();
    body.fixedRotation = false;
    this.angle = 0;
    enableAnimation(this);

    const speed = 100;
    const initialRotation = this.initialRotation;
    body.velocity.x = speed * Math.sin(this.toRadians(initialRotation));
    body.velocity.y = - speed * Math.cos(this.toRadians(initialRotation));

    this.scale.setTo(0.5);

    body.collides(this._collisionGroup, this.objectApproached);
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
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

  objectApproached(body, nextBody) {
    const sprite = body.sprite;
    const secondSprite = nextBody.sprite;
    if (sprite.meetWrongTeam && secondSprite.isMyTeam && !secondSprite.isMyTeam(sprite._team)) {
      sprite.meetWrongTeam();
    }
  }
}
function enableAnimation(obj) {
  const animations = obj.animations;
  animations.add('walk');
  animations.play('walk', 10, true);
}

export default MoveableObject;
