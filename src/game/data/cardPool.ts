export type CardType = "Kami" | "Weapon" | "Gem";
export type Rarity = "R" | "SR" | "SSR";

export interface Card {
    id: string;
    name: string;
    type: CardType;
    rarity: Rarity;
    image: string;
}

export const cardPool: Card[] = [
    // Kami
    { id: "k_r_1", name: "Kami A", type: "Kami", rarity: "R", image: "/assets/cards/kami_r.png" },
    { id: "k_sr_1", name: "Kami B", type: "Kami", rarity: "SR", image: "/assets/cards/kami_sr.png" },
    { id: "k_ssr_1", name: "Kami C", type: "Kami", rarity: "SSR", image: "/assets/cards/kami_ssr.png" },

    // Weapon
    { id: "w_r_1", name: "Sword A", type: "Weapon", rarity: "R", image: "/assets/cards/weapon_r.png" },
    { id: "w_sr_1", name: "Bow B", type: "Weapon", rarity: "SR", image: "/assets/cards/weapon_sr.png" },
    { id: "w_ssr_1", name: "Axe C", type: "Weapon", rarity: "SSR", image: "/assets/cards/weapon_ssr.png" },

    // Gem (chỉ 1 loại, tiền tệ)
    { id: "g_1", name: "Gem", type: "Gem", rarity: "R", image: "/assets/cards/weapon_r.png" },
];
