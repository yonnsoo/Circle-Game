let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
window.addEventListener('load', ()=>{
  document.addEventListener('mousemove', getPosition);
});
let score = 0;
let highscore = 0;

class Circle {
  constructor(xx, yy, rr, xxx, yyy) {
    this.x = xx;
    this.y = yy;
    this.r = rr;
    this.dx = (xxx-xx)/(Math.random()*100+400.0+rr*4);
    this.dy = (yyy-yy)/(Math.random()*100+400.0+rr*4);
    let letters = '0123456789ABCDEF';
    let colorr = '#';
    for (let i = 0; i < 6; i++) {
      colorr += letters[Math.floor(Math.random() * 16)];
    }
    this.color = colorr;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.stroke();
  }

}

function create() {
  let c = new Circle();
  let x = Math.random();
  let rrr = Math.max(Math.random()*p.r*2.5, p.r/2);
  if(x < 0.25) {
    c = new Circle(Math.random()*700, -rrr, rrr, Math.random()*200+250, Math.random()*200+250);
  } else if(x < 0.5) {
    c = new Circle(Math.random()*700, 700+rrr, rrr, Math.random()*200+250, Math.random()*200+250);
  } else if(x < 0.75) {
    c = new Circle(-rrr, Math.random()*700, rrr, Math.random()*200+250, Math.random()*200+250);
  } else {
    c = new Circle(700+rrr, Math.random()*700, rrr, Math.random()*200+250, Math.random()*200+250);
  }
  return c;
}

class Player {
  constructor(xx, yy, rr) {
    this.x = xx;
    this.y = yy;
    this.r = rr;
    let letters = '0123456789ABCDEF';
    let colorr = '#';
    for (let i = 0; i < 6; i++) {
      colorr += letters[Math.floor(Math.random() * 16)];
    }
    this.color = colorr;
  }

  update(xx, yy) {
    this.x = xx;
    if(this.x - this.r < 0) this.x = this.r;
    if(this.x + this.r > canvas.height) this.x = canvas.height - this.r;
    
    this.y = yy;
    if(this.y - this.r < 0) this.y = this.r;
    if(this.y + this.r > canvas.width) this.y = canvas.width - this.r;
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.stroke();
  }

}

let coord = {x:canvas.height/2, y:canvas.width/2};
function getPosition(event){
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}
let p = new Player(coord.x, coord.y, 20);

let arr = [];
for(let i = 0; i < 20; i++) {
  arr.push(create());
}


setInterval (function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].x < -100 || arr[i].x > 800 || arr[i].y < -100 || arr[i].y > 800) {
      arr.splice(i, 1);
      i--;
      arr.push(create());
    } else if(Math.sqrt(Math.pow(p.x - arr[i].x, 2)+Math.pow(p.y - arr[i].y, 2))<(p.r+arr[i].r)) {
      if(p.r>arr[i].r){
        p.r+=0.5;
        arr.splice(i, 1);
        i--;
        arr.push(create());
        score++;
        document.getElementById("score").innerHTML = "Score: "+score;
      } else {
        arr = [];
        kill();
      }
    } else {
      arr[i].update();
    }
  }
  p.update(coord.x, coord.y);
}, 1);

let x = document.getElementById("button");

function kill() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  arr = [];
  highscore = Math.max(score, highscore);
  document.getElementById("highscore").innerHTML = "High Score: "+highscore;
}

function restart() {
  for(let i = 0; i < 20; i++) {
    arr.push(create());
  }
  score = 0;
  document.getElementById("score").innerHTML = "Score: "+score;
  p = new Player(coord.x, coord.y, 20);
}