import chai from 'chai';
import Phaser from 'phaser';

const {expect} = chai;
const {Game, Scene, GameObjects} = Phaser;

class TestScene extends Scene {
    constructor() {
        super({key: 'TestScene'});
    }

    init() {
        this.player = new GameObjects.Sprite(this, 50, 50, 'player');
        this.add.existing(this.player);
    }
}

describe('Phaser', () => {
    let game;
    beforeEach(() => {
        const config = {
            type: Phaser.HEADLESS,
            width: 800,
            height: 600,
            scene: TestScene
        };
        game = new Game(config);
    });

    afterEach(() => {
        game.destroy(true);
    });

    it('should create a game instance', () => {
        expect(game).to.be.an.instanceOf(Game);
    });
});