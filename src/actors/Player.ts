import { Actor } from './Actor';
import { Point } from '../types/Point';
import { checkLimits } from '../utils/checkLimits';
import { PlayerKeys, KeyboardMap } from '../utils/KeyboardMap';
import { converAngleToRad } from '../utils/angleToRad';
import image from '../assets/player.png';

interface Size {
	w: number;
	h: number;
}

export class Player extends Actor {
	//TODO: Add attributes
	playerSize: Size;
	playerSpeed: number;
	playerAcceleration: number;
	playerImage: HTMLImageElement;
	keyboardMap: KeyboardMap;
	constructor(initialPos: Point, keyboardMap: KeyboardMap, size: Size = { w: 22, h: 140 }) {
		super(initialPos);
		this.playerSize = size;
		this.playerSpeed = 0;
		this.playerAcceleration = 0;
		this.playerImage = new Image();
		this.playerImage.src = image;
		this.keyboardMap = keyboardMap;
	}

	update(delta: number): void {
		// console.log(this.angle);
		// this.angle += this.angleSpeed;
		// this.angleSpeed *= 0.9;
		this.playerSpeed = this.playerSpeed * delta * 0.9 + this.playerAcceleration;
		let newPos: Point = {
			x: this.position.x,
			y: this.position.y + this.playerSpeed,
		};

		if (checkLimits(newPos)) {
			this.position = newPos;
		}
	}
	draw(delta: number, ctx: CanvasRenderingContext2D): void {
		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(converAngleToRad(270));
		ctx.drawImage(this.playerImage, -this.playerSize.h / 2, -this.playerSize.w / 2, this.playerSize.h, this.playerSize.w);
	}
	keyboard_event_down(key: string): void {
		let keyMapped = this.keyboardMap[key];
		if (keyMapped === PlayerKeys.UP) {
			this.playerAcceleration = -7;
		} else if (keyMapped === PlayerKeys.DOWN) {
			this.playerAcceleration = 7;
		}
	}

	keyboard_event_up(key: string): void {
		let keyMapped = this.keyboardMap[key];
		if (keyMapped === PlayerKeys.UP) {
			this.playerAcceleration = 0;
		} else if (keyMapped === PlayerKeys.DOWN) {
			this.playerAcceleration = 0;
		}
	}
}
