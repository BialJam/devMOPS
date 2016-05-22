/* jshint esversion: 6 */
const { Sprite, Point } = Phaser;

class Toolbox extends Sprite {

  constructor(game, x, y, collidesWith, collisionGroup) {
    super(game, x, y, 'toolbox');
    this._collisionGroup = collisionGroup;
    this.collidesWith = collidesWith;
  }

    // const body = this.body;
  enablePhysics() {
    this.game.physics.p2.enable(this);
    const body = this.body;
    body.collides(this.collidesWith);
    body.static = true;
    body.setCollisionGroup(this._collisionGroup);
    body.mass = 99999;
  }

  update() {

  }
}

export default Toolbox;
