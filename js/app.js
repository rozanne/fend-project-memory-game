// all cards in this game
var cardList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt',
                'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle',
                'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb',
                'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

// initial variable
var previousCard = null;
var matchedCount = 0;
var moveCount = 0;
var starCount = 0;
var isFirstClick = true;

window.onload = function() {
    // as starting game, shuffle cards
    cardList = shuffle(cardList);

    // add click event in document
    document.body.addEventListener('click', clickHandler);
};

// timer for measuring play time
var timer = {
    item: null,
    playingTime: 0,
    INTERVAL: 1000,
    start: function() {
        timer.item = window.setInterval(function() {
            document.getElementById("time").innerText = ++timer.playingTime;
        }, timer.INTERVAL);
    },
    clear: function() {
         window.clearInterval(timer.item);
    }
};

// init function for new games
function init() {
     previousCard = null;
     matchedCount = 0;
     moveCount = 0;
     starCount = 3;
     updateStar();
     cardList = shuffle(cardList);
     updateCards();
     document.getElementById("moveCount").innerText = 0;
     document.getElementById("time").innerText = '';
     isFirstClick = true;
     timer.clear();
     timer.playingTime = 0;
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// render cards as refering cardList
function updateCards() {
    var cards = document.getElementsByClassName('card');
    var length = cards.length;
    for(var i=0; i<length; i++) {
        cards[i].className = 'card';
        var child = cards[i].firstElementChild;
        child.className = cardList[i];
    }
}

// click handler for game
function clickHandler(event) {
    if(event.target.id === 'restart_btn') {
        console.log('clicked restart');
        init();
    }
    else if(event.target.className.indexOf('card') != -1 && event.target.className.indexOf('open') == -1) {
        console.log('card');

        if(isFirstClick) {
            timer.start();
        }
        isFirstClick = false;

        addClass(event.target, 'open');
        addClass(event.target, 'show');

        setTimeout(function() {
            if(previousCard == null) {
                previousCard = event.target;
            }
            else {
                moveCount++;
                if(10 < moveCount && moveCount <= 15) {
                    starCount = 2;
                    updateStar();
                } else if(moveCount > 15) {
                    starCount = 1;
                    updateStar();
                }

                document.getElementById("moveCount").innerText = moveCount;
                if(previousCard.firstElementChild.className === event.target.firstElementChild.className) {
                    addClass(event.target, 'match');
                    addClass(previousCard, 'match');
                    matchedCount++;
                    if(matchedCount == cardList.length/2) {
                        matchedCount = 0;
                        timer.clear();
                        var performTime = timer.playingTime;
                        var result = confirm("Congratulations!\nYou won within [" + performTime + "] seconds.\nYou got [ " + moveCount + " ] moves! and [ " + starCount + " ] stars!\nStars mean \n\t'moves < 10 : 3 stars'\n\t'10 <= moves <= 15 : 2 stars'\n\t'moves > 15 : 1 stars'\nIf you want to play the one more game, press OK.");
                        if (result) {
                            init();
                            console.log("Again");
                        } else {
                            console.log("Cancel");
                        }
                    }
                }
                else {
                    removeClass(event.target, 'open');
                    removeClass(event.target, 'show');

                    removeClass(previousCard, 'open');
                    removeClass(previousCard, 'show');
                }
                previousCard = null;
            }
        }, 500);
    }
}

// Util function : to add class at the element
function addClass(element, name) {
    var className = element.className;
    if(className.indexOf(name) != -1) {
        return;
    }
    else {
        element.className = className + ' ' + name;
    }
}

// Util function : to remove class at the element
function removeClass(element, name) {
    var className = element.className;
    if(className.indexOf(name) == -1) {
        return;
    }
    else {
        element.className = className.replace(name, '');
    }
}

// update star rating
function updateStar() {
    var stars = document.getElementById("stars");
    var len = stars.children.length;
    var currentStar = starCount;
    var i=0;
    while(currentStar--){
        stars.children[i++].firstElementChild.className = "fa fa-star";
    }
    var emptyStar = len-i;
    while(emptyStar--) {
        stars.children[i++].firstElementChild.className = "fa fa-star-o";
    }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
