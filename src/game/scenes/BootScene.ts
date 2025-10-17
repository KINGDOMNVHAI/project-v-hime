import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
    constructor() { super("BootScene"); }

    preload() {
        this.load.image("menu_bg", "/assets/backgrounds/menu_bg.jpg");
        this.load.image("battle_bg", "/assets/backgrounds/battle_bg.jpg");
        this.load.image("card", "/assets/cards/card1.png");
    }

    create() {
        this.scene.start("MenuScene");
    }
}
