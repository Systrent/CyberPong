import { Pacman } from './actors/Pacman';
import { Map } from './actors/Map';
import { Car } from './actors/Car';
import { Barrier } from './actors/Barrier';
import { FPSViewer } from './actors/FPSViewer';
import { Actor } from './actors/Actor';
import { MAP_1, MAP_2 } from './utils/KeyboardMap';
import { Circuit, createCircuit } from './state/CircuitManager';
import { Player } from './actors/Player';
import { Ball } from './actors/Ball';

window.onload = () => {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

	//! ----------- VERY DANGEROUS ERROR!!! -----------
	let carA = new Car({ x: 200, y: 200 }, MAP_1);
	createCircuit(carA);
	//! -----------------------------------------------
	//let cars: Car[] = [carA];
	//let barriers: Barrier[] = [...Circuit.barriers];

	let player1 = new Player({ x: 40, y: canvas.height / 2 }, MAP_1);
	let player2 = new Player({ x: 1880, y: canvas.height / 2 }, MAP_2);

	let ball = new Ball({ x: 500, y: 500 });

	let fps = new FPSViewer({ x: canvas.width / 2 - 125, y: 60 });

	// --- MAIN ACTORS (Objects in the game) ---
	let actors: Actor[] = [fps, player1, player2, ball, Circuit];

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

	// Rendering the game
	window.requestAnimationFrame(render);

	document.body.addEventListener('keydown', (e) => {
		// console.log('Keydown', e);
		actors.forEach((actor) => {
			actor.keyboard_event_down(e.key);
		});
	});

	document.body.addEventListener('keyup', (e) => {
		// console.log('keyUp', e);
		actors.forEach((actor) => {
			actor.keyboard_event_up(e.key);
		});
	});
};
