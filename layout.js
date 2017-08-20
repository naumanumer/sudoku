var board = $('#board');
var TileSize = 50;
var size = 9;
var dev = false;


function initGame() {
    $("#board").height(size * TileSize);
    $("#board").width(size * TileSize);

    var boardHtml = "";
    var n = 0,
        k = 0;

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {

            var border = 'b';
            var background = 'o';
            if (n % 2 == 0)
                background = 'e';

            if (i % 3 == 2 && i < size - 1)
                border += "-b"
            if (j % 3 == 2 && j < size - 1)
                border += "-r"

            boardHtml += `<div class="cell ${border} ${background}" style="left:${j * TileSize}px;top: ${i * TileSize}px;height: ${TileSize - 1}px;width:${TileSize - 1}px" id="${j}-${i}">`;
            boardHtml += `<input onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" maxlength="1"/>`
            boardHtml += "</div>";

            n++;
        }
    }

    $(board).html(boardHtml);

    fillBoard();
}

writeOnConsole("Slide Puzzle (c) Nauman Umer");
writeOnConsole("Info: Use Arrow keys to move tiles", "rgb(97, 175, 255)");
writeOnConsole(" Or click on tile to move.", "rgb(97, 175, 255)");
writeOnConsole("Warn: As game board and solver are", "rgb(245, 189, 0)");
writeOnConsole(" working async so assigning two tasks", "rgb(245, 189, 0)");
writeOnConsole(" at the same time can result any", "rgb(245, 189, 0)");
writeOnConsole(" unexpected result.", "rgb(245, 189, 0)");

initGame();