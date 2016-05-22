/* jshint esversion: 6 */
import MoveableObject from 'objects/MoveableObject';

class Generator {

  constructor(game, x, y, ownCollisionGroup, collisionGroups, team, gameLogic, initialRotation, readyTime) {
    this.x = x;
    this.y = y;
    this.collisionGroups = collisionGroups;
    this.ownCollisionGroup = ownCollisionGroup;
    this.game = game;
    this.team = team;
    this.gameLogic = gameLogic;
    this.initialRotation = initialRotation;
    this.readyTime = readyTime * 1000;
  }


  start() {
    const team = this.team === 'red' ? 'start_red' : 'start_green';
    const arrow = new Phaser.Sprite(this.game, this.x, this.y, team);
    arrow.angle = this.initialRotation;
    this.game.add.existing(arrow);


    const timer = this.game.time.events.add( this.readyTime,
        () => {
          console.log('its time');
          arrow.destroy(true);
          this.generatePersons();
        }, this);
    this.game.time.events.start();

  }

  generatePersons() {
    let count = 0;
    const total = 3;

    const timer = this.game.time.create(false);

    timer.loop(Phaser.Timer.SECOND, ()=>{
      if (count < total) {
        this.createPerson.call(this);
        count++;
      } else {
        this.game.time.events.remove(timer);
      }
    }, this);

    timer.start();
  }

  createPerson() {
    const game = this.game;
    const item = new MoveableObject(game, this.x + 35, this.y + 35, this.ownCollisionGroup, this.team, this.initialRotation);
    this.gameLogic.registerWalker(item);
    game.add.existing(item);
    item.enablePhysics();
    item.body.collides(this.collisionGroups);
  }
}

export default Generator;
