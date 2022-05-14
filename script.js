"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pacman_1 = require("./actors/Pacman");
const FPSViewer_1 = require("./actors/FPSViewer");
const Car_1 = require("./actors/Car");
const KeyboardMap_1 = require("./src/utils/KeyboardMap");
const CircuitManager_1 = require("./state/CircuitManager");
window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let carA = new Car_1.Car({ x: 200, y: 200 }, KeyboardMap_1.MAP_A);
    //let carB = new Car({ x: 300, y: 200 }, MAP_B);
    (0, CircuitManager_1.createCircuit)(carA);
    let barriers = [...CircuitManager_1.Circuit.barriers];
    let cars = [carA]; //, carB];
    let actors = [new FPSViewer_1.FPSViewer({ x: 5, y: 100 }), ...cars, ...barriers, CircuitManager_1.Circuit, new Pacman_1.Pacman({ x: 100, y: 100 })];
    let lastFrame = 0;
    const render = (time) => {
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
