//reference
//coding challenge #27 fireworks
//https://thecodingtrain.com/CodingChallenges/027-fireworks.html

class Particle {
  constructor(x, y, hue, firework) {
    this.pos = createVector(x, y - 60);
    this.firework = firework;
    this.lifetime = 250;
    this.hue = hue;
    this.acc = createVector(0, 0); //accelerator
    //make particles go up
    if (this.firework) {
      this.vel = createVector(0, random(-15, -5));
    } else {
      this.vel = p5.Vector.random2D(); //go any random direction
      this.vel.mult(random(2, 10)); //random length, not 1
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    //show down every frame
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifetime -= 5;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  finished() {
    //remove particles if lifetime reaches 0
    if (this.lifetime < 0) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    colorMode(HSB); //hue saturation brightness

    if (!this.firework) {
      strokeWeight(2);
      stroke(this.hue, 255, 255, this.lifetime);
    } else {
      strokeWeight(4);
      stroke(this.hue, 255, 255);
    }

    point(this.pos.x, this.pos.y);
  }
}
