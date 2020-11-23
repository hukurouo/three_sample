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
  camera.lookAt(0, 10, -10);
  camera.position.set(-10, 15, 35);


  const controls = new OrbitControls(camera, renderer.domElement);



  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial());
  // 影を受け付ける
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);

  const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  var baseElement = document.getElementById('loading');
  baseElement.innerHTML = 'Started loading file: ' + url

};

manager.onLoad = function ( ) {

	console.log( 'Loading complete!');
  var baseElement = document.getElementById('loading');
  baseElement.innerHTML = ""
};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  var baseElement = document.getElementById('loading');
  baseElement.innerHTML = 'Started loading file: ' + url
};

manager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};

  
  const mtlLoader = new MTLLoader( manager );
  mtlLoader.setPath('../models/');
  mtlLoader.load('tugu.mtl', (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('../models/');
    objLoader.load('tugu.obj', (object) => {
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



  // 平行光源を生成
  const light2 = new THREE.PointLight(0xf4a460, 3, 11, 1.0);
  light2.position.set(3.7, 6.5, -1);
  light2.castShadow = true;
  console.log(light2)
  scene.add(light2);

  const light3 = new THREE.PointLight(0xffffff, 1, 11, 1.0);
  light3.position.set(-1, 5, 2);
  light3.castShadow = true;
  scene.add(light3);
  
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  //scene.add( cube );
  cube.position.set(3.7, 9, -1);

  //const axesHelper = new THREE.AxesHelper( 15 );
  //scene.add( axesHelper );




  controls.update();

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  let frame = 0;
  const tick = () => {
    requestAnimationFrame(tick);
    // フレーム数をインクリメント
  frame++;

  // フレーム数が２で割り切れなければ描画しない
  if (frame % 2 == 0) {
    return;
  }

    controls.update();
    if(getRandomArbitrary(1,1000) >= 5){
      light2.intensity = 3;
    } else {
    light2.intensity = 0;
    }
    // 描画
    renderer.render(scene, camera);
  };
  tick();
});