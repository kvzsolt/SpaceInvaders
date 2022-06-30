from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)


@app.route("/")
def route_menu():
    return render_template("menu.html")


@app.route("/game")
def route_new_game():
    return render_template("game.html")


@app.route("/highscores")
def route_highscores():
    return render_template("highscores.html")


@app.route("/game-over")
def game_over():
    return render_template("game_over.html")


@app.route("/win")
def win():
    return render_template("win.html")


if __name__ == "__main__":
    app.run(debug=True)
