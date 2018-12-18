'use strict';

import Emitter from "./emitter";
import Particle from "./particle";
import MouseManager from "./mouse";
import Vector2 from './vector2';

export class ParticlesSystem {

  constructor(element, FPS) {
    this.width = window.innerWidth;//element.width;
    this.height = window.innerHeight;//element.height;

    //change that to rect.
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.position = new Vector2(this.centerX, this.centerY);

    this.mouseMgr = new MouseManager();
    this.mouseVelocity = new Vector2(0,0);

    this.FPS = FPS;
    this.target = new Vector2(this.centerX, this.centerY);

    this.emitters = [];
    this.tick = 0;

    this.canvas = element;
    this.contact = null;

    this.interval = null;

    //style
    this.bgColor = 'rgba(255, 255, 255, .05)';
  }

  init() {
    
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

  tickMouse(e) {
    this.mouseMgr.mousePos(this.canvas, e);
    this.mouseVelocity = this.mouseMgr.position.sub(this.mouseMgr.lastPosition);
    this.target = new Vector2(this.mouseMgr.x, this.mouseMgr.y);
    if (this.mouseVelocity.magnitude > 50) {
      //console.log("Stressed");
    }
  }

  mouseClick(e) {
    this.addEmitter();
  }

  addEmitter() {
    let newEmiter = new Emitter(this.context, this.target);
    this.emitters.push(newEmiter);
    console.log(this.emitters.length);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderStage() {
    // Draw over the whole canvas to create the trail effect
    //this.context.fillStyle = this.bgColor;
    //this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.clear();
  }

  loop() {
    //this.update();
    
    this.renderStage();

    // update each emitters
    let id = 0;
    this.emitters.forEach(function(emitter) {

      emitter.target = this.target;

      emitter.desiredVelocity = emitter.target.sub(emitter.position);
      emitter.velocity = emitter.velocity.sub(emitter.desiredVelocity).mult(emitter.acceleration).div(emitter.mass).truncate(emitter.maxSpeed);//.mult(emitter.acceleration)
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
    this.tick ++;
    this.interval = window.requestAnimationFrame(this.loop.bind(this));
  }

}


document.addEventListener("DOMContentLoaded", function(event) { 
  let stage = document.getElementById("logo");
  let logoSystem = new ParticlesSystem(stage, 120);
  logoSystem.init();
});