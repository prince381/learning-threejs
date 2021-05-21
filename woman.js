document.addEventListener('DOMContentLoaded',function() {
    // create a scene, camera and a GUI control system.
    const scene = new THREE.Scene(),
          camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1000),
          renderer = new THREE.WebGLRenderer({antialias: true}),
          gui = new dat.GUI(),
          output = document.querySelector('.webgl-output');

    scene.background = new THREE.CubeTextureLoader().setPath('./bsc/1024/').load([
        'xpos.png',
        'xneg.png',
        'ypos.png',
        'yneg.png',
        'zpos.png',
        'zneg.png'
    ]);

    output.appendChild(renderer.domElement);
    // set the size, color, and the shadow effect of the renderer.
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;

    // set the postion of the camera
    camera.position.set(0,10,60);
    camera.lookAt(scene.position);
    // this function updates the camera
    function updateCamera() {
        camera.updateProjectionMatrix()
    }
    // create a GUI control folder for the camera.
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(camera.position,'x',-50,50);
    cameraFolder.add(camera.position,'y',-50,50);
    cameraFolder.add(camera.position,'z',-50,50);
    cameraFolder.add(camera,'zoom',0,20).onChange(updateCamera);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.1;
    controls.enablePan = false;

    window.addEventListener('resize',() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.updateProjectionMatrix();
    });
    
    function animate() {
        controls.update();
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }

    let lightIntensity = 1.5;
    let sun = new THREE.DirectionalLight("#dff9fb",lightIntensity);
    sun.castShadow = true;
    sun.position.set(0,20,0);
    scene.add(sun);

    let cornerLight1 = new THREE.PointLight(0xdddddd,lightIntensity);
    cornerLight1.position.set(150,20,150);
    scene.add(cornerLight1);

    let cornerLight2 = new THREE.PointLight(0xdddddd,lightIntensity);
    cornerLight2.position.set(-150,20,150);
    scene.add(cornerLight2);

    let cornerLight3 = new THREE.PointLight(0xdddddd,lightIntensity);
    cornerLight3.position.set(-150,20,-150);
    scene.add(cornerLight3);

    let cornerLight4 = new THREE.PointLight(0xdddddd,lightIntensity);
    cornerLight4.position.set(150,20,-150);
    scene.add(cornerLight4);

    let loader = new THREE.GLTFLoader();
    loader.load('./naked_woman/scene.gltf',(gltf) => {
        let woman = gltf.scene.children[0];
        woman.position.set(0,-30,0);
        woman.traverse(w => {
            if (w.isMesh) {
               if (w.material.map) {
                    w.material.map.anisotropy = 15;
                }
            }
        })
        scene.add(woman);
    })

    animate();
})