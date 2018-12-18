'use strict';

import Vector2 from './vector2';

export default class Particle {

  constructor(params) {

    this.killed = false;

    this.position = new Vector2(params.x, params.y);
    
    this.initX = params.x;
    this.initY = params.y;
    this.initSpeed = params.speed;
    this.speed = params.speed;
    this.maxSpeed = params.speed;
    this.radius = params.radius;
    this.spinFactor = 0.9;

    this.life = params.life;
    this.mass = 1.02;

    this.velocity = new Vector2(params.speed, params.speed);

    this.color = params.color;
    this.colorLimit = params.colorLimit ? params.colorLimit : Math.round(Math.random() * 3);
    this.alpha = 1.0;
  }

  get color() {
    return this._color;
  }

  set color(hex) {
    this._color = hex;
    let bigint = parseInt(this._color, 16);
    this._red = (bigint >> 16) & 255;
    this._green = (bigint >> 8) & 255;
    this._blue = bigint & 255;
  }

  get x() {
    return this.position.x;
  }
  set x(x) {
    this.position.x = x;
  }

  get y() {
    return this.position.y;
  }
  set y(y) {
    this.position.y = y;
  }

  set direction(direction) {
    this._direction = direction;
  }

  get direction() {
    return this._direction;
    //this.position.direction();
  }

  setRandomColor(limit=2) {
    this.colorLimit = limit;
    let cap = 100 - Math.round(25 * Math.random());
    let base = 100 + Math.round(25 * Math.random());
    switch (limit) {
      case 0:
        this._red = Math.round(cap * Math.random());
        this._green = base;
        this._blue = base;
      break;
      case 1:
        this._red = base;
        this._green = Math.round(cap * Math.random())
        this._blue = base;
      break;
      case 2:
        this._red = base;
        this._green = base;
        this._blue = Math.round(cap * Math.random());
      break;
    }
  }

  render(context) {
    context.beginPath();

    context.fillStyle = 'rgba('+ this._red +','+ this._green +','+ this._blue +','+this.alpha+')';
    this.move(context);

    //render as circle. @todo this a perfect case of inheritance :)
    this.circle(context);
    context.fill();
  }

  move(context) {
    context.moveTo(this.x, this.y);
  }

  initPosition(params) {
    this.x = params.x;
    this.y = params.y;
    this.initX = params.x;
    this.initY = params.y;

    this.initSpeed = params.speed;
    this.speed = params.speed;
    this.maxSpeed = params.speed*.5;

    this.mass = 1.5;
    this.acceleration = 1+Math.random();

    this.radius = params.radius;
    if (params.velocity) {

      params.velocity = params.velocity.mult(Math.random());
      this.velocity = params.velocity;

    } else {
      this.velocity = new Vector2(Math.random()*params.speed, Math.random()*params.speed);
    }
    
    this.life = params.life;
    this.setRandomColor(this.colorLimit);
  }

  circle(context) {
    if (!this.killed) {
      context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    }
  }

  square(context) {
    if (!this.killed) {
      context.rect(this.x, this.y, this.radius, this.radius);
      //context.stroke();
    }
  }

  born(context) {
    this.killed = false;
  }

  kill(context) {
    this.killed = true;
  }

  toString() {
    return " x: "+this.x + " y: "+this.y + " speed: "+this.speed + " radius: "+this.radius + " dx: "+this.dx + " dy: "+this.dy + " direction: "+this.direction + " color: "+this.color;
  }

}