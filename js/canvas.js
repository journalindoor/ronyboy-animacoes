var controller, ronyboySettings, loop;
var screen = document.querySelector(".screen");
var floor = document.querySelector(".floor");
var floorHeight = floor.offsetHeight;
var ronyboy = document.querySelector(".ronyboy");

var gravity = 10;
var friction = 0.9;

ronyboySettings = {
  jumping: true,
  x_axis: 0,
  y_axis: 300,
  speed: 3,
  position: ronyboy.getBoundingClientRect(),
  moveJump: () => {
    ronyboySettings.y_axis += gravity;
    if (ronyboySettings.y_axis >= 200) {
      ronyboySettings.jumping = true;
    }
  },
  moveRight: (speed) => {
    ronyboySettings.x_axis += speed;
  },
  moveLeft: (speed) => {
    ronyboySettings.x_axis -= speed;
  },
  dontEscape: () => {
    if (ronyboySettings.x_axis <= 0) {
      ronyboySettings.x_axis = 0;
    }
  },
  collision: () => {

    var walls = document.querySelector(".wall");
    var wallsTouch = walls.getBoundingClientRect();
    // console.log(wallsrect.x, wallsrect.y, wallsrect.height, wallsrect.width);


    var ronyTouch = ronyboy.getBoundingClientRect();
    // console.log(rect.x, rect.y, rect.height, rect.width);

    if (ronyTouch.x < wallsTouch.x + wallsTouch.width &&
      ronyTouch.x + ronyTouch.width > wallsTouch.x &&
      ronyTouch.y < wallsTouch.y + wallsTouch.height &&
      ronyTouch.y + ronyTouch.height > wallsTouch.y) {
      ronyboySettings.jumping = false;
      ronyboySettings.y_axis = wallsTouch.height + floorHeight - ronyboySettings.speed;
    }

  },
  floorTouch: () => {
    ronyboySettings.y_axis -= gravity;
    if (ronyboySettings.y_axis <= floorHeight) {
      ronyboySettings.jumping = false;
      ronyboySettings.y_axis = floorHeight;
    }
  },
  exist: () => {
    ronyboy.style.bottom = ronyboySettings.y_axis + "px";
    ronyboy.style.left = ronyboySettings.x_axis + "px";
    ronyboySettings.floorTouch();
    ronyboySettings.dontEscape();
    ronyboySettings.collision();
  }
};

wallSettings = {
  createWall: (wallName, wallWidth, wallHeight, wallY, wallX) => {
    var wall = document.createElement('div');
    wall.classList.add('wall', wallName);
    wall.style.width = wallWidth + "px";
    wall.style.height = wallHeight + "px";
    wall.style.bottom = wallY + "px";
    wall.style.left = wallX + "px";
    screen.appendChild(wall);
  }
}


controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function (event) {
    var key_state = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 37:
        controller.left = key_state;
        break;
      case 38:
        controller.up = key_state;
        break;
      case 39:
        controller.right = key_state;
        break;
    }
  },
};

loop = () => {
  if (controller.up && ronyboySettings.jumping == false) {
    ronyboySettings.moveJump(20);
  }
  if (controller.left && !ronyboySettings.collision()) {
    ronyboySettings.moveLeft(ronyboySettings.speed);
  }
  if (controller.right && !ronyboySettings.collision()) {
    ronyboySettings.moveRight(ronyboySettings.speed);
  }
  if (controller.up && ronyboySettings.jumping == false) {
    ronyboySettings.moveJump();
  }

  ronyboySettings.exist();
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

wallSettings.createWall('vermelha', 150, 100, floorHeight, 600);
wallSettings.createWall('verde', 150, 80, floorHeight, 300);