import { Actor } from './Actor';
import { Point } from '../types/Point';
import { checkLimits } from '../utils/checkLimits';
import { converAngleToRad } from '../utils/angleToRad';
import { Player } from './Player';
import image from '../assets/ball.png';

export class Ball extends Actor {
	//TODO: Add attributes
	ballSize: number;
	maxSpeed: number;
	speed: Point;
	ballImage: HTMLImageElement;
	player1: Player;
	player2: Player;

	constructor(initialPos: Point, player1: Player, player2: Player, maxSpeed = 500) {
		super(initialPos);
		this.ballSize = 30;
		this.maxSpeed = maxSpeed;
		this.speed = { x: 0, y: 0 };
		this.ballImage = new Image();
		this.ballImage.src = image;
		this.player1 = player1;
		this.player2 = player2;
	}

	update(delta: number) {
		//TODO: Improve moving and develop bouncing effect
		let ballRadius = this.ballSize / 2;
		let player1Pos = this.player1.position;
		let player2Pos = this.player2.position;
		let newPosX = this.position.x + this.speed.x * delta;
		let newPosY = this.position.y + this.speed.y * delta;

		//* BOUNCING IN THE PLAYERS
		if (
			newPosX + ballRadius > player2Pos.x &&
			newPosY + ballRadius > player2Pos.y - 85 &&
			newPosY + ballRadius < player2Pos.y + 85 &&
			this.speed.x > 0
		) {
			this.speed.x = -this.maxSpeed;
		}
		if (
			newPosX - ballRadius < player1Pos.x &&
			newPosY + ballRadius > player1Pos.y - 85 &&
			newPosY + ballRadius < player1Pos.y + 85 &&
			this.speed.x < 0
		) {
			this.speed.x = this.maxSpeed;
		}

		//* BOUNCING IN THE "TOP AND BOTTOM WALLS"
		if (newPosY + ballRadius > 1080) {
			this.speed.y = -this.maxSpeed;
		}
		if (newPosY - ballRadius < 0) {
			this.speed.y = this.maxSpeed;
		}

		//! OLD CODE FOR BOUNCING ON LEFT AND RIGHT "WALLS"
		// if (newPosX + this.ballSize / 2 > 1920) {
		// 	this.speed.x = -this.maxSpeed;
		// }
		// if (newPosX - this.ballSize / 2 < 0) {
		// 	this.speed.x = this.maxSpeed;
		// }
		// if (newPosY + this.ballSize / 2 > 1080) {
		// 	this.speed.y = -this.maxSpeed;
		// }

		// if (newPosY - this.ballSize / 2 < 0) {
		// 	this.speed.y = this.maxSpeed;
		// }

		this.position.x = newPosX;
		this.position.y = newPosY;
	}

	draw(delta: number, ctx: CanvasRenderingContext2D) {
		let position = this.position;
		ctx.translate(position.x, position.y);
		ctx.drawImage(this.ballImage, -this.ballSize / 2, -this.ballSize / 2, this.ballSize, this.ballSize);
	}

	keyboard_event_down(key: string) {
		console.log(key);
		switch (key) {
			case ' ':
				this.speed = { x: this.maxSpeed, y: this.maxSpeed };
				break;
			default:
				console.log('not a valid key');
				break;
		}
	}
}
