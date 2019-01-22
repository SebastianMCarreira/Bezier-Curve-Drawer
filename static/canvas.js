var canvas = document.querySelector("canvas");
var showX = document.getElementById("xCoor");
var showY = document.getElementById("yCoor");
showX.value = null;
showY.value = null;

var pointList = [];

function getMouseCoords(event){
	var rect = canvas.getBoundingClientRect();
    return {x:parseInt(event.clientX - rect.left),y:parseInt(event.clientY - rect.top)};
}


document.addEventListener("DOMContentLoaded", function() {
    canvas.addEventListener("mousemove",function(e){
        var coord = getMouseCoords(e);
        showX.value = coord.x;
        showY.value = coord.y;
	});
	
	canvas.addEventListener("click", function(e){
		var coord = getMouseCoords(e);
		pointList.push(coord);
	});

	canvas.addEventListener("mouseleave", function(){
		showX.value = null;
		showY.value = null;
	});

	document.getElementById("resetList").addEventListener("click", function(){
		pointList = [];
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

