import { Pacman } from './actors/Pacman';
import { Map } from './actors/Map';
import { Car } from './actors/Car';
import { Barrier } from './actors/Barrier';
import { FPSViewer } from './actors/FPSViewer';
import { Actor } from './actors/Actor';
import { MAP_1, MAP_2 } from './utils/KeyboardMap';
import { Player } from './actors/Player';
import { Ball } from './actors/Ball';
import { GamePoint } from './actors/GamePoint';
import { Circuit, createCircuit } from './state/CircuitManager';
import { Game, createGame } from './state/GameManager';

window.onload = () => {
	//* --- IMPORTANT CONSTANTS ---
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

	// --- GLOBAL VARIABLES ---
	let maxPoints = 4;

	// --- ACTORS ---
	let player1 = new Player({ x: 40, y: canvas.height / 2 }, MAP_1);
	let player2 = new Player({ x: 1880, y: canvas.height / 2 }, MAP_2);
	let fps = new FPSViewer({ x: canvas.width / 2 - 125, y: 60 });
	let points: GamePoint[] = [];
	let ball = new Ball({ x: canvas.width / 2, y: 100 }, player1, player2);
	createGame(ball);
	for (let i = 0; i < maxPoints; i++) {
		let xPosRandom = Math.floor(Math.random() * 1300) + 300;
		let yPosRandom = Math.floor(Math.random() * 800) + 175;
		const point = new GamePoint({ x: xPosRandom, y: yPosRandom }, ball);
		points.push(point);
	}
	//let barriers: Barrier[] = [...Circuit.barriers];

	// --- MAIN ACTORS ARRAY (Objects in the game) ---
	let actors: Actor[] = [fps, player1, player2, ball, Game, ...points];

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
