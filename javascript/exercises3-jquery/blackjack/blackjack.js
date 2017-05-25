
class Card {
  constructor (point, suit) {
    this.suit = suit;
    this.point = point;
    this.url = this.getImageUrl()
    this.id = this.point + "-of-" + this.suit;
  };
  getImageUrl() {
    let val = this.point;
    if (val === 1){val = 'ace'}
    else if (val === 11){val = 'jack'}
    else if (val === 12){val = 'queen'}
    else if (val === 13){val = 'king'}
    let suit = this.suit;
    let url = "images/" + val + "_of_" + suit + ".png"
    return url;
  };
};

class Hand {
  constructor (playerFlag) {
    this.player = playerFlag;
    this.cards = [];
    this.points = 0;
    this.hole = {};
  };

  addCard(){
    let cardArray = deck.draw(); // [card, cardImg]
    this.cards.push(cardArray[0]);
    if (this.player) {
      $('#player-hand').append(cardArray[1]);
    }
    else {
      $('#dealer-hand').append(cardArray[1]);
    }
  };

  addHoleCard() {
    let cardArray = deck.draw(); // [card, cardImg]
    let card = cardArray[0];
    let cardImg = cardArray[1];
    cardImg.id = "hole-card";
    cardImg.alt = "hole card";
    cardImg.src = 'images/card_back.png'
    // cardImg.width = 50;
    // cardImg.height = 75;
    $('#dealer-hand').append(cardImg);
    this.hole = card;

  };

  flipHole(){
    let card = this.hole;
    if (card !== undefined){
      //$('#hole-card').remove();
      //let cardImg = new Image();
      //cardImg.id = card.point + "-of-" + card.suit;
      //cardImg.src = card.url;
      //cardImg.width = 50;
      //cardImg.height = 75;
      $('#hole-card').attr('src', card.url);
      $('#hole-card').attr('alt', card.point + "-of-" + card.suit);
      dealerHand.cards.push(card);
      //$('#dealer-hand').prepend(cardImg);
    }
    else {
      alert('Hole card undefined in flipHole function');
    }
  };

  calculatePoints(){
    let handArray = this.sumCards();

    this.points = handArray[0];
    let ace1 = handArray[1];
    let ace2 = handArray[2];
    let ace3 = handArray[3];
    let ace4 = handArray[4];

    if (ace1) {
      if (this.bustChecker(this.points)) {
        this.points -= 10;
      }
    };
    if (ace2) {
      if (this.bustChecker(this.points)) {
        this.points -= 10;
      }
    };
    if (ace3) {
      if (this.bustChecker(this.points)) {
        this.points -= 10;
      }
    };
    if (ace4) {
      if (this.bustChecker(this.points)) {
        this.points -= 10;
      }
    };

    if (this.bustChecker(this.points)) {
      // busted
      return -100;
    };
  };

