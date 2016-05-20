/* jshint esversion: 6 */

import RainbowText from 'objects/RainbowText';
import MoveableObject from 'objects/MoveableObject';
import DraggableItem from 'objects/DraggableItem';

class GameState extends Phaser.State {

    preload() {
        this.game.load.image('background', 'assets/background.png');
        this.game.load.image('item', 'assets/item.png');
        this.game.load.image('moveableObject', 'assets/spritesheet.png');
    }

    create() {
        let center = {x: this.game.world.centerX, y: this.game.world.centerY};
        this._text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
        this._text.anchor.set(0.5);

        let object = new MoveableObject(this.game, center.x, center.y);
        this.game.add.existing(object);
        this.game.physics.enable(object);

        this.createToolbox();
    }

    createToolbox() {
        const toolboxItem = new DraggableItem(this.game, 0, 0);
        this.game.add.existing(toolboxItem);
        this.item = toolboxItem;
    }

    update() {
        this._text.x++;
        this._text.y--;
    }

    onDragStart(item, pointer) {
        console.log(pointer.x);
    }

    onDragStop(item, pointer) {
        console.log(pointer.x);
    }
}

export default GameState;
