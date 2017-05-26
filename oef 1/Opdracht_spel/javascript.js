/*global $ */
var Teller = 0;
var enemySpawn = 0;
var hit_list_Persoon = [];
var hit_list_Vijand = [];
var hit_list_PV = [];
var Opengeklapt = true;
var articelH = Math.floor(window.innerHeight / 70);
var articelW = Math.floor(window.innerWidth / 70);
var PlayerW = ((window.innerWidth) - (articelW * 70)) / 2;
var PlayerH = ((window.innerHeight) - (articelH * 70)) / 2;
var speler;
var pLeft = 0;
var pTop = 0;
var EW, EH = 0;
var MaxVijand = 5;
var bwg;
var veldHeight;
var veldWidth;
var playerHeight;
var playerWidth;
var playerX;
var playerY;
var test = $('.Vijand');
var Vijanden = [];
var x, y;
var X, Y;
var article = document.getElementsByTagName("article");
//vijand
function Vijand(x, y) {
	"use strict";
	this.element = $('<div/>', {
		'class': "Vijand"
	});
	this.X = x;
	this.Y = y;
	this.element.css('left', x);
	this.element.css('top', y);
	this.element.appendTo(article);
	this.Richting = "rechts";
}
//random pokeball
function spawnEnemy(naam) {
	"use strict";
	var posx = Math.floor(Math.random() * (window.innerWidth - 100))
		, posy = Math.floor(Math.random() * (window.innerHeight - 100));
	hit_list_Persoon = [];
	$(naam).each(function (i, Pokeball) {
		$("#Pokeball").css({
			position: 'absolute'
			, left: posx + 'px'
			, top: posy + 'px'
		});
	});
}
// beweeg functie vijand
function beweeg() {
	"use strict";
	//console.log('loopt door');
	var i;
	for (i = 0; i < Vijanden.length; i += 1) {
		Vijanden[i].beweeg();
	}
}
Vijand.prototype.beweeg = function () {
	"use strict";
	if (this.Richting === "links") {
		if (this.X > 0) {
			this.links();
		}
		else {
			this.Richting = "rechts";
			this.rechts();
		}
	}
	if (this.Richting === "rechts") {
		if (this.X < (Math.floor(window.innerWidth - 100))) {
			this.rechts();
		}
		else {
			this.Richting = "links";
			this.links();
		}
	}
};
//vijand doen bewegen
Vijand.prototype.links = function () {
	"use strict";
	this.element.animate({
		left: "-=20"
	}, 20);
	check();
	this.X -= 20;
};
Vijand.prototype.rechts = function () {
	"use strict";
	this.element.animate({
		left: "+=20"
	}, 20);
	check();
	this.X += 20;
};
//persoon vangt pokeball -- persoon gaat tegen vijand -- score optellen
function check() {
	"use strict";
	hit_list_Persoon = $("#Persoon").collision("#Pokeball");
	hit_list_Vijand = $("#Persoon").collision(".Vijand");
	if (hit_list_Persoon.length > 0) {
		spawnEnemy("#Pokeball");
		Teller += 1;
		document.getElementById('Score').innerHTML = 'Pokeballs: ' + Teller;
	}
	if (hit_list_Vijand.length > 0) {
		var test3 = document.getElementsByClassName('Vijand');
		while (test3[0]) {
			test3[0].parentNode.removeChild(test3[0]);
		}
		clearInterval(bwg);
		clearInterval();
		window.location = "end.html";
	}
}
// max aantal vijand random in de wereld geplaatst
function test1() {
	"use strict";
	if (Vijanden.length < MaxVijand) {
		EW = Math.floor(Math.random() * window.innerWidth);
		EH = Math.floor(Math.random() * window.innerHeight);
		Vijanden.push(new Vijand(EW, EH));
		//$('h1').show(0);
	}
}
// op mobile pokemon doen bewegen aan de hand van pijlen
$(function () {
	"use strict";
	speler = $('#Persoon');
	var position = speler.position();
	pTop = position.top;
	pLeft = position.left;
	$('article').css('height', articelH * 70);
	$('article').css('width', articelW * 70);
	$('article').css('left', PlayerW);
	$('article').css('top', PlayerH);
	setInterval(test1, 2000);
	$("#Pijla").on("click touch tap", function () {
		$("#Persoon").css("transform", "rotate(" + hoek + "deg)");

		down();
	});
	$("#Pijlb").on("click touch tap", function () {
		$("#Persoon").css("transform", "rotate(" + hoek + "deg)");

		up();
	});
	$("#Pijlc").on("click touch tap", function () {
		$("#Persoon").css("transform", "rotate(" + hoek + "deg)");

		right();
	});
	$("#Pijld").on("click touch tap", function () {

		$("#Persoon").css("transform", "rotate(" + hoek + "deg)");
		left();
	});
	
	veldHeight = $('article').height();
	veldWidth = $('article').width();
	playerHeight = $("#Persoon").height();
	playerWidth = $("#Persoon").width();
});
// bij endknop herstart het spel -- ul verdwijnt bij het klikken -- instructieknop/ul komt tevoorschijn
$(document).ready(function () {
	"use strict";
	$("#endKnop").click(function () {
		$("body").load("index.html");
	});
	$(article).click(function () {
		$("ul").hide(1000);
		$('h1').hide(0);
		clearInterval(bwg);
		bwg = setInterval(beweeg, 100);
	});
	$("#InstructieKnop").click(function () {
		if (!Opengeklapt) {
			$("ul").show();
			Opengeklapt = true;
		}
		else {
			$("ul").hide();
			Opengeklapt = false;
		}
	});
});
var hoek;
//keyboard functies
document.onkeydown = function (e) {
	"use strict";
	//var positie = $("#Persoon").position();
	switch (e.keyCode) {
	case 37: //links
		left();
		
		break;
	case 38: //boven
		up();
		
		break;
	case 39: //rechts
		right();
		
		break;
	case 40: //onder
		down();
		
		break;
	}
};

function left() {

	if (pLeft > 0) {
		pLeft -= 10;
		$("#Persoon").css('left', pLeft + 'px');
	}
	hoek = 0;
	check();
}

function up() {

	if (pTop > 0) {
		pTop -= 10;
		$("#Persoon").css('top', pTop + 'px');
	}
	hoek = 0;
	check();
}

function down() {

	if (pTop < (veldHeight - playerHeight)) {
		pTop += 10;
		$("#Persoon").css('top', pTop + 'px');
	}
	hoek = 0;
	check();
}

function right() {

	if (pLeft < (veldWidth - playerWidth)) {
		pLeft += 10;
		$("#Persoon").css('left', pLeft + 'px');
	}
	hoek = 0;
	check();
}