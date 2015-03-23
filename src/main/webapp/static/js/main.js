var field; //matrix of int representing the game board
var openBoxes; //number of open boxes
var size; //size of the game board
var nrMines; //nr of Mines present on the game board
var nrBoxes; // nr of the boxes still to check
var nrGuessed; //nr of the guessed boxes

// WIN = nrMines == nrBoxes == nrGuessed

$(document).ready(function() {
	init();
	$(this).on("contextmenu", ".gamebuttons", function(e) {
		var me = $(this);
		var i = parseInt(me.attr("i"));
		var j = parseInt(me.attr("j"));
		changeColor(i, j);
		return false;
	});

	$("#new").click(function() {
		$.ajax({
			url : "/minefield/game/new.do",
			data : null,
			type : "GET",
			async : false
		}).done(function() {
			init();
		});
	});
});

function openBox(i, j) {
	if (field[i][j] < 0) {
		lose(i, j);
	} else if (field[i][j] > 0 && openBoxes[i][j] === 0) {
		reveal(i, j);
	} else {
		openRec(i, j);
	}
}

function openRec(i, j) {
	if (i >= size || i < 0 || j >= size || j < 0 || field[i][j] < 0
			|| openBoxes[i][j] !== 0)
		return;

	if (field[i][j] > 0) {
		reveal(i, j);
	} else {
		hide(i, j);
		openRec(i - 1, j);
		openRec(i + 1, j);
		openRec(i, j - 1);
		openRec(i, j + 1);
	}
}

function initOpenBoxes() {
	openBoxes = new Array(size);
	for (var i = 0; i < size; i++) {
		openBoxes[i] = new Array(size);
		for (var j = 0; j < size; j++) {
			openBoxes[i][j] = 0
		}
	}
}

function redrawButtons(container) {
	$(container).html("");
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			$('.container').append(
					'<input class="gamebuttons" style="height:25px; width:25px" i="'
							+ i + '" j="' + j
							+ '" type="button" value="&nbsp;"/>');
		}
		$('.container').append('<br/>');
	}

	$(".gamebuttons").click(function(event) {
		var me = $(this);
		var i = parseInt(me.attr("i"));
		var j = parseInt(me.attr("j"));
		openBox(i, j);
	});
}

function init() {
	nrGuessed = 0;

	$.ajax({
		url : "/minefield/game/getSize.do",
		data : null,
		type : "GET",
		async : true
	}).done(function(data) {
		size = data;
		nrBoxes = size * size;
		initOpenBoxes();
		redrawButtons('.container');
	});

	$.ajax({
		url : "/minefield/game/getField.do",
		data : null,
		type : "GET",
		async : true
	}).done(function(data) {
		field = data;
	});

	$.ajax({
		url : "/minefield/game/getNrMines.do",
		data : null,
		type : "GET",
		async : true
	}).done(function(data) {
		nrMines = data;
	});

}

function hide(i, j) {
	openBoxes[i][j] = -1;
	$('input[i="' + i + '"][j="' + j + '"]').css("opacity", "0").attr(
			"disabled", "disabled");
	nrBoxes--;
	checkWin();
}

function reveal(i, j) {
	openBoxes[i][j] = -1;
	$('input[i="' + i + '"][j="' + j + '"]').val(field[i][j]);
	nrBoxes--;
	checkWin();
}

function lose(i, j) {
	alert("you lose!");
	$('input[i="' + i + '"][j="' + j + '"]').val('X');
	$('.gamebuttons').attr("disabled", "disabled");
}

function changeColor(i, j) {
	if (openBoxes[i][j] < 0) {
		return;
	} else if (openBoxes[i][j] === 0) {
		openBoxes[i][j] = 1;
		$('input[i="' + i + '"][j="' + j + '"]').css("background-color",
				"black");
		nrGuessed++;
	} else if (openBoxes[i][j] > 0) {
		openBoxes[i][j] = 0;
		$('input[i="' + i + '"][j="' + j + '"]').css("background-color", "");
		nrGuessed--;
	}
	checkWin();
}

function checkWin() {
	if (nrMines === nrBoxes && nrMines === nrGuessed){
		alert("you win!");
		$('.gamebuttons').attr("disabled", "disabled");
	}
}