import { Actor } from './Actor';

export class FPSViewer extends Actor {
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		const fps = (1 / delta).toFixed(2);
		ctx.font = '50px Consolas';
		ctx.fillStyle = 'white';
		ctx.fillText(`> fps: ${fps}`, this.position.x, this.position.y);
	}
}
