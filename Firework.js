//reference
//coding challenge #27 fireworks
//https://thecodingtrain.com/CodingChallenges/027-fireworks.html

class Firework {
  constructor() {
    this.hue = random(255);
    this.firework = new Particle(random(width), height, this.hue, true);
    this.exploded = false;
    this.particles = [];
  }

  finished() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      //particles go up in negative velocity. If it reaches 0, make it explode
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }
  //Make 200 new particles when a particle reaches to the top y=0
  explode() {
    for (let i = 0; i < 200; i++) {
      let p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        this.hue,
        false
      );
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
