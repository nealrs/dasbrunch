/*==============================================================================
Bachelor Brunch, Copyright (c) 2014 Neal Shyam <http://www.nealshyam.com>
==============================================================================*/

url = (window.location.href).replace("http://nealshyam.com/bb/view.html#","");
console.log(url);

function menu(){
	$('.menurail').toggle();
	$('#menu').toggleClass("active inactive");
}

function exitTS(){window.location.href = url;}

function tshare(){window.location.href = "https://twitter.com/intent/tweet?text=great read from @nealrs:&url="+encodeURIComponent(url);}
function eshare(){window.location.href = "mailto:?&subject=great read from Neal &body="+encodeURIComponent(url);}
function fshare(){window.location.href = "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(url);}
function lshare(){window.location.href = "http://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(url);}
function gshare(){window.location.href = "https://plus.google.com/share?url="+encodeURIComponent(url);}

function checkHeaders(data){
	console.log(data.status.http_code);
	console.log(data.headers["X-Frame-Options"]);
	console.log(data.status.redirect_count);

	if (data.status.redirect_count > 0 || data.headers["X-Frame-Options"] == "DENY" || data.headers["X-Frame-Options"] == "SAMEORIGIN" || data.status.http_code >= 300){
		console.log("x-frame / redirect  issues");
			exitTS();
	}

	else if (!data.contents){
		console.log("null contents");
		exitTS();
	}

	else if (data.status.http_code == 200){
		$('#frame').attr('src', url);
	}
}

$(function(){
	var proxy = 'proxy.php',
	url2 = proxy + '?url='+encodeURIComponent(url)+'&full_headers=1&full_status=1';

	console.log(url2);

	// Test to see if HTML mode.
	if ( /mode=native/.test( url2 ) ) {

		// Make GET request.
		$.get( url2, function(data){
			checkHeaders(data);
		});

	} else {
		// Make JSON request.
		$.getJSON( url2, function(data){
			checkHeaders(data);
		});
	}
	// Disable AJAX caching.
	$.ajaxSetup({ cache: false });
});
