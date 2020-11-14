import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

window.addEventListener("DOMContentLoaded", () => {
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer();
  // レンダラーのサイズを設定
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.setPixelRatio(window.devicePixelRatio);
  // canvasをbodyに追加
  document.body.appendChild(renderer.domElement);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(
    45,
    VIEWPORT_W / VIEWPORT_H,
    1,
    1000
  );

  camera.position.set(0, 0, 1);

  const controls = new OrbitControls(camera, renderer.domElement);

  const mtlLoader = new MTLLoader();
  mtlLoader.setPath('./models/');
  mtlLoader.load('switch.mtl', (materials) => {
    materials.preload();
    console.log(materials)
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('./models/');
    objLoader.load('switch.obj', (object) => {
      console.log(object)
      objmodel = object.clone();
      objmodel.scale.set(100, 100, 100);
      const mesh = objmodel;
      this.scene.add(mesh);
  
    });
  })
  

  // 箱を作成
  const geometry = new THREE.BoxGeometry(1, 0.1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const box = new THREE.Mesh(geometry, material);
  box.position.z = -5;
  scene.add(box);

  // 平行光源を生成
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  controls.update();



  
  const tick = () => {
    requestAnimationFrame(tick);

    controls.update();


    box.rotation.x += 0.005;
    box.rotation.y += 0.005;

    // 描画
    renderer.render(scene, camera);
  };
  tick();
});