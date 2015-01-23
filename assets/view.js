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

// initliaze scroll depth tracking

$(function() {
  $.scrollDepth({elements: ['#vote'],
	pixelDepth: false
	});
});
