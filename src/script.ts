import { FPSViewer } from './actors/FPSViewer';
import { Actor } from './actors/Actor';
import { MAP_1, MAP_2 } from './utils/KeyboardMap';
import { Player } from './actors/Player';
import { Ball } from './actors/Ball';
import { GamePoint } from './actors/GamePoint';
import { Game, createGame } from './state/GameManager';
import { BackgroundMusic } from './actors/BackgroundMusic';

window.onload = () => {
	//* --- IMPORTANT CONSTANTS ---
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

	// --- GLOBAL VARIABLES ---
	let yBallPosRandom = Math.floor(Math.random() * 680) + 200;

	// --- ACTORS ---
	let music = new BackgroundMusic();
	let player1 = new Player({ x: 40, y: canvas.height / 2 }, MAP_1);
	let player2 = new Player({ x: 1880, y: canvas.height / 2 }, MAP_2);
	let fps = new FPSViewer({ x: canvas.width / 2 - 106, y: 60 });
	let ball = new Ball({ x: canvas.width / 2, y: yBallPosRandom }, player1, player2);
	createGame(ball, player1, player2);
	let points: GamePoint[] = [...Game.points];

	// --- MAIN ACTORS ARRAY (Objects in the game) ---
	let actors: Actor[] = [music, fps, player1, player2, ball, Game, ...points];

	// --- RENDERING ---
	let lastFrame = 0;
	const render = (time: number) => {
		let delta = (time - lastFrame) / 1000;
		lastFrame = time;
		actors.forEach((e) => {
			e.update(delta);
		});
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		actors.forEach((e) => {
			ctx.save();
			e.draw(delta, ctx);
			ctx.restore();
		});
		window.requestAnimationFrame(render);
	};
	window.requestAnimationFrame(render);

	// --- EVENT LISTENERS (For keys) ---
	document.body.addEventListener('keydown', (e) => {
		actors.forEach((actor) => {
			actor.keyboard_event_down(e.key);
		});
	});

	document.body.addEventListener('keyup', (e) => {
		actors.forEach((actor) => {
			actor.keyboard_event_up(e.key);
		});
	});
};
