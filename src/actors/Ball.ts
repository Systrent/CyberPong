import { Actor } from './Actor';
import { Point } from '../types/Point';
import { checkLimits } from '../utils/checkLimits';
import { converAngleToRad } from '../utils/angleToRad';
import image from '../assets/ball.png';

export class Ball extends Actor {
	//TODO: Add attributes
	ballSize: number;
	origin: Point;
	maxSpeed: number;
	speed: Point;
	ballImage: HTMLImageElement;

	constructor(initialPos: Point, maxSpeed = 500) {
		super(initialPos);
		this.ballSize = 30;
		this.origin = { x: initialPos.x, y: initialPos.y };
		this.maxSpeed = maxSpeed;
		this.speed = { x: maxSpeed, y: 0 };
		this.ballImage = new Image();
		this.ballImage.src = image;
	}

	update(delta: number) {
		//TODO: Improve moving and develop bouncing effect
		let newPosX = this.origin.x + this.speed.x * delta;
		let newPosY = this.origin.y + this.speed.y * delta;

		if (newPosX <= 1920 - this.ballSize / 2 && newPosX > 0 + this.ballSize / 2) {
			this.origin.x = newPosX;
		}
		if (newPosY <= 1080 - this.ballSize / 2 && newPosY > 0 + this.ballSize / 2) {
			this.origin.y = newPosY;
		}
	}

	//add delta to draw
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		let origin = this.origin;
		ctx.translate(origin.x, origin.y);
		ctx.drawImage(this.ballImage, -this.ballSize / 2, -this.ballSize / 2, this.ballSize, this.ballSize);
	}

	keyboard_event_down(key: string) {
		switch (key) {
			case 'ArrowRight':
				console.log('right');
				this.speed.x = this.maxSpeed;
				break;
			case 'ArrowLeft':
				console.log('left');
				this.speed.x = -this.maxSpeed;
				break;
			case 'ArrowUp':
				console.log('up');
				this.speed.y = -this.maxSpeed;
				break;
			case 'ArrowDown':
				console.log('down');
				this.speed.y = this.maxSpeed;
				break;
			default:
				console.log('not a valid key');
				break;
		}
	}
}
