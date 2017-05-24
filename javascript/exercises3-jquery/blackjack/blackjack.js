// "deal-button">
// "hit-button">
// "stand-button">

// alert('loaded')

var deck = [];
var discard = [];
var hole = {};
var playerHand = [];
var dealerHand = [];
var playerStanding = false;
var dealerStanding = false;

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
      card = {point: i, suit: suitvar};
      discard.push(card);
    };
  };
};

function shuffleDeck(){
  printMessage("Deck shuffled!")
  let shuffledDeck = [];
  while (discard.length !== 0){
    let card = discard.splice(Math.floor(Math.random() * discard.length), 1)[0];
    console.log(card.point, card.suit)
    shuffledDeck.push(card);
  };
  deck = shuffledDeck;
};

// runs calculatePoints and ends game if over
function checkState() {
  if (calculatePoints() === -100) {
    //player busts
    roundEnd(-1);
  }
  else if (calculatePoints() === 100) {
    // dealer busts
    roundEnd(1);
  }
  else if (dealerPoints >= 17 && playerStanding === true) {
    dealerStands();
  }

  else if (dealerPoints === 21 && playerPoints === 21) {
    if (dealerHand.length === playerHand.length) {
      roundEnd(0);
    }
    else if (dealerHand.length === 2 && playerHand.length > 2) { //blackjacks win ties
      roundEnd(-1);
    }
    else if (playerHand.length === 2 && dealerHand.length > 2) { //blackjacks win ties
      roundEnd(1);
    }
  }

  else if (dealerPoints === 21) {
    roundEnd(-1);
  }

  else if (playerPoints === 21) {
    roundEnd(2);
  }

  else if (dealerStanding == true && playerStanding == true){
    roundEnd(3);
  }
  // else {alert('error in checkState')};
};

// master points calculation function
function calculatePoints() {
  let dealerArray = sumCards(dealerHand); // [points, ace-flag1, 2, 3, 4]
  let playerArray = sumCards(playerHand);

  dealerPoints = dealerArray[0];
  dealerAce1 = dealerArray[1];
  dealerAce2 = dealerArray[2];
  dealerAce3 = dealerArray[3];
  dealerAce4 = dealerArray[4];

  playerPoints = playerArray[0];
  playerAce1 = playerArray[1];
  playerAce2 = playerArray[2];
  playerAce3 = playerArray[3];
  playerAce4 = playerArray[4];

  if (dealerAce1) {
    if (bustChecker(dealerPoints)) {
      dealerPoints -= 10;
    }
  };
  if (dealerAce2) {
    if (bustChecker(dealerPoints)) {
      dealerPoints -= 10;
    }
  };
  if (dealerAce3) {
    if (bustChecker(dealerPoints)) {
      dealerPoints -= 10;
    }
  };
  if (dealerAce4) {
    if (bustChecker(dealerPoints)) {
      dealerPoints -= 10;
    }
  };
  if (playerAce1) {
    if (bustChecker(playerPoints)) {
      playerPoints -= 10;
    }
  };
  if (playerAce2) {
    if (bustChecker(playerPoints)) {
      playerPoints -= 10;
    }
  };
  if (playerAce3) {
    if (bustChecker(playerPoints)) {
      playerPoints -= 10;
    }
  };
  if (playerAce4) {
    if (bustChecker(playerPoints)) {
      playerPoints -= 10;
    }
  };
  // check player busting first because house wins ties aka casinos suck
  if (bustChecker(playerPoints)) {
    $('#dealer-points').html(dealerPoints);
    $('#player-points').html(playerPoints);
    // playerLose();
    return -100;
  };
  if (bustChecker(dealerPoints)) {
    $('#dealer-points').html(dealerPoints);
    $('#player-points').html(playerPoints);
    // playerWin();
    return 100;
  };



  console.log(dealerPoints + " is dealerPoints");
  console.log(playerPoints + " is playerPoints");
  $('#dealer-points').html(dealerPoints);
  $('#player-points').html(playerPoints);
};

// returns raw sum of card values and ace flag = [points, ace1, ace2, ace3, ace4]
function sumCards(hand) {
  let points = 0;
  let ace1 = false; let ace2 = false; let ace3 = false; let ace4 = false;

  hand.forEach(function(card){
    if (card.point === 1) {
      if (ace3) {ace4 = true;};
      if (ace2) {ace3 = true;};
      if (ace1) {ace2 = true;};
      value = 11;
      ace1 = true}
    else if (card.point === 11) {value = 10}
    else if (card.point === 12) {value = 10}
    else if (card.point === 13) {value = 10}
    else {value = card.point};
    points += value;
  });
  return [points, ace1, ace2, ace3, ace4]
}

