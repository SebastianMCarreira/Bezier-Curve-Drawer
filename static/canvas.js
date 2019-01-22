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


function drawPoint(cntx, x, y, color,size){
	x = parseInt(x);
	y = parseInt(y);
	
	if(size === undefined){
		size = 5;
	}else{
		size = parseInt(size);
	}
	if(color === undefined){
		color = "black";
	}
	if(color === "white"){
		strokes = 5;
	}else{
		strokes = 1;
	}
	for (let index = 0; index < strokes; index++) {
		cntx.beginPath();
		cntx.strokeStyle = color;
		cntx.moveTo(x,y-size);
		cntx.lineTo(x,y+size);
		cntx.stroke();
		cntx.beginPath();
		cntx.moveTo(x-size,y);
		cntx.lineTo(x+size,y);
		cntx.stroke();
	}	
}


document.addEventListener("DOMContentLoaded", function() {

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 75;

	window.addEventListener("resize",function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight - 75;
	});


    canvas.addEventListener("mousemove",function(e){
        var coord = getMouseCoords(e);
        showX.value = coord.x;
        showY.value = coord.y;
	});
	
	canvas.addEventListener("click", function(e){
		var coord = getMouseCoords(e);
		pointList.push(coord);
		drawPoint(context,coord.x,coord.y);
	});

	canvas.addEventListener("mouseleave", function(){
		showX.value = null;
		showY.value = null;
	});

	document.getElementById("resetList").addEventListener("click", function(){
		pointList = [];
		context.clearRect(0, 0, canvas.width, canvas.height);
	});

	document.getElementById("deletePoint").addEventListener("click", function(){
		var lastPoint = pointList.pop();
		drawPoint(context,lastPoint.x,lastPoint.y,"white");
	});

	document.getElementById("addPoint").addEventListener("click", function(){
		if(showX.value != "" && showY.value != ""){
			pointList.push({x:showX.value,y:showY.value});
			drawPoint(context,showX.value,showY.value);
		}else{
			alert("Please input coordinates values for both axes.");
		}
	});
});

