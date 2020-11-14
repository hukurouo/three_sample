import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { MeshToonMaterial } from "three";



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

  camera.position.set(10, 5, 15);


  const controls = new OrbitControls(camera, renderer.domElement);

  var grid = new THREE.GridHelper(100, 10);
  scene.add(grid);

  var object_spctr = null;
  
  const mtlLoader = new MTLLoader();
  mtlLoader.setPath('../models/');
  mtlLoader.load('spctr.mtl', (materials) => {
    materials.preload();
    console.log(materials)
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('../models/');
    objLoader.load('spctr.obj', (object) => {
      const mesh = object;
      object_spctr = object;
      scene.add(mesh);
    });
  })

  const mtlLoader2 = new MTLLoader();
  mtlLoader2.setPath('../models/');

  var objectEX = null;//nullで定義する

  mtlLoader2.load('switch.mtl', (materials) => {
    materials.preload();
    console.log(materials)
    const objLoader2 = new OBJLoader();
    objLoader2.setMaterials(materials);
    objLoader2.setPath('../models/');
    objLoader2.load('switch.obj', (object) => {
      const mesh = object;
      objectEX = object;
      mesh.position.set(4, 0, 0);
      scene.add(mesh);
    });
  })


  // 平行光源を生成
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  const light2 = new THREE.DirectionalLight(0xffffff);
  light2.position.set(-1, 1, -1);
  scene.add(light2);

  scene.background = new THREE.Color( 0xffffff );

  controls.update();



  
  const tick = () => {
    requestAnimationFrame(tick);

    controls.update();

    if(object_spctr){
      object_spctr.rotation.y += 0.005;
    }
    if(objectEX){
      objectEX.rotation.y += 0.005;
      objectEX.rotation.x += 0.005;
      objectEX.rotation.z += 0.005;
    }

    //box.rotation.x += 0.005;
    //box.rotation.y += 0.005;

    // 描画
    renderer.render(scene, camera);
  };
  tick();
});