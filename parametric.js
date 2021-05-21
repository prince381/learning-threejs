document.addEventListener('DOMContentLoaded',() => {

    let scene, camera, renderer, controls, gui, lineMesh;

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

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.1;

        const ambientLight = new THREE.AmbientLight("#f1c40f",1);
        gui.add(ambientLight,'intensity',0.1,5);
        scene.add(ambientLight);

        const axes = new THREE.AxesHelper(30);
        scene.add(axes);

        function getArea(u,v,pos) {
            let result = pos || new THREE.Vector3();
            let x = -10 + 20 * u;
            let z = -10 + 20 * v;
            let y = 3 * Math.sin(10 * (u + v));
            return result.set(x,y,z);
        }

        const parametric = new THREE.ParametricGeometry(getArea, 100, 100, false);
        const paraMaterial = new THREE.MeshLambertMaterial({
            color: "crimson",
            side: THREE.DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: .7
        });
        lineMesh = new THREE.Mesh(parametric, paraMaterial);
        scene.add(lineMesh);
    }

    window.addEventListener('resize', onWindowResize);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

})