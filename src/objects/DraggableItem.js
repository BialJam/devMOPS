/* jshint esversion: 6 */

class DraggableItem extends Phaser.Sprite {
    constructor(game, x, y, collisionGroup) {
      super(game, x, y, 'item_rotated');
      this._collisionGroup = collisionGroup;
      this.draggable = true;
    }

    enablePhysics() {
        this.game.physics.p2.enable(this, true);

        const body = this.body;
        body.mass = 99999;
        body.clearShapes();
        body.loadPolygon('item_rotated', 'item_rotated');
        body.setCollisionGroup(this._collisionGroup);

        this.inputEnabled = true;
        this.input.enableDrag();
    }

    onDown(pointer, mouseBody) {
      const game = this.game;
      var bodies = game.physics.p2.hitTest(pointer.position);

      // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
      var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
      if (bodies.length) {
        var clickedBody = bodies[0];
        this.clickedBody = clickedBody.parent;
        this.clickedBody.mass = 1;

        var localPointInBody = [0, 0];
        // this function takes physicsPos and coverts it to the body's local coordinate system
        clickedBody.toLocalFrame(localPointInBody, physicsPos);

        // use a revoluteContraint to attach mouseBody to the clicked body
        this.mouseConstraint = game.physics.p2.createLockConstraint(mouseBody,  clickedBody);
      }
    }

    onUp () {
      if (typeof this.clickedBody !== 'undefined') {
        this.clickedBody.mass = 99999;
        this.clickedBody.setZeroVelocity();
        this.clickedBody.setZeroRotation();
        this.game.physics.p2.removeConstraint(this.mouseConstraint);
      }
    }

    move (pointer, mouseBody) {
      mouseBody.position[0] = this.game.physics.p2.pxmi(pointer.position.x);
      mouseBody.position[1] = this.game.physics.p2.pxmi(pointer.position.y);
    }
}

export default DraggableItem;