// returns true if score over 21
function bustChecker(points) {

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

function deal(){
  $('#deal-button, #radios').attr('class','hidden');
  $('#hit-button, #stand-button').attr('class','');
  printMessage('Good luck!');
  clearTable();
  giveHoleCard();
  givePlayerCard();
  giveDealerCard();
  givePlayerCard();
  checkState();
}

// pops card from deck, displays and adds to hand. calls shuffle if no cards left
function givePlayerCard() {
  card = deck.pop()
  if (card !== undefined) {
    let cardImg = new Image();
    cardImg.id = card.point + "-of-" + card.suit;
    cardImg.src = getCardImageUrl(card)
    cardImg.width = 50;
    cardImg.height = 75;
    playerHand.push(card);
    $('#player-hand').append(cardImg);
    cardImg = {};
  }
  else { // if out of cards
  //  clearTable(); //debug
    shuffleDeck();
    givePlayerCard();
  };
};

// pops card form deck but does not display
function giveHoleCard() {
  card = deck.pop()
  if (card !== undefined){
    let cardImg = new Image();
    cardImg.id = "hole-card";
    cardImg.src = 'images/card_back.png'
    cardImg.width = 50;
    cardImg.height = 75;
    $('#dealer-hand').append(cardImg);
    cardImg = {};
    hole = card;
    console.log(hole);
  }
  else { // if out of cards
  //  clearTable(); //debug
    shuffleDeck();
    giveHoleCard();
  }
};

// pops card from deck, displays and adds to hand. calls shuffle if no cards left
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
  else { // if out of cards
  //  clearTable(); //debug
    shuffleDeck();
    giveDealerCard();
  }
};

function flipHole(){
  card = hole
  if (card !== undefined){
    $('#hole-card').remove();
    let cardImg = new Image();
    cardImg.id = card.point + "-of-" + card.suit;
    cardImg.src = getCardImageUrl(card)
    cardImg.width = 50;
    cardImg.height = 75;
    dealerHand.push(card);
    $('#dealer-hand').prepend(cardImg);
  }
  else {
    alert('Hole card undefined in flipHole function');
  }
};

function dealerStands(){
  printMessage("Dealer stands at "+ dealerPoints +"!");
  return true;
}

function playerStands(){
  playerStanding = true;
  $('#hit-button, #stand-button').attr('class','hidden');
  $('#next-button').attr('class','');
  flipHole();
  giveDealerCard();
  checkState();
};

function printMessage(text){
  $('#messages p').html(text);
};

// resets variables, hands, clears images
function clearTable(){
  dealerHand.forEach(function (card) {discard.push(card);});
  playerHand.forEach(function (card) {discard.push(card);});
  dealerHand = []; playerHand = [];
  var playerPoints = 0; var dealerPoints = 0;
  playerStanding = false; dealerStanding = false;
  $('#dealer-hand img').remove(); $('#player-hand img').remove();
  $('#dealer-points').html(''); $('#player-points').html('');
}

// -1 for player loss,0 for tie, 1 for win, 2 for blackjack, 3 for math
function roundEnd(val) {
  $('#deal-button').attr('class','');
  $('#hit-button, #stand-button, #next-button').attr('class','hidden');
  if (val === -1) {
    printMessage("Sorry, you lost.")
  }
  else if (val === 0) {
    printMessage("You tied with the dealer.")
  }
  else if (val === 1) {
    printMessage("Congratulations, you won!")
  }
  else if (val === 2) {
    printMessage("Congratulations, you got a blackjack!")
  }
  else if (val === 3) {
    if (dealerPoints > playerPoints) {
      roundEnd(-1);
    }
    else if (playerPoints > dealerPoints) {
      roundEnd(1);
    }
    else {roundEnd(0)}; // this should not be called
  }
};

function printDeck() { // debug
  console.log(deck);
};

$(document).ready(function () {
  generateDeck();
  shuffleDeck();
  printMessage("How about some blackjack?")

  $('#deal-button').click(deal);

  $('#hit-button').click(function () {
    givePlayerCard();
    checkState();
  });

  $('#stand-button').click(playerStands);

  $('#next-button').click(function () {
    giveDealerCard();
    checkState();
  });

});