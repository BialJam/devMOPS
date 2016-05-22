(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _GameState = require('states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

var _Level = require('objects/Level');

var _Level2 = _interopRequireDefault(_Level);

var _GameIntro = require('states/GameIntro');

var _GameIntro2 = _interopRequireDefault(_GameIntro);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /* jshint esversion: 6 */

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this, 800, 600, Phaser.AUTO, 'content', null));

    _this.state.add('Intro', _GameIntro2.default, false);
    _this.state.add('GameState', _GameState2.default, false);
    //this.startLevel(0, this.state);
    _this.state.start('Intro', true, true, {
      onStart: function onStart() {
        _this.startLevel(0, _this.state);
      }
    });
    return _this;
  }

  _createClass(Game, [{
    key: 'startLevel',
    value: function startLevel() {
      var _this2 = this;

      var currentLevel = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var stateManager = arguments[1];

      var data = {};
      var levels = _Level2.default.getLevels();

      data.level = levels[currentLevel];
      data.onWin = function () {
        currentLevel++;

        if (currentLevel >= levels.length) {
          window.alert('Gratuluje!');
          return;
        }

        _this2.startLevel(currentLevel, stateManager);
      };

      data.onFail = function () {
        _this2.startLevel(currentLevel, stateManager);
      };

      stateManager.start('GameState', true, true, data);
    }
  }]);

  return Game;
}(Phaser.Game);

new Game();

},{"objects/Level":6,"states/GameIntro":11,"states/GameState":12}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/* jshint esversion: 6 */

var GameLogic = function () {
  function GameLogic(win, fail) {
    _classCallCheck(this, GameLogic);

    this._playNum = 0;
    this._win = win;
    this._fail = fail;
  }

  _createClass(GameLogic, [{
    key: "registerMeta",
    value: function registerMeta(meta) {
      var self = this;
      meta.win = function (meta, walker) {
        self._playNum--;
        self.checkWinning();
        walker.sprite.destroyElement();
      };
      meta.fail = function (meta, walker) {
        self.fail();
      };
    }
  }, {
    key: "registerWalker",
    value: function registerWalker(walker) {
      var self = this;
      this._playNum++;
      walker.meetWrongTeam = function () {
        self.fail();
      };
    }
  }, {
    key: "checkWinning",
    value: function checkWinning() {
      if (this._playNum === 0) {
        if (this._win) {
          this._win();
        }
      }
    }
  }, {
    key: "fail",
    value: function fail() {
      if (this._fail) {
        this._fail();
      }
    }
  }]);

  return GameLogic;
}();

exports.default = GameLogic;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/* jshint esversion: 6 */

var GameTimer = function () {
  function GameTimer(phaserTimer, readySeconds, gameSeconds, tickCallback, timeoutCallback) {
    _classCallCheck(this, GameTimer);

    this._phaserTimer = phaserTimer;
    this._readySeconds = readySeconds;
    this._gameSeconds = gameSeconds;
    this._tickCallback = tickCallback;
    this._timeoutCallback = timeoutCallback;
  }

  _createClass(GameTimer, [{
    key: 'start',
    value: function start() {
      var secondsLeft = this._readySeconds;
      this._state = 'ready';
      var internalTickCallback = function internalTickCallback() {
        // put game logic here;
        secondsLeft--;
        if (secondsLeft === 0 && this._state === 'ready') {
          this._state = 'game';
          secondsLeft = this._gameSeconds;
        } else if (secondsLeft === 0 && this._state === 'game') {
          this.stop();
          return this._timeoutCallback();
        }
        this._tickCallback(this._state, secondsLeft);
      };
      this._phaserTimer.loop(Phaser.Timer.SECOND, internalTickCallback, this);
      this._phaserTimer.start();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._phaserTimer.removeAll();
    }
  }]);

  return GameTimer;
}();

exports.default = GameTimer;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/* jshint esversion: 6 */

var lastClickedBody = void 0,
    mouseConstraint = void 0;

