var scl = 20
var score = 0

function setup() {
  canvas = createCanvas(600, 600);
  canvas.position(660, 240);
  frameRate(10)
  s = new Snake()
  pickLocation()
}


function pickLocation() {
  var cols = floor(width/scl)
  var rows = floor(height/scl)
  food = createVector(floor(random(cols)), floor(random(rows)))
  food.mult(scl)
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    if (s.getDir().x != 0) {
      if (s.getDir().y != 1) {
        s.dir(0, -1)
      }
    }
  }
  
  if (keyCode == DOWN_ARROW) {
      if (s.getDir().x != 0) {
        if (s.getDir() != -1) {
          s.dir(0, 1)
        }
      }  
  }
  
  if (keyCode == RIGHT_ARROW) {
    if (s.getDir().x != -1) {
      if (s.getDir.y != 0) {
        s.dir(1, 0)
      }
    }
  }
  
  if (keyCode == LEFT_ARROW) {
    if (s.getDir().x != 1) {
      if (s.getDir().y != 0) {
        s.dir(-1, 0)
      }
    }
  }
}

class Snake {
  constructor() {
    this.x = 0
    this.y = 0
    this.xSpeed = 0
    this.ySpeed = 0
    this.total = 0
    this.tail = []
  }
  
  update() {
    
    if (this.total == this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1]
      }
    }
    
    this.tail[this.total-1] = createVector(this.x, this.y)
    
    this.x = this.x + this.xSpeed*scl
    this.y = this.y + this.ySpeed*scl
     
  }
  
  show() {
    fill(255)
    console.log(this.tail.length)
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl)
    }
    rect(this.x, this.y, scl, scl)
  }
  
  getDir() {
    var a = createVector(this.xSpeed, this.ySpeed)
    return a
  }

  dir(x, y) {
    this.xSpeed = x
    this.ySpeed = y
  }
  
  eat(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y)
    if (d < 1) {
      this.total++
      return true
    } else {
      return false
    }
  }
  
  death() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i]
      var d = dist(this.x, this.y, pos.x, pos.y)
      if (d < 1) {
        return true
      }
    }
  }
}

function draw() {
  background(51);
  while (s.death()) {
    Text("Game Over", 300, 300)
  }
  
  if (s.eat(food)) {
    score++
    pickLocation()
  }
  
  s.update()
  s.show()
  fill(255, 0 ,100)
  rect(food.x, food.y, scl, scl)
}