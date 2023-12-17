export class PlayerModel {
    direction: { x: number; y: number };
    speed: number;
    health: number;
    position: {
        x: number;
        y: number;
    };
    deltaPosition: {
        x: number;
        y: number;
    };
    size: number;
    sprite: string;
}

export class MonsterModel {
    speed: number;
    position: {
        x: number;
        y: number;
    };
    deltaPosition: {
        x: number;
        y: number;
    };
    size: number;

    sprite: string;
    name: string;
    life: number;
    speed: number;

    sound:string;

    damage: number;

}


export class WeaponModel {
    damage: number;
    isEquipped: boolean;
    size: number;
    position: {
		x: number,
		y: number
	};
}
