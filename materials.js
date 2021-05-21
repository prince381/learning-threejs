document.addEventListener('DOMContentLoaded',() => {

    const scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.5,1000),
        renderer = new THREE.WebGLRenderer({ antialias: true }),
        gui = new dat.GUI(),
        output = document.querySelector('.webgl-output');

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);

    camera.position.set(0,10,30);
    camera.lookAt(scene.position);

    function updateCamera() {
        camera.updateProjectionMatrix();
    }

    gui.add(camera, 'zoom', 0.1, 5).onChange(updateCamera);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.rotateSpeed = 0.1;

    output.appendChild(renderer.domElement);

    window.addEventListener('resize',onWindowResize);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.updateProjectionMatrix()
    }

    // our geometries go here
    const planeGeom = new THREE.PlaneGeometry(40,35);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: "#95a5a6",
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeom,planeMaterial);
    plane.receiveShadow = true;
    plane.position.set(0,0,2);
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.z = -0.5 * Math.PI;
    scene.add(plane);

    const sphereGeom = new THREE.SphereGeometry(3.5,50,50);
    const sphereMaterial = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(sphereGeom, sphereMaterial);
    sphere.position.set(-7,4,0);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);

    const sphereDepthGeom = new THREE.SphereGeometry(3.5,50,50);
    const sphereDepthMaterial = new THREE.MeshStandardMaterial({
        color: "crimson"
    });
    const sphereDepth = new THREE.Mesh(sphereDepthGeom, sphereDepthMaterial);
    sphereDepth.position.set(5,4,10);
    sphereDepth.castShadow = true;
    sphereDepth.receiveShadow = true;
    scene.add(sphereDepth);

    const redCubeGeom = new THREE.BoxGeometry(5,5,5);
    const redCubeMaterial = new THREE.MeshPhongMaterial({
        color: "#e74c3c",
        specular: "#c0392b",
        emissive: "#c0392b"
    });
    const redCube = new THREE.Mesh(redCubeGeom, redCubeMaterial);
    redCube.castShadow = true;
    redCube.receiveShadow = true;
    redCube.position.set(7,4,-8);
    scene.add(redCube);

    const torusGeometry = new THREE.TorusGeometry(3,1,30,30);
    const torusMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x2ffcba),
        reflectivity: 0.2,
        clearCoat: 1,
        roughness: 0.2,
        metalness: 0.5
    })
    const torus = new THREE.Mesh(torusGeometry, torusMat);
    torus.position.set(-8,4,10);
    torus.castShadow = true;
    torus.receiveShadow = true;
    scene.add(torus);

    let torusParams = {
        reflectivity: 0,
        clearCoat: 0,
        roughness: 0.5,
        metalness: 0.5
    };
    const torusControl = gui.addFolder('Torus Controls');
    torusControl.add(torusParams,'reflectivity',0,1,0.1).onChange(function(val) {
        torusMat.reflectivity = val;
    })
    torusControl.add(torusParams,'clearCoat',0,1,0.1).onChange(function(val) {
        torusMat.clearCoat = val;
    })
    torusControl.add(torusParams,'metalness',0,1,0.1).onChange(function(val) {
        torusMat.metalness = val;
    })
    torusControl.add(torusParams,'roughness',0,1,0.1).onChange(function(val) {
        torusMat.roughness = val;
    })


    // lights
    const ambientLight = new THREE.AmbientLight("#f1c40f", 1);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight("#f1c40f", 1);
    spotLight.distance = 50;
    spotLight.angle = Math.PI / 4;
    spotLight.position.set(15, 20, 20);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024 * 2;
    spotLight.shadow.mapSize.height = 1024 * 2;
    scene.add(spotLight);

    // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);

    const spotFolder = gui.addFolder('SpotLight');
    spotFolder.add(spotLight,'angle', 0, 2 * Math.PI);
    spotFolder.add(spotLight, 'distance', 10, 500, 10);
    spotFolder.add(spotLight, 'intensity', 1, 10);

    function animate() {
        controls.update();
        spotLight.position.set(
            camera.position.x + 5,
            camera.position.y + 5,
            camera.position.z + 5,
        );

        torusMat.reflectivity = torusParams.reflectivity;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
})
