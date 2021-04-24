class Fluid {
  constructor(dt, diffusion, viscosity){
    this.size = N;
    this.dt = dt;
    this.diff = diffusion;
    this.visc = viscosity;

    this.s = new Array(N * M).fill(0);
    this.density = new Array(N * M).fill(0);

    this.Vx = new Array(N * M).fill(0);
    this.Vy = new Array(N * M).fill(0);

    this.Vx0 = new Array(N * M).fill(0);
    this.Vy0 = new Array(N * M).fill(0);
  }

  addDensity(x, y, amount){
    let index = IX(x, y);
    this.density[index] += amount;
  }

  addVelocity(x, y, amountX, amountY){
    let index = IX(x, y);
    this.Vx[index] += amountX;
    this.Vy[index] += amountY;
  }

  renderDensity(){
    noStroke();
    for (let i = 0; i < N; i++){
      for (let j = 0; j < M; j++){
        let x = i * SCALE;
        let y = j * SCALE;
        let d = this.density[IX(i,j)];
        colorMode(HSB);
        hue = parseInt((hue_offset + (t*50)) % 360);
        fill(hue, 100, d);
        rect(x, y, SCALE, SCALE);
      }
    }
  }

  step(){
    let visc    = this.visc;
    let diff    = this.diff;
    let dt      = this.dt;
    let Vx      = this.Vx;
    let Vy      = this.Vy;
    let Vx0     = this.Vx0;
    let Vy0     = this.Vy0;
    let s       = this.s;
    let density = this.density;
    
    diffuse(1, Vx0, Vx, visc, dt);
    diffuse(2, Vy0, Vy, visc, dt);
    
    project(Vx0, Vy0, Vx, Vy);
    
    advect(1, Vx, Vx0, Vx0, Vy0, dt);
    advect(2, Vy, Vy0, Vx0, Vy0, dt);
    
    project(Vx, Vy, Vx0, Vy0);
    
    diffuse(0, s, density, diff, dt);
    advect(0, density, s, Vx, Vy, dt);
  }
}

