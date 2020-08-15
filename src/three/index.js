import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

$(document).ready(function () {
  var scene = new THREE.Scene();

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  var loader = new GLTFLoader();
  var shoe;

  loader.load("model/shoe/scene.gltf", function (gltf) {
    shoe = gltf.scene;
    shoe.position.z = -5;
    scene.add(shoe);
  }, undefined, function (error) {
    console.error(error);
  });

  var light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  var animate = function () {
    requestAnimationFrame(animate);

    camera.position.z += .001;
    camera.position.y += .00075;
    camera.lookAt(0, 0, -5);
    if (shoe) {
      shoe.rotation.y -= 0.001;
    }

    renderer.render(scene, camera);
  };

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  camera.position.y = 1;
  camera.position.z = 1;
  animate();

  window.addEventListener('resize', onWindowResize, false);
})


