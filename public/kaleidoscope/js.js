var pattern_W, pattern_H;
var ctx, _ctx, _ctx_R, pattern, pattern_R, base, img, img_R;
var offset = 0;
var max_W = 250;
var scale = 1;

function getScale() {
  base = $("#img")[0];
  if (base.naturalWidth > max_W) {
    scale = 1 / (base.naturalWidth / max_W);
  }
}

function createImg() {
  img = document.createElement("canvas");
  img.width = base.naturalWidth * scale;
  img.height = base.naturalHeight * scale;
  _ctx = img.getContext("2d");
  _ctx.drawImage(base, 0, 0, base.width * scale, base.height * scale);

  img_R = document.createElement("canvas");
  img_R.width = base.naturalWidth * scale;
  img_R.height = base.naturalHeight * scale;
  _ctx_R = img_R.getContext("2d");
  _ctx_R.scale(-1, 1);
  _ctx_R.drawImage(
    base,
    -img_R.width,
    0,
    base.width * scale,
    base.height * scale
  );
}

function handleResize() {
  $(window).resize(function () {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.translate(-0.5 * pattern_W, 0);
  });

  // $(window).on("orientationchange", function() {
  //   ctx.canvas.width  = window.innerWidth;
  //   ctx.canvas.height = window.innerHeight;
  //   ctx.translate(-0.5*pattern_W, 0);
  // });
}

function setup() {
  pattern_W = base.naturalWidth * scale;
  pattern_H = (Math.sqrt(3) / 2) * pattern_W;

  var c = $("#c")[0];

  ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  pattern = ctx.createPattern(img, "repeat");
  pattern_R = ctx.createPattern(img_R, "repeat");

  ctx.translate(-0.5 * pattern_W, 0);
}

function draw(alternateMode) {
  offset = offset - 1;
  var i = 0;

  //draw kaleidoscope first row.
  ctx.save();
  ctx.fillStyle = pattern;
  ctx.translate(0, offset);
  while (i <= 3) {
    ctx.beginPath();
    ctx.moveTo(0, -offset);
    ctx.lineTo(pattern_W, -offset);
    ctx.lineTo(0.5 * pattern_W, pattern_H - offset);
    ctx.closePath();
    ctx.fill();
    if (i % 3 == 0) {
      ctx.translate(pattern_W, -offset);
      ctx.rotate((-120 * Math.PI) / 180);
      ctx.translate(-pattern_W, offset);
    } else if (i % 3 == 1) {
      if (alternateMode) {
        ctx.rotate((120 * Math.PI) / 180);
        ctx.translate(-3 * pattern_W, 0);
        ctx.rotate((-120 * Math.PI) / 180);
      }
      ctx.translate(0.5 * pattern_W, pattern_H - offset);
      ctx.rotate((-120 * Math.PI) / 180);
      ctx.translate(-0.5 * pattern_W, -pattern_H + offset);
    } else if (i % 3 == 2) {
      ctx.translate(0, -offset);
      ctx.rotate((-120 * Math.PI) / 180);
      ctx.translate(0, offset);
    }
    i++;
  }
  ctx.restore();
  ctx.save();
  ctx.scale(-1, -1);
  ctx.fillStyle = pattern_R;
  ctx.translate(
    (-i + (i % 3 == 0 ? 0.5 : i % 3 == 1 ? 1.5 : -0.5)) * pattern_W,
    -pattern_H + offset
  );
  ctx.translate(0, -offset);
  ctx.rotate((120 * Math.PI) / 180);
  ctx.translate(0, offset);
  var j = 0;
  while (j < i + 1) {
    ctx.beginPath();
    if (j > 0 || !alternateMode) {
      ctx.moveTo(0, -offset);
      ctx.lineTo(pattern_W, -offset);
      ctx.lineTo(0.5 * pattern_W, pattern_H - offset);
      ctx.closePath();
      ctx.fill();
    }
    if (j % 3 == 1) {
      ctx.translate(pattern_W, -offset);
      ctx.rotate((-120 * Math.PI) / 180);
      ctx.translate(-pattern_W, offset);
    } else if (j % 3 == 2) {
      ctx.translate(0.5 * pattern_W, pattern_H - offset);
      ctx.rotate((-120 * Math.PI) / 180);
      ctx.translate(-0.5 * pattern_W, -pattern_H + offset);
    } else if (j % 3 == 0) {
      ctx.translate(0, -offset);
      ctx.rotate((-120 * Math.PI) / 180);
      ctx.translate(0, offset);
    }
    j++;
  }
  ctx.restore();
}

function start() {
  window.setInterval(function () {
    draw(false);
    ctx.translate(1.5 * pattern_W, pattern_H);
    draw(true);
    ctx.translate(-1.5 * pattern_W, -pattern_H);
    tile();
  }, 50);
}

function tile() {
  var rowData = ctx.getImageData(
    0,
    0,
    pattern_W * 3,
    Math.floor(pattern_H * 2)
  );
  for (
    var i = 0;
    Math.floor(pattern_H * 2) * i < c.height + (Math.sqrt(3) / 2) * pattern_W;
    i++
  ) {
    for (var j = 0; j * pattern_W < c.width + pattern_W; j += 3) {
      ctx.putImageData(rowData, j * pattern_W, i * Math.floor(pattern_H * 2));
    }
  }
}

$(function () {
  getScale();
  createImg();

  handleResize();
  setup();
  start();
});
