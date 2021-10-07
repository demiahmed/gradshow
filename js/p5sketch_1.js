let imgs = [];
let imgs_arr = [];
let num = 45;

function preload() {
  table = loadTable('assets/students.csv', 'csv', 'header')
  // console.log(table.getColumn('radius'));
  //     for (let i = 0; i < num; i++) {
  //   imgs[i] = loadImage("https://picsum.photos/300/300/?image=" + i);
  // }
}

function processCSV(csv) {
  let imgLinks = [];
  csv.getColumn('key').forEach((e,i) => {
    let link = `../projects/2020/${e}/${e}-project.jpg`
    // console.log(link);
    imgLinks[i] = loadImage(link)
  }); 
    return imgLinks
}

function setup() {
  let studentImages = processCSV(table)
  // console.log(studentImages);
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < num; i++) {
    let x = random(-width , width);
    let y = random(-height, height);
    let z = random(-width*5, width);
    // console.log(imgs[i]);
        let texture = new Type(studentImages[i], x, y, z)
        // let texture = new Type((width <767) ? imgs[i].resize(100,0) : imgs[i], x, y, z)
    imgs_arr.push(texture);
  }
}

function draw() {
  background(0,0,0);
  orbitControl();
  // console.log(camera());
  // camera(0,0,0,0,0,0,0,0,0)
  for (let i = 0; i < num; i++) {
    imgs_arr[i].update();
    imgs_arr[i].display();
  }
}

class Type {
  constructor(_img, _x, _y, _z) {
    this.img = _img;
    this.x = _x;
    this.y = _y;
    this.z = _z;
  }

  update() {
    this.z += 5;
    if(this.z > width/2){
        this.z = -width*5;
    }
  }
    

  display() {
    push();
    translate(this.x, this.y, this.z);
    texture(this.img)
    image(this.img, 50, 50);
    pop();
  }
}