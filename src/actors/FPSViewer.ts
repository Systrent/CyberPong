import { Actor } from './Actor';

export class FPSViewer extends Actor {
	draw(delta: number, ctx: CanvasRenderingContext2D) {
		const fps = (1 / delta).toFixed(2);
		ctx.font = '35px Consolas';
		ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
		ctx.fillText(`> fps: ${fps}`, this.position.x, this.position.y);
	}
}
