// Copies the MediaPipe Tasks Vision WASM runtime into public/ so the try-on can load it from our own origin.
import { cpSync, mkdirSync } from "node:fs";
mkdirSync("public/mediapipe/wasm", { recursive: true });
cpSync("node_modules/@mediapipe/tasks-vision/wasm", "public/mediapipe/wasm", { recursive: true });
console.log("mediapipe wasm copied");
