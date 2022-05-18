export enum PlayerKeys {
	UP,
	DOWN,
}

export interface KeyboardMap {
	[key: string]: PlayerKeys;
}

export const MAP_1 = {
	w: PlayerKeys.UP,
	s: PlayerKeys.DOWN,
};

export const MAP_2 = {
	i: PlayerKeys.UP,
	k: PlayerKeys.DOWN,
};
