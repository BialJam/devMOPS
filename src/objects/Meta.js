/* jshint esversion: 6 */
const { Sprite, Point } = Phaser;

class Meta extends Sprite {

  constructor(game, x, y, collisionGroup, team, win, fail) {
    super(game, x, y, 'meta_' + team);
    this._collisionGroup = collisionGroup;
    this._team = team;
  }

  enablePhysics() {
    this.game.physics.p2.enable(this, false);
    const body = this.body;
    body.setCollisionGroup(this._collisionGroup);
    body.collides(this._collisionGroup, this.objectApproached);
    body.static = true;
  }

  update() {
  }

  objectApproached(body, nextBody) {
    const team = body.sprite._team;
    if (body && nextBody && nextBody.sprite && nextBody.sprite.isMyTeam) {
      let secondSprite = nextBody.sprite;
      if (secondSprite && secondSprite.isMyTeam && secondSprite.isMyTeam(team)) {
        if (body.sprite.win && secondSprite.markTouched()) {
          body.sprite.win(body, nextBody, team);
        }
      } else {
        if (body.sprite.fail) {
          body.sprite.fail(body, nextBody, team);
        }
      }
    }
  }
  
}

export default Meta;
