// "deal-button">
// "hit-button">
// "stand-button">

// alert('loaded')

var deck = [];
var discard = [];
var playerHand = [];
var dealerHand = [];
var playerPoints = 0;
var dealerPoints = 0;

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
  let shuffledDeck = [];
  while (discard.length !== 0){
    let card = discard.splice(Math.floor(Math.random() * discard.length), 1)[0];
    console.log(card.point, card.suit)
    shuffledDeck.push(card);
  };
  deck = shuffledDeck;
};

function calculatePointsOld() {
  let value = 0;
  let points = 0;
  let ace = false;
  let hands = [dealerHand, playerHand];
  let scores = [dealerPoints, playerPoints];
  for (i = 0; i < 2; i++) {
    let hand = hands[i];
    hand.forEach(function(card){
      if (card.point === 1) {value = 11; ace = true}
      else if (card.point === 11) {value = 10}
      else if (card.point === 12) {value = 10}
      else if (card.point === 13) {value = 10}
      else {value = card.point};
      points += value;
    });

    if (points > 21) {
      if (ace === true) {
        points -= 10;
        if (bustChecker(points)) {
          // bust
          alert('Busted!');
          clearTable()
        }
        else {
        }
      };
    }
    else if (points === 21) {
      // win
      alert('Win!');
      clearTable();
    }
    else if (points < 21) {

        if (i === 0){
          dealerPoints = points;
        }
        else if (i === 1){
          playerPoints = points;
        }
        else {alert('error in points checker')}

      }
    else {
      alert('Error in calculatePoints ace checking function')
    };
    if (bustChecker(hand)) {
      // bust
      alert('Bust!')
    }
  };
  console.log(dealerPoints + " is dealerPoints");
  console.log(playerPoints + " is playerPoints");
  $('#dealer-points').html(dealerPoints);
  $('#player-points').html(playerPoints);
};

// runs calculatePoints and ends game if over
function checkState() {
  if (calculatePoints() === -100) {
    alert("You lose!"); // alert is quite temporary
    // playerLose() for future scorekeeping
    clearTable();
  }
  else if (calculatePoints() === 100) {
    alert("You win!"); // alert is quite temporary
    // playerWin() for future scorekeeping
    clearTable();
  }
  else {};
};

// master points calculation function
function calculatePoints() {
  let dealerArray = sumCards(dealerHand); // [points, ace-flag]
  let playerArray = sumCards(playerHand);
  dealerPoints = dealerArray[0];
  dealerAce = dealerArray[1];
  playerPoints = playerArray[0];
  playerAce = playerArray[1];
  
  if (dealerAce) {
    console.log('dealer has ace');
    if (bustChecker(dealerPoints)) {
      dealerPoints -= 10;
    }
  };
  if (playerAce) {
    console.log('player has ace');
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

// returns raw sum of card values and ace flag = [points, ace-flag]
function sumCards(hand) {
  let points = 0;
  let ace = false;
  hand.forEach(function(card){
    if (card.point === 1) {value = 11; ace = true}
    else if (card.point === 11) {value = 10}
    else if (card.point === 12) {value = 10}
    else if (card.point === 13) {value = 10}
    else {value = card.point};
    points += value;
  });
  return [points, ace]
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
    clearTable(); //debug
    shuffleDeck();
    givePlayerCard();
  };
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
    clearTable(); //debug
    shuffleDeck();
    giveDealerCard();
  }
};

function clearTable(){
  dealerHand.forEach(function (card) {discard.push(card);});
  playerHand.forEach(function (card) {discard.push(card);});
  $('#dealer-hand img').remove();
  $('#player-hand img').remove();
  $('#dealer-points').html('');
  $('#player-points').html('');
}

function printDeck() { // debug
  console.log(deck);
};

$(document).ready(function () {

  generateDeck();
  shuffleDeck();

  $('#play-button').click(function () {

  });

  $('#deal-button').click(function () {
    giveDealerCard();
    givePlayerCard();
    giveDealerCard();
    givePlayerCard();
    checkState();
  });

  $('#hit-button').click(function () {
    givePlayerCard();
    checkState();
    giveDealerCard();
    checkState();
  });

  // $('#stand-button').click(function () {
  //
  // });

  $('#stand-button').click(function () {
    giveDealerCard();
    checkState();
  });


})
