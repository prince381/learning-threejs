document.addEventListener('DOMContentLoaded',() => {

    let scene, camera, renderer, controls, gui, pointsCloud, geom;

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

        const particleCount = 100;
        geom = new THREE.Geometry();
        
        for (let i = 0; i < particleCount; i++) {
            for (let j = 0; j < particleCount; j++) {
                let x = 1 * (i - particleCount / 2);
                let z = 1 * (j - particleCount / 2);
                let y = Math.random() * 50 - 50 / 2;
                let particle = new THREE.Vector3(x,y,z);
                particle.velocityZ = 0.1 * Math.random();
                geom.vertices.push(particle)
            }
        }

        const star = new THREE.TextureLoader().load('./imgs/star.png');
        const pointsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            size: 0.6,
            map: star,
            side: THREE.DoubleSide
        });
        pointsCloud = new THREE.Points(geom,pointsMaterial);
        scene.add(pointsCloud);
        
    }

    window.addEventListener('resize', onWindowResize);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        geom.vertices.forEach(v => {
            if (v.z >= 100) {
                v.z = v.z * -1;
            } else {
                v.z += v.velocityZ;
            }
        });
        geom.verticesNeedUpdate = true;
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

})