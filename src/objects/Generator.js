/**
 * Created by bartek on 21/05/16.
 */
import MoveableObject from 'MoveableObject';

class Generator {

  constructor(type, game, x, y, collisionGroup) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.collisionGroup = collisionGroup;
    this.game = game;
  }

  start() {
    const game = this.game;

    const item = new MoveableObject(game, this.x, this.y, this.collisionGroup);
    game.add.existing(item);
    item.enablePhysics();
  }
}

export default Generator