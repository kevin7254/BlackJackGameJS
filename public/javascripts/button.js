/**
 * @class
 * @extends {Phaser.GameObjects.Text}
 */
class Button extends Phaser.GameObjects.Text {
    /**
     * Create a new Button.
     * @param {Phaser.Scene} scene - The scene to which the button belongs.
     * @param {number} x - The x-coordinate of the button.
     * @param {number} y - The y-coordinate of the button.
     * @param {string} label - The text label of the button.
     * @param {function} callback - The callback function to be executed when the button is clicked.
     * @param {Phaser.GameObjects.Types.TextStyle} [style] - The style properties to be set on the text.
     */
    constructor(scene, x, y, label, callback, style) {
        super(scene, x, y, label, style);

        // Add the button to the scene
        scene.add.existing(this);

        // Set the callback function
        this.callback = callback;

        // Set the button's interactivity
        this.setInteractive({useHandCursor: true});

        // Handle the pointer events
        this.on('pointerdown', () => {
            this.callback.call(scene);
        });

        this.setOrigin(0.5)
            .setPadding(10)
            .setStyle({backgroundColor: '#111'});
    }
}

export default Button;