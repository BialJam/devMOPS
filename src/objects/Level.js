/**
 * Created by bartek on 22/05/16.
 */


class Levels {

  static getLevels() {
    return [
      {
        ready: 10,
        timeout: 15,
        teams: [
          {
            name: 'red',
            count: 3,
            posX: 50,
            posY: 200,
            rotation: 90,
            metaX: 400,
            metaY: 400
          },

          {
            name: 'green',
            count: 3,
            posX: 700,
            posY: 200,
            rotation: 270,
            metaX: 400,
            metaY: 50
          }]
      },
      {
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
          }]
      },
      {
        ready: 10,
        timeout: 20,
        teams: [
          {
            name: 'red',
            count: 10,
            posX: 300,
            posY: 400,
            rotation: 0,
            metaX: 625,
            metaY: 150
          },

          {
            name: 'green',
            count: 3,
            posX: 600,
            posY: 400,
            rotation: 0,
            metaX: 125,
            metaY: 50
          }]
      },  {
        ready: 10,
        timeout: 20,
        teams: [
          {
            name: 'red',
            count: 10,
            posX: 50,
            posY: 400,
            rotation: 0,
            metaX: 625,
            metaY: 250
          },

          {
            name: 'green',
            count: 3,
            posX: 150,
            posY: 400,
            rotation: 0,
            metaX: 150,
            metaY: 250
          }]
      },{
        ready: 10,
        timeout: 20,
        teams: [
          {
            name: 'red',
            count: 10,
            posX: 750,
            posY: 360,
            rotation: 270,
            metaX: 750,
            metaY: 100
          },

          {
            name: 'green',
            count: 3,
            posX: 750,
            posY: 260,
            rotation: 270,
            metaX: 300,
            metaY: 50
          }]
      },
    ];
  }
}

export default Levels;