var DraggableItem = function (_Phaser$Sprite) {
  _inherits(DraggableItem, _Phaser$Sprite);

  function DraggableItem(game, x, y, collisionGroup, collidesWith) {
    var initialRotation = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

    _classCallCheck(this, DraggableItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DraggableItem).call(this, game, x, y, 'item_rotated'));

    _this._collisionGroup = collisionGroup;
    _this.collidesWith = collidesWith;
    _this.draggable = true;
    _this.initialRotation = initialRotation;
    _this.angle = initialRotation;
    return _this;
  }

  _createClass(DraggableItem, [{
    key: 'enablePhysics',
    value: function enablePhysics() {
      this.game.physics.p2.enable(this);

      var body = this.body;
      body.mass = 99999;
      body.clearShapes();
      body.loadPolygon('belka', 'belka');
      body.setCollisionGroup(this._collisionGroup);
      body.angle = this.initialRotation;
      body.fixedRotation = true;

      this.inputEnabled = true;
      this.input.enableDrag();
      body.collides(this.collidesWith);
    }
  }], [{
    key: 'onDown',
    value: function onDown(pointer, mouseBody, game) {
      var bodies = game.physics.p2.hitTest(pointer.position);

      // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
      var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
      if (bodies.length) {
        var clickedBody = bodies[0];

        if (!clickedBody.parent.sprite.draggable) {
          return;
        }

        lastClickedBody = clickedBody.parent;
        lastClickedBody.mass = 1;

        var localPointInBody = [0, 0];
        // this function takes physicsPos and coverts it to the body's local coordinate system
        clickedBody.toLocalFrame(localPointInBody, physicsPos);

        // use a revoluteContraint to attach mouseBody to the clicked body
        mouseConstraint = game.physics.p2.createLockConstraint(mouseBody, clickedBody);
      }
    }
  }, {
    key: 'onUp',
    value: function onUp(game) {
      if (typeof lastClickedBody !== 'undefined') {

        lastClickedBody.mass = 99999;
        lastClickedBody.setZeroVelocity();
        lastClickedBody.setZeroRotation();
        game.physics.p2.removeConstraint(mouseConstraint);
      }
    }
  }, {
    key: 'move',
    value: function move(pointer, mouseBody, game) {
      mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
      mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);
    }
  }]);

  return DraggableItem;
}(Phaser.Sprite);

exports.default = DraggableItem;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}(); /* jshint esversion: 6 */

var _MoveableObject = require('objects/MoveableObject');

var _MoveableObject2 = _interopRequireDefault(_MoveableObject);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Generator = function () {
  function Generator(game, x, y, ownCollisionGroup, collisionGroups, team, gameLogic, initialRotation, readyTime) {
    _classCallCheck(this, Generator);

    this.x = x;
    this.y = y;
    this.collisionGroups = collisionGroups;
    this.ownCollisionGroup = ownCollisionGroup;
    this.game = game;
    this.team = team;
    this.gameLogic = gameLogic;
    this.initialRotation = initialRotation;
    this.readyTime = readyTime * 1000;
  }

  _createClass(Generator, [{
    key: 'start',
    value: function start() {
      var _this = this;

      var team = this.team === 'red' ? 'start_red' : 'start_green';
      var arrow = new Phaser.Sprite(this.game, this.x, this.y, team);

      arrow.anchor.setTo(0.5, 0.5);
      arrow.angle = this.initialRotation;
      this.game.add.existing(arrow);

      var timer = this.game.time.events.add(this.readyTime, function () {
        console.log('its time');
        //arrow.destroy(true);
        _this.generatePersons();
      }, this);
      this.game.time.events.start();
    }
  }, {
    key: 'generatePersons',
    value: function generatePersons() {
      var _this2 = this;

      var count = 0;
      var total = 3;

      var timer = this.game.time.create(false);

      timer.loop(Phaser.Timer.SECOND, function () {
        if (count < total) {
          _this2.createPerson.call(_this2);
          count++;
        } else {
          _this2.game.time.events.remove(timer);
        }
      }, this);

      timer.start();
    }
  }, {
    key: 'createPerson',
    value: function createPerson() {
      var game = this.game;
      var item = new _MoveableObject2.default(game, this.x, this.y, this.ownCollisionGroup, this.team, this.initialRotation);
      this.gameLogic.registerWalker(item);
      game.add.existing(item);
      item.enablePhysics();
      item.body.collides(this.collisionGroups);
    }
  }]);

  return Generator;
}();

