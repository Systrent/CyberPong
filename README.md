<p align="center">
    <img src="./src/assets/logo.png" alt="CyberPong logo" width="700"/>
</p>

<br/>
<br/>

👉 [**✦✦✦ Play here! ✦✦✦**](https://systrent.github.io/CyberPong/)

👉 An original game _NOT_ inspired by Pong classic game and Cyberpunk 2077. Seriously no.

<br/>
<br/>
<br/>

[![Node JS](https://img.shields.io/badge/Node-v18.0.0-%23000000?style=for-the-badge&logo=appveyor)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/npm-v8.10.0-%23293462?style=for-the-badge&logo=appveyor)](https://www.npmjs.com/)
[![Parcel](https://img.shields.io/badge/parcel-v2.5.0-%23EC9B3B?style=for-the-badge&logo=appveyor)](https://parceljs.org/)
[![Typescript](https://img.shields.io/badge/typescript-v4.6.4-%23F24C4C?style=for-the-badge&logo=appveyor)](https://www.typescriptlang.org/)
[![Sweetalert2](https://img.shields.io/badge/sweetalert2-v11.4.15-%23A1E3D8?style=for-the-badge&logo=appveyor)](https://sweetalert2.github.io)
[![AnimateCSS](https://img.shields.io/badge/animate.css-v4.1.1-%23AB46D2?style=for-the-badge&logo=appveyor)](https://animate.style)

<br/>
<br/>

## **✦ Index**

---

1. [Game Preview](#✦-game-preview)
2. [About the Game](#✦-about)
    - [Goal](#✦-goal)
    - [Instructions](#✦-instructions)
3. [Motivation](#✦-motivation)
4. [Dependencies](#✦-dependencies)
5. [Proyect Structure](#✦-project-structure)
6. [Instalation](#Instalation)
7. [Code Examples](#✦-code-examples)
8. [Thanks](#✦-thanks)
9. [Licenses](#✦-licenses)

<br/>
<br/>

## **✦ Game Preview**

---

<p align="center">
    <img src="https://media0.giphy.com/media/InwCehQTX3O9SFeS17/giphy.gif?cid=790b7611cc4f5493a9de5f31a038e77b9477d1109efc99d2&rid=giphy.gif&ct=g" alt="CyberPong logo" width="800"/>
</p>

<br/>
<br/>

## **✦ About**

---

Mid-course project. 2D Canvas HTML game made during the CORE Code School bootcamp. It is a classic Pong game with a retro style and with the artistic trend of cyberpunk.

It is important to mention that the game is for play **_--- 1v1 ---_**. That means that is a local multiplayer game. Enjoy it!.

### **✦ Goal**

---

-   Stay focus. You need to beat your opponent. Use the " player bar" to hit the ball while it bouncing through all the field.

-   There are some points spreaded int he field to make the game easier to win, if you catch the points of course, so grab it all.

-   Win the first player who get 10 points. Next the game will restart.

-   Play as much as you want.

<br/>

### **✦ Instructions**

---

Input map for players control:

| Move       | Player 1 | Player 2 |
| ---------- | -------- | -------- |
| Begin game | Spacebar | Spacebar |
| Move up    | W        | I        |
| Move down  | S        | K        |

<br/>
<br/>

## **✦ Motivation**

---

I got inspired by my love to games. I've been playing video games for a long time. I want to build a retro classic game with a different and unique style, so I made this.

I repeat, _NOT_ inspired by Cyberpunk 2077.

Just kidding.

<br/>
<br/>

## **✦ Dependencies**

---

Project dependencies:

-   [Parcel](https://parceljs.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Sweetalert2](https://sweetalert2.github.io)
-   [AnimateCSS](https://animate.style)

<br/>
<br/>

## **✦ Project Structure**

---

```
├───📁 docs/
│   ├───📄 background.b5aa3883.png
│   ├───📄 ball.e99fc492.png
│   ├───📄 favicon.f2fe33f4.png
│   ├───📄 index.0042597e.css
│   ├───📄 index.0042597e.css.map
│   ├───📄 index.7ee11c56.js
│   ├───📄 index.7ee11c56.js.map
│   ├───📄 index.html
│   ├───📄 logo.cc56dded.png
│   ├───📄 music.1dafae87.mp3
│   ├───📄 player.24396099.png
│   └───📄 point.6212b6c1.png
├───📁 public/
│   └───📄 styles.css
├───📁 src/
│   ├───📁 actors/
│   │   ├───📄 Actor.ts
│   │   ├───📄 BackgroundMusic.ts
│   │   ├───📄 Ball.ts
│   │   ├───📄 FPSViewer.ts
│   │   ├───📄 GamePoint.ts
│   │   └───📄 Player.ts
│   ├───📁 assets/
│   │   ├───📄 background.png
│   │   ├───📄 ball.png
│   │   ├───📄 favicon.png
│   │   ├───📄 logo.png
│   │   ├───📄 music.mp3
│   │   ├───📄 player.png
│   │   └───📄 point.png
│   ├───📁 state/
│   │   └───📄 GameManager.ts
│   ├───📁 types/
│   │   └───📄 Point.ts
│   ├───📁 utils/
│   │   ├───📄 angleToRad.ts
│   │   ├───📄 checkLimits.ts
│   │   └───📄 KeyboardMap.ts
│   └───📄 script.ts
├───📄 .gitignore
├───📄 index.d.ts
├───📄 index.html
├───📄 package-lock.json
├───📄 package.json
├───📄 README.md
└───📄 tsconfig.json
```

<br/>
<br/>

## **✦ Instalation**

---

`--- under review ---`

## **✦ Code Examples**

---

-   ### Ball Class:

This class represents a lot of the project. It was a really hard and important class to develop.

_Method "update" is nice to focus on, because you can see the ball bouncing effect code._

```ts
import { Actor } from './Actor';
import { Point } from '../types/Point';
import { Player } from './Player';
import image from '../assets/ball.png';

// GLOBAL CONSTANTS
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

export class Ball extends Actor {
	ballSize: number;
	maxSpeed: number;
	collisionCounter: number;
	keyStartPressed: boolean;
	reset: boolean;
	winPlayer1: boolean;
	winPlayer2: boolean;
	speed: Point;
	ballImage: HTMLImageElement;
	player1: Player;
	player2: Player;

	constructor(initialPos: Point, player1: Player, player2: Player) {
		super(initialPos);
		this.ballSize = 30;
		this.maxSpeed = 400;
		this.speed = { x: 0, y: 0 };
		this.ballImage = new Image();
		this.ballImage.src = image;
		this.player1 = player1;
		this.player2 = player2;
		this.keyStartPressed = false;
		this.collisionCounter = 0;
		this.reset = false;
		this.winPlayer1 = false;
		this.winPlayer2 = false;
	}

	update(delta: number) {
		let ballRadius = this.ballSize / 2;
		let player1Pos = this.player1.position;
		let player2Pos = this.player2.position;
		let newPosX = this.position.x + this.speed.x * delta;
		let newPosY = this.position.y + this.speed.y * delta;
		let yBallPosRandom = Math.floor(Math.random() * 680) + 200;

		//* RESETING EACH POINT SCORED
		if (newPosX + ballRadius > player2Pos.x + 25) {
			this.maxSpeed = 400;
			this.collisionCounter = 0;
			this.reset = true;
			this.winPlayer1 = true;
			this.speed = { x: 0, y: 0 };
			this.keyStartPressed = false;
			newPosX = canvas.width / 2;
			newPosY = yBallPosRandom;
		} else if (newPosX - ballRadius < player1Pos.x - 25) {
			this.maxSpeed = 400;
			this.collisionCounter = 0;
			this.reset = true;
			this.winPlayer2 = true;
			this.speed = { x: 0, y: 0 };
			this.keyStartPressed = false;
			newPosX = canvas.width / 2;
			newPosY = yBallPosRandom;
		}

		//* BOUNCING IN THE PLAYERS
		if (
			newPosX + ballRadius > player2Pos.x - 11 &&
			newPosY + ballRadius > player2Pos.y - 80 &&
			newPosY + ballRadius < player2Pos.y + 80 &&
			this.speed.x > 0 &&
			this.reset === false
		) {
			this.collisionCounter++;
			this.maxSpeed += this.collisionCounter + 35;
			this.speed.x = -this.maxSpeed;
		} else if (
			newPosX - ballRadius < player1Pos.x + 11 &&
			newPosY + ballRadius > player1Pos.y - 80 &&
			newPosY + ballRadius < player1Pos.y + 80 &&
			this.speed.x < 0 &&
			this.reset === false
		) {
			this.collisionCounter++;
			this.maxSpeed += this.collisionCounter + 35;
			this.speed.x = this.maxSpeed;
		}

		//* BOUNCING IN THE "TOP AND BOTTOM WALLS"
		if (newPosY + ballRadius > 1080) {
			this.speed.y = -this.maxSpeed;
		} else if (newPosY - ballRadius < 0) {
			this.speed.y = this.maxSpeed;
		}

		//* UPDATING THE POSITION
		this.position.x = newPosX;
		this.position.y = newPosY;
	}

	draw(delta: number, ctx: CanvasRenderingContext2D) {
		let position = this.position;
		ctx.translate(position.x, position.y);
		ctx.drawImage(this.ballImage, -this.ballSize / 2, -this.ballSize / 2, this.ballSize, this.ballSize);
	}

	keyboard_event_down(key: string) {
		switch (key) {
			case ' ':
				this.reset = false;
				let sideRandom = Math.floor(Math.random() * 2) + 1;
				if (sideRandom === 1 && this.keyStartPressed === false) {
					this.speed = { x: -this.maxSpeed, y: this.maxSpeed };
					this.keyStartPressed = true;
				} else if (sideRandom === 2 && this.keyStartPressed === false) {
					this.speed = { x: this.maxSpeed, y: this.maxSpeed };
					this.keyStartPressed = true;
				}
				break;
		}
	}
}
```

<br/>
<br/>

## **✦ Thanks**

---

I want to thank our teacher [Luis Miguel Feijoo](https://github.com/luismiguelfeijoo), for all the help provided during these weeks of class and for being available to answer any questions. Nor would it have been possible without the support of my colleagues.

<br/>
<br/>

## **✦ Licenses**

---

[MIT](https://choosealicense.com/licenses/mit/)
