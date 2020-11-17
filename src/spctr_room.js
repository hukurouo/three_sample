import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { EventDispatcher } from "three";

window.addEventListener("DOMContentLoaded", () => {
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer();
  // レンダラーのサイズを設定
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
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

  camera.position.set(10, 20, 25);


  const controls = new OrbitControls(camera, renderer.domElement);



  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial());
  // 影を受け付ける
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);

  
  const mtlLoader = new MTLLoader();
  mtlLoader.setPath('../models/');
  mtlLoader.load('spctr_room.mtl', (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('../models/');
    objLoader.load('spctr_room.obj', (object) => {
      object.receiveShadow = true;
      object.castShadow = true;
      const mesh = object;
      scene.add(mesh);
      mesh.traverse(function (child) {
        console.log(child)
        child.castShadow = true
        child.receiveShadow = true
      });
    });
  })

  /* 

  var grid = new THREE.GridHelper(100, 10);
  scene.add(grid);

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
      mesh.position.set(-2, 1, 7);
      mesh.castShadow = true;
      scene.add(mesh);
      mesh.traverse(function (child) {
        console.log(child)
        child.castShadow = true
        child.receiveShadow = true
      });
    });
  })

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  scene.add( cube );
  cube.position.set(2, 1, 7);
  console.log(scene)

  scene.background = new THREE.Color( 0xffffff );

  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );
  */

  // 平行光源を生成
  const light2 = new THREE.PointLight(0xFFFFFF, 2, 11, 1.0);
  light2.position.set(0, 6, 1);
  light2.castShadow = true;
  scene.add(light2);



  controls.update();



  
  const tick = () => {
    requestAnimationFrame(tick);

    controls.update();

    // 描画
    renderer.render(scene, camera);
  };
  tick();
});