exports.default = Generator;

},{"objects/MoveableObject":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Created by bartek on 22/05/16.
 */

var Levels = function () {
  function Levels() {
    _classCallCheck(this, Levels);
  }

  _createClass(Levels, null, [{
    key: 'getLevels',
    value: function getLevels() {
      return [{
        ready: 10,
        timeout: 15,
        teams: [{
          name: 'red',
          count: 3,
          posX: 50,
          posY: 200,
          rotation: 90,
          metaX: 400,
          metaY: 400
        }, {
          name: 'green',
          count: 3,
          posX: 700,
          posY: 200,
          rotation: 270,
          metaX: 400,
          metaY: 50
        }]
      }, {
        ready: 10,
        timeout: 15,
        teams: [{
          name: 'red',
          count: 3,
          posX: 200,
          posY: 400,
          rotation: 0,
          metaX: 50,
          metaY: 100
        }, {
          name: 'green',
          count: 3,
          posX: 400,
          posY: 400,
          rotation: 0,
          metaX: 750,
          metaY: 100
        }]
      }, {
        ready: 10,
        timeout: 20,
        teams: [{
          name: 'red',
          count: 10,
          posX: 300,
          posY: 400,
          rotation: 0,
          metaX: 625,
          metaY: 150
        }, {
          name: 'green',
          count: 3,
          posX: 600,
          posY: 400,
          rotation: 0,
          metaX: 125,
          metaY: 50
        }]
      }, {
        ready: 10,
        timeout: 20,
        teams: [{
          name: 'red',
          count: 10,
          posX: 50,
          posY: 400,
          rotation: 0,
          metaX: 625,
          metaY: 250
        }, {
          name: 'green',
          count: 3,
          posX: 150,
          posY: 400,
          rotation: 0,
          metaX: 150,
          metaY: 250
        }]
      }, {
        ready: 10,
        timeout: 20,
        teams: [{
          name: 'red',
          count: 10,
          posX: 750,
          posY: 360,
          rotation: 270,
          metaX: 750,
          metaY: 100
        }, {
          name: 'green',
          count: 3,
          posX: 750,
          posY: 260,
          rotation: 270,
          metaX: 300,
          metaY: 50
        }]
      },
      //bartek
      {
        ready: 20,
        timeout: 25,
        teams: [{
          name: 'red',
          count: 10,
          posX: 50,
          posY: 400,
          rotation: 0,
          metaX: 625,
          metaY: 50
        }, {
          name: 'green',
          count: 3,
          posX: 625,
          posY: 400,
          rotation: 0,
          metaX: 150,
          metaY: 50
        }]
      }];
    }
  }]);

  return Levels;
}();

exports.default = Levels;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/* jshint esversion: 6 */
var _Phaser = Phaser;
var Sprite = _Phaser.Sprite;
var Point = _Phaser.Point;

var Meta = function (_Sprite) {
  _inherits(Meta, _Sprite);

  function Meta(game, x, y, collisionGroup, team, win, fail) {
    _classCallCheck(this, Meta);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Meta).call(this, game, x, y, 'meta_' + team));

    _this._collisionGroup = collisionGroup;
    _this._team = team;
    return _this;
  }

  _createClass(Meta, [{
    key: 'enablePhysics',
    value: function enablePhysics() {
      this.game.physics.p2.enable(this, false);
      var body = this.body;
      body.setCollisionGroup(this._collisionGroup);
      body.collides(this._collisionGroup, this.objectApproached);
      body.static = true;
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'objectApproached',
    value: function objectApproached(body, nextBody) {
      var team = body.sprite._team;
      if (body && nextBody && nextBody.sprite && nextBody.sprite.isMyTeam) {
        var secondSprite = nextBody.sprite;
        if (secondSprite && secondSprite.isMyTeam && secondSprite.isMyTeam(team)) {
          if (body.sprite.win && secondSprite.markTouched()) {
            body.sprite.win(body, nextBody, team);
          }
        } else {
          if (body.sprite.fail) {
            body.sprite.fail(body, nextBody, team);
          }
        }
      }
    }
  }]);

  return Meta;
}(Sprite);

exports.default = Meta;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/* jshint esversion: 6 */
var _Phaser = Phaser;
var Sprite = _Phaser.Sprite;

