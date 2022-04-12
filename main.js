import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import particleTexture from "./texture.png";

const sizes = { width: window.innerWidth, height: window.innerHeight };

// texture

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const texture = textureLoader.load(particleTexture);

const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  0.01,
  1000
);
camera.position.z = 1;

const scene = new THREE.Scene();

// particles

const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;

const position = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  position[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(position, 3)
);

const particles = new THREE.Points(
  particlesGeometry,
  new THREE.PointsMaterial({
    size: 0.01,
    sizeAttenuation: true,
    color: "white",
    alphaTest: 0.001,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    transparent: true,
  })
);

scene.add(particles);

// resize

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
renderer.setAnimationLoop(animation);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

let x, y;

function coordinate(event) {
  // clientX gives horizontal coordinate
  x = event.clientX;

  // clientY gives vertical coordinates
  y = event.clientY;
  console.log(x, y);
  camera.position.x = -(x / 1000);
  camera.position.y = -(y / 1000);
}

window.addEventListener("mousemove", (e) => {
  coordinate(e);
});

// animation
function animation(time) {
  renderer.render(scene, camera);
}
