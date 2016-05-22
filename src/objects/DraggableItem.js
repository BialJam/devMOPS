/* jshint esversion: 6 */

let lastClickedBody, mouseConstraint;

class DraggableItem extends Phaser.Sprite {
  constructor(game, x, y, collisionGroup, collidesWith, initialRotation = 0) {
    super(game, x, y, 'item_rotated');
    this._collisionGroup = collisionGroup;
    this.collidesWith = collidesWith;
    this.draggable = true;
    this.initialRotation = initialRotation;
  }

  enablePhysics() {
    this.game.physics.p2.enable(this, true);

    const body = this.body;
    body.mass = 99999;
    body.clearShapes();
    body.loadPolygon('belka', 'belka');
    body.setCollisionGroup(this._collisionGroup);
    body.angle = this.initialRotation;
    body.rotation = (this.initialRotation + 90) * (Math.PI / 180);
    body.fixedRotation = true;

    this.inputEnabled = true;
    this.input.enableDrag();
    body.collides(this.collidesWith);
  }


  static onDown(pointer, mouseBody, game) {
    var bodies = game.physics.p2.hitTest(pointer.position);

    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
    if (bodies.length) {
      var clickedBody = bodies[0];

      if (!clickedBody.parent.sprite.draggable) {
        return;
      }

      lastClickedBody = clickedBody.parent;
      lastClickedBody.mass = 1;

      var localPointInBody = [0, 0];
      // this function takes physicsPos and coverts it to the body's local coordinate system
      clickedBody.toLocalFrame(localPointInBody, physicsPos);

      // use a revoluteContraint to attach mouseBody to the clicked body
      mouseConstraint = game.physics.p2.createLockConstraint(mouseBody, clickedBody);
    }
  }

  static onUp(game) {
    if (typeof lastClickedBody !== 'undefined') {

      lastClickedBody.mass = 99999;
      lastClickedBody.setZeroVelocity();
      lastClickedBody.setZeroRotation();
      game.physics.p2.removeConstraint(mouseConstraint);
    }
  }

  static move(pointer, mouseBody, game) {
    mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
    mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);
  }
}

export default DraggableItem;
