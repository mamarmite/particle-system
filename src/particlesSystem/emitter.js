'use strict';

import Particle from "./particle";
import MouseManager from "./mouse";
import Vector2 from './vector2';

export default class Emitter {

  constructor(context, target) {
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
    this.acceleration = 1 + Math.random()*.1;

    this.position = new Vector2(target.x, target.y);

    this.velocity = new Vector2(this.speed,this.speed);
    this.desiredVelocity = new Vector2(this.speed,this.speed);

    this.target = new Vector2(this.centerX, this.centerY);
    this.colorLimit = 0;//Math.round(Math.random() * 3);
    this.maxParticles = 50;
    this.particles = [];

    //style
    this.bgColor = 'rgba(255, 255, 255, .05)';
    this.init();
  }

  init() {
    this.emit();
  }

  emit() {

    for (let a = 1; a < this.maxParticles; a++) {
      let starter = {
        x: this.position.x,
        y: this.position.y,
        speed: Math.round(this.baseSpeed * Math.random() + 1),
        radius: Math.round(15 * Math.random() + 1),
        life: Math.round(100 * Math.random() + 1),
        //rad for direction.
        color: '#0f100f',
          colorLimit: this.colorLimit
      }
      this.createParticle(starter);
    }
  }

  createParticle(params) {
    let newP = new Particle(params);
    newP.setRandomColor(this.colorLimit);
    this.particles.push(newP);
  }

  draw() {
    if (!this.killed) {
      this.context.beginPath();

      this.context.fillStyle = 'rgba(240,241,240,1)';
      this.context.strokeStyle = this.context.fillStyle;
      this.context.moveTo(this.position.x, this.position.y);
      this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
      this.context.fill();
      this.context.moveTo(this.position.x, this.position.y);
      this.h = 30;
      let drawVector = this.target.clone();
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

  update(tick) {


    // Draw the particles
    let id = 0;
    this.particles.forEach(function(p) {

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
      
      p.alpha = (p.life - (tick % p.life)) / p.life;
      
      p.render(this.context);
      id++;

    }, this);

    this.draw();
    //console.log(this.velocity.toString() + " " + this.position.toString());
  }

}