  // returns raw sum of card values and ace flag = [points, ace1, ace2, ace3, ace4]
  sumCards(){
    let points = 0;
    let value = 0;
    let ace1 = false; let ace2 = false; let ace3 = false; let ace4 = false;

    this.cards.forEach(function(card){
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

  // returns true if over 21
  bustChecker(points){
     if (points > 21) {
       return true;
     }
     else {
       return false;
     }
   }
};

class Deck {
  constructor (numDecks) {
    this.deck = [];
    this.discard = [];
    this.generateDeck(numDecks);
    this.shuffleDeck();
  };

  clearDeck(){
    this.deck = [];
  };

  generateDeck(){
    let suitvar = 'default';
    for (let i = 0; i < 4; i++) {
      if (i === 0) {suitvar = 'hearts'}
      else if (i === 1) {suitvar = 'diamonds'}
      else if (i === 2) {suitvar = 'spades'}
      else if (i === 3) {suitvar = 'clubs'};
      for (let i = 1; i < 14; i++) {
        let card = new Card(i, suitvar);
        this.discard.push(card);
      };
    };
  };

  shuffleDeck(){
    printMessage("Deck shuffled!")
    let shuffledDeck = [];
    while (this.discard.length !== 0){
      let card = this.discard.splice(Math.floor(Math.random() * this.discard.length), 1)[0];
      console.log(card.point, card.suit)
      shuffledDeck.push(card);
    };
    this.deck = shuffledDeck;
  };

  draw () {
    let card = this.deck.pop();
    if (card !== undefined) {
      let cardImg = new Image();
      cardImg.id = card.id;
      cardImg.alt = card.id;
      cardImg.src = card.url;
      cardImg.width = 100;
      cardImg.height = 150;
      return [card, cardImg];
    }
    else { // if out of cards then do above
    //  clearTable(); //debug
      this.shuffleDeck();
      card = this.deck.pop();
      let cardImg = new Image();
      cardImg.id = card.id;
      cardImg.alt = card.id;
      cardImg.src = card.url;
      cardImg.width = 100;
      cardImg.height = 150;
      return [card, cardImg];
    };
  };
};

// runs calculatePoints and ends game if over
function checkState() {
  let dPoints = dealerHand.calculatePoints();
  let pPoints = playerHand.calculatePoints();
  $('#dealer-points').html(dealerHand.points);
  $('#player-points').html(playerHand.points);

  /* ORDER OF STATEMENTS
  Player bust > Dealer bust > Player 5 cards > both standing > dealer 17+
  > both 21 (resolved by hand size) > dealer 21 > player 21

  */
  if (pPoints === -100) {
    //player busts
    roundEnd(-1);
  }
  else if (dPoints === -100) {
    // dealer busts
    roundEnd(1);
  }
  else if (playerHand.cards.length === 5) {
    printMessage("You have five cards; you have to stand with your score of "+playerHand.points+".");
    playerStands();
  }

  else if (dealerStanding == true && playerStanding == true){
    roundEnd(3);
  }

  else if ((dealerHand.points >= 17 && playerStanding === true) || (dealerHand.cards.length === 5)) {
    dealerStanding = dealerStands();
    checkState();
  }

  else if (dealerHand.points === 21 && playerHand.points === 21) {
    if (dealerHand.cards.length === playerHand.cards.length) {
      roundEnd(0);
    }
    else if (dealerHand.cards.length === 2 && playerHand.cards.length > 2) { //blackjacks win ties
      roundEnd(-1);
    }
    else if (playerHand.cards.length === 2 && dealerHand.cards.length > 2) { //blackjacks win ties
      roundEnd(1);
    }
  }

  else if (dealerHand.points === 21) {
    roundEnd(-1);
  }

  else if (playerHand.points === 21) {
    if (playerHand.cards.length === 2) {
      printMessage('You stand with your blackjack.');
      playerStands();
    }
    else {
      printMessage('You stand at 21.');
      playerStands();
    };
  }
  // else {alert('error in checkState')};
};

function deal(){
  $('#deal-button, #radios').attr('class','hidden');
  $('#hit-button, #stand-button').attr('class','');
  printMessage('Good luck!');
  clearTable();
  dealerHand.addHoleCard();
  playerHand.addCard();
  dealerHand.addCard();
  playerHand.addCard();
  checkState();
}

function dealerStands(){
  printMessage("Dealer stands at "+ dealerHand.points +"!");
  return true;
}

function playerStands(){
  playerStanding = true;
  $('#hit-button, #stand-button').attr('class','hidden');
  $('#next-button').attr('class','');
  dealerHand.flipHole();
};

function printMessage(text){
  $('#messages p').html(text);
};

// resets variables, hands, clears images
function clearTable(){
  dealerHand.cards.forEach(function (card) {deck.discard.push(card);});
  playerHand.cards.forEach(function (card) {deck.discard.push(card);});
  dealerHand.cards = []; playerHand.cards = [];
  playerHand.points = 0; dealerHand.points = 0;
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
    if (dealerHand.points > playerHand.points) {
      roundEnd(-1);
    }
    else if (playerHand.points > dealerHand.points) {
      roundEnd(1);
    }
    else {roundEnd(0)}; // this should not be called
  }
};

function printDeck() { // debug
  console.log(deck);
};

$(document).ready(function () {
  var playerStanding = false;
  var dealerStanding = false;
  deck = new Deck();
  playerHand = new Hand(true); // true sets player flag
  dealerHand = new Hand(false);

  printMessage("How about some blackjack?")

  $('#deal-button').click(deal);

  $('#hit-button').click(function () {
    playerHand.addCard();
    checkState();
  });

  $('#stand-button').click(function () {
    printMessage("You stand at "+ playerHand.points + "!");
    playerStands();
    checkState();
  });

  $('#next-button').click(function () {
    if (!dealerStanding) {
      dealerHand.addCard();
    };
    checkState();
  });

});
