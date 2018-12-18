/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/particlesSystem/emitter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particle__ = __webpack_require__("./resources/assets/js/particlesSystem/particle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mouse__ = __webpack_require__("./resources/assets/js/particlesSystem/mouse.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vector2__ = __webpack_require__("./resources/assets/js/particlesSystem/vector2.js");


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var Emitter = function () {
  function Emitter(context, target) {
    _classCallCheck(this, Emitter);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.context = context;

    this.killed = false;
    this.radius = 15;

    //change that to rect.
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.baseSpeed = 1;
    this.maxSpeed = this.baseSpeed * 7 * Math.random();
    this.speed = this.baseSpeed;

    this.mass = 1.1;
    this.acceleration = 1 + Math.random() * .1;

    this.position = new __WEBPACK_IMPORTED_MODULE_2__vector2__["default"](target.x, target.y);

    this.velocity = new __WEBPACK_IMPORTED_MODULE_2__vector2__["default"](this.speed, this.speed);
    this.desiredVelocity = new __WEBPACK_IMPORTED_MODULE_2__vector2__["default"](this.speed, this.speed);

    this.target = new __WEBPACK_IMPORTED_MODULE_2__vector2__["default"](this.centerX, this.centerY);
    this.colorLimit = 0; //Math.round(Math.random() * 3);
    this.maxParticles = 50;
    this.particles = [];

    //style
    this.bgColor = 'rgba(255, 255, 255, .05)';
    this.init();
  }

  _createClass(Emitter, [{
    key: "init",
    value: function init() {
      this.emit();
    }
  }, {
    key: "emit",
    value: function emit() {

      for (var a = 1; a < this.maxParticles; a++) {
        var starter = {
          x: this.position.x,
          y: this.position.y,
          speed: Math.round(this.baseSpeed * Math.random() + 1),
          radius: Math.round(15 * Math.random() + 1),
          life: Math.round(100 * Math.random() + 1),
          //rad for direction.
          color: '#0f100f',
          colorLimit: this.colorLimit
        };
        this.createParticle(starter);
      }
    }
  }, {
    key: "createParticle",
    value: function createParticle(params) {
      var newP = new __WEBPACK_IMPORTED_MODULE_0__particle__["default"](params);
      newP.setRandomColor(this.colorLimit);
      this.particles.push(newP);
    }
  }, {
    key: "draw",
    value: function draw() {
      if (!this.killed) {
        this.context.beginPath();

        this.context.fillStyle = 'rgba(240,241,240,1)';
        this.context.strokeStyle = this.context.fillStyle;
        this.context.moveTo(this.position.x, this.position.y);
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
        this.context.fill();
        this.context.moveTo(this.position.x, this.position.y);
        this.h = 30;
        var drawVector = this.target.clone();
        this.context.lineTo(drawVector.x, drawVector.y);
        //this.context.lineTo(this.position.x, this.position.y+this.h);
        //this.context.lineTo(this.position.x + this.h/2, this.position.y);
        //this.context.closePath();
        //this.context.rotate(this.position.direction(this.target));
        //render as circle. @todo this a perfect case of inheritance :)
        //this.context.fill();
        this.context.stroke();
      }
    }
  }, {
    key: "update",
    value: function update(tick) {

      // Draw the particles
      var id = 0;
      this.particles.forEach(function (p) {

        //Reinit particle.
        if (tick % p.life <= 0) {

          p.initPosition({
            x: this.position.x,
            y: this.position.y,
            radius: Math.round(15 * Math.random() + 1),
            life: Math.round(100 * Math.random() + 1),
            speed: Math.round(this.baseSpeed * Math.random() + 1),
            velocity: this.velocity.invert(),
            colorLimit: this.colorLimit
          });
          //p.kill();
        }

        //p.velocity = p.velocity.addNumber(p.speed);
        p.velocity = p.velocity.mult(p.acceleration).div(p.mass).truncate(p.maxSpeed);
        p.position = p.position.add(p.velocity);

        //if (id == 0) console.log("sys: "+this.position.toString()+" pos: "+ p.position.toString() + " vel: "+ p.velocity.toString());

        //collisions
        /*if (p.x <= 0 || p.x >= this.width) {
          p.velocity = p.velocity.invertX().truncate(p.maxSpeed);
        }
        if (p.y <= 0 || p.y >= this.height) {
          p.velocity = p.velocity.invertY().truncate(p.maxSpeed);
        }*/

        p.alpha = (p.life - tick % p.life) / p.life;

        p.render(this.context);
        id++;
      }, this);

      this.draw();
      //console.log(this.velocity.toString() + " " + this.position.toString());
    }
  }]);

  return Emitter;
}();

/* harmony default export */ __webpack_exports__["a"] = (Emitter);

/***/ }),

