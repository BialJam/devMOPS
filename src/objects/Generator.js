/**
 * Created by bartek on 21/05/16.
 */
import MoveableObject from 'objects/MoveableObject';

class Generator {

  constructor(type, game, x, y, ownCollisionGroup, collisionGroups) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.collisionGroups = collisionGroups;
    this.ownCollisionGroup = ownCollisionGroup;
    this.game = game;
  }

  start() {
    let count = 0;
    const total = 5;

    let interval = window.setInterval(()=> {
      if (count < total) {
        this.createPerson.call(this);
        count++;
      } else {
        window.clearInterval(interval);
      }
    }, 500);

  }

  createPerson() {
    const game = this.game;
    const item = new MoveableObject(game, this.x, this.y, this.ownCollisionGroup);
    game.add.existing(item);
    item.enablePhysics();
    item.body.collides(this.collisionGroups);
  }
}

export default Generator;
