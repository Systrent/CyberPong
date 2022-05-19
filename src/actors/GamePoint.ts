import { Circuit, CircuitManager } from '../state/CircuitManager';
import { Point } from '../types/Point';
import { converAngleToRad } from '../utils/angleToRad';
import { Actor } from './Actor';
import image from '../assets/point.png';

export class GamePoint extends Actor {
	pointSize: number;
	touched: boolean;
	pointImage: HTMLImageElement;
	ball: Actor;

	//FIXME:
	constructor(initialPos: Point, ball: Actor, pointSize = 25) {
		super(initialPos);
		this.pointSize = pointSize;
		this.ball = ball;
		this.touched = false;
		this.pointImage = new Image();
		this.pointImage.src = image;
	}

	update(delta: number): void {
		let ballPos = this.ball.position;
		let pointPos = this.position;

		//FIXME:
		let ballDistance = Math.sqrt(Math.pow(pointPos.x - ballPos.x, 2) + Math.pow(pointPos.y - ballPos.y, 2));

		//FIXME:
		if (ballDistance < this.pointSize / 2) {
			this.touched = true;
		}
		console.log('BALL DISTANCE --->', ballDistance, 'TOUCHED --->', this.touched);
	}

	draw(delta: number, ctx: CanvasRenderingContext2D): void {
		ctx.translate(this.position.x, this.position.y);
		ctx.drawImage(this.pointImage, -this.pointSize / 2, -this.pointSize / 2, this.pointSize, this.pointSize);
	}
}
