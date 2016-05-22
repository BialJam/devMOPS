/**
 * Created by bartek on 22/05/16.
 */


class Levels {

  static getLevels() {
    return [
        {
      ready: 3,
      timeout: 10,
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
      ready: 10, 
      timeout: 15,
      teams: [
        {
          name: 'red',
          count: 3,
          posX: 200,
          posY: 400,
          rotation: 0,
          metaX: 50,
          metaY: 100
        },

        {
          name: 'green',
          count: 3,
          posX: 400,
          posY: 400,
          rotation: 0,
          metaX: 750,
          metaY: 100
        }
      ]
    }, {
      ready: 10, 
      timeout: 15,
      teams: [
        {
          name: 'red',
          count: 3,
          posX: 300,
          posY: 200,
          rotation: 90,
          metaX: 50,
          metaY: 250
        },
        {
          name: 'green',
          count: 3,
          posX: 400,
          posY: 200,
          rotation: 270,
          metaX: 750,
          metaY: 250
        }]},];
  }
}

export default Levels;
