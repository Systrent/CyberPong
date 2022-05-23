import { Actor } from './Actor';
const audioUrl = new URL('../assets/music.mp3', import.meta.url);

export class BackgroundMusic extends Actor {
	music: HTMLAudioElement;
	constructor() {
		super({ x: 0, y: 0 });
		this.music = new Audio(audioUrl.toString());

		// AUDIO CONFIGURATION
		this.music.autoplay = true;
		this.music.loop = true;
		this.music.volume = 0.04;
	}
	update(): void {
		this.music.play();
	}
}
