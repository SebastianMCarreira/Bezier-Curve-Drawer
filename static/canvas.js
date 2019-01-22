var canvas = document.querySelector("canvas");
var showX = document.getElementById("xCoor");
var showY = document.getElementById("yCoor");




document.addEventListener("DOMContentLoaded", function() {
    canvas.addEventListener("mousemove",function(e){
        var rect = canvas.getBoundingClientRect();
        showX.value = parseInt(e.clientX - rect.left);
        showY.value = parseInt(e.clientY - rect.top);
    })
});

