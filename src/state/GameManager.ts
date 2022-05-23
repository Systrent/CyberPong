import Swal from 'sweetalert2';
import { Actor } from '../actors/Actor';
import { GamePoint } from '../actors/GamePoint';
import { Player } from '../actors/Player';
import { Ball } from '../actors/Ball';

// GLOBAL CONSTANTS
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
let maxPoints = 10;

export class GameManager extends Actor {
	points: GamePoint[];
	player1: Player;
	player2: Player;
	ball: Ball;
	gameWon: boolean;
	constructor(ball: Ball, player1: Player, player2: Player) {
		super({ x: 400, y: 1040 });
		this.gameWon = false;
		this.player1 = player1;
		this.player2 = player2;
		this.ball = ball;
		this.points = [];

		for (let i = 0; i < maxPoints; i++) {
			let xPosRandom = Math.floor(Math.random() * 1300) + 300;
			let yPosRandom = Math.floor(Math.random() * 800) + 175;
			this.points.push(new GamePoint({ x: xPosRandom, y: yPosRandom }, this.ball));
		}
	}

	draw(delta: number, ctx: CanvasRenderingContext2D): void {
		ctx.font = '43px Consolas';
		ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
		ctx.fillText(`✦${this.player1.playerPoints}/10✦`, this.position.x, this.position.y);
		ctx.fillText(`✦${this.player2.playerPoints}/10✦`, this.position.x + 950, this.position.y);
	}

	update(): void {
		this.win();

		//* ADDING PLAYER POINTS IF TOUCH POINTS
		this.points.forEach((element) => {
			if (element.touched && this.ball.speed.x > 0) {
				element.touched = true;
				if (element.touched && element.notTouched) {
					this.player1.playerPoints++;
					element.notTouched = false;
				}
			} else if (element.touched && this.ball.speed.x < 0) {
				element.touched = true;
				if (element.touched && element.notTouched) {
					this.player2.playerPoints++;
					element.notTouched = false;
				}
			}
		});

		//* ADDING PLAYER POINTS IF THE OTHER FAILS THE BOUNCING
		if (this.ball.winPlayer1 === true) {
			this.player1.playerPoints++;
			this.ball.winPlayer1 = false;
		} else if (this.ball.winPlayer2 === true) {
			this.player2.playerPoints++;
			this.ball.winPlayer2 = false;
		}
	}

	win(): void {
		//FIXME: It doesn't work properly
		//* RESTART THE ARRAY
		// if (this.gameWon) {
		// 	this.gameWon = false;
		// 	// EMPTY THE ARRAY OF POINTS
		// 	for (let i = this.points.length; i > 0; i--) {
		// 		this.points.pop();
		// 	}
		// 	// RESET THE ARRAY OF POINTS
		// 	for (let i = 0; i < maxPoints; i++) {
		// 		let xPosRandom = Math.floor(Math.random() * 1300) + 300;
		// 		let yPosRandom = Math.floor(Math.random() * 800) + 175;
		// 		this.points.push(new GamePoint({ x: 0, y: 0 }, this.ball));
		// 	}
		// }

		//* ALERT WHO WINS AND RESET THE GAME
		if (this.player1.playerPoints === 10) {
			this.ball.reset = true;
			this.ball.speed = { x: 0, y: 0 };
			this.ball.keyStartPressed = false;
			this.ball.position.x = canvas.width / 2;
			this.gameWon = true;
			this.player1.playerPoints = 0;
			this.player2.playerPoints = 0;
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: '✦ PLAYER 1 is the WINNER! ✦',
				showConfirmButton: true,
				timer: 6000,
			});
		} else if (this.player2.playerPoints === 10) {
			this.ball.reset = true;
			this.ball.speed = { x: 0, y: 0 };
			this.ball.keyStartPressed = false;
			this.ball.position.x = canvas.width / 2;
			this.gameWon = true;
			this.player1.playerPoints = 0;
			this.player2.playerPoints = 0;
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: '✦ PLAYER 2 is the WINNER! ✦',
				showConfirmButton: true,
				timer: 6000,
			});
		}
	}
}

export let Game: GameManager;

export const createGame = (ball: Ball, player1: Player, player2: Player) => {
	Game = new GameManager(ball, player1, player2);
};