/***/ "./resources/assets/js/particlesSystem/mouse.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector2__ = __webpack_require__("./resources/assets/js/particlesSystem/vector2.js");


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var MouseManager = function () {
    function MouseManager() {
        _classCallCheck(this, MouseManager);

        this.position = new __WEBPACK_IMPORTED_MODULE_0__vector2__["default"](0, 0);
        this.lastPosition = this.position;
    }

    _createClass(MouseManager, [{
        key: 'mousePos',
        value: function mousePos(element, event) {
            var rect = element.getBoundingClientRect();
            this.lastPosition = this.position;
            this.position = new __WEBPACK_IMPORTED_MODULE_0__vector2__["default"](event.clientX - rect.left, event.clientY - rect.top);
            return this.position;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return "x: " + this.position.x + " y: " + this.position.y;
        }
    }, {
        key: 'x',
        get: function get() {
            return this.position.x;
        }
    }, {
        key: 'y',
        get: function get() {
            return this.position.y;
        }
    }]);

    return MouseManager;
}();

/* harmony default export */ __webpack_exports__["a"] = (MouseManager);

/***/ }),

/***/ "./resources/assets/js/particlesSystem/particle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector2__ = __webpack_require__("./resources/assets/js/particlesSystem/vector2.js");


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Particle = function () {
  function Particle(params) {
    _classCallCheck(this, Particle);

    this.killed = false;

    this.position = new __WEBPACK_IMPORTED_MODULE_0__vector2__["default"](params.x, params.y);

    this.initX = params.x;
    this.initY = params.y;
    this.initSpeed = params.speed;
    this.speed = params.speed;
    this.maxSpeed = params.speed;
    this.radius = params.radius;
    this.spinFactor = 0.9;

    this.life = params.life;
    this.mass = 1.02;

    this.velocity = new __WEBPACK_IMPORTED_MODULE_0__vector2__["default"](params.speed, params.speed);

    this.color = params.color;
    this.colorLimit = params.colorLimit ? params.colorLimit : Math.round(Math.random() * 3);
    this.alpha = 1.0;
  }

  _createClass(Particle, [{
    key: 'setRandomColor',
    value: function setRandomColor() {
      var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

      this.colorLimit = limit;
      var cap = 100 - Math.round(25 * Math.random());
      var base = 100 + Math.round(25 * Math.random());
      switch (limit) {
        case 0:
          this._red = Math.round(cap * Math.random());
          this._green = base;
          this._blue = base;
          break;
        case 1:
          this._red = base;
          this._green = Math.round(cap * Math.random());
          this._blue = base;
          break;
        case 2:
          this._red = base;
          this._green = base;
          this._blue = Math.round(cap * Math.random());
          break;
      }
    }
  }, {
    key: 'render',
    value: function render(context) {
      context.beginPath();

      context.fillStyle = 'rgba(' + this._red + ',' + this._green + ',' + this._blue + ',' + this.alpha + ')';
      this.move(context);

      //render as circle. @todo this a perfect case of inheritance :)
      this.circle(context);
      context.fill();
    }
  }, {
    key: 'move',
    value: function move(context) {
      context.moveTo(this.x, this.y);
    }
  }, {
    key: 'initPosition',
    value: function initPosition(params) {
      this.x = params.x;
      this.y = params.y;
      this.initX = params.x;
      this.initY = params.y;

      this.initSpeed = params.speed;
      this.speed = params.speed;
      this.maxSpeed = params.speed * .5;

      this.mass = 1.5;
      this.acceleration = 1 + Math.random();

      this.radius = params.radius;
      if (params.velocity) {

        params.velocity = params.velocity.mult(Math.random());
        this.velocity = params.velocity;
      } else {
        this.velocity = new __WEBPACK_IMPORTED_MODULE_0__vector2__["default"](Math.random() * params.speed, Math.random() * params.speed);
      }

      this.life = params.life;
      this.setRandomColor(this.colorLimit);
    }
  }, {
    key: 'circle',
    value: function circle(context) {
      if (!this.killed) {
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      }
    }
  }, {
    key: 'square',
    value: function square(context) {
      if (!this.killed) {
        context.rect(this.x, this.y, this.radius, this.radius);
        //context.stroke();
      }
    }
  }, {
    key: 'born',
    value: function born(context) {
      this.killed = false;
    }
  }, {
    key: 'kill',
    value: function kill(context) {
      this.killed = true;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return " x: " + this.x + " y: " + this.y + " speed: " + this.speed + " radius: " + this.radius + " dx: " + this.dx + " dy: " + this.dy + " direction: " + this.direction + " color: " + this.color;
    }
  }, {
    key: 'color',
    get: function get() {
      return this._color;
    },
    set: function set(hex) {
      this._color = hex;
      var bigint = parseInt(this._color, 16);
      this._red = bigint >> 16 & 255;
      this._green = bigint >> 8 & 255;
      this._blue = bigint & 255;
    }
  }, {
    key: 'x',
    get: function get() {
      return this.position.x;
    },
    set: function set(x) {
      this.position.x = x;
    }
  }, {
    key: 'y',
    get: function get() {
      return this.position.y;
    },
    set: function set(y) {
      this.position.y = y;
    }
  }, {
    key: 'direction',
    set: function set(direction) {
      this._direction = direction;
    },
    get: function get() {
      return this._direction;
      //this.position.direction();
    }
  }]);

  return Particle;
}();

