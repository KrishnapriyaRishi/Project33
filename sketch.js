var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

//var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var score = 0;
var particle;
var turn = 0;
var gameState = "start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(
      new Divisions(k, height - divisionHeight / 2, 10, divisionHeight)
    );
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }
}

function draw() {
  background("purple");
  textSize(20);
  text("Score : " + score, 20, 30);

  fill("white");
  textSize(16);
  text("500", 20, 600);
  text("500", 100, 600);
  text("500", 180, 600);
  text("500", 260, 600);
  text("100", 350, 600);
  text("100", 420, 600);
  text("100", 510, 600);
  text("200", 590, 600);
  text("200", 670, 600);
  text("200", 750, 600);

  Engine.update(engine);

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  /*if (frameCount % 60 === 0) {
    particles.push(
      new Particle(random(width / 2 - 30, width / 2 + 30), 10, 10)
    );
    score++;
  }*/

  /*for (var j = 0; j < particles.length; j++) {
    particles[j].display();
  }
  */

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if (particle != null) {
    particle.display();

    if (particle.body.position.y > 760) {
      if (particle.body.position.x < 300) {
        score = score + 500;
        particle = null;
        if (turn >= 5) {
          gameState = "End";
        }
      } else if (
        particle.body.position.x > 301 &&
        particle.body.position.x < 600
      ) {
        score = score + 100;
        particle = null;
        if (turn >= 5) {
          gameState = "End";
        }
      } else if (
        particles.body.position.x > 601 &&
        particles.body.position.x < 900
      ) {
        score = score + 200;
        particle = null;
        if (turn >= 5) {
          gameState = "End";
        }
      } else {
        text("Error", 200, 400);
      }

      //particle = null;
    }
  }

  if (turn >= 5 && gameState === "End") {
    textSize(30);
    fill("red");
    text("GAME OVER!..", 160, 300);
  }
}

function mousePressed() {
  if (gameState != "End") {
    turn++;

    particle = new Particle(mouseX, 10, 10, 10);
  }
}
