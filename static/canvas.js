const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const showX = document.getElementById("xCoor");
const showY = document.getElementById("yCoor");
showX.value = null;
showY.value = null;

const seeLines = document.getElementById("seeLines");
const eraseCurve = document.getElementById("eraseCurve");

var pointList = [];
var curvePoints = [];

function getMouseCoords(event){
	var rect = canvas.getBoundingClientRect();
    return {x:parseInt(event.clientX - rect.left),y:parseInt(event.clientY - rect.top)};
}

	CanvasRenderingContext2D.prototype.drawPoint = function(x,y,size, color){
	x = parseInt(x);
	y = parseInt(y);
	
	size = (size===undefined) ? 5 : parseInt(size);
	color = color || "black";
	
	this.beginPath();
	this.strokeStyle = color;
	this.moveTo(x,y-size);
	this.lineTo(x,y+size);
	this.stroke();
	this.beginPath();
	this.moveTo(x-size,y);
	this.lineTo(x+size,y);
	this.stroke();	
}

CanvasRenderingContext2D.prototype.drawPoints = function(points,size){
	size = size || 5;
	points.forEach(point => {
		this.drawPoint(point.x,point.y,size);
	});
}


CanvasRenderingContext2D.prototype.drawLines = function(originalPoints){
	var points = originalPoints;
	this.beginPath();
	this.strokeStyle = "black";
	var first = points.shift();
	this.moveTo(first.x,first.y);
	points.forEach(point => {
		this.lineTo(point.x,point.y);
	});
	pointList.unshift(first);
	this.stroke();
}


CanvasRenderingContext2D.prototype.simpleLine = function(x1,y1,x2,y2){
	this.beginPath();
	this.strokeStyle = "black";
	this.moveTo(x1,y1);
	this.lineTo(x2,y2);
	this.stroke();
}


function newPoint(x,y){
	context.drawPoint(x,y);
	if(seeLines.checked && pointList.length > 0){
		var lastPoint = pointList.pop();
		context.simpleLine(lastPoint.x,lastPoint.y,x,y);
		pointList.push(lastPoint);
	}
	pointList.push({x:x,y:y});
}

function calculateVector(pointA, pointB, t){
	const origin = pointA;
	const direction = {x: pointB.x-pointA.x , y: pointB.y-pointA.y}
	return {x: origin.x + direction.x * t , y: origin.y + direction.y * t}
}

function calculateCurvePoint(points, t){
	if(points.length === 2){
		return calculateVector(points[0], points[1], t);
	}else{
		var newPoints = [];
		const lines = points.length - 1;
		for (let index = 0; index < lines; index++) {
			newPoints.push(calculateVector(points[index],points[index+1],t));
		}
		return calculateCurvePoint(newPoints,t);
	}
}


document.addEventListener("DOMContentLoaded", function() {

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 75;

	window.addEventListener("resize",function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight - 75;
		context.drawPoints(pointList);
		if(seeLines.checked){
			context.drawLines(pointList);
		}
		if(!eraseCurve.disabled){
			context.drawPoints(curvePoints,2);
		}
	});

	canvas.addEventListener("mouseenter",function(){
		showX.blur();
		showY.blur();
	});

    canvas.addEventListener("mousemove",function(e){
        var coord = getMouseCoords(e);
        showX.value = coord.x;
		showY.value = coord.y;
	});
	
	canvas.addEventListener("click", function(e){
		if(!eraseCurve.disabled){
			if(confirm("Do you wish to erase the current curve and set the new point or keep the curve and not set a point?")){

			}
		}
		var newCoord = getMouseCoords(e);
		newPoint(newCoord.x,newCoord.y);
	});

	canvas.addEventListener("mouseleave", function(){
		showX.value = null;
		showY.value = null;
	});

	document.getElementById("resetList").addEventListener("click", function(){
		pointList = [];
		curveDrawed = false;
		curvePoints = [];
		context.clearRect(0, 0, canvas.width, canvas.height);
	});

	document.getElementById("deletePoint").addEventListener("click", function(){
		if(pointList.length > 0){
			pointList.pop();
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawPoints(pointList);
			if(seeLines.checked){
				context.drawLines(pointList);
			}
		}else{
			alert("There are no points to delete.");
		}
	});

	document.getElementById("addPoint").addEventListener("click", function(){
		if(showX.value != "" && showY.value != ""){
			newPoint(showX.value,showY.value);
		}else{
			alert("Please input coordinates values for both axes.");
		}
	});

	seeLines.addEventListener("change", function(){
		if(this.checked){
			context.drawLines(pointList);
		}else{
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawPoints(pointList);
		}
	});

	document.getElementById("drawCurve").addEventListener("click", function(){
		if(pointList.length < 3){
			alert("Please, set at least three points to draw a curve");
		}else{
			const step = 1 / document.getElementById("definition").value;
			for (let t = 0; t <= 1 ; t+=step) {
				const curvePoint = calculateCurvePoint(pointList, t);
				context.drawPoint(curvePoint.x,curvePoint.y,2);
				curvePoints.push(curvePoint);
			}
			curveDrawed = true;
			eraseCurve.disabled = false;
		}
	});
});

