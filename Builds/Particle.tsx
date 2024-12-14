import React, { useEffect } from "react";
import * as THREE from "three";
import KIAN from "../public/kian.png";
import Particle from "../public/particle.png";

const Particles: React.FC = () => {
  useEffect(() => {
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let material: THREE.PointsMaterial;
    let mouseX = 0,
      mouseY = 0;
    init();

    function init() {
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        2000,
      );
      camera.position.z = 500;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.0008);

      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];

      const textureLoader = new THREE.TextureLoader();
      const sprite = textureLoader.load(Particle, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
      });

      for (let i = 0; i < 10000; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;
        vertices.push(x, y, z);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3),
      );

      material = new THREE.PointsMaterial({
        size: 10,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
      });

      const particles = new THREE.Points(geometry, material);
      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;

      scene.add(particles);

      const sphereGeometry = new THREE.SphereGeometry(250, 256, 256);
      const sphereTexture = new THREE.TextureLoader().load(KIAN, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.mapping = THREE.EquirectangularReflectionMapping;
      });
      const sphereMaterial = new THREE.MeshStandardMaterial({
        envMap: sphereTexture,
        roughness: 0,
        metalness: 1,
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      document.body.style.touchAction = "none";
      document.body.addEventListener("pointermove", onPointerMove);
      window.addEventListener("resize", onWindowResize);

      animate();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.isPrimary === false) return;
      mouseX = ((event.clientX / window.innerWidth) * 2 - 1) * 500;
      mouseY = -((event.clientY / window.innerHeight) * 2 - 1) * 500;
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      const time = Date.now() * 0.00005;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;

      camera.lookAt(scene.position);

      scene.children.forEach((object, index) => {
        if (object instanceof THREE.Points) {
          object.rotation.x = time * (index < 4 ? index + 1 : -(index + 1));
        }
      });

      renderer.render(scene, camera);
    }

    return () => {
      document.body.removeChild(renderer.domElement);
      window.removeEventListener("resize", onWindowResize);
      document.body.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return null;
};

export default Particles;
