/* jshint esversion: 6 */

import RainbowText from 'objects/RainbowText';
import MoveableObject from 'objects/MoveableObject';
import DraggableItem from 'objects/DraggableItem';

class GameState extends Phaser.State {

	preload(){
		this.game.load.image('background', 'assets/background.png');
		this.game.load.image('item', 'assets/item.png');
    this.game.load.spritesheet('moveableObject', 'assets/spritesheet.png', 40, 40, 10);
	}

  create() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY };
    this._text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
    this._text.anchor.set(0.5);

    let object = new MoveableObject(this.game, center.x, center.y);
    this.game.add.existing(object);
    this.game.physics.enable(object);

	  this.item = this.game.add.sprite(0,0,'item');
	  this.item.inputEnabled = true;
	  this.item.input.enableDrag();
	  this.item.events.onDragStart.add(this.onDragStart, this);
	  this.item.events.onDragStop.add(this.onDragStop, this);

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

	onDragStart(item, pointer){
		console.log(pointer.x);
	}

	onDragStop(item, pointer){
		console.log(pointer.x);
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
