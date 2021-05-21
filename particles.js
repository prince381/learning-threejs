document.addEventListener('DOMContentLoaded',() => {

    let scene, camera, renderer, controls, gui, pointsGeom, pointObj, sphereObj;

    init();
    animate();

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        gui = new dat.GUI();
        const output = document.querySelector('.webgl-output');

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.setPixelRatio(window.devicePixelRatio);
        output.appendChild(renderer.domElement);

        camera.position.set(0,15,30);
        camera.lookAt(scene.position);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.1;

        const ambientLight = new THREE.AmbientLight("#f1c40f",1);
        scene.add(ambientLight);
        
        const mat = new THREE.PointsMaterial({
            color: new THREE.Color(0xffffff),
            blending: THREE.AdditiveBlending,
            size: 0.1,
            sizeAttenuation: true
        });
        pointsGeom = new THREE.TorusGeometry(5,3,50,50);
        pointObj = new THREE.Points(pointsGeom, mat);
        pointObj.position.set(-10,0,0);
        scene.add(pointObj);

        const spherePointGeo = new THREE.SphereGeometry(7,50,50);
        const spherePointMat = new THREE.PointsMaterial({
            color: 0xffffff,
            blending: THREE.AdditiveBlending,
            size: 0.1,
            sizeAttenuation: true
        });
        sphereObj = new THREE.Points(spherePointGeo, spherePointMat);
        sphereObj.position.set(10,0,0);
        scene.add(sphereObj);
    }

    window.addEventListener('resize', onWindowResize);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        let time = Date.now() * 0.0005;
        pointObj.rotation.z = time;
        pointObj.rotation.x = time;
        sphereObj.rotation.z = time;
        sphereObj.rotation.x = time;

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

})