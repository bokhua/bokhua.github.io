var filechoose = null;
$(document).ready(function(){
	filechoose = $('#file-choose');
	filechoose.change(function(){
		if(filechoose.length>0 && filechoose[0].files.length>0){
			showFileName(filechoose[0].files[0]);
		}
	});
});
function showFileName(file){
	$('#file-notif').addClass('btn').html(file.name);
}
var node = document.getElementById("file");

function downloadURI(uri, name){
	var link = document.createElement("a");
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}
function encryptFile(){
	if(node.files.length > 0){
		var file = node.files[0];
		var reader = new FileReader();
		reader.onload = function(){
			var origin = reader.result.split(";base64,");
			var data = btoa(sjcl.encrypt("P@ssw0rd", origin[1]));
			downloadURI(origin[0] + ";base64," + data, file.name);
		};
		reader.readAsDataURL(file);
	}else{
		console.log("no file chosen");
	}
}
function decryptFile(){
	if(node.files.length > 0){
		var file = node.files[0];
		var reader = new FileReader();
		reader.onload = function(){
			var origin = reader.result.split(";base64,");
			var data = sjcl.decrypt("P@ssw0rd", atob(origin[1]));
			downloadURI(origin[0] + ";base64," + data, file.name);
		};
		reader.readAsDataURL(file);
	}else{
		console.log("no file chosen");
	}
}