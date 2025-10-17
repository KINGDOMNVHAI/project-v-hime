import * as Phaser from "phaser";
import { cardPool, Card } from "../data/cardPool";

export default class GachaScene extends Phaser.Scene {
    private ownedCards: Set<string> = new Set();
    private results: Card[] = [];

    constructor() {
        super("GachaScene");
    }

    preload() {
        this.load.image("cardback", "/assets/ui/cardback.png");
        this.load.image("buttonGacha", "/assets/ui/buttonGacha.png");
        this.load.image("buttonGacha10", "/assets/ui/buttonGacha10.png");

        // Load tất cả ảnh trong cardPool
        cardPool.forEach((card) => {
            this.load.image(card.id, card.image);
        });
    }

    create() {
        this.add.text(300, 50, "Gacha Scene", { fontSize: "32px", color: "#fff" });

        const roll1Btn = this.add.image(300, 500, "buttonGacha").setInteractive();
        const roll10Btn = this.add.image(500, 500, "buttonGacha10").setInteractive();

        roll1Btn.on("pointerdown", () => this.rollGacha(1));
        roll10Btn.on("pointerdown", () => this.rollGacha(10));

        const backText = this.add.text(20, 20, "< Back", {
            fontSize: "20px",
            color: "#00ffff",
        }).setInteractive();

        backText.on("pointerdown", () => this.scene.start("MenuScene"));
    }

    rollGacha(count: number) {
        this.results = [];
        const available = cardPool.filter(c => !this.ownedCards.has(c.id));

        if (available.length === 0) {
            alert("Bạn đã sở hữu toàn bộ thẻ!");
            return;
        }

        for (let i = 0; i < count; i++) {
            if (available.length === 0) break;
            const card = this.randomCard(available);
            this.results.push(card);
            this.ownedCards.add(card.id);
        }

        this.showCards(this.results);
    }

    randomCard(pool: Card[]): Card {
        const rand = Math.random();
        let rarity: "R" | "SR" | "SSR";

        if (rand < 0.05) rarity = "SSR";
        else if (rand < 0.25) rarity = "SR";
        else rarity = "R";

        const filtered = pool.filter(c => c.rarity === rarity);
        if (filtered.length === 0) return pool[Math.floor(Math.random() * pool.length)];
        return filtered[Math.floor(Math.random() * filtered.length)];
    }

    showCards(cards: Card[]) {
        this.children.removeAll();
        this.load.audio("flipSound", "/assets/sfx/flip.mp3");
        this.sound.play("flipSound");

        this.add.text(520, 40, "Gacha Results", {
            fontSize: "28px",
            color: "#000",
        });

        const cols = cards.length > 1 ? 5 : 1;
        const spacing = 220;
        const startX = 200;
        const startY = cards.length > 1 ? 250 : 360;

        cards.forEach((card, idx) => {
            const x = startX + (idx % cols) * spacing;
            const y = startY + Math.floor(idx / cols) * 250;

            const back = this.add
                .image(x, y, "cardback")
                .setScale(0.5)
                .setInteractive({ cursor: "pointer" });

            back.on("pointerdown", () => {
                // disable double click
                back.disableInteractive();

                // Tween lật mặt (scaleX: 1 → 0)
                this.tweens.add({
                    targets: back,
                    scaleX: 0,
                    duration: 200,
                    ease: "Linear",
                    onComplete: () => {
                        // Đổi ảnh từ cardback → thẻ thật
                        back.setTexture(card.id);

                        // Nếu là SSR → thêm hiệu ứng sáng
                        if (card.rarity === "SSR") {
                            const glow = this.add.circle(x, y, 100, 0xffd700, 0.4);
                            this.tweens.add({
                                targets: glow,
                                alpha: { from: 0.5, to: 0 },
                                scale: { from: 1, to: 2 },
                                duration: 600,
                                onComplete: () => glow.destroy(),
                            });
                        }

                        // Tween mở mặt (scaleX: 0 → 1)
                        this.tweens.add({
                            targets: back,
                            scaleX: 0.5,
                            duration: 200,
                            ease: "Linear",
                        });

                        // Thêm chữ tên thẻ
                        this.add.text(x - 60, y + 120, `${card.name} (${card.rarity})`, {
                            fontSize: "18px",
                            color: "#000",
                        });
                    },
                });
            });
        });

        // Nút quay lại
        const backText = this.add
            .text(20, 20, "< Back", {
                fontSize: "20px",
                color: "#00f",
            })
            .setInteractive({ cursor: "pointer" });

        backText.on("pointerdown", () => this.scene.start("MenuScene"));
    }
}
