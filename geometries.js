document.addEventListener('DOMContentLoaded',() => {

    let scene, camera, renderer, controls, gui, box, sphere, cylinder,
        cone, torus, icosahedron, extruded;

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
        output.appendChild(renderer.domElement);

        camera.position.set(0,15,30);
        camera.lookAt(scene.position);
        gui.add(camera,'zoom',0.2,20).onChange(function() {
            camera.updateProjectionMatrix();
        })

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.1;

        const ambientLight = new THREE.AmbientLight("#f1c40f",1);
        gui.add(ambientLight,'intensity',0.1,5);
        scene.add(ambientLight);

        const boxGeom = new THREE.BoxGeometry(4,4,4);
        const boxMaterial = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xffffff * Math.random()),
            wireframe: true
        });
        box = new THREE.Mesh(boxGeom, boxMaterial);
        box.position.set(-13,8,2);
        scene.add(box);

        const sphereGeom = new THREE.SphereGeometry(3,30,30);
        const sphereMat = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xffffff * Math.random()),
            wireframe: true
        });
        sphere = new THREE.Mesh(sphereGeom, sphereMat);
        sphere.position.set(0,5,15);
        scene.add(sphere);

        const cylinderGeom = new THREE.CylinderGeometry(2,2,5,20);
        const cylinderMat = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xffffff * Math.random()),
            wireframe: true
        });
        cylinder = new THREE.Mesh(cylinderGeom, cylinderMat);
        cylinder.position.set(10,7,1);
        scene.add(cylinder);

        const coneGeom = new THREE.ConeGeometry(3,6,30);
        const coneMat = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xffffff * Math.random()),
            wireframe: true
        });
        cone = new THREE.Mesh(coneGeom, coneMat);
        cone.position.set(-15,0,7);
        scene.add(cone);

        const torusGeom = new THREE.TorusGeometry(4,1.5,30,30);
        const torusMat = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xffffff * Math.random()),
            wireframe: true
        });
        torus = new THREE.Mesh(torusGeom, torusMat);
        torus.position.set(13,-4,6);
        scene.add(torus);

        const hedronGeom = new THREE.IcosahedronGeometry(4,1);
        const hedronMaterial = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xffffff * Math.random()),
            wireframe: true
        });
        icosahedron = new THREE.Mesh(hedronGeom, hedronMaterial);
        icosahedron.position.set(0,6,-4);
        scene.add(icosahedron);

        const shape = new THREE.Shape();
        shape.moveTo(0,0);
        shape.lineTo(0,4);
        shape.lineTo(4,0);
        shape.lineTo(0,0);

        const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
            depth: 5,
            steps: 5,
            bevelEnabled: true,
            bevelSize: 3,
            bevelSegments: 1,
            bevelThickness: 3
        });
        const extrudeMaterial = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0xffffff * Math.random()),
            wireframe: true
        });
        extruded = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
        extruded.position.set(0,-10,-15);
        scene.add(extruded);
    }

    window.addEventListener('resize', onWindowResize);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        let time = Date.now() * 0.0005;
        box.rotation.x = time;
        box.rotation.y = time;
        sphere.rotation.x = time;
        sphere.rotation.y = time;
        cylinder.rotation.x = time;
        cone.rotation.x = time;
        cone.rotation.z = time;
        torus.rotation.y = time;
        icosahedron.rotation.x = time;
        icosahedron.rotation.y = time;
        extruded.rotation.z = time;
        // extruded.rotation.y = time;
        
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    
})