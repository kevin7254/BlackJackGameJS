import 'phaser';
import {config} from "./config.js";
import Button from "./button.js";
import {log} from "debug";
import ChipsContainer from "./chipsContainer.js";

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
        this.load.spritesheet('chips', 'pokerchips.png', {frameWidth: 76, frameHeight: 76});
        this.cardAtlas = this.createCards();
        this.pokerChips = this.createChips();

        this.dealer = {
            showDealerCards: {
                one: {x: 860, y: 150},
                two: {x: 920, y: 150},
            },
            cardStash: {},
        };
        for (let i = 0; i < 3; i++) {
            const cardStashCard = this.add.sprite(1500 - (i * 10), 100 + (i * 10),
                'cards', this.cardAtlas['hearts-blank']);
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

        const button = new Button(this, 200, 200, 'Start', () => console.log('start'))

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
        this.addCardEventListener();

        const dealButton = new Button(this, 100, 200, 'Deal', this.dealCards);
        const resetButton = new Button(this, 100, 250, 'Reset', this.resetGame);
        const shuffleButton = new Button(this, 100, 300, 'Shuffle', this.shuffleDeck);
        const showDealerCardsButton = new Button(this, 100, 350, 'Show Dealer', this.showDealerCards);
        const hideDealerCardsButton = new Button(this, 100, 400, 'Hide Dealer', this.hideDealerCards);
        const showPlayerCardsButton = new Button(this, 100, 450, 'show Player', this.showPlayerCards);

        new ChipsContainer(this);
    };

    dealCards(i = 0) {
        const x1 = this.coordinatesForPlayerCards[i].one.x;
        const y1 = this.coordinatesForPlayerCards[i].one.y;
        const x2 = this.coordinatesForPlayerCards[i].two.x;
        const y2 = this.coordinatesForPlayerCards[i].two.y;

        const kingOfHearts = this.add.sprite(x1, y1, 'cards', this.cardAtlas[this.getRandomCard()]);
        kingOfHearts.setScale(0.9);
        const queenOfHearts = this.add.sprite(x2, y2, 'cards', this.cardAtlas[this.getRandomCard()]);
        queenOfHearts.setScale(0.9);
    }

    dealChips(i = 0) {
        const x1 = this.coordinatesForPlayerCards[i].one.x;
        const y1 = this.coordinatesForPlayerCards[i].one.y;
        const x2 = this.coordinatesForPlayerCards[i].two.x;
        const y2 = this.coordinatesForPlayerCards[i].two.y;

        const array = Object.keys(this.pokerChips);
        //return array[Math.floor(Math.random() * 60)];

        const kingOfHearts = this.add.sprite(x1, y1, 'chips', this.pokerChips[array[5]]);
        kingOfHearts.setScale(0.9);
        const queenOfHearts = this.add.sprite(x2, y2, 'chips', this.pokerChips[array[8]]);
        queenOfHearts.setScale(0.9);
    }

    resetGame() {
        this.scene.restart();
    }

    shuffleDeck() {
        this.cardAtlas = this.createCards();
    }

    showDealerCards() {
        const dealerDownCard = this.add.sprite(860, 150, 'cards', this.cardAtlas[this.getRandomCard()]);
        const dealerDownCard2 = this.add.sprite(920, 150, 'cards', this.cardAtlas['hearts-blank']);
    }

    hideDealerCards() {
        const dealerDownCard = this.add.sprite(860, 150, 'cards', this.cardAtlas['hearts-blank']);
        const dealerDownCard2 = this.add.sprite(920, 150, 'cards', this.cardAtlas['hearts-blank']);
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

    createChips() {
        const color = ['pink', 'gray', 'black'];
        const value = ['1', '5', '25', '50', '100'];

        const pokerChips = {};

        for (let colorIndex = 0; colorIndex < color.length; colorIndex++) {
            for (let valueIndex = 0; valueIndex < value.length; valueIndex++) {
                const pokerChipKey = `${color[colorIndex]}-${value[valueIndex]}`;
                pokerChips[pokerChipKey] = colorIndex * 5 + valueIndex;
            }
        }
        return pokerChips;
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

    addCardEventListener() {
        for (let i = 0; i <= 5; i++) {
            const baseX = 321;
            const cardWidth = 192;
            const cardSpacing = 34;
            const xOffset = i * (cardWidth + cardSpacing);

            const x = baseX + xOffset + i;



            const rec = this.add.rectangle(x, 616, 146, 192)
                .setInteractive()
                .on('pointerdown', () => {
                    this.dealChips(i);
                })
                .on('pointerover', () => {
                    //Make the rec white
                    rec.setStrokeStyle(2, 0xffffff);

                    this.tweens.add({
                        targets: rec,
                        duration: 20,
                        scaleX: 1.05,
                        scaleY: 1.05,
                        ease: 'Sine.easeInOut',
                    });
                })
                .on('pointerout', () => {
                    this.tweens.killTweensOf(rec);
                    rec.setScale(1, 1);
                    rec.setStrokeStyle(2, 0x000000);
                });
            rec.setStrokeStyle(2, 0x000000);
            rec.setFillStyle(0x000000, 0.5);

            const text = this.add.text(x - 65, 550, 'PLACE BET', {
                fontFamily: 'Arial',
                fontSize: 24,
                color: '#ffffff'
            });
        }
    }
}

config.scene = Example;

const game = new Phaser.Game(config);

export default Example;