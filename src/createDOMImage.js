export default function createDOMImage(src,onload){

	var img = document.createElement("img");
	img.src = src
	img.onload = function(){
		onload(img);
	}
	
}
