"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const DisplacementPlane = ({ texture, shadowTexture, className = "" }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !texture || !shadowTexture) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const aspect = container.offsetWidth / container.offsetHeight;
    const cameraDistance = 4;

    const camera = new THREE.OrthographicCamera(
      -cameraDistance * aspect,
      cameraDistance * aspect,
      cameraDistance,
      -cameraDistance,
      0.01,
      1000
    );
    camera.position.set(0, -10, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    scene.background = null;

    // scene.background = new THREE.Color(0x000000, 0);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 32, 16),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
    );
    scene.add(sphere);

    const hit = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500, 10, 10),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
    );
    hit.name = "hit";
    scene.add(hit);

    const geometry = new THREE.PlaneGeometry(15, 15, 100, 100);
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: new THREE.TextureLoader().load(texture) },
        uDisplacement: { value: new THREE.Vector3(0, 0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform vec3 uDisplacement;

        float easeInOutCubic(float x) {
          return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
        }

        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }  

        void main() {
          vUv = uv;
          vec3 new_position = position; 

          vec4 worldPosition = modelMatrix * vec4(position, 1.);
          float dist = length(uDisplacement - worldPosition.rgb);
          float min_distance = 3.;

          if (dist < min_distance){
            float distance_mapped = map(dist, 0., min_distance, 1., 0.);
            float val = easeInOutCubic(distance_mapped);
            new_position.z += val;
          }

          gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;

        void main() {
          vec4 color = texture2D(uTexture, vUv); 
          gl_FragColor = vec4(color);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(geometry, shaderMaterial);
    plane.rotation.z = Math.PI / 4;
    scene.add(plane);

    const shadowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: new THREE.TextureLoader().load(shadowTexture) },
        uDisplacement: { value: new THREE.Vector3(0, 0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float dist;
        uniform vec3 uDisplacement;

        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.);
          dist = length(uDisplacement - worldPosition.rgb);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float dist;
        uniform sampler2D uTexture;

        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
          vec4 color = texture2D(uTexture, vUv);
          float min_distance = 3.;

          if (dist < min_distance){
            float alpha = map(dist, min_distance, 0., color.a , 0.);
            color.a = alpha;
          }

          gl_FragColor = vec4(color);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const shadowPlane = new THREE.Mesh(geometry, shadowMaterial);
    shadowPlane.rotation.z = Math.PI / 4;
    scene.add(shadowPlane);

    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(hit);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        sphere.position.copy(point);
        shaderMaterial.uniforms.uDisplacement.value.copy(point);
        shadowMaterial.uniforms.uDisplacement.value.copy(point);
      }
    };

    const handleResize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const newAspect = width / height;

      camera.left = -cameraDistance * newAspect;
      camera.right = cameraDistance * newAspect;
      camera.top = cameraDistance;
      camera.bottom = -cameraDistance;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    container.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);
    handleResize();

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [texture, shadowTexture]);

  return (
    <div
      ref={containerRef}
      className={className}
      // style={{ width: "100%", height: "100%" }}
    />
  );
};

export default DisplacementPlane;
