"use client";

import { useEffect, useRef } from "react";

export default function GameCanvas() {
    const gameRef = useRef<any | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (gameRef.current) return; // đã khởi tạo rồi

        let phaserGame: any = null;

        async function initPhaser() {
            // dynamic import Phaser chỉ khi chạy client
            const Phaser = await import("phaser"); // import * as Phaser không cần ở top-level
            // dynamic import các scene (module phải export default class Scene extends Phaser.Scene)
            const { default: MenuScene } = await import("@/game/scenes/MainScene");
            const { default: GachaScene } = await import("@/game/scenes/GachaScene");
            // (nếu có thêm scene: const { default: BattleScene } = await import('@/game/scenes/BattleScene'))

            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                width: 1200,
                height: 700,
                backgroundColor: "#1a1a1a",
                parent: "game-container",
                scene: [MenuScene, GachaScene],
            };

            // khởi tạo game
            phaserGame = new (Phaser as any).Game(config);
            gameRef.current = phaserGame;
        }

        initPhaser();

        return () => {
            // cleanup khi component unmount
            if (gameRef.current) {
                try {
                    gameRef.current.destroy(true);
                } catch (e) {
                    console.warn("Error destroying phaser game:", e);
                }
                gameRef.current = null;
            }
        };
    }, []);

    return <div id="game-container" className="w-full h-full" />;
}
