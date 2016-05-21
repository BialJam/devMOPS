/* jshint esversion: 6 */
const { Sprite, Point } = Phaser;

class MoveableObject extends Sprite {

  constructor(game, x, y, collisionGroup, team) {
    super(game, x, y, 'moveableObject');
    this._collisionGroup = collisionGroup;
    this._team = team;
  }

  enablePhysics() {
    this.game.physics.p2.enable(this, true);
    const body = this.body;
    body.setCollisionGroup(this._collisionGroup);
    enableAnimation(this);
  }

  update() {
    const body = this.body;
    if (body) {
      body.force.x = 100;
    }
    if (this._remove) {
      this.game.physics.p2.getConstraints().filter(e => {
        return e.bodyA.parent === body || e.bodyB.parent === body;
      }).forEach(e => {
        this.game.physics.p2.removeConstraint(e);
      });
      this.game.physics.p2.removeBodyNextStep(body);
      this.destroy();
    }
  }

  destroyElement() {
    this._remove = true;
  }

  isMyTeam(team) {
    return this._team === team;
  }
}

function enableAnimation(obj) {
    const animations = obj.animations;
    animations.add('walk');
    animations.play('walk', 10, true);
}

export default MoveableObject;
