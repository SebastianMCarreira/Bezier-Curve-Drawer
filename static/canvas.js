var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var showX = document.getElementById("xCoor");
var showY = document.getElementById("yCoor");
showX.value = null;
showY.value = null;

var pointList = [];

function getMouseCoords(event){
	var rect = canvas.getBoundingClientRect();
    return {x:parseInt(event.clientX - rect.left),y:parseInt(event.clientY - rect.top)};
}


function drawPoint(cntx, x, y, size){
	cntx.beginPath();
	cntx.moveTo(x,y-size);
	cntx.lineTo(x,y+size);
	cntx.stroke();
	cntx.beginPath();
	cntx.moveTo(x-size,y);
	cntx.lineTo(x+size,y);
	cntx.stroke();
}


document.addEventListener("DOMContentLoaded", function() {

	canvas.width = window.innerWidth * 0.999;
	canvas.height = window.innerHeight * 0.9;

    canvas.addEventListener("mousemove",function(e){
        var coord = getMouseCoords(e);
        showX.value = coord.x;
        showY.value = coord.y;
	});
	
	canvas.addEventListener("click", function(e){
		var coord = getMouseCoords(e);
		pointList.push(coord);
		drawPoint(context,coord.x,coord.y,5);
	});

	canvas.addEventListener("mouseleave", function(){
		showX.value = null;
		showY.value = null;
	});

	document.getElementById("resetList").addEventListener("click", function(){
		pointList = [];
		context.restore();
	});

	document.getElementById("deletePoint").addEventListener("click", function(){
		pointList.pop();
	});

	document.getElementById("addPoint").addEventListener("click", function(){
		if(showX.value !== null && showY.value !== null){
			pointList.push({x:showX.value,y:showY.value});
		}else{
			alert("Please input coordinates values for both axes.");
		}
	});
});

