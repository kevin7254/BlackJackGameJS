import 'phaser';
import {config} from "./config.js";

class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.setBaseURL('images/');

        this.load.image('board', 'board.png');
        this.load.spritesheet('cards', 'cards.png', { frameWidth: 100, frameHeight: 144 });
    };

    create() {
        const img = this.add.image(0, 0, 'board').setOrigin(0, 0);

        // Calculate the scaling factors for width and height
        const scaleX = 1820 / img.width;
        const scaleY = 880 / img.height;

        // Set the scale of the background image
        img.setScale(scaleX, scaleY);
        this.cardAtlas = this.createCards();

        const kingOfHearts = this.add.sprite(295, 617, 'cards', this.cardAtlas['clubs-10']);
        kingOfHearts.setScale(0.9);
        const queenOfHearts = this.add.sprite(349, 617, 'cards', this.cardAtlas['diamonds-2']);
        queenOfHearts.setScale(0.9);

        for(let i = 0; i < 3; i++) {
            const dealerCard1 = this.add.sprite(1500 - (i * 10), 100 + (i * 10), 'cards', this.cardAtlas['hearts-blank']);
            dealerCard1.setRotation(-0.85);
        }
        const dealerDownCard = this.add.sprite(860, 150, 'cards', this.cardAtlas['hearts-4']);
        const dealerDownCard2 = this.add.sprite(920, 150, 'cards', this.cardAtlas['hearts-blank']);

    };


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
}
config.scene = Example;

const game = new Phaser.Game(config);

export default Example;