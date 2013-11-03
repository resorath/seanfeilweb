var currentBg = null;
var currentFullView = null;

$(document).ready(function() {

console.info("startup");
    // Change the initial size of the superstructure divs to match the page height (+ overhead)
    sizePageFullElements();

    // Handle initial element phasing
    phasePageFullElement();

    // Create navigation hooks
    setupNavigationHooks();

    // Set up the localscroll hooks
    //$('#nav').localScroll();
   // $('#toplink').localScroll();

    // If the user resizes the window, resize the superstructure
    $(window).resize(function() {
        sizePageFullElements();
        phasePageFullElement();
    });

    $(window).scroll(function() {
        phasePageFullElement();
    });
});



function setupNavigationHooks()
{
	var speed = 1000;

	$('.scrollableNavElement').click(function() {
        var _this = $(this);
        $('html, body').animate({
            scrollTop: $('#' + _this.data('scrolltarget')).offset().top

        }, speed);
	})

}

/** Sets the size of each superstructure div to match that of the page height (+ overhead) **/
function sizePageFullElements()
{
	$('.pagefull').each(function(index) {
		$(this).css('min-height', $(window).height() + 200);
	});
}

function phasePageFullElement()
{
	$('.pagefull').each(function(index, value) {
			if(checkIfInFullView(value))
			{
				// This element is in view
				if(value.id != currentFullView)
					phaseIn(value.id);
			}
			else
			{
				if(value.id == currentFullView)
					phaseOut(value.id);
			}
		});
}

function phaseIn(element)
{
	console.log("phasing in " + element);
	currentFullView = element;
	setActiveNav(element);
	//$('#' + element + '-bg-holder').fadeIn(900);
}

function phaseOut(element)
{
	console.log("phasing out " + element);
	currentFullView = null;
	//$('#' + element + '-bg-holder').fadeOut(500);
}

function setActiveNav(element)
{
	$('.selectedNavElement').removeClass('selectedNavElement');
	$('#nav-' + element).addClass('selectedNavElement');

}

function checkIfInView(element)
{
    var topoffset = $(element).offset().top - $(window).scrollTop();
    var bottomoffset = $(element).height() + topoffset;

    //console.log("top: " + topoffset + ", bottom: " + bottomoffset + ", innerheight: " + window.innerHeight);

    if(topoffset < window.innerHeight && bottomoffset > window.innerHeight){
        return true;
    }
   return false;
}

function checkIfInFullView(element)
{
    var topoffset = $(element).offset().top - $(window).scrollTop();
    var bottomoffset = $(element).height() + topoffset;

    //console.log(element.id + ">> top: " + topoffset + ", bottom: " + bottomoffset + ", innerheight: " + window.innerHeight + ", isinfullview: " + (topoffset < window.innerHeight && bottomoffset > window.innerHeight));

    if(topoffset < window.innerHeight && bottomoffset >= window.innerHeight && topoffset <= 0){
        return true;
    }
   return false;
}