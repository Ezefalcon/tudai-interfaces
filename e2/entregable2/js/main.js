import { Canvas } from "./canvas.js";
import {Chip} from "./chip.js";

let canvas = new Canvas('#canvas');
let context = canvas.getContext();

let chip = new Chip('./assets/black-chip.png', 50,50,canvas);
let chip2 = new Chip('./assets/red-chip.png', 500,500,canvas);