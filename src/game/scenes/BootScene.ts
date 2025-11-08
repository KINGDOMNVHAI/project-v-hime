import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
    constructor() { super("BootScene"); }

    preload() {
        this.load.image("card", "/assets/cards/card1.png");

    }

    create() {
        this.scene.start("MenuScene");
    }
}
