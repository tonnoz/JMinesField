var playField;
var size;


function revealBox(i, j) {
    i = parseInt(i);
    j = parseInt(j);
    var k, l;
    for (k = i - 2; k <= i + 2; k++) {
        for (l = j - 2; l <= j + 2; l++) {
            if (k >= 0 && k < size && l >= 0 && l < size) {
            	if (playField[k][l] == 0){
            		$('input[i="' + k + '"][j="' + l + '"]').css("opacity", "0").attr("disabled", "disabled");
            	}else if (playField[k][l] != -1){
            		$('input[i="' + k + '"][j="' + l + '"]').val(playField[k][l]);
            	}
            }
        }
    }
}


function init() {
    $.ajax({
        url: "/minefield/game/getSize.do",
        data: null,
        type: "GET",
        async: true
    }).done(function(data) {
        size = data;
        var i, j;
	    $('.container').html("");
	    for (i = 0; i < size; i++) {
	        for (j = 0; j < size; j++) {
	            $('.container').append('<input class="gamebuttons" style="height:25px; width:25px" i="' + i + '" j="' + j + '" type="button" value="&nbsp;"/>');
	        }
	        $('.container').append('<br/>');
	    }    
    });
	
	
    $.ajax({
        url: "/minefield/game/getField.do",
        data: null,
        type: "GET",
        async: true
    }).done(function(data) {
        playField = data;
	    $(".gamebuttons").click(function() {
	        var me = $(this);
	        var i = me.attr("i");
	        var j = me.attr("j");
	        if (playField[i][j] == -1) alert("you lose!");
	        else {
	            if (playField[i][j] == 0) {
	                revealBox(i, j);
	            } else {
	                me.val(playField[i][j]);
	            }
	        }
	    });		        
    });
}



$(document).ready(function() {		
    $("#new").click(function() {
        $.ajax({
            url: "/minefield/game/new.do",
            data: null,
            type: "GET",
            async: false
        }).done(function(){
	        init();
	    });
    });		
    init();
});