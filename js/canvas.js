var controller, ronyboySettings, loop;
var screen = document.querySelector(".screen");
var floor = document.querySelector(".floor");
var floorHeight = floor.offsetHeight;
var ronyboy = document.querySelector(".ronyboy");

var gravity = 10;
var friction = 0.9;

ronyboySettings = {
  jumping: true,
  x_axis:0,
  y_axis:300,
  speed:3,
  position: ronyboy.getBoundingClientRect(),
  moveJump: ()=>{
    ronyboySettings.y_axis += 100;
    ronyboySettings.jumping = true;
  },
  moveRight: (speed) => {
    ronyboySettings.x_axis += speed;
  },
  moveLeft: (speed) => {
    ronyboySettings.x_axis -= speed;
  },
  dontEscape: () =>{
    console.log(ronyboySettings.x_axis);
    if(ronyboySettings.x_axis <= 0){
      ronyboySettings.x_axis = 0;
    }
  },
  floorTouch: () => {
    ronyboySettings.y_axis -= gravity;
    if(ronyboySettings.y_axis <= floorHeight){
      ronyboySettings.jumping = false;
      ronyboySettings.y_axis = floorHeight;
    }
  },
  exist: () => {
    ronyboy.style.bottom = ronyboySettings.y_axis + "px";
    ronyboy.style.left = ronyboySettings.x_axis + "px";
    ronyboySettings.floorTouch();
    ronyboySettings.dontEscape();
  }
};

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

  if (controller.left) {
    ronyboySettings.moveLeft(ronyboySettings.speed);
  }
  if (controller.right) {
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
