import fs from 'fs';
import path from 'path';

// Polyfills for Node environment
class SimpleFileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
      if (this.onload) this.onload();
    });
  }
}
global.FileReader = SimpleFileReader;
global.window = global;
global.self = global;

import * as THREE from '../frontend/node_modules/three/build/three.module.js';
import { GLTFExporter } from '../frontend/node_modules/three/examples/jsm/exporters/GLTFExporter.js';

function buildSheryarAvatarScene() {
  const scene = new THREE.Scene();
  scene.name = "Sheryar_Developer_Universe_Avatar";

  // Head (Skin tone)
  const headGeo = new THREE.SphereGeometry(0.24, 24, 24);
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xd49e7b, roughness: 0.6 });
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headMesh.position.set(0, 1.3, 0);
  headMesh.name = "Head";
  scene.add(headMesh);

  // Hair (Dark textured)
  const hairGeo = new THREE.SphereGeometry(0.25, 20, 20);
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x1a1412, roughness: 0.9 });
  const hairMesh = new THREE.Mesh(hairGeo, hairMat);
  hairMesh.position.set(0, 1.38, -0.02);
  hairMesh.name = "Hair";
  scene.add(hairMesh);

  // Glasses Frame
  const glassGeo = new THREE.BoxGeometry(0.24, 0.07, 0.02);
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.8 });
  const glassMesh = new THREE.Mesh(glassGeo, glassMat);
  glassMesh.position.set(0, 1.31, 0.23);
  glassMesh.name = "Glasses";
  scene.add(glassMesh);

  // Red Shirt
  const shirtGeo = new THREE.BoxGeometry(0.26, 0.62, 0.24);
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.5 });
  const shirtMesh = new THREE.Mesh(shirtGeo, shirtMat);
  shirtMesh.position.set(0, 0.55, 0.02);
  shirtMesh.name = "RedShirt";
  scene.add(shirtMesh);

  // Black Leather Jacket
  const jacketGeo = new THREE.BoxGeometry(0.48, 0.66, 0.32);
  const jacketMat = new THREE.MeshStandardMaterial({ color: 0x14171d, roughness: 0.35, metalness: 0.25 });
  const jacketMesh = new THREE.Mesh(jacketGeo, jacketMat);
  jacketMesh.position.set(0, 0.53, 0);
  jacketMesh.name = "LeatherJacket";
  scene.add(jacketMesh);

  // Arms
  const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.6, 16);
  const rightArm = new THREE.Mesh(armGeo, jacketMat);
  rightArm.position.set(0.38, 0.45, 0);
  rightArm.name = "RightArm";
  scene.add(rightArm);

  const leftArm = new THREE.Mesh(armGeo, jacketMat);
  leftArm.position.set(-0.38, 0.45, 0);
  leftArm.name = "LeftArm";
  scene.add(leftArm);

  // Legs / Trousers
  const legGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.8, 16);
  const pantsMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
  const rightLeg = new THREE.Mesh(legGeo, pantsMat);
  rightLeg.position.set(0.14, -0.3, 0);
  rightLeg.name = "RightLeg";
  scene.add(rightLeg);

  const leftLeg = new THREE.Mesh(legGeo, pantsMat);
  leftLeg.position.set(-0.14, -0.3, 0);
  leftLeg.name = "LeftLeg";
  scene.add(leftLeg);

  // Boots
  const bootGeo = new THREE.BoxGeometry(0.13, 0.12, 0.26);
  const bootMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.4 });
  const rightBoot = new THREE.Mesh(bootGeo, bootMat);
  rightBoot.position.set(0.14, -0.75, 0.06);
  rightBoot.name = "RightBoot";
  scene.add(rightBoot);

  const leftBoot = new THREE.Mesh(bootGeo, bootMat);
  leftBoot.position.set(-0.14, -0.75, 0.06);
  leftBoot.name = "LeftBoot";
  scene.add(leftBoot);

  return scene;
}

const scene = buildSheryarAvatarScene();
const exporter = new GLTFExporter();

// Export as both GLB and glTF JSON
exporter.parse(
  scene,
  (result) => {
    const glbPath = path.resolve('frontend/public/models/avatar.glb');
    fs.mkdirSync(path.dirname(glbPath), { recursive: true });
    
    if (result instanceof ArrayBuffer) {
      fs.writeFileSync(glbPath, Buffer.from(result));
      console.log(`Successfully exported binary GLB avatar (${(result.byteLength / 1024).toFixed(1)} KB) to: ${glbPath}`);
    } else {
      const gltfPath = path.resolve('frontend/public/models/avatar.gltf');
      fs.writeFileSync(gltfPath, JSON.stringify(result, null, 2));
      console.log(`Successfully exported glTF avatar to: ${gltfPath}`);
    }
  },
  (error) => {
    console.error('Error exporting model:', error);
  },
  { binary: true }
);
