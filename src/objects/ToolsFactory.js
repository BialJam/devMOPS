import DraggableItem from './DraggableItem';

let game, collisionGroup, collidesWith, position;

const init = (_game, _collisionGroup, _collidesWith) => {
  game = _game;
  collisionGroup = _collisionGroup;
  collidesWith = _collidesWith;
};

const addTool = (toolName) => {
  let toolToReturn;
  switch(toolName) {
    case 'belka90':
      toolToReturn = new DraggableItem(game, 100, 540, collisionGroup, collidesWith, 90);
    case 'belka45':
      toolToReturn = new DraggableItem(game, 100, 540, collisionGroup, collidesWith, 45);
    case 'belka0':
      toolToReturn = new DraggableItem(game, 100, 540, collisionGroup, collidesWith, 0);
    default:
      toolToReturn = new DraggableItem(game, 100, 540, collisionGroup, collidesWith, 90);
  }

  game.add.existing(toolToReturn);
  toolToReturn.enablePhysics();

  return toolToReturn;
};

const factory = {
  init,
  addTool
};

export default factory;
