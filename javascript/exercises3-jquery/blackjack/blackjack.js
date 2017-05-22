// "deal-button">
// "hit-button">
// "stand-button">

// alert('loaded')

var deck = [];
var playerHand = [];
var dealerHand = [];

function clearDeck(){
  deck = [];
};

function generateDeck(){
  let suitvar = 'default';
  for (let i = 0; i < 4; i++) {
    if (i === 0) {suitvar = 'hearts'}
    else if (i === 1) {suitvar = 'diamonds'}
    else if (i === 2) {suitvar = 'spades'}
    else if (i === 3) {suitvar = 'clubs'};
    for (let i = 1; i < 14; i++) {
      card = {point: i, suit: suitvar}
      deck.push(card);
    };
  };
};

function calculatePoints(hand) {
  let value = 0;
  let points = 0;
  let ace = false;
  forEach (card in hand) {
    if (card.point === 1) {value = 11; ace = true}
    else if (card.point === 11) {value = 10}
    else if (card.point === 12) {value = 10}
    else if (card.point === 13) {value = 10}
    else {value = card.point}
    points += value;
  };
  if (points > 21) {
    if (ace === true) {
      points -= 10;
    };
  };
  return points;
}

function bustChecker(hand) {
  points = calculatePoints(hand);
  if (points > 21) {
    return true;
  }
  else {
    return false;
  }
}

function getCardImageUrl(card) {
  let val = card.point;
  if (val === 1){val = 'ace'}
  else if (val === 11){val = 'jack'}
  else if (val === 12){val = 'queen'}
  else if (val === 13){val = 'king'}
  let suit = card.suit;
  url = "images/" + val + "_of_" + suit + ".png"
  return url;
}

function givePlayerCard() {
  card = deck.pop()
  if (card !== undefined) {
    let cardImg = new Image();
    cardImg.id = '2 of clubs';
    cardImg.src = getCardImageUrl(card)
    cardImg.width = 50;
    cardImg.height = 75;
    playerHand.push(card);
    $('#player-hand').append(cardImg);
    cardImg = {};

  }
  else {
    alert('Out of cards')
  };
};

function giveDealerCard() {
  card = deck.pop()
  if (card !== undefined){
    let cardImg = new Image();
    cardImg.id = card.point + "-of-" + card.suit;
    cardImg.src = getCardImageUrl(card)
    cardImg.width = 50;
    cardImg.height = 75;
    dealerHand.push(card);
    $('#dealer-hand').append(cardImg);
    cardImg = {};
  }
  else {
    alert('Out of cards');
  }
};

function printDeck() {
  console.log(deck);
};
$(document).ready(function () {

  generateDeck();

  $('#deal-button').click(function () {
    giveDealerCard();
    givePlayerCard();
    giveDealerCard();
    givePlayerCard();
  });

  $('#hit-button').click(function () {
    givePlayerCard();
    giveDealerCard();
  });

  // $('#stand-button').click(function () {
  //
  // });

  $('#stand-button').click(function () {

    printDeck();
  });


})
