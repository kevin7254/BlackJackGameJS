import Phaser from 'phaser';

export const config = {
    type: Phaser.AUTO,
    width: 1820,
    height: 880,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: null
};