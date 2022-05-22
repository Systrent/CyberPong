import { Actor } from './Actor';
import { Point } from '../types/Point';
import { checkLimits } from '../utils/checkLimits';
import { converAngleToRad } from '../utils/angleToRad';
import { Player } from './Player';
import image from '../assets/ball.png';

// GLOBAL CONSTANTS
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

export class Ball extends Actor {
	//TODO: Add attributes
	ballSize: number;
	maxSpeed: number;
	collisionCunter: number;
	keyStartPressed: boolean;
	speed: Point;
	ballImage: HTMLImageElement;
	player1: Player;
	player2: Player;

	constructor(initialPos: Point, player1: Player, player2: Player, maxSpeed = 400) {
		super(initialPos);
		this.ballSize = 30;
		this.maxSpeed = maxSpeed;
		this.speed = { x: 0, y: 0 };
		this.ballImage = new Image();
		this.ballImage.src = image;
		this.player1 = player1;
		this.player2 = player2;
		this.keyStartPressed = false;
		this.collisionCunter = 0;
	}

	update(delta: number) {
		let ballRadius = this.ballSize / 2;
		let player1Pos = this.player1.position;
		let player2Pos = this.player2.position;
		let newPosX = this.position.x + this.speed.x * delta;
		let newPosY = this.position.y + this.speed.y * delta;
		// let yBallPosRandom = Math.floor(Math.random() * 680) + 200;

		// //* RESETING EACH POINT SCORED
		// if (newPosX + ballRadius > player2Pos.x + 15) {
		// 	this.position.x = canvas.width / 2;
		// 	this.position.y = yBallPosRandom;
		// }
		// if (newPosX - ballRadius < player1Pos.x - 15) {
		// 	this.position.x = canvas.width / 2;
		// 	this.position.y = yBallPosRandom;
		// }

		//* BOUNCING IN THE PLAYERS
		if (
			newPosX + ballRadius > player2Pos.x -  11 &&
			newPosY + ballRadius > player2Pos.y - 85 &&
			newPosY + ballRadius < player2Pos.y + 85 &&
			this.speed.x > 0
		) {
			this.collisionCunter++;
			this.maxSpeed += this.collisionCunter + 35;
			this.speed.x = -this.maxSpeed;
		} else if (
			newPosX - ballRadius < player1Pos.x + 11 &&
			newPosY + ballRadius > player1Pos.y - 85 &&
			newPosY + ballRadius < player1Pos.y + 85 &&
			this.speed.x < 0
		) {
			this.collisionCunter++;
			this.maxSpeed += this.collisionCunter + 35;
			this.speed.x = this.maxSpeed;
		}

		//* BOUNCING IN THE "TOP AND BOTTOM WALLS"
		if (newPosY + ballRadius > 1080) {
			this.speed.y = -this.maxSpeed;
		}
		if (newPosY - ballRadius < 0) {
			this.speed.y = this.maxSpeed;
		}

		//* UPDATING THE POSITION
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
				let sideRandom = Math.floor(Math.random() * 2) + 1;
				if (sideRandom === 1 && this.keyStartPressed === false) {
					this.speed = { x: -this.maxSpeed, y: this.maxSpeed };
					this.keyStartPressed = true;
				} else if (sideRandom === 2 && this.keyStartPressed === false) {
					this.speed = { x: this.maxSpeed, y: this.maxSpeed };
					this.keyStartPressed = true;
				}
				break;
			default:
				console.log('not a valid key');
				break;
		}
	}
}
