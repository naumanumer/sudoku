var solvedBoard, unsolvedBoard, busy = false;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function fillBoard() {
    if (busy) writeOnConsole("Please while another operation in in progress.");
    busy = true;

    var buttonHtml = $("#shuffle").html();
    $("#shuffle").html("Working...");
    $("#shuffle").prop('disabled', true);
    writeOnConsole(" ");

    // to make this portion async and document responsive
    setTimeout(function(){
        var board = flattenBoard(generatePuzzle());
        var n = 0;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                var html = (board[n] == ".") ? `<input onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" maxlength="1"/>` : board[n];
                $(`#${j}-${i}`).html(html);
    
                n++;
            }
        }

        writeOnConsole(" ");
        writeOnConsole(`Initialized board`);
        $("#shuffle").html(buttonHtml);
        $("#shuffle").prop('disabled', false);
        busy = false;
    }, 100)

}

function generatePuzzle() {
    var seedBoard = generateSeedBoard();
    var a = performance.now();
    solvedBoard = search(parse_grid(seedBoard));
    var b = performance.now();
    writeOnConsole(`Solved seed board in ${Math.round((b-a)* 100) / 100}ms.`);

    var a = performance.now();
    unsolvedBoard = removeTile(solvedBoard);
    var b = performance.now();
    writeOnConsole(`Generated unique puzzle in ${Math.round((b-a)* 100) / 100}ms.`);

    return unsolvedBoard;
}

function removeTile(board) {
    tempBoard = JSON.parse(JSON.stringify(board));
    for (var i = 0; i < 64; i++) {
        var addr = rows[randomIntFromInterval(0, 8)] + cols[randomIntFromInterval(0, 8)]
        tempBoard[addr] = ".";

        if (search(parse_grid(flattenBoard(tempBoard)))[addr] != board[addr])
            tempBoard[addr] = board[addr];
    }

    return tempBoard;
}


function generateSeedBoard() {
    var a = performance.now();
    var board = generateDummyRow().join('');
    var b = performance.now();
    writeOnConsole(`Generated seed board in ${Math.round((b-a)* 100) / 100}ms.`);
    return board + '.'.repeat(9 * 8);
}

function generateDummyRow() {
    var row = [];
    for (var i = 0; i < 9; i++) {
        var num = randomIntFromInterval(1, 9);
        while (row.indexOf(num) != -1) {
            num = randomIntFromInterval(1, 9);
        }
        row.push(num);
    }
    return row
}

function fillSolvedBoard(){
    if(!solvedBoard) return;
    var n=0;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if($(`#${j}-${i} input`).length == 1){
                var addr = rows[i] + cols[j]
                $(`#${j}-${i} input`).val(solvedBoard[addr])
            }
            n++;
        }
    }
}