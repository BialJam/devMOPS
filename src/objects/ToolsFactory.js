import DraggableItem from './DraggableItem';

let game, collisionGroup, collidesWith, position, x;

const init = (_game, _collisionGroup, _collidesWith) => {
  game = _game;
  collisionGroup = _collisionGroup;
  collidesWith = _collidesWith;
  x = 80;
};

const addTool = (toolName) => {
  let toolToReturn;
  switch(toolName) {
    case 'belka0':
      toolToReturn = new DraggableItem(game, x, 530, collisionGroup, collidesWith, 0);
      break;
    case 'belka45':
      toolToReturn = new DraggableItem(game, x, 530, collisionGroup, collidesWith, 45);
      break;
    case 'belka90':
      toolToReturn = new DraggableItem(game, x, 530, collisionGroup, collidesWith, 90);
      break;
    case 'belka135':
      toolToReturn = new DraggableItem(game, x, 530, collisionGroup, collidesWith, 135);
      break;
    default:
      toolToReturn = new DraggableItem(game, x, 530, collisionGroup, collidesWith, 0);
  }

  game.add.existing(toolToReturn);
  toolToReturn.enablePhysics();
  x += 140;

  return toolToReturn;
};

const factory = {
  init,
  addTool
};

export default factory;
