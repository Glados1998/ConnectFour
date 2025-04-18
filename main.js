$(document).ready(function () {

    const Connect4 = new connect4('#connect4');

    Connect4.onPlayerMove = function () {
        $('#currenPlayer').text(Connect4.player);
    }

});
