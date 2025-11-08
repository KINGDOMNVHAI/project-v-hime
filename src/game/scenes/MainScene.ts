import * as Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image("bgMenu", "/assets/bg/bg-sea.jpg");
        this.load.image("btnMyPage", "/assets/ui/buttonMyPage.png");
        this.load.image("btnTeam", "/assets/ui/btnTeam.png");
        this.load.image("btnEquipment", "/assets/ui/btnEquipment.png");
        this.load.image("btnGacha", "/assets/ui/btnGacha.png");
        this.load.image("btnMenu", "/assets/ui/buttonMenu.png");
        this.load.image("btnBattle", "/assets/ui/buttonBattle.png");
    }

    create() {
        this.add.image(600, 300, "bgMenu").setOrigin(0.5).setDepth(0);
        // this.add.text(250, 50, "Welcome to NFT Card Game!", {
        //     fontSize: "24px",
        //     color: "#fff",
        // });

        const buttonMyPage = this.add.image(120, 150, "btnMyPage").setInteractive();
        const buttonTeam = this.add.image(120, 300, "btnTeam").setInteractive().setScale(0.15);
        const buttonEquipment = this.add.image(120, 450, "btnEquipment").setInteractive().setScale(0.15);
        const buttonGacha = this.add.image(120, 600, "btnGacha").setInteractive().setScale(0.15);
        const buttonBattle = this.add.image(1000, 500, "btnBattle").setInteractive().setScale(0.55);

        // Animation hover
        buttonTeam.on("pointerover", () => {buttonTeam.setScale(0.17);});
        buttonTeam.on("pointerout", () => {buttonTeam.setScale(0.15);});

        buttonEquipment.on("pointerover", () => {buttonEquipment.setScale(0.17);});
        buttonEquipment.on("pointerout", () => {buttonEquipment.setScale(0.15);});

        buttonGacha.on("pointerover", () => {buttonGacha.setScale(0.17);});
        buttonGacha.on("pointerout", () => {buttonGacha.setScale(0.15);});

        buttonBattle.on("pointerover", () => {buttonBattle.setScale(0.52);});
        buttonBattle.on("pointerout", () => {buttonBattle.setScale(0.5);});

        // Event click
        buttonGacha.on("pointerdown", () => {
            this.children.removeAll();
            this.scene.start("GachaScene");
        });

        buttonBattle.on("pointerdown", () => {
            this.children.removeAll();
            this.scene.start("BattleScene");
        });
    }
}
