/* eslint-disable no-undef */

const postMessageRN = (type, log) => {
  const message = { type: "console", data: { type, log } };
  const stringMessage = JSON.stringify(message);
  setTimeout(() => console.info(stringMessage), 0);
};

const createCamera = ({ z }) => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.z = z;

  return camera;
};

const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  return renderer;
};

const createControls = (camera, renderer) => {
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  return controls;
};

const createScene = () => {
  const scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

  const keyLight = new THREE.DirectionalLight(
    new THREE.Color("hsl(30, 100%, 75%)"),
    1.0
  );
  keyLight.position.set(-100, 0, 100);

  const fillLight = new THREE.DirectionalLight(
    new THREE.Color("hsl(240, 100%, 75%)"),
    0.75
  );
  fillLight.position.set(100, 0, 100);

  const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
  backLight.position.set(100, 100, 100).normalize();

  scene.add(ambientLight);
  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(backLight);

  return scene;
};

const loadModel = (url, scene) => {
  const loader = new THREE.GLTFLoader();
  postMessageRN("info", `3D model loading... ${new URL(url).pathname}`);
  loader.load(
    url,
    (gltf) => {
      postMessageRN("info", `3D model file loaded: ${new URL(url).pathname}`);
      scene.add(gltf.scene);
    },
    (xhr) => {
      postMessageRN(
        "info",
        Math.round((xhr.loaded / xhr.total) * 100) + "% loaded"
      );
    },
    (error) => postMessageRN("error", JSON.stringify(error))
  );
};

postMessageRN("info", "Setting up 3D scene and camera...");
const scene = createScene();
const camera = createCamera({ z: 100 });
const renderer = createRenderer();
const controls = createControls(camera, renderer);

const url =
  "https://raw.githubusercontent.com/amwebexpert/three-js-boilerplate/master/public/assets/Parrot.glb";
loadModel(url, scene);

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

postMessageRN("info", "Requesting animation frames...");
animate();