var MoveableObject = function (_Sprite) {
  _inherits(MoveableObject, _Sprite);

  function MoveableObject(game, x, y, collisionGroup, team) {
    var initialRotation = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

    _classCallCheck(this, MoveableObject);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MoveableObject).call(this, game, x, y, 'moveableObject_' + team));

    _this._collisionGroup = collisionGroup;
    _this._team = team;
    _this.touched = false;
    _this.initialRotation = initialRotation;
    return _this;
  }

  _createClass(MoveableObject, [{
    key: 'enablePhysics',
    value: function enablePhysics() {
      this.game.physics.p2.enable(this);
      var body = this.body;

      body.setCircle(10);
      body.setCollisionGroup(this._collisionGroup);
      body.setZeroDamping();
      body.fixedRotation = false;
      this.angle = 0;
      enableAnimation(this);

      var speed = 100;
      var initialRotation = this.initialRotation;
      body.velocity.x = speed * Math.sin(this.toRadians(initialRotation));
      body.velocity.y = -speed * Math.cos(this.toRadians(initialRotation));

      this.scale.setTo(0.5);

      body.collides(this._collisionGroup, this.objectApproached);
    }
  }, {
    key: 'toRadians',
    value: function toRadians(angle) {
      return angle * (Math.PI / 180);
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      var body = this.body;

      if (this._remove) {
        this.game.physics.p2.getConstraints().filter(function (e) {
          return e.bodyA.parent === body || e.bodyB.parent === body;
        }).forEach(function (e) {
          _this2.game.physics.p2.removeConstraint(e);
        });
        this.game.physics.p2.removeBody(body);
        this.destroy();
      }

      body.damping = 0;
      body.angularDamping = 0;

      var angle = Math.atan2(body.velocity.y, body.velocity.x);
      body.angle = angle * 180 / Math.PI;
      body.angle += 90;
    }
  }, {
    key: 'destroyElement',
    value: function destroyElement() {
      this._remove = true;
    }
  }, {
    key: 'isMyTeam',
    value: function isMyTeam(team) {
      return this._team === team;
    }
  }, {
    key: 'markTouched',
    value: function markTouched() {
      if (this.touched) {
        return false;
      }
      this.touched = true;
      return true;
    }
  }, {
    key: 'objectApproached',
    value: function objectApproached(body, nextBody) {
      var sprite = body.sprite;
      var secondSprite = nextBody.sprite;
      if (sprite.meetWrongTeam && secondSprite.isMyTeam && !secondSprite.isMyTeam(sprite._team)) {
        sprite.meetWrongTeam();
      }
    }
  }]);

  return MoveableObject;
}(Sprite);

function enableAnimation(obj) {
  var animations = obj.animations;
  animations.add('walk');
  animations.play('walk', 10, true);
}

exports.default = MoveableObject;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/* jshint esversion: 6 */
var _Phaser = Phaser;
var Sprite = _Phaser.Sprite;
var Point = _Phaser.Point;

var Toolbox = function (_Sprite) {
  _inherits(Toolbox, _Sprite);

  function Toolbox(game, x, y, collidesWith, collisionGroup) {
    _classCallCheck(this, Toolbox);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Toolbox).call(this, game, x, y, 'toolbox'));

    _this._collisionGroup = collisionGroup;
    _this.collidesWith = collidesWith;
    return _this;
  }

  // const body = this.body;

  _createClass(Toolbox, [{
    key: 'enablePhysics',
    value: function enablePhysics() {
      this.game.physics.p2.enable(this);
      var body = this.body;
      body.collides(this.collidesWith);
      body.static = true;
      body.setCollisionGroup(this._collisionGroup);
      body.mass = 99999;
    }
  }, {
    key: 'update',
    value: function update() {}
  }]);

  return Toolbox;
}(Sprite);

exports.default = Toolbox;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DraggableItem = require('./DraggableItem');

var _DraggableItem2 = _interopRequireDefault(_DraggableItem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var game = void 0,
    collisionGroup = void 0,
    collidesWith = void 0,
    position = void 0,
    x = void 0;

var init = function init(_game, _collisionGroup, _collidesWith) {
  game = _game;
  collisionGroup = _collisionGroup;
  collidesWith = _collidesWith;
  x = 80;
};

var addTool = function addTool(toolName) {
  var toolToReturn = void 0;
  switch (toolName) {
    case 'belka0':
      toolToReturn = new _DraggableItem2.default(game, x, 530, collisionGroup, collidesWith, 0);
      break;
    case 'belka45':
      toolToReturn = new _DraggableItem2.default(game, x, 530, collisionGroup, collidesWith, 45);
      break;
    case 'belka90':
      toolToReturn = new _DraggableItem2.default(game, x, 530, collisionGroup, collidesWith, 90);
      break;
    case 'belka135':
      toolToReturn = new _DraggableItem2.default(game, x, 530, collisionGroup, collidesWith, 135);
      break;
    default:
      toolToReturn = new _DraggableItem2.default(game, x, 530, collisionGroup, collidesWith, 0);
  }

  game.add.existing(toolToReturn);
  toolToReturn.enablePhysics();
  x += 140;

  return toolToReturn;
};

var factory = {
  init: init,
  addTool: addTool
};

exports.default = factory;

},{"./DraggableItem":4}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameIntro = function (_Phaser$State) {
  _inherits(GameIntro, _Phaser$State);

  function GameIntro() {
    _classCallCheck(this, GameIntro);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameIntro).apply(this, arguments));
  }

  _createClass(GameIntro, [{
    key: 'preload',
    value: function preload() {
      this.game.load.image('splash', 'assets/splash.png');
      this.game.load.image('start', 'assets/start.png');
    }
  }, {
    key: 'init',
    value: function init(params) {
      this.params = params;
    }
  }, {
    key: 'create',
    value: function create() {
      var game = this.game;
      var params = this.params;
      var world = game.world;
      var center = getCenter(world);

      var splash = new Phaser.Sprite(game, center.x / 2 - 200, center.y / 2 - 150, 'splash');
      game.add.existing(splash);

      var start = new Phaser.Sprite(game, 400, 450, 'start');
      game.add.existing(start);

      start.inputEnabled = true;
      start.events.onInputDown.add(function () {
        params.onStart();
      }, this);
    }
  }]);

  return GameIntro;
}(Phaser.State);

