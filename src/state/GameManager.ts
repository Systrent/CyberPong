//TODO: Modify this

import { Actor } from '../actors/Actor';
import { Barrier } from '../actors/Barrier';
import { Point } from '../types/Point';
import { converAngleToRad } from '../utils/angleToRad';

export class GameManager extends Actor {
	barriers: Barrier[];
	currentBarrier: number;
	currentLap: number;
	constructor(actor: Actor) {
		super({ x: 50, y: 1040 });
		this.currentBarrier = 0;
		this.barriers = [];
		this.currentLap = 0;
		let center: Point = { x: 500, y: 500 };
		let radius = 400;
		let num = 4;
		for (let i = 0; i < num; i++) {
			let angle = (360 / num) * i;
			this.barriers.push(
				new Barrier(
					{
						x: center.x + Math.sin(converAngleToRad(angle)) * radius,
						y: center.y + Math.cos(converAngleToRad(angle)) * radius,
					},
					100,
					90 - angle,
					actor,
					i
				)
			);
		}
	}

	draw(delta: number, ctx: CanvasRenderingContext2D): void {
		ctx.font = '47px Consolas';
		ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
		ctx.fillText(`✦ _ ${this.currentLap}/10`, this.position.x, this.position.y);

		ctx.font = '47px Consolas';
		ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
		ctx.fillText(`${this.currentLap}/10 _ ✦`, this.position.x + 1570, this.position.y);
	}

	addLap() {
		console.log('Lap');
		this.currentLap++;
		this.currentBarrier = 0;

		this.barriers.forEach((barrier) => (barrier.touched = false));

		if (this.currentLap > 2) {
			alert('You won');
		}
	}

	touchingBarrier(idx: number): boolean {
		if (this.currentBarrier === idx) {
			this.currentBarrier++;

			if (this.currentBarrier === this.barriers.length) {
				this.addLap();
				return false;
			}
			return true;
		}
		return false;
	}
}

export let Game: GameManager;

export const createGame = (actor: Actor) => {
	Game = new GameManager(actor);
};
