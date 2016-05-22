/**
 * Created by bartek on 22/05/16.
 */


class Levels {

  static getLevels() {
    return [{
      timeout: 50,
      teams: [
        {
          name: 'red',
          count: 3,
          posX: 100,
          posY: 400,
          rotation: 0,
          metaX: 125,
          metaY: 100
        },

        {
          name: 'green',
          count: 3,
          posX: 600,
          posY: 400,
          rotation: 0,
          metaX: 625,
          metaY: 100
        }]
    }, {
      timeout: 50,
      teams: [
        {
          name: 'red',
          count: 3,
          posX: 200,
          posY: 400,
          rotation: 0,
          metaX: 0,
          metaY: 100
        },

        {
          name: 'green',
          count: 3,
          posX: 400,
          posY: 400,
          rotation: 0,
          metaX: 800,
          metaY: 100
        }]
    }];
  }
}

export default Levels;
