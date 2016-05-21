/**
 * Created by bartek on 21/05/16.
 */
import MoveableObject from 'objects/MoveableObject';

class Generator {

  constructor(type, game, x, y, collisionGroup, secondCollisionGroup) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.collisionGroup = collisionGroup;
    this.secondCollisionGroup = secondCollisionGroup;
    this.game = game;
  }

  start() {
    const game = this.game;

    const item = new MoveableObject(game, this.x, this.y, this.collisionGroup);
    game.add.existing(item);
    item.enablePhysics();
    item.body.collides([this.collisionGroup, this.secondCollisionGroup]);

  }
}

export default Generator;