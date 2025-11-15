document.addEventListener("DOMContentLoaded", async () => {
  const THREE = await import("three");
  const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
  const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js");

  const container = document.getElementById("threejs-container");
  if (!container) return;

  // Setup renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Scene and camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 6);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 1);
  const dir = new THREE.DirectionalLight(0xffffff, 2);
  dir.position.set(5, 10, 7);
  scene.add(ambient, dir);

  // Loader setup
  const loader = new GLTFLoader();

  // ✅ IMPORTANT: set decoder BEFORE loading
  loader.setMeshoptDecoder(await MeshoptDecoder);

  loader.load(
    "/assets/model.glb",
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      model.scale.set(3, 3, 3);
      model.position.set(0, -1, 0);

      console.log("✅ Model loaded successfully", model);

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        model.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    },
    undefined,
    (error) => console.error("❌ Model Load Error:", error)
  );

  // Resize handling
  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
});