function getCenter(_ref) {
  var centerX = _ref.centerX;
  var centerY = _ref.centerY;

  return { x: centerX, y: centerY };
}

exports.default = GameIntro;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _DraggableItem = require('objects/DraggableItem');

var _DraggableItem2 = _interopRequireDefault(_DraggableItem);

var _Meta = require('objects/Meta');

var _Meta2 = _interopRequireDefault(_Meta);

var _GameLogic = require('logic/GameLogic');

var _GameLogic2 = _interopRequireDefault(_GameLogic);

var _ToolsFactory = require('objects/ToolsFactory');

var _ToolsFactory2 = _interopRequireDefault(_ToolsFactory);

var _GameTimer = require('logic/GameTimer');

var _GameTimer2 = _interopRequireDefault(_GameTimer);

var _Generator = require('objects/Generator');

var _Generator2 = _interopRequireDefault(_Generator);

var _Toolbox = require('objects/Toolbox');

var _Toolbox2 = _interopRequireDefault(_Toolbox);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /* jshint esversion: 6 */

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'preload',
    value: function preload() {
      this.game.load.image('background', 'assets/background.png');
      this.game.load.image('item_rotated', 'assets/belka.png');
      this.game.load.image('toolbox', 'assets/toolbox.png');
      this.game.load.image('moveableObject_red', 'assets/ludzik_red.png');
      this.game.load.image('moveableObject_green', 'assets/ludzik_green.png');
      this.game.load.image('start_green', 'assets/start_green.png');
      this.game.load.image('start_red', 'assets/start_red.png');
      this.game.load.image('asphalt', 'assets/asphalt.png');
      this.game.load.image('restart', 'assets/restart.png');

      this.game.load.physics('belka', 'assets/belka.json');
      this.game.load.spritesheet('meta_red', 'assets/meta_red.png');
      this.game.load.spritesheet('meta_green', 'assets/meta_green.png');
    }
  }, {
    key: 'init',
    value: function init(params) {
      this.params = params;
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      var timeLeftText,
          self = this;
      var game = this.game;
      game.add.tileSprite(0, 0, 800, 600, 'asphalt');
      // game.stage.backgroundColor = "#3d424c";

      var params = this.params;
      this.lockedDown = false;

      var center = getCenter(game.world);
      var centerTextStyle = { font: "65px Monospaced", fill: "#aabbcc", align: "center" };
      var textStyle = { font: "30px Monospaced", fill: "#aabbcc", align: "right" };
      var timer = new _GameTimer2.default(game.time.create(false), this.params.level.ready, this.params.level.timeout, function (state, secondsLeft) {
        if (state === 'ready') {
          timeLeftText.setText('READY: ' + secondsLeft);
        } else {
          self.lockDown();
          timeLeftText.setText('HURRY: ' + secondsLeft);
        }
      }, function () {
        game.add.text(getCenter(game.world).x - 150, getCenter(game.world).y - 40, "Time is up!!!", centerTextStyle);
        game.physics.p2.paused = true;
        this.success = 'timeout';
        setTimeout(function () {
          return params.onFail();
        }, 1000);
      });
      var logic = new _GameLogic2.default(function () {
        game.add.text(getCenter(game.world).x - 150, getCenter(game.world).y - 40, "You WIN!", centerTextStyle);
        game.physics.p2.paused = true;
        this.success = 'win';
        setTimeout(function () {
          return params.onWin();
        }, 1000);
        timer.stop();
      }, function () {
        game.add.text(getCenter(game.world).x - 190, getCenter(game.world).y - 40, "You LOOSE!", centerTextStyle);
        game.physics.p2.paused = true;
        this.success = 'loose';
        setTimeout(function () {
          return params.onFail();
        }, 1000);
        timer.stop();
      });
      timer.start();
      // Physics enabled
      game.physics.p2 = null;
      game.physics.startSystem(Phaser.Physics.P2JS);
      game.physics.p2.setImpactEvents(true);
      game.physics.p2.restitution = 1;
      game.physics.p2.gravity.y = 0;
      game.physics.p2.gravity.x = 0;

      // text to counting time out!
      timeLeftText = game.add.text(getCenter(game.world).x + 250, getCenter(game.world).y - 300, "READY!", textStyle);

      var mainCollisionGroup = this.game.physics.p2.createCollisionGroup();
      var secondCollisionGroup = this.game.physics.p2.createCollisionGroup();
      var toolboxCollisionGroup = this.game.physics.p2.createCollisionGroup();
      game.physics.p2.updateBoundsCollisionGroup(true);

      game.physics.startSystem(Phaser.Physics.P2JS);

      var toolbox = new _Toolbox2.default(this.game, 400, 530, mainCollisionGroup, toolboxCollisionGroup);
      game.add.existing(toolbox);
      toolbox.enablePhysics();

      params.level.teams.forEach(function (team) {
        var meta = new _Meta2.default(_this2.game, team.metaX, team.metaY, mainCollisionGroup, team.name);
        game.add.existing(meta);
        meta.enablePhysics();
        logic.registerMeta(meta);

        var generator = new _Generator2.default(game, team.posX, team.posY, mainCollisionGroup, [mainCollisionGroup, secondCollisionGroup, toolboxCollisionGroup], team.name, logic, team.rotation, params.level.ready);
        generator.start();
      });

      _ToolsFactory2.default.init(game, secondCollisionGroup, [mainCollisionGroup]);
      _ToolsFactory2.default.addTool();
      _ToolsFactory2.default.addTool();
      //ToolsFactory.addTool('belka45');
      _ToolsFactory2.default.addTool('belka90');
      _ToolsFactory2.default.addTool('belka90');
      //ToolsFactory.addTool('belka135');

      this.mouseBody = new p2.Body();
      game.physics.p2.world.addBody(this.mouseBody);

      game.input.onDown.add(this.onDown, this);
      game.input.onUp.add(this.onUp, this);
      game.input.addMoveCallback(this.move, this);
      game.physics.p2.paused = false;

      this.setupRestart();
    }
  }, {
    key: 'setupRestart',
    value: function setupRestart() {
      var _this3 = this;

      var game = this.game;
      var params = this.params;

      var restart = new Phaser.Sprite(game, 600, 550, 'restart');
      game.add.existing(restart);

      restart.inputEnabled = true;
      restart.events.onInputDown.add(function () {
        params.onFail();
        _this3.game.time.events.removeAll();
        window.clear;
      }, this);
    }
  }, {
    key: 'onDown',
    value: function onDown(pointer) {
      if (!this.lockedDown) {
        _DraggableItem2.default.onDown(pointer, this.mouseBody, this.game);
      }
    }
  }, {
    key: 'onUp',
    value: function onUp() {
      _DraggableItem2.default.onUp(this.game);
    }
  }, {
    key: 'move',
    value: function move(pointer) {
      _DraggableItem2.default.move(pointer, this.mouseBody, this.game);
    }
  }, {
    key: 'createToolbox',
    value: function createToolbox(collisionGroup) {
      var center = getCenter(this.game.world);
      return new _DraggableItem2.default(this.game, center.x + 100, center.y, collisionGroup, 90);
    }
  }, {
    key: 'lockDown',
    value: function lockDown() {
      this.lockedDown = true;
    }
  }]);

  return GameState;
}(Phaser.State);

function getCenter(_ref) {
  var centerX = _ref.centerX;
  var centerY = _ref.centerY;

  return { x: centerX, y: centerY };
}

exports.default = GameState;

},{"logic/GameLogic":2,"logic/GameTimer":3,"objects/DraggableItem":4,"objects/Generator":5,"objects/Meta":7,"objects/Toolbox":9,"objects/ToolsFactory":10}]},{},[1])
//# sourceMappingURL=game.js.map
