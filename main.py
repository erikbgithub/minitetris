def on_button_pressed_a():
    global column
    if column >= 0:
        column += -1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global column
    if column <= 4:
        column += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

column = 0
basic.clear_screen()
row = 0
column = 1
shape = randint(0, 1)
shape = 1

def on_forever():
    global row, column
    basic.clear_screen()
    if shape == 0:
        led.plot(column, row)
        row += 1
        led.plot(column, row)
        column += 1
        led.plot(column, row)
        column += -1
    elif shape == 1:
        row += 1
        led.plot(column, row)
        row += -1
        column += 1
        led.plot(column, row)
        row += 1
        led.plot(column, row)
        column += -1
    else:
        pass
    if row == 4:
        basic.pause(2500)
        game.game_over()
    basic.pause(1000)
basic.forever(on_forever)
