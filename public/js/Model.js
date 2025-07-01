document.addEventListener("DOMContentLoaded", async () => {
    const THREE = await import('three');
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
  
    const container = document.getElementById("threejs-container");
    if (!container) return;
  
    // Create the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  
    // Initial camera position
    camera.position.z = 7;
  
    // Add lighting to the scene
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(light);
  
    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load('/assets/model.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(3.5, 3.5, 3.5);     // Much larger
      model.position.set(0, -1, 0);
      scene.add(model);
  
      // Rotate the model in the animation loop
      const animate = () => {
        requestAnimationFrame(animate);
  
        // Rotate the model
        model.rotation.y += 0.01;
  
        // Render the scene and camera
        renderer.render(scene, camera);
      };
  
      animate();
    }, undefined, (error) => {
      console.error('Model Load Error:', error);
    });
  
    // Make the model responsive by adjusting the renderer size and camera aspect ratio on window resize
    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
  
    window.addEventListener('resize', onResize);
    onResize();  // Ensure the correct size on initial load
  });
  

  
  
  