import 'phaser';
import {config} from "./config.js";

class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    init() {
    }

    preload() {
        this.load.setBaseURL('images/');

        this.load.image('board', 'board.png');
        this.load.spritesheet('cards', 'cards.png', {frameWidth: 100, frameHeight: 144});
        this.cardAtlas = this.createCards();

        this.dealer = {
            showDealerCards: {
                one: {x: 860, y: 150},
                two: {x: 920, y: 150},
            },
            cardStash: {},
        };
        for (let i = 0; i < 3; i++) {
            const cardStashCard = this.add.sprite(1500 - (i * 10), 100 + (i * 10), 'cards', this.cardAtlas['hearts-blank']);
            cardStashCard.setRotation(-0.85);
            this.dealer.cardStash[i] = cardStashCard;
        }

        console.log(this.dealer);

        //Get the coordinates for the cards
        this.coordinatesForPlayerCards = [
            {
                one: {x: 295, y: 617}, //FIRST CARD
                two: {x: 349, y: 617}, //DIFFERENCE BETWEEN X IS 54, Y IS 0
            },
            {
                one: {x: 0, y: 617}, //SECOND CARD, DIFF BETWEEN CARD ONE AND CARD TWO IS 225
                two: {x: 0, y: 617},
            },
            {
                one: {x: 0, y: 617},
                two: {x: 0, y: 617},
            },
            {
                one: {x: 0, y: 617},
                two: {x: 0, y: 617},
            },
            {
                one: {x: 0, y: 617},
                two: {x: 0, y: 617},
            },
            {
                one: {x: 0, y: 617},
                two: {x: 0, y: 617},
            },
        ];
        for (let i = 1; i <= 5; i++) {
            const x1 = this.coordinatesForPlayerCards[0].one.x;
            const tempX = this.coordinatesForPlayerCards[i].one.x += x1 + (227 * i); //TODO: MAke better
            this.coordinatesForPlayerCards[i].two.x += tempX + 54;
        }
    };

    create() {
        const img = this.add.image(0, 0, 'board').setOrigin(0, 0);

        // Calculate the scaling factors for width and height
        const scaleX = 1820 / img.width;
        const scaleY = 880 / img.height;

        // Set the scale of the background image
        img.setScale(scaleX, scaleY);

        const x1 = this.coordinatesForPlayerCards[5].one.x;
        const y1 = this.coordinatesForPlayerCards[5].one.y;
        const x2 = this.coordinatesForPlayerCards[5].two.x;
        const y2 = this.coordinatesForPlayerCards[5].two.y;

        const kingOfHearts = this.add.sprite(x1, y1, 'cards', this.cardAtlas[this.getRandomCard()]);
        kingOfHearts.setScale(0.9);
        const queenOfHearts = this.add.sprite(x2, y2, 'cards', this.cardAtlas[this.getRandomCard()]);
        queenOfHearts.setScale(0.9);

        for (let i = 0; i < 3; i++) {
            const dealerCard1 = this.add.sprite(1500 - (i * 10), 100 + (i * 10), 'cards', this.cardAtlas['hearts-blank']);
            dealerCard1.setRotation(-0.85);
        }
        console.log(Object.keys(this.cardAtlas));
        console.log(this.getRandomCard());
        const dealerDownCard = this.add.sprite(860, 150, 'cards', this.cardAtlas[this.getRandomCard()]);
        const dealerDownCard2 = this.add.sprite(920, 150, 'cards', this.cardAtlas['hearts-blank']);

        //Add a button to deal cards
        const dealButton = this.add.text(100, 200, 'Deal', {fill: '#FFFFFF'})
            .setInteractive()
            .on('pointerdown', () => this.dealCards());

        //Add a button to reset the game
        const resetButton = this.add.text(100, 250, 'Reset', {fill: '#FFFFFF'})
            .setInteractive()
            .on('pointerdown', () => this.resetGame());

        //Add a button to shuffle the deck
        const shuffleButton = this.add.text(100, 300, 'Shuffle', {fill: '#FFFFFF'})
            .setInteractive()
            .on('pointerdown', () => this.shuffleDeck());

        //Add a button to show the dealer's cards
        const showDealerCardsButton = this.add.text(100, 350, 'Show Dealer Cards', {fill: '#FFFFFF'})
            .setInteractive()
            .on('pointerdown', () => this.showDealerCards());

        //Add a button to hide the dealer's cards
        const hideDealerCardsButton = this.add.text(100, 400, 'Hide Dealer Cards', {fill: '#FFFFFF'})
            .setInteractive()
            .on('pointerdown', () => this.hideDealerCards());

        //Add a button to show the player's cards
        const showPlayerCardsButton = this.add.text(100, 450, 'Show Player Cards', {fill: '#FFFFFF'})
            .setInteractive()
            .on('pointerdown', () => this.showPlayerCards());

    };

    dealCards() {
        const x1 = this.coordinatesForPlayerCards[3].one.x;
        const y1 = this.coordinatesForPlayerCards[3].one.y;
        const x2 = this.coordinatesForPlayerCards[3].two.x;
        const y2 = this.coordinatesForPlayerCards[3].two.y;

        const kingOfHearts = this.add.sprite(x1, y1, 'cards', this.cardAtlas[this.getRandomCard()]);
        kingOfHearts.setScale(0.9);
        const queenOfHearts = this.add.sprite(x2, y2, 'cards', this.cardAtlas[this.getRandomCard()]);
        queenOfHearts.setScale(0.9);
    }

    resetGame() {
        this.scene.restart();
    }

    shuffleDeck() {
        this.cardAtlas = this.createCards();
    }

    showDealerCards() {
        const x1 = this.coordinatesForPlayerCards[0].one.x;
        const y1 = this.coordinatesForPlayerCards[0].one.y;
        const x2 = this.coordinatesForPlayerCards[0].two.x;
        const y2 = this.coordinatesForPlayerCards[0].two.y;

        const kingOfHearts = this.add.sprite(x1, y1, 'cards', this.cardAtlas[this.getRandomCard()]);
        kingOfHearts.setScale(0.9);
        const queenOfHearts = this.add.sprite(x2, y2, 'cards', this.cardAtlas[this.getRandomCard()]);
        queenOfHearts.setScale(0.9);
    }

    hideDealerCards() {
        const x1 = this.coordinatesForPlayerCards[0].one.x;
        const y1 = this.coordinatesForPlayerCards[0].one.y;
        const x2 = this.coordinatesForPlayerCards[0].two.x;
        const y2 = this.coordinatesForPlayerCards[0].two.y;

        const kingOfHearts = this.add.sprite(x1, y1, 'cards', this.cardAtlas['hearts-blank']);
        kingOfHearts.setScale(0.9);
        const queenOfHearts = this.add.sprite(x2, y2, 'cards', this.cardAtlas['hearts-blank']);
        queenOfHearts.setScale(0.9);
    }

    showPlayerCards() {
        const x1 = this.coordinatesForPlayerCards[5].one.x;
        const y1 = this.coordinatesForPlayerCards[5].one.y;
        const x2 = this.coordinatesForPlayerCards[5].two.x;
        const y2 = this.coordinatesForPlayerCards[5].two.y;

        const kingOfHearts = this.add.sprite(x1, y1, 'cards', this.cardAtlas[this.getRandomCard()]);
        kingOfHearts.setScale(0.9);
        const queenOfHearts = this.add.sprite(x2, y2, 'cards', this.cardAtlas[this.getRandomCard()]);
        queenOfHearts.setScale(0.9);
    }


    createCards() {
        const suits = ['clubs', 'diamonds', 'spades', 'hearts'];
        const ranks = [
            'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', '?', 'blank'
        ];

        const cardAtlas = {};

        for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
            for (let rankIndex = 0; rankIndex < ranks.length; rankIndex++) {
                const cardKey = `${suits[suitIndex]}-${ranks[rankIndex]}`;
                cardAtlas[cardKey] = suitIndex * 15 + rankIndex;
            }
        }
        return cardAtlas;
    }


    update(time, delta) {
        super.update(time, delta);
    };


    getRank(card) {
        return card % 15;
    }

    getSuit(card) {
        return Math.floor(card / 15);
    }

    getCardName(card) {
        const suits = ['clubs', 'diamonds', 'spades', 'hearts'];
        const ranks = [
            'A', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            'J', 'Q', 'K', '?', 'blank'
        ];
        return `${suits[this.getSuit(card)]}-${ranks[this.getRank(card)]}`;
    }

    getRandomCard() {
        const array = Object.keys(this.cardAtlas);
        return array[Math.floor(Math.random() * 60)];
    }
}

config.scene = Example;

const game = new Phaser.Game(config);

export default Example;