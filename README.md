# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [GameManual](#GameManual)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## GameManual

Memory game will be started when the user click and try to turn over the first card. User should find the same shaped two cards as revealing at a once.

1. Turn over a card. It has one shape of variable shapes.
2. Next, turn over the other one card.
    2.1 If It is same with first one, those two cards will be opened.
    2.2 If It is not same with first one, those two cards will be turned over again with back side.
3. Repeat above procedure until all cards are opened. If you won the congratulations popup will be shown for you.
4. If you want to restart game, press the refresh button on the header.

* moves
    - "moves" means how many times user click and try to turn over two cards.

* ★★★ stars
    - "stars" means user's performance for winning the game.
        * moves < 10, user get 3 stars
        * 10 <= moves <= 15, user get 2 stars
        * moves > 15, user get 1 stars'

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
