    let imgs = [];
    let num = 15;
    let arrX = 25;
    let arrY = 25;

function preload() {

  for (let i = 0; i < num; i++) {
    imgs[i] = loadImage("./projects/2020/fname-lname/fname-lname-project.jpg");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
//   camera = createCamera(); 
}

function draw() {

  background(0,0,0);
// console.log(getGradient())
    // camera(width-frameCount, -20, 10, 45, 0, 0,20,0,0)
    camera((width - frameCount)-width/40, -20, (height/4), tan(PI/3), -180, 0, 0, 1, 1);
//   camera.move(2,0,0)
  orbitControl();
  push();
  translate(200, 0, -200);
  let n = 0;
  for (let j = 0; j < arrY; j++) {
    for (let i = 0; i < arrX; i++) {
      let x = map(i, 0, 10, -500, 500);
    //   console.log(mouseX);
      let y = map(j, 0, 10, -500, 500);
      let z = sin(frameCount + j*10 + i * 10)*2+10;
      push();
      translate(x, y,0);
      x = x-2
      texture(imgs[n]);
      plane(50, 50);
      n = (n + 1) % imgs.length;
      pop();
    }
  }
  pop();
}
