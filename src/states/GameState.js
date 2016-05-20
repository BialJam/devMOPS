/* jshint esversion: 6 */

import MoveableObject from 'objects/MoveableObject';
import DraggableItem from 'objects/DraggableItem';

class GameState extends Phaser.State {

    preload() {
        this.game.load.image('background', 'assets/background.png');
        this.game.load.image('item', 'assets/item.png');
        this.game.load.spritesheet('moveableObject', 'assets/spritesheet.png', 40, 40, 10);
    }

  create() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY };

        this.createToolbox();

        let object = new MoveableObject(this.game, center.x, center.y);
        this.game.add.existing(object);
        this.game.physics.enable(object);
    }

    createToolbox() {
        const toolboxItem = new DraggableItem(this.game, 0, 0);
        this.game.add.existing(toolboxItem);
        this.item = toolboxItem;
    }

    update() {
    }


  createToolbox() {
      const toolboxItem = this.game.add.sprite(0, 0, 'item');
      toolboxItem.inputEnabled = true;
      toolboxItem.input.enableDrag();
      toolboxItem.events.onDragStart.add(this.onDragStart, this);
      toolboxItem.events.onDragStop.add(this.onDragStop, this);

      this.item = toolboxItem;
  }

}

export default GameState;
