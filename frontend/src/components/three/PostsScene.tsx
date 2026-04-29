import { useEffect, useRef } from "preact/hooks";
import * as THREE from "three";
import type { Post } from "../../types";

type Props = {
  posts?: Post[];
};

/**
 * Full-screen Three.js background:
 * each post is rendered as a floating textured card.
 */
export function PostsScene({ posts = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const container = containerRef.current;

    if (!container) return;

    // Safe array protection
    const safePosts = Array.isArray(posts)
      ? posts
      : [];

    const width =
      container.clientWidth || window.innerWidth;

    const height =
      container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x120403);

    scene.fog = new THREE.FogExp2(
      0x120403,
      0.032
    );

    // Camera
    const camera =
      new THREE.PerspectiveCamera(
        55,
        width / height,
        0.1,
        120
      );

    camera.position.set(0, 1.5, 16);

    // Renderer
    const renderer =
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
      });

    renderer.setSize(width, height);

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    renderer.domElement.style.display = "block";

    renderer.domElement.style.width = "100%";

    renderer.domElement.style.height = "100%";

    renderer.domElement.style.pointerEvents =
      "none";

    container.appendChild(renderer.domElement);

    // Lights
    const ambient =
      new THREE.AmbientLight(
        0xff9a5c,
        0.42
      );

    scene.add(ambient);

    const key =
      new THREE.DirectionalLight(
        0xffd0a3,
        1.25
      );

    key.position.set(6, 12, 8);

    scene.add(key);

    const rim =
      new THREE.DirectionalLight(
        0xff4d1f,
        0.8
      );

    rim.position.set(-8, 4, -6);

    scene.add(rim);

    // Root group
    const root = new THREE.Group();

    scene.add(root);

    // Texture loader
    const textureLoader =
      new THREE.TextureLoader();

    const meshes: THREE.Mesh[] = [];

    // Create cards
    const count = Math.max(
      safePosts.length,
      1
    );

    safePosts.forEach((post, i) => {

      const geometry =
        new THREE.BoxGeometry(
          1.6,
          2.1,
          0.12
        );

      const material =
        new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(
            0.03 + (i % 6) * 0.02,
            0.72,
            0.38
          ),

          metalness: 0.3,

          roughness: 0.28,
          emissive: new THREE.Color(0x571200),
          emissiveIntensity: 0.45
        });

      const mesh =
        new THREE.Mesh(
          geometry,
          material
        );

      const t = i / count;

      const angle =
        t * Math.PI * 2 * 1.6;

      const radius =
        7 + (i % 4) * 0.9;

      mesh.position.set(
        Math.cos(angle) * radius,

        Math.sin(i * 0.55) * 1.8,

        Math.sin(angle) * radius
      );

      mesh.rotation.y =
        angle + Math.PI / 2;

      mesh.rotation.x =
        Math.sin(i * 0.3) * 0.15;

      mesh.userData.baseY =
        mesh.position.y;

      root.add(mesh);

      meshes.push(mesh);

      // Load image texture
      if (post?.image) {

        textureLoader.load(

          post.image,

          (texture) => {

            texture.colorSpace =
              THREE.SRGBColorSpace;

            texture.anisotropy =
              Math.min(
                8,
                renderer.capabilities.getMaxAnisotropy()
              );

            material.map = texture;

            material.needsUpdate = true;
          },

          undefined,

          () => {
            console.warn(
              "Failed to load image:",
              post.image
            );
          }
        );
      }
    });

    // Animation
    const clock =
      new THREE.Clock();

    let animationFrame = 0;

    const animate = () => {

      animationFrame =
        requestAnimationFrame(
          animate
        );

      const elapsed =
        clock.getElapsedTime();

      root.rotation.y =
        elapsed * 0.08;

      camera.position.x =
        Math.sin(elapsed * 0.12) * 1.8;

      camera.position.y =
        1.5 +
        Math.cos(elapsed * 0.1) * 0.6;

      camera.lookAt(0, 0.2, 0);

      meshes.forEach((mesh, index) => {

        const baseY =
          mesh.userData.baseY || 0;

        mesh.position.y =
          baseY +
          Math.sin(
            elapsed * 1.2 + index
          ) *
            0.2;
      });

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // Resize
    const handleResize = () => {

      const w =
        container.clientWidth ||
        window.innerWidth;

      const h =
        container.clientHeight ||
        window.innerHeight;

      camera.aspect = w / h;

      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    // Cleanup
    return () => {

      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      root.traverse((object) => {

        if (
          object instanceof THREE.Mesh
        ) {

          object.geometry.dispose();

          const material =
            object.material;

          if (
            material instanceof
            THREE.MeshStandardMaterial
          ) {

            material.map?.dispose();

            material.dispose();
          }
        }
      });

      renderer.dispose();

      if (
        renderer.domElement.parentNode ===
        container
      ) {

        container.removeChild(
          renderer.domElement
        );
      }
    };

  }, [posts]);

  return (
    <div
      class="posts-scene"
      ref={containerRef}
      aria-hidden="true"
    />
  );
}