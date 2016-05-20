/* jshint esversion: 6 */

import MoveableObject from 'objects/MoveableObject';
import DraggableItem from 'objects/DraggableItem';

class GameState extends Phaser.State {

    preload() {
        this.game.load.image('background', 'assets/background.png');
        this.game.load.image('item', 'assets/item.png');
        this.game.load.spritesheet('moveableObject', 'assets/spritesheet.png', 45, 45, 10);
    }

  create() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY };

        this.createToolbox();

        this.moveableObject = new MoveableObject(this.game, center.x, center.y);
        this.game.add.existing(this.moveableObject);
        this.game.physics.enable(this.moveableObject);
    }

    createToolbox() {
        const toolboxItem = new DraggableItem(this.game, 0, 0);
        this.game.add.existing(toolboxItem);
        this.item = toolboxItem;
    }

    update() {
      this.game.physics.arcade.collide(this.item, this.moveableObject);
    }

}

export default GameState;
