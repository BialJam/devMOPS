/**
 * Created by bartek on 22/05/16.
 */


class Levels {

  static getLevels() {
    return [{
      teams: [
        {
          name: 'red',
          count: 3,
          posX: 200,
          posY: 400,
          rotation: 0,
          metaX: 400,
          metaY: 200
        },

        {
          name: 'green',
          count: 3,
          posX: 100,
          posY: 200,
          rotation: 90,
          metaX: 700,
          metaY: 400
        }]
    }];
  }
}

export default Levels;