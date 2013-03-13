$(document).ready(initPage);

var currentSection = '';
var timeOutFitScreen;

function initPage()
{
	$('.menu-item').click(MENU_CLICK_handler);
	$('.menu-item:eq(0)').focus();

	$(window).resize(fitToScreen);
	fitToScreen();
}

function MENU_CLICK_handler()
{
	var target_name = $(this).attr('href');
	$('.menu-item').removeClass('active');
	$(this).addClass('active');
	scrollPage(target_name);
	return false;
}

function scrollPage(_target)
{
	var altoScreen = window.innerHeight - $('#header').height();
	var posY = 0;

	if(_target) currentSection = _target;

	if(_target == '#tour')	$('.menu-logo').removeClass('compact');
	else 					$('.menu-logo').addClass('compact');

	switch (currentSection)
	{
		case '#tour':
			posY = altoScreen * 0;
			break;
		case '#programa':
			posY = altoScreen * 1;
			break;
		case '#speakers':
			posY = altoScreen * 2;
			break;
		case '#sponsors':
			posY = altoScreen * 3;
			break;
		case '#colaboradores':
			posY = altoScreen * 4;
			break;
	}

	TweenMax.to($('#content'), 0.8, {scrollTop:posY, ease:Quart.easeOut});
}

function fitToScreen()
{
	if(window.innerWidth < 768)
		$('body').addClass('mobile');
	else
		$('body').removeClass('mobile');

	var altoScreen = window.innerHeight - $('#header').height() - $("#footer").height();
	$('#content, .visor').css('height', altoScreen + 'px');

	if(currentSection != '')
	{
		clearTimeout(timeOutFitScreen);
		timeOutFitScreen = setTimeout(scrollPage, 600);
	}
}