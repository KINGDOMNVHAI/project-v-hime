import Phaser from "phaser";

export default class BattleScene extends Phaser.Scene {
    private playerHP = 100;
    private enemyHP = 100;
    private playerText!: Phaser.GameObjects.Text;
    private enemyText!: Phaser.GameObjects.Text;
    private message!: Phaser.GameObjects.Text;

    constructor() {
        super("BattleScene");
    }

    create() {
        this.add.image(400, 300, "battle_bg").setAlpha(0.8);
        this.add.text(320, 50, "Battle Start!", { fontSize: "36px", color: "#fff" });

        this.playerText = this.add.text(100, 200, "Player HP: 100", {
            fontSize: "24px",
            color: "#0f0",
        });
        this.enemyText = this.add.text(500, 200, "Enemy HP: 100", {
            fontSize: "24px",
            color: "#f00",
        });

        this.message = this.add.text(250, 350, "", { fontSize: "24px", color: "#fff" });

        const attackButton = this.add.text(300, 450, "⚔️ Attack", {
            fontSize: "30px",
            backgroundColor: "#333",
            padding: { x: 15, y: 8 },
        });
        attackButton.setInteractive();
        attackButton.on("pointerdown", () => this.attack());

        const backButton = this.add.text(20, 20, "← Back", { fontSize: "24px", color: "#fff" });
        backButton.setInteractive();
        backButton.on("pointerdown", () => this.scene.start("MenuScene"));
    }

    attack() {
        const playerDmg = Phaser.Math.Between(10, 20);
        const enemyDmg = Phaser.Math.Between(5, 15);

        this.enemyHP -= playerDmg;
        this.playerHP -= enemyDmg;

        this.playerText.setText(`Player HP: ${this.playerHP}`);
        this.enemyText.setText(`Enemy HP: ${this.enemyHP}`);
        this.message.setText(`You dealt ${playerDmg}! Took ${enemyDmg}.`);

        if (this.enemyHP <= 0) {
            this.message.setText("🎉 Victory!");
        } else if (this.playerHP <= 0) {
            this.message.setText("💀 You Lost!");
        }
    }
}
