import { Actor } from './Actor';
import { Point } from '../types/Point';
import { Player } from './Player';
import image from '../assets/ball.png';

// GLOBAL CONSTANTS
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

export class Ball extends Actor {
	ballSize: number;
	maxSpeed: number;
	collisionCounter: number;
	keyStartPressed: boolean;
	reset: boolean;
	winPlayer1: boolean;
	winPlayer2: boolean;
	speed: Point;
	ballImage: HTMLImageElement;
	player1: Player;
	player2: Player;

	constructor(initialPos: Point, player1: Player, player2: Player) {
		super(initialPos);
		this.ballSize = 30;
		this.maxSpeed = 400;
		this.speed = { x: 0, y: 0 };
		this.ballImage = new Image();
		this.ballImage.src = image;
		this.player1 = player1;
		this.player2 = player2;
		this.keyStartPressed = false;
		this.collisionCounter = 0;
		this.reset = false;
		this.winPlayer1 = false;
		this.winPlayer2 = false;
	}

	update(delta: number) {
		let ballRadius = this.ballSize / 2;
		let player1Pos = this.player1.position;
		let player2Pos = this.player2.position;
		let newPosX = this.position.x + this.speed.x * delta;
		let newPosY = this.position.y + this.speed.y * delta;
		let yBallPosRandom = Math.floor(Math.random() * 680) + 200;

		//* RESETING EACH POINT SCORED
		if (newPosX + ballRadius > player2Pos.x + 25) {
			this.maxSpeed = 400;
			this.collisionCounter = 0;
			this.reset = true;
			this.winPlayer1 = true;
			this.speed = { x: 0, y: 0 };
			this.keyStartPressed = false;
			newPosX = canvas.width / 2;
			newPosY = yBallPosRandom;
		} else if (newPosX - ballRadius < player1Pos.x - 25) {
			this.maxSpeed = 400;
			this.collisionCounter = 0;
			this.reset = true;
			this.winPlayer2 = true;
			this.speed = { x: 0, y: 0 };
			this.keyStartPressed = false;
			newPosX = canvas.width / 2;
			newPosY = yBallPosRandom;
		}

		//* BOUNCING IN THE PLAYERS
		if (
			newPosX + ballRadius > player2Pos.x - 11 &&
			newPosY + ballRadius > player2Pos.y - 80 &&
			newPosY + ballRadius < player2Pos.y + 80 &&
			this.speed.x > 0 &&
			this.reset === false
		) {
			this.collisionCounter++;
			this.maxSpeed += this.collisionCounter + 35;
			this.speed.x = -this.maxSpeed;
		} else if (
			newPosX - ballRadius < player1Pos.x + 11 &&
			newPosY + ballRadius > player1Pos.y - 80 &&
			newPosY + ballRadius < player1Pos.y + 80 &&
			this.speed.x < 0 &&
			this.reset === false
		) {
			this.collisionCounter++;
			this.maxSpeed += this.collisionCounter + 35;
			this.speed.x = this.maxSpeed;
		}

		//* BOUNCING IN THE "TOP AND BOTTOM WALLS"
		if (newPosY + ballRadius > 1080) {
			this.speed.y = -this.maxSpeed;
		} else if (newPosY - ballRadius < 0) {
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
		switch (key) {
			case ' ':
				this.reset = false;
				let sideRandom = Math.floor(Math.random() * 2) + 1;
				if (sideRandom === 1 && this.keyStartPressed === false) {
					this.speed = { x: -this.maxSpeed, y: this.maxSpeed };
					this.keyStartPressed = true;
				} else if (sideRandom === 2 && this.keyStartPressed === false) {
					this.speed = { x: this.maxSpeed, y: this.maxSpeed };
					this.keyStartPressed = true;
				}
				break;
		}
	}
}
