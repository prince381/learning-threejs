document.addEventListener('DOMContentLoaded',() => {

    const scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000),
        renderer = new THREE.WebGLRenderer({ antialias: true }),
        gui = new dat.GUI(),
        output = document.querySelector('.webgl-output');

    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor("#b8e994");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.1;
    controls.enablePan = false;

    camera.position.set(-10,45,20);
    camera.lookAt(scene.position);
    controls.update();

    output.appendChild(renderer.domElement);

    function updateCamera() {
        camera.updateProjectionMatrix()
    }

    window.addEventListener('resize',() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateCamera()
    })

    gui.add(camera,'zoom',0,2).onChange(updateCamera);

    function createCube(ord) {
        let xpos = ord * (15 * Math.random()),
            ypos = ord * (10 * Math.random()),
            zpos = ord * (15 * Math.random()),
            sizeVal = Math.ceil(Math.random() * 4);
        let cubeGeom = new THREE.BoxGeometry(sizeVal,sizeVal,sizeVal);
        let cubeMaterial = new THREE.MeshPhongMaterial({
            color: '#' + Math.random().toString().split('.')[1].slice(0,6)
        });
        let cube = new THREE.Mesh(cubeGeom,cubeMaterial);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.set(xpos,ypos,zpos);
        
        return cube;
    }

    function addCube(n) {
        for (let i = 1; i <= n; i++) {
            let ord = (-1) ** i;
            scene.add(createCube(ord));
        }
    }

    addCube(15);

    const axes = new THREE.AxesHelper(50);
    scene.add(axes);

    // const ambient = new THREE.AmbientLight("#f9ca24",1.5);
    // scene.add(ambient);
    // gui.add(ambient,'intensity',0,4);

    // const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
    // scene.add(hemiLight);
    // gui.add(hemiLight,'intensity',0,4);

    // const spotLight = new THREE.SpotLight("#f9ca24");
    // spotLight.intensity = 1;
    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.width = 1024 * 3;
    // spotLight.shadow.mapSize.height = 1024 * 3;
    // spotLight.angle = Math.PI / 4;
    // spotLight.shadow.camera.near = 0.5;
    // spotLight.shadow.camera.far = 100;
    // spotLight.shadow.camera.fov = 50;
    // scene.add(spotLight);

    // const spotlightFolder = gui.addFolder('Spotlight');
    // spotlightFolder.add(spotLight,'intensity',.5,4);
    // spotlightFolder.add(spotLight,'angle',Math.PI / 4,Math.PI * 2);
    // spotlightFolder.add(spotLight.position,'x',-40,40);
    // spotlightFolder.add(spotLight.position,'y',-40,40);
    // spotlightFolder.add(spotLight.position,'z',-40,40);

    // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);
    // const cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    // scene.add(cameraHelper);

    // const pointLight = new THREE.PointLight("#ffff");
    // pointLight.intensity = 1;
    // pointLight.distance = 10;
    // pointLight.position.x = 0;
    // pointLight.position.z = 0;
    // pointLight.castShadow = true;
    // pointLight.shadow.mapSize.width = 1024;
    // pointLight.shadow.mapSize.height = 1024;
    // scene.add(pointLight);

    // const pointFolder = gui.addFolder('PointLight');
    // pointFolder.add(pointLight,'intensity',0.5,10);
    // pointFolder.add(pointLight,'distance',0,50);

    // const pointHelper = new THREE.PointLightHelper(pointLight);
    // scene.add(pointHelper);

    const directionalLight = new THREE.DirectionalLight('#e2e2e2',1);
    directionalLight.position.set(0,20,0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    const lightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(lightHelper);

    function animate() {
        // let time = Date.now() * 0.0005;
        // pointLight.position.y = Math.sin(time) * 20;

        controls.update();
        renderer.render(scene,camera);
        // spotLight.position.set(
        //     camera.position.x + 5,
        //     camera.position.y + 5,
        //     camera.position.z + 5
        // );
        requestAnimationFrame(animate);
    }

    animate();
})