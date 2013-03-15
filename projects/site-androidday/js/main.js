$(document).ready(initPage);

var currentSection = '';
var timeOutFitScreen;
var positions = null;

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

	if (positions===null)
	{
		positions = [];
		positions[0] = ($("#tour").offset()).top - $('#header').height();
		positions[1] = ($("#programa").offset()).top - $('#header').height();
		positions[2] = ($("#speakers").offset()).top - $('#header').height();
		positions[3] = ($("#sponsors").offset()).top - $('#header').height();
		positions[4] = ($("#colaboradores").offset()).top - $('#header').height();
	}
	switch (currentSection)
	{
		case '#tour':
			posY = positions[0]; //altoScreen * 0;
			break;
		case '#programa':
			posY = positions[1]; //altoScreen * 1;
			break;
		case '#speakers':
			posY = positions[2] //altoScreen * 2;
			break;
		case '#sponsors':
			posY = positions[3]; //altoScreen * 3;
			break;
		case '#colaboradores':
			posY = positions[4]; //altoScreen * 4;
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
	
	var altoScreen = window.innerHeight - $('#header').height();
	$('#content').css('height', altoScreen + 'px');
	$('.visor').css('min-height', altoScreen + 'px');
	
	if(currentSection != '')
	{
		clearTimeout(timeOutFitScreen);
		timeOutFitScreen = setTimeout(scrollPage, 600);
	}
}
