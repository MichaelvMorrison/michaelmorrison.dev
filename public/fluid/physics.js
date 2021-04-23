function IX(x, y){
  return x + y * N;
}

function setBnd(b, x){
  for(let i = 1; i < N - 1; i++) {
    x[IX(i, 0  )] = b == 2 ? -x[IX(i, 1  )] : x[IX(i, 1  )];
    x[IX(i, M-1)] = b == 2 ? -x[IX(i, M-2)] : x[IX(i, M-2)];
  }

  for(let j = 1; j < M - 1; j++) {
    x[IX(0  , j)] = b == 1 ? -x[IX(1  , j)] : x[IX(1  , j)];
    x[IX(N-1, j)] = b == 1 ? -x[IX(N-2, j)] : x[IX(N-2, j)];
  }
  
  x[IX(0  , 0  )] = 0.5 * (x[IX(1  , 0  )] + x[IX(0  , 1  )]);
  x[IX(0  , M-1)] = 0.5 * (x[IX(1  , M-1)] + x[IX(0  , M-2)]);
  x[IX(N-1, 0  )] = 0.5 * (x[IX(N-2, 0  )] + x[IX(N-1, 1  )]);
  x[IX(N-1, M-1)] = 0.5 * (x[IX(N-2, M-1)] + x[IX(N-1, M-2)]);
}

function linSolve(b, x, x0, a, c){
  cRecip = 1.0/c;
  for (let t = 0; t < ITER; t++){
    for (let j = 1; j < M - 1; j++){
      for (let i = 1; i < N - 1; i++){
        x[IX(i, j)] = 
          (x0[IX(i, j)]
            + a * (   x[IX(i + 1, j    )]
                    + x[IX(i - 1, j    )] 
                    + x[IX(i    , j + 1)]
                    + x[IX(i    , j - 1)]
                  )
          ) * cRecip;
      }
    }
    setBnd(b, x);
  }
}

function diffuse(b, x, x0, diff, dt){
  let a = dt * diff * (N - 2) * (M - 2);
  linSolve(b, x, x0, a, 1 + 6 * a);
}

function project(velocX, velocY, p, div){
  for (var j = 1; j < M - 1; j++) {
    for (var i = 1; i < N - 1; i++) {
      div[IX(i, j)] = -0.5*(
          velocX[IX(i + 1, j    )]
        - velocX[IX(i - 1, j    )]
        + velocY[IX(i    , j + 1)]
        - velocY[IX(i    , j - 1)]
      )/N;
      p[IX(i, j)] = 0;
    }
  }

  setBnd(0, div); 
  setBnd(0, p);
  linSolve(0, p, div, 1, 6);
  
  for (let j = 1; j < M - 1; j++) {
    for (let i = 1; i < N - 1; i++) {
      velocX[IX(i, j)] -= 0.5 * (p[IX(i + 1, j    )] - p[IX(i - 1, j    )]) * N;
      velocY[IX(i, j)] -= 0.5 * (p[IX(i    , j + 1)] - p[IX(i    , j - 1)]) * M;
    }
  }

  setBnd(1, velocX);
  setBnd(2, velocY);
}

function advect(b, d, d0, velocX, velocY, dt) {
  let i0, i1, j0, j1;

  let dtx = dt * (N - 2);
  let dty = dt * (M - 2);

  let s0, s1, t0, t1;
  let tmp1, tmp2, x, y;

  let Nfloat = N - 2;
  let Mfloat = M - 2;
  let ifloat, jfloat;
  let i, j;

  for (j = 1, jfloat = 1; j < M - 1; j++, jfloat++) {
    for (i = 1, ifloat = 1; i < N - 1; i++, ifloat++) {
      tmp1 = dtx * velocX[IX(i, j)];
      tmp2 = dty * velocY[IX(i, j)];
      x = ifloat - tmp1;
      y = jfloat - tmp2;

      if (x < 0.5) x = 0.5;
      if (x > Nfloat + 0.5) x = Nfloat + 0.5;
      i0 = Math.floor(x);
      i1 = i0 + 1.0;
      if (y < 0.5) y = 0.5;
      if (y > Mfloat + 0.5) y = Mfloat + 0.5;
      j0 = Math.floor(y);
      j1 = j0 + 1.0;

      s1 = x - i0;
      s0 = 1.0 - s1;
      t1 = y - j0;
      t0 = 1.0 - t1;

      let i0i = parseInt(i0);
      let i1i = parseInt(i1);
      let j0i = parseInt(j0);
      let j1i = parseInt(j1);

      d[IX(i, j)] =
        s0 * (t0 * d0[IX(i0i, j0i)] + t1 * d0[IX(i0i, j1i)]) +
        s1 * (t0 * d0[IX(i1i, j0i)] + t1 * d0[IX(i1i, j1i)]);
    }
  }

  setBnd(b, d);
}