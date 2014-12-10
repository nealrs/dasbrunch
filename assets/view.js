/*==============================================================================
Bachelor Brunch, Copyright (c) 2014 Neal Shyam <http://www.nealshyam.com>
==============================================================================*/

function tshare(){
	//trackTweet();
	window.open("https://twitter.com/intent/tweet?text=great%20%23brunch%20reading%3A&url="+encodeURIComponent(window.location.href));

	//window.location.href = "https://twitter.com/intent/tweet?text=great read from @nealrs:&url="+encodeURIComponent(window.location.href);
}
function eshare(){
	//trackEmail();
	window.open("mailto:?&subject=I think you'll like this article &body="+encodeURIComponent(window.location.href));

	//window.location.href = "mailto:?&subject=I think you'll like this article &body="+encodeURIComponent(window.location.href);
}

/*responsive iframes via https://gist.github.com/aarongustafson/1313517*/
function adjustIframes()
{
  $('iframe').each(function(){
    var
    $this       = $(this),
    proportion  = $this.data( 'proportion' ),
    w           = $this.attr('width'),
    actual_w    = $this.width();

    if ( ! proportion )
    {
        proportion = $this.attr('height') / w;
        $this.data( 'proportion', proportion );
    }

    if ( actual_w != w )
    {
        $this.css( 'height', Math.round( actual_w * proportion ) + 'px' );
    }
  });
}
$(window).on('resize load',adjustIframes);

/* Event code for Keen.io tracking*/

var trackVote = function () {
	var vote = {
		story: window.location.href,
		"keen" : {
			"addons" : [
				{
						"name" : "keen:ua_parser",
						"input" : {
								"ua_string" : "user_agent"
						},
						"output" : "parsed_user_agent"
				},
				{
						"name" : "keen:ip_to_geo",
						"input" : {
								"ip" : "ip_address"
						},
						"output" : "ip_geo_info"
				}
			]
		},
		"ip_address" : "${keen.ip}",
		"user_agent" : "${keen.user_agent}"
	};
	Keen.addEvent("votes", vote);

	// acknowledge upvote & disable button.
	x = document.getElementById("vote");
	x.classList.remove("vote");
	x.classList.add("votec");
	x.innerHTML="thanks!";
	x.onclick = undefined;
	//console.log("merp");

};

var trackTweet = function () {
	var t = {
		story: window.location.href,
		"keen" : {
			"addons" : [
				{
						"name" : "keen:ua_parser",
						"input" : {
								"ua_string" : "user_agent"
						},
						"output" : "parsed_user_agent"
				},
				{
						"name" : "keen:ip_to_geo",
						"input" : {
								"ip" : "ip_address"
						},
						"output" : "ip_geo_info"
				}
			]
		},
		"ip_address" : "${keen.ip}",
		"user_agent" : "${keen.user_agent}"
	};
	Keen.addEvent("tweetClicks", t);
};

var trackEmail = function () {
	var e = {
		story: window.location.href,
		"keen" : {
			"addons" : [
				{
						"name" : "keen:ua_parser",
						"input" : {
								"ua_string" : "user_agent"
						},
						"output" : "parsed_user_agent"
				},
				{
						"name" : "keen:ip_to_geo",
						"input" : {
								"ip" : "ip_address"
						},
						"output" : "ip_geo_info"
				}
			]
		},
		"ip_address" : "${keen.ip}",
		"user_agent" : "${keen.user_agent}"
	};
	Keen.addEvent("emailClicks", e);
};


// initliaze scroll depth tracking

$(function() {
  $.scrollDepth({elements: ['#vote'],
	pixelDepth: false
	});
});
