class ChipsContainer {

    /**
     *
     * @param {Phaser.Scene} scene - The scene to which the rectangle belongs.
     */
    constructor(scene) {
        const width = Number(scene.game.config.width);
        /**
         * Background rectangle for the chips container.
         * @type {Phaser.GameObjects.Rectangle}
         */
        const rec = scene.add.rectangle(width / 2, 800, width, 157);
        console.log(scene.game.config.width)
        rec.setStrokeStyle(2, 0x000000);
        rec.setFillStyle(0x000000, 0.5);

        const centerRec = scene.add.rectangle(5, 5, 700, 50);
        Phaser.Display.Align.In.Center(centerRec, rec, 0, -35);
        centerRec.setOrigin(0.5);
        centerRec.setFillStyle(0x000000, 0.5);

        const text = scene.add.text(0, 0, 'PLACE BET', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff'
        });
        Phaser.Display.Align.In.Center(text, centerRec);

        const bankRec = scene.add.rectangle(5, 5, 200, 50);
        Phaser.Display.Align.In.Center(bankRec, rec, -275, 35);
        bankRec.setOrigin(0.5);
        bankRec.setFillStyle(0x000000, 0.5);

        const bankText = scene.add.text(0, 0, 'BANK:        1000.00', { //TODO: Add bank amount
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff'
        });
        Phaser.Display.Align.In.Center(bankText, bankRec, -10);

        const minusBetButton = scene.add.circle(0, 0, 25, 0x000000);
        Phaser.Display.Align.In.Center(minusBetButton, bankRec, 135);
        minusBetButton.setInteractive({useHandCursor: true});
        minusBetButton.setStrokeStyle(2, 0x000000);
        minusBetButton.on('pointerdown', () => {
            console.log('clicked');
        });

        const minusText = scene.add.text(minusBetButton.x, minusBetButton.y, '-', {fontSize: '48px', color: '#ffffff'});
        minusText.setOrigin(0.5);

        const betRec = scene.add.rectangle(5, 5, 200, 50);
        Phaser.Display.Align.In.Center(betRec, bankRec, 270);
        betRec.setOrigin(0.5);
        betRec.setFillStyle(0x000000, 0.5);

        const betText = scene.add.text(0, 0, 'BET:           0.00', { //TODO: Add bet amount
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff'
        });
        Phaser.Display.Align.In.Center(betText, betRec, -15);

        const plusBetButton = scene.add.circle(0, 0, 25, 0x000000);
        Phaser.Display.Align.In.Center(plusBetButton, betRec, 135);
        plusBetButton.setInteractive({useHandCursor: true});
        plusBetButton.setStrokeStyle(2, 0x000000);
        plusBetButton.on('pointerdown', () => {
            console.log('clicked');
        });

        const plusText = scene.add.text(plusBetButton.x, plusBetButton.y, '+', {fontSize: '48px', color: '#ffffff'});
        plusText.setOrigin(0.5);

        const winningsRec = scene.add.rectangle(5, 5, 200, 50);
        Phaser.Display.Align.In.Center(winningsRec, betRec, 270);
        winningsRec.setOrigin(0.5);
        winningsRec.setFillStyle(0x000000, 0.5);

        const winningsText = scene.add.text(0, 0, 'WINNINGS:  0.00', { //TODO: Add winnings amount
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff'
        });
        Phaser.Display.Align.In.Center(winningsText, winningsRec, -15);
    }
}

export default ChipsContainer;