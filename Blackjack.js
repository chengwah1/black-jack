//Card variable
let suits = ['Heart','Club','Diamonds','Spades'];
let values = ['Ace','Kings','Queen','Jack','Ten','Nine',
        'Eight','Seven','Six','Five','Four','Three','Two','One'];

//DOM var
let textArea = document.getElementById('textArea');
let newGame = document.getElementById('new-game');
let hitMe = document.getElementById('hitme');
let stay = document.getElementById('stay');

let playerScore = 0,
    dealerScore = 0,
    gameStarted = false,
    gameOver = false,
    dealerCard = [],
    playerCards = [],
    deck = [],
    playerWon = false;

hitMe.style.display = 'none';
stay.style.display = 'none';
showStatus();

newGame.addEventListener('click', function(){
    
    gameStarted = true,
    gameOver = false,
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCard = [getNextCard(),getNextCard()];
    playerCards = [getNextCard(),getNextCard()];
    newGame.style.display = 'none';
    hitMe.style.display = 'inline';
    stay.style.display = 'inline';
    showStatus();
});

hitMe.addEventListener('click',function(){
    playerCards.push(getNextCard());
    checkforGameend();
    showStatus();
})
stay.addEventListener('click',function(){
    gameOver = true;
    checkforGameend();
    showStatus();
})

function createDeck(){
    deck = [];
    for (let i = 0; i< suits.length; i ++)
        for (let j = 0; j< values.length; j ++){
            let card = {suits: suits[i],
                        values: values[j]}
            deck.push(card);
        };
return deck;
};

function getNextCard(){
    return deck.shift();
};

function getCardString(card){
    return card.values + ' of ' + card.suits;
};

function shuffleDeck(deck){
    for(let i = 0; i <deck.length; i++){
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    };
};

function showStatus(){
    if (!gameStarted){
        textArea.innerText = 'Welcome to Black Jack!';
        return;
    }
    dealerCardString = '';
    for (let i = 0; i < dealerCard.length; i++ ){
        dealerCardString += getCardString(dealerCard[i]) +'\n';
    }
    playerCardString = '';
    for (let i = 0; i < playerCards.length; i++ ){
        playerCardString += getCardString(playerCards[i]) +'\n';
    }
    updateScore();
    textArea.innerText = ('Dealer has : \n' + dealerCardString + '(Score: ' + dealerScore +')'+ '\n') +
    ('You have : \n' + playerCardString + '(Score: ' + playerScore+')');

    if (gameOver){
        if(playerWon){
            textArea.innerText += '\n \nYou Win'
        }
        else {
            textArea.innerText += '\n \nDealer Win'
        }
        newGame.style.display = 'inline';
        hitMe.style.display = 'none';
        stay.style.display = 'none';
    }
};

function updateScore(){
    dealerScore = getScore(dealerCard);
    playerScore = getScore(playerCards);
};

function getScore(cardinhand){
    let score = 0;
    let hasAce = false;
    for (let i = 0; i<cardinhand.length;i++){
        score += getCardNumericValue(cardinhand[i]);
        if(cardinhand[i].values == 'Ace'){
            hasAce = true;
        }
    }
    if (hasAce == true && score + 10 <= 21){
        return score + 10;
    }
    return score;
};

function getCardNumericValue(card){
    switch(card.values){
        case 'Ace': return 1;
        case 'Two': return 2;
        case 'Three': return 3;
        case 'Four': return 4;
        case 'Five': return 5;
        case 'Six': return 6;
        case 'Seven': return 7;
        case 'Eight': return 8;
        case 'Nine': return 9;
        default : return 10;
    }
}

function checkforGameend(){
    updateScore()

    if (gameOver){
        while(dealerScore< playerScore && dealerScore<22 && playerScore< 22){
            dealerCard.push(getNextCard());
            updateScore();
        }
        
    }
    if (playerScore>21){
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21){
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver){
        if (playerScore>dealerScore){
            playerWon = true;
        }
        else if(dealerScore>playerScore){
            playerWon = false;
        }

    }
}