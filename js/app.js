/*
 * Create a list that holds all of your cards
 */

var cardList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt',
                'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle',
                'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb',
                'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
var previousCard = null;
var matchedCount = 0;
var moveCount = 0;

window.onload = function() {
    cardList = shuffle(cardList);
    document.body.addEventListener('click', clickHandler);
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function init() {
     previousCard = null;
     matchedCount = 0;
     moveCount = 0;
     cardList = shuffle(cardList);
     updateCards();
     document.getElementById("moveCount").innerText = 0;
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

function updateCards() {
    var cards = document.getElementsByClassName('card');
    var length = cards.length;
    for(var i=0; i<length; i++) {
        cards[i].className = 'card';
        var child = cards[i].firstElementChild;
        child.className = cardList[i];
    }
}

function clickHandler(event) {
    if(event.target.id === 'restart_btn') {
        console.log('clicked restart');
        init();
    }
    else if(event.target.className.indexOf('card') != -1) {
        console.log('card');
        addClass(event.target, 'open');
        addClass(event.target, 'show');

        setTimeout(function() {
            if(previousCard == null) {
                previousCard = event.target;
            }
            else {
                moveCount++;
                document.getElementById("moveCount").innerText = moveCount;
                if(previousCard.firstElementChild.className === event.target.firstElementChild.className) {
                    addClass(event.target, 'match');
                    addClass(previousCard, 'match');
                    matchedCount++;
                    if(matchedCount == cardList.length/2) {
                        matchedCount = 0;

                        var result = confirm("Congratulations! You won with only " + moveCount + " moves! If you want to play the one more game, press OK.");
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

function addClass(element, name) {
    var className = element.className;
    if(className.indexOf(name) != -1) {
        return;
    }
    else {
        element.className = className + ' ' + name;
    }
}

function removeClass(element, name) {
    var className = element.className;
    if(className.indexOf(name) == -1) {
        return;
    }
    else {
        element.className = className.replace(name, '');
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
