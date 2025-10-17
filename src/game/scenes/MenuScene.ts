import * as Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image("card", "/assets/cards/card1.png");
        this.load.image("buttonGacha", "/assets/ui/buttonGacha.png");
    }

    create() {
        this.add.image(400, 300, "card").setScale(0.5);
        this.add.text(250, 50, "Welcome to NFT Card Game!", {
            fontSize: "24px",
            color: "#fff",
        });

        const button = this.add.image(400, 500, "buttonGacha").setInteractive();

        button.on("pointerover", () => {
            button.setScale(1.1);
        });

        button.on("pointerout", () => {
            button.setScale(1);
        });

        button.on("pointerdown", () => {
            this.scene.start("GachaScene");
        });
    }
}
