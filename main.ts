input.onButtonPressed(Button.A, function () {
    if (column > 0) {
        column += -1
    }
})
input.onButtonPressed(Button.B, function () {
    if (column < 3) {
        column += 1
    }
})
let istouchingbottomright = false
let istouchingbottomleft = false
let isatbottom = false
let topright = false
let topleft = false
let bottomright = false
let bottomleft = false
let shape = 0
let bottomUpFromY = 0
let inarray = 0
let countrow = 0
let column = 0
game.setScore(0)
let isactiveval = 1
let isinactiveval = 0
let row = 4
let statics = [
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
]
basic.forever(function () {
    basic.clearScreen()
    for (let Y = 0; Y <= 4; Y++) {
        countrow = 0
        for (let X = 0; X <= 4; X++) {
            inarray = Y * 5 + X
            if (statics[inarray] > 0) {
                led.plot(X, Y)
                countrow += 1
            }
        }
        if (countrow == 5) {
            game.addScore(1)
            for (let X = 0; X <= 4; X++) {
                led.unplot(X, Y)
                inarray = Y * 5 + X
                statics[inarray] = isinactiveval
            }
            for (let innerY = 0; innerY <= Y; innerY++) {
                for (let innerX = 0; innerX <= 4; innerX++) {
                    bottomUpFromY = Y - innerY
                    inarray = bottomUpFromY * 5 + innerX
                    if (led.point(innerX, bottomUpFromY - 1)) {
                        led.plot(innerX, bottomUpFromY)
                        statics[inarray] = isactiveval
                    } else {
                        led.unplot(innerX, innerY)
                        statics[inarray] = isinactiveval
                    }
                }
            }
        }
    }
    if (row == 4) {
        shape = randint(0, 3)
        row = 0
        column = randint(1, 2)
    } else {
        if (shape == 0) {
            if (row == 0 && (led.point(column, row) || (led.point(column, row + 1) || led.point(column + 1, row + 1)))) {
                game.gameOver()
            }
            led.plot(column, row)
            row += 1
            led.plot(column, row)
            column += 1
            led.plot(column, row)
            column += -1
        } else if (shape == 1) {
            if (row == 0 && (led.point(column, row + 1) || (led.point(column + 1, row) || led.point(column + 1, row + 1)))) {
                game.gameOver()
            }
            row += 1
            led.plot(column, row)
            row += -1
            column += 1
            led.plot(column, row)
            row += 1
            led.plot(column, row)
            column += -1
        } else if (shape == 2) {
            if (row == 0 && (led.point(column, row) || (led.point(column + 1, row) || led.point(column, row + 1)))) {
                game.gameOver()
            }
            led.plot(column, row)
            column += 1
            led.plot(column, row)
            row += 1
            column += -1
            led.plot(column, row)
        } else if (shape == 3) {
            if (row == 0 && (led.point(column, row) || (led.point(column + 1, row) || led.point(column + 1, row + 1)))) {
                game.gameOver()
            }
            led.plot(column, row)
            column += 1
            led.plot(column, row)
            row += 1
            led.plot(column, row)
            column += -1
        } else {
        	
        }
    }
    bottomleft = led.point(column, row)
    bottomright = led.point(column + 1, row)
    topleft = led.point(column, row - 1)
    topright = led.point(column + 1, row - 1)
    isatbottom = row >= 4
    istouchingbottomleft = bottomleft && led.point(column, row + 1)
    istouchingbottomright = bottomright && led.point(column + 1, row + 1)
    if (isatbottom || (istouchingbottomleft || istouchingbottomright)) {
        if (topleft) {
            statics[(row - 1) * 5 + column] = isactiveval
        }
        if (topright) {
            statics[(row - 1) * 5 + (column + 1)] = isactiveval
        }
        if (bottomleft) {
            statics[row * 5 + column] = isactiveval
        }
        if (bottomright) {
            statics[row * 5 + (column + 1)] = isactiveval
        }
        row = 0
    }
    basic.pause(1000)
})
