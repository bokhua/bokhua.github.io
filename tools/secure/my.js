$(document).ready(function(){
	var filechoose = $('#file-choose');
	filechoose.change(function(){
		if(filechoose.length>0 && filechoose[0].files.length>0){
			showNotif(filechoose[0].files[0].name);
			$('#file-password').show(300);
		}
	});

	var mask = $('#password-mask');
	mask.on('click', function(){
		if(mask[0].checked == true){
			$('#password').attr('type', 'text');
		}else{
			$('#password').attr('type', 'password');
		}
	});
});

function showNotif(msg){
	$('#file-notif').html('').hide();
	$('#file-notif').html(msg).show(300);
}
function hideNotif(){
	$('#file-notif').html('').hide(300);	
}

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
	var filechoose = $('#file-choose')[0];
	var password = $('#password').val();
	if(filechoose.files && filechoose.files.length > 0 && password){
		var file = filechoose.files[0];
		var reader = new FileReader();
		reader.onload = function(){
			var origin = reader.result.split(";base64,");
			var data = btoa(btoa(sjcl.encrypt(password, origin[1])));
			console.log(origin[0] + ";base64," + data);
			downloadURI(origin[0] + ";base64," + data, file.name);
		};
		reader.readAsDataURL(file);
	}else{
		console.log("no file chosen");
	}
}
function decryptFile(){
	var filechoose = $('#file-choose')[0];
	var password = $('#password').val();
	if(filechoose.files && filechoose.files.length > 0 && password){
		var file = filechoose.files[0];
		var reader = new FileReader();
		reader.onload = function(){
			var origin = reader.result.split(";base64,");
			var data = sjcl.decrypt(password, atob(atob(origin[1])));
			downloadURI(origin[0] + ";base64," + data, file.name);
		};
		reader.readAsDataURL(file);
	}else{
		console.log("no file chosen");
	}
}