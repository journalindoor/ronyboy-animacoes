var controller, ronyboySettings, loop;
var tela = document.querySelector(".tela");
var chao = document.querySelector(".chao");
var ronyboy = document.querySelector(".ronyboy");
var x_velocity = 0;

ronyboySettings = {

  moveRight: function(velocity){
    x_velocity += velocity;
    ronyboy.style.left = x_velocity + "px";
  },
  moveLeft: function(velocity){
    x_velocity -= velocity;
    ronyboy.style.left = x_velocity + "px";
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

loop = function () {
  
  if (controller.left) {
    ronyboySettings.moveLeft(10);
  }
  if (controller.right) {
    ronyboySettings.moveRight(10);
  }

  window.requestAnimationFrame(loop);
};


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
