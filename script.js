// tells game rules in a alert format
function gameRules() {

    window.alert("Connect 4 game rules: In order to win the game the player needs to align his/her ship in a vertical, horizontal or diagonal ways. " +
        "the game is turn based so the player 'Red' plays first.");
}

// resets game
function gameReset() {

if (confirm('are you sure you want to start over? you will loos all your progress')) {
    location.reload()
    }
}
 class connect4 {
        constructor(selector){
            this.COLS = 7;
            this.ROWS = 6;
            this.player = 'red';
            this.selector = selector;
            this.isGameOver = false
            this.onPlayerMove = function() {};
            this.createGrid();
            this.setUpGameEvents();
        }

        createGrid() {
            const $board = $(this.selector);
            for (let row = 0; row < this.ROWS; row++) {
                const $row = $('<div>').addClass('row');
                for (let col = 0; col< this.COLS; col++) {
                    const $col = $('<div>')
                        .addClass('col empty')
                        .attr('data-col', col)
                        .attr('data-row', row)
                    $row.append($col);
                }
                $board.append($row);
            }
        }

        setUpGameEvents() {
        const $board = $(this.selector);
        const that = this;

        function findLastEmptyCell(col) {
        const cells = $(`.col[data-col='${col}']`)
            for (let i = cells.length - 1; i >= 0;  i--) {
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
            return null;
        }

        $board.on('mouseenter', '.col.empty', function () {

            const col = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${that.player}`);
        })

            $board.on('mouseleave', '.col', function () {
                $('.col').removeClass(`next-${that.player}`);
            })

            $board.on('click', '.col.empty', function () {
                if (that.isGameOver) return;
                const col = $(this).data('col');
                const $lastEmptyCell = findLastEmptyCell(col);
                $lastEmptyCell.removeClass(`empty next-${that.player}`);
                $lastEmptyCell.data('player', that.player);

                const winner = that.checkForWinner(
                    $lastEmptyCell.data('row'),
                    $lastEmptyCell.data('col')
                )
                if (winner) {
                   that.isGameOver = true
                    alert(`Game over ${that.player} has won!`);
                   $('.col.empty').removeClass('empty')
                    return;
                }


                $lastEmptyCell.addClass(that.player);
                that.player = (that.player === 'red') ? 'yellow' : 'red';
                that.onPlayerMove();
                $(this).trigger('mouseenter');
            });
        }

        checkForWinner(row,col) {
            const that = this;

            function $getCell(i,j) {
                return $(`.col[data-row='${i}'][data-col='${j}']`);
            }

            function checkDirection(direction) {
                let total = 0;
                let i = row + direction.i;
                let j = col + direction.j;
                let $next = $getCell(i, j);
                while (i >= 0 &&
                i < that.ROWS && j >= 0 &&
                j < that.COLS &&
                $next.data('player') === that.player
                    ) {
                    total++;
                    i += direction.i;
                    j += direction.j;
                    $next = $getCell(i,j);
                }
                return total;
            }

            function checkWin(directionA, directionB) {
                const total = 1 +
                    checkDirection(directionA) +
                    checkDirection(directionB);
                if (total >= 4) {
                    return that.player;
                } else {
                    return null;
                }
            }

            function checkVerticals() {
                return checkWin({i: -1, j: 0}, {i: 1, j: 0});
            }

            function checkHorizontals() {
                return checkWin({i: 0, j: -1}, {i: 0, j: 1});
            }

            function checkDiagonalLeftToTop() {
                return checkWin({i: 1, j: -1}, {i: 1, j: 1});
            }

            function checkDiagonalRightToTop() {
                return checkWin({i: 1, j: 1}, {i: -1, j: -1});
            }

            return checkVerticals() || checkHorizontals() || checkDiagonalLeftToTop() || checkDiagonalRightToTop();
        }
    }