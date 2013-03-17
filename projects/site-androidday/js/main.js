$(document).ready(initPage);

var currentSection = '';
var timeOutFitScreen;
var positions = null;

function initPage()
{
	$('.menu-item').click(MENU_CLICK_handler);
	$('.menu-item:eq(0)').focus();

	$(window).resize(fitToScreen);
	initTweets();
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

function initTweets()
{
	$("#tweetViewer .content").tweet({
		join_text: "auto",
		query: "android",
		avatar_size: 48,
		count: 12,
		loading_text: "Cargando tweets..."
		//refresh_interval: 5
	}).bind("loaded", onTweetLoad);
}

function onTweetLoad()
{
	TweenMax.staggerFrom($("#tweetViewer .content ul li a img"), 0.5, {css:{scale:2, opacity:0}, delay:1, ease:Quart.easeOut}, 0.1);
	$("#tweetViewer .content ul li").mouseenter(function(){
		TweenMax.set($(this).find('.tweet_text'),{css:{scale:1.5}});
		TweenMax.to($(this).find('.tweet_text'), 0.5, {css:{scale:1, autoAlpha:1}, ease:Quart.easeOut});
		TweenMax.to($(this).find('a img'), 0.5, {css:{'margin-left':'10px', 'margin-right':'-10px'}, ease:Quart.easeOut});
	});

	$("#tweetViewer .content ul li").mouseleave(function(){
		TweenMax.to($(this).find('.tweet_text'), 0.5, {css:{scale:0.5, autoAlpha:0}, ease:Quart.easeOut});
		TweenMax.to($(this).find('a img'), 0.5, {css:{'margin-left':'0px', 'margin-right':'0px'}, ease:Quart.easeOut});
	});
}
