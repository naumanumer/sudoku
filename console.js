function writeOnConsole(text, color) {
    (!color) && (color = "#ccc");
    var d = $('#console');
    d.html(d.html()+`<pre style="color: ${color}">${text}</pre>`);
    d.scrollTop(d.prop("scrollHeight"));
}

function clearConsole(){
    $('#console').html("");
}