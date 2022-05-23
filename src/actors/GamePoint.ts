import { Point } from '../types/Point';
import { Actor } from './Actor';
import image from '../assets/point.png';

export class GamePoint extends Actor {
	pointSize: number;
	touched: boolean;
	notTouched: boolean;
	pointImage: HTMLImageElement;
	ball: Actor;

	constructor(initialPos: Point, ball: Actor, pointSize = 25) {
		super(initialPos);
		this.pointSize = pointSize;
		this.ball = ball;
		this.touched = false;
		this.notTouched = true;
		this.pointImage = new Image();
		this.pointImage.src = image;
	}

	update(delta: number): void {
		let ballPos = this.ball.position;
		let pointPos = this.position;
		let ballDistance = Math.sqrt(Math.pow(pointPos.x - ballPos.x, 2) + Math.pow(pointPos.y - ballPos.y, 2));

		if (ballDistance < this.pointSize) {
			this.touched = true;
		}
	}

	draw(delta: number, ctx: CanvasRenderingContext2D): void {
		ctx.translate(this.position.x, this.position.y);
		if (!this.touched) {
			ctx.drawImage(this.pointImage, -this.pointSize / 2, -this.pointSize / 2, this.pointSize, this.pointSize);
		}
	}
}
