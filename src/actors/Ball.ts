import { Actor } from './Actor';
import { Point } from '../types/Point';
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

	// add delta to update
	update(delta: number) {
		//TODO: Improve moving and develop bouncing effect
		// speed * delta
		let newPosX = this.origin.x + this.speed.x * delta;
		if (newPosX <= 1920 - this.ballSize / 2 && newPosX >= this.ballSize / 2) {
			this.origin.x = newPosX;
		}
		// this.timer += delta;

		// if (this.timer >= 0.1) {
		// 	this.xFrame = (this.xFrame + 1) % 6;
		// 	this.timer = 0;
		// }
	}

	//add delta to draw
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		let origin = this.origin;

		// let direction = 0;
		// if (this.speed.x != 0 && this.speed.x < 0) {
		// 	direction = 180;
		// }
		ctx.translate(origin.x, origin.y);
		// Remember to paint a rectangle behind to configure your image
		// ctx.fillRect(0, 0, this.ballSize, this.ballSize);
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
				break;
			case 'ArrowDown':
				console.log('down');
				break;
			default:
				console.log('not a valid key');
				break;
		}
	}
}
