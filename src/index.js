import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

window.addEventListener("DOMContentLoaded", () => {

    // サイズを指定
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
    const camera = new THREE.PerspectiveCamera(45, VIEWPORT_W / VIEWPORT_H);
    camera.position.set(20, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

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
        mesh.castShadow = true;
        scene.add(mesh);
      });
    })

    // 床を作成
    const meshFloor = new THREE.Mesh(
      new THREE.BoxGeometry(2000, 0.1, 2000),
      new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
    );
    // 影を受け付ける
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    // オブジェクトを作成
    const meshKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(3, 1, 10, 16),
      new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
    );
    meshKnot.position.set(10, 5, 0);
    // 影を落とす
    meshKnot.castShadow = true;
    scene.add(meshKnot);

    // 照明を作成
    const light = new THREE.SpotLight(0xffffff, 2, 100, Math.PI / 4, 1);
    // ライトに影を有効にする
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // レンダリング
      renderer.render(scene, camera);

      // 照明の位置を更新
      const t = Date.now() / 1500;
      const r = 20.0;
      const lx = r * Math.cos(t);
      const lz = r * Math.sin(t);
      const ly = 20.0 + 5.0 * Math.sin(t / 3.0);
      light.position.set(lx, ly, lz);

      requestAnimationFrame(tick);
    }
  
});