/* harmony default export */ __webpack_exports__["default"] = (Particle);

/***/ }),

/***/ "./resources/assets/js/particlesSystem/particlesSystem.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticlesSystem", function() { return ParticlesSystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emitter__ = __webpack_require__("./resources/assets/js/particlesSystem/emitter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle__ = __webpack_require__("./resources/assets/js/particlesSystem/particle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mouse__ = __webpack_require__("./resources/assets/js/particlesSystem/mouse.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vector2__ = __webpack_require__("./resources/assets/js/particlesSystem/vector2.js");


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var ParticlesSystem = function () {
  function ParticlesSystem(element, FPS) {
    _classCallCheck(this, ParticlesSystem);

    this.width = window.innerWidth; //element.width;
    this.height = window.innerHeight; //element.height;

    //change that to rect.
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.position = new __WEBPACK_IMPORTED_MODULE_3__vector2__["default"](this.centerX, this.centerY);

    this.mouseMgr = new __WEBPACK_IMPORTED_MODULE_2__mouse__["a" /* default */]();
    this.mouseVelocity = new __WEBPACK_IMPORTED_MODULE_3__vector2__["default"](0, 0);

    this.FPS = FPS;
    this.target = new __WEBPACK_IMPORTED_MODULE_3__vector2__["default"](this.centerX, this.centerY);

    this.emitters = [];
    this.tick = 0;

    this.canvas = element;
    this.contact = null;

    this.interval = null;

    //style
    this.bgColor = 'rgba(255, 255, 255, .05)';
  }

  _createClass(ParticlesSystem, [{
    key: "init",
    value: function init() {

      if (this.canvas && this.canvas.getContext) {

        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.addEventListener("mousemove", this.tickMouse.bind(this));
        this.canvas.addEventListener("click", this.mouseClick.bind(this));
        this.addEmitter();

        //set the interval on window scope ? Or her as "absolute" scope ?
        //this.interval = setInterval(this.loop.bind(this), 1000 / this.FPS);
        this.loop();
      }
    }
  }, {
    key: "tickMouse",
    value: function tickMouse(e) {
      this.mouseMgr.mousePos(this.canvas, e);
      this.mouseVelocity = this.mouseMgr.position.sub(this.mouseMgr.lastPosition);
      this.target = new __WEBPACK_IMPORTED_MODULE_3__vector2__["default"](this.mouseMgr.x, this.mouseMgr.y);
      if (this.mouseVelocity.magnitude > 50) {
        //console.log("Stressed");
      }
    }
  }, {
    key: "mouseClick",
    value: function mouseClick(e) {
      this.addEmitter();
    }
  }, {
    key: "addEmitter",
    value: function addEmitter() {
      var newEmiter = new __WEBPACK_IMPORTED_MODULE_0__emitter__["a" /* default */](this.context, this.target);
      this.emitters.push(newEmiter);
      console.log(this.emitters.length);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "renderStage",
    value: function renderStage() {
      // Draw over the whole canvas to create the trail effect
      //this.context.fillStyle = this.bgColor;
      //this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.clear();
    }
  }, {
    key: "loop",
    value: function loop() {
      //this.update();

      this.renderStage();

      // update each emitters
      var id = 0;
      this.emitters.forEach(function (emitter) {

        emitter.target = this.target;

        emitter.desiredVelocity = emitter.target.sub(emitter.position);
        emitter.velocity = emitter.velocity.sub(emitter.desiredVelocity).mult(emitter.acceleration).div(emitter.mass).truncate(emitter.maxSpeed); //.mult(emitter.acceleration)
        emitter.position = emitter.position.sub(emitter.velocity);

        if (emitter.x <= 0 || emitter.x >= this.width) {
          emitter.velocity = emitter.velocity.invertX();
        }
        if (emitter.y <= 0 || emitter.y >= this.height) {
          emitter.velocity = emitter.velocity.invertY();
        }

        emitter.update(this.tick);
      }, this);
      //console.log(this.velocity.toString() + " " + this.position.toString());
      this.tick++;
      this.interval = window.requestAnimationFrame(this.loop.bind(this));
    }
  }]);

  return ParticlesSystem;
}();

document.addEventListener("DOMContentLoaded", function (event) {
  var stage = document.getElementById("logo");
  var logoSystem = new ParticlesSystem(stage, 120);
  logoSystem.init();
});

/***/ }),

/***/ "./resources/assets/js/particlesSystem/vector2.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = function () {
  function Vector2(x, y) {
    _classCallCheck(this, Vector2);

    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;
  }

  _createClass(Vector2, [{
    key: "set",
    value: function set(vector) {
      this.x = vector.x;
      this.y = vector.y;
      return this;
    }
  }, {
    key: "setArray",
    value: function setArray(arr) {
      this.x = arr[0];
      this.y = arr[1];
      return this;
    }
  }, {
    key: "setCoords",
    value: function setCoords(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vector2(this.x, this.y);
    }
  }, {
    key: "direction",
    value: function direction(vector) {
      this._direction = Math.tan((this.x - vector.x) / (this.y - vector.y));
      return this._direction;
    }

    //make a getter and setter for direction to be able to round arround the clock//

  }, {
    key: "truncate",
    value: function truncate(max) {
      var v = this.clone();
      if (v.magnitude > max) {
        v.magnitude = max; //normalize ?
      }
      return v;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var v = this.clone();
      v.x = Math.abs(v.x);
      v.y = Math.abs(v.y);
      return v;
    }
  }, {
    key: "add",
    value: function add(vector) {
      var v = this.clone();
      v.x += vector.x;
      v.y += vector.y;
      return v;
    }
  }, {
    key: "addNumber",
    value: function addNumber(number) {
      var v = this.clone();
      v.x += number;
      v.y += number;
      return v;
    }
  }, {
    key: "sub",
    value: function sub(vector) {
      var v = this.clone();
      v.x -= vector.x;
      v.y -= vector.y;
      return v;
    }
  }, {
    key: "subNumber",
    value: function subNumber(number) {
      var v = this.clone();
      v.x -= number;
      v.y -= number;
      return v;
    }
  }, {
    key: "scale",
    value: function scale(number) {
      var v = this.clone();
      v.mult(number);
      return v;
    }
  }, {
    key: "mult",
    value: function mult(number) {
      var v = this.clone();
      v.x *= number;
      v.y *= number;
      return v;
    }
  }, {
    key: "multVec",
    value: function multVec(vector) {
      var v = this.clone();
      v.x *= vector.x;
      v.y *= vector.y;
      return v;
    }
  }, {
    key: "div",
    value: function div(number) {
      var v = this.clone();
      v.x /= number;
      v.y /= number;
      return v;
    }
  }, {
    key: "divVec",
    value: function divVec(vector) {
      var v = this.clone();
      v.x /= vector.x;
      v.y /= vector.y;
      return v;
    }
  }, {
    key: "invert",
    value: function invert() {
      var v = this.clone();
      v.mult(-1);
      return v;
    }
  }, {
    key: "invertX",
    value: function invertX() {
      var v = this.clone();
      v.multVec(new Vector2(-1, 1));
      return v;
    }
  }, {
    key: "invertY",
    value: function invertY() {
      var v = this.clone();
      v.multVec(new Vector2(1, -1));
      return v;
    }
  }, {
    key: "dist",
    value: function dist(vector) {
      var dx = this.x - vector.x;
      var dy = this.y - vector.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }, {
    key: "draw",
    value: function draw(context, vector) {
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(300, 150);
      context.stroke();
    }
  }, {
    key: "toString",
    value: function toString() {
      return "x: " + this.x + " y: " + this.y;
    }
  }, {
    key: "magnitude",
    get: function get() {
      this._magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
      return this._magnitude;
    },
    set: function set(magnitude) {
      this.x = this.x * magnitude / this._magnitude;
      this.y = this.y * magnitude / this._magnitude;
      this._magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }]);

  return Vector2;
}();

/* harmony default export */ __webpack_exports__["default"] = (Vector2);

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/assets/js/particlesSystem/vector2.js");
__webpack_require__("./resources/assets/js/particlesSystem/particle.js");
module.exports = __webpack_require__("./resources/assets/js/particlesSystem/particlesSystem.js");


/***/ })

/******/ });