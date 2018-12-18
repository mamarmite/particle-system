'use strict';

export default class Vector2 {
  
  constructor (x, y) {
    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;
  }

  set (vector) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
  }

  setArray (arr) {
    this.x = arr[0];
    this.y = arr[1];
    return this;
  }

  setCoords (x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  clone () {
    return new Vector2(this.x, this.y);
  }

  get magnitude() {
    this._magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    return this._magnitude;
  }

  set magnitude(magnitude) {
    this.x = this.x * magnitude / this._magnitude;
    this.y = this.y * magnitude / this._magnitude;
    this._magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
  }

  direction (vector) {
    this._direction = Math.tan((this.x - vector.x) / (this.y - vector.y));
    return this._direction;
  }

  //make a getter and setter for direction to be able to round arround the clock//

  truncate(max) {
    let v = this.clone();
    if (v.magnitude > max) {
      v.magnitude = max;//normalize ?
    }
    return v;
  }

  normalize() {
    let v = this.clone();
    v.x = Math.abs(v.x);
    v.y = Math.abs(v.y);
    return v;
  }

  add(vector) {
    let v = this.clone();
    v.x += vector.x;
    v.y += vector.y;
    return v;
  }

  addNumber(number) {
    let v = this.clone();
    v.x += number;
    v.y += number;
    return v;
  }

  sub(vector) {
    let v = this.clone();
    v.x -= vector.x;
    v.y -= vector.y;
    return v;
  }

  subNumber(number) {
    let v = this.clone();
    v.x -= number;
    v.y -= number;
    return v;
  }

  scale (number) {
    let v = this.clone();
    v.mult(number);
    return v;
  }

  mult (number) {
    let v = this.clone();
    v.x *= number;
    v.y *= number;
    return v;
  }

  multVec (vector) {
    let v = this.clone();
    v.x *= vector.x;
    v.y *= vector.y;
    return v;
  }

  div (number) {
    let v = this.clone();
    v.x /= number;
    v.y /= number;
    return v;
  }

  divVec (vector) {
    let v = this.clone();
    v.x /= vector.x;
    v.y /= vector.y;
    return v;
  }

  invert() {
    let v = this.clone();
    v.mult(-1);
    return v;
  }

  invertX() {
    let v = this.clone();
    v.multVec(new Vector2(-1,1));
    return v;
  }

  invertY() {
    let v = this.clone();
    v.multVec(new Vector2(1,-1));
    return v;
  }

  dist (vector) {
    let dx = this.x - vector.x;
    let dy = this.y - vector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  draw(context, vector) {
    context.beginPath();
    context.moveTo(this.x,this.y);
    context.lineTo(300,150);
    context.stroke();
  }

  toString() {
    return "x: "+ this.x +" y: "+ this.y;
  }
}