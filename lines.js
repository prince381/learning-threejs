document.addEventListener('DOMContentLoaded',() => {

    let scene, camera, renderer, controls, gui;

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

        camera.position.set(0,10,15);
        camera.lookAt(scene.position);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.1;
        controls.update();

        window.addEventListener('resize', onWindowResize);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    function animate() {
        let time = Date.now() * 0.0005;

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    // const axes = new THREE.AxesHelper(10);
    // scene.add(axes);

    function makeLineShape(num,xfunc,yfunc,zfunc,pos) {
        let points = [];
        const getRandomHexColor = () => {
            return '#' + Math.random().toString().split('.')[1].slice(0,6);
        }

        for (let i = 0; i < num; i++) {
            let x = xfunc(i);
            let y = yfunc(i);
            let z = zfunc(i);
            points.push(new THREE.Vector3(x,y,z));
        }

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: getRandomHexColor(),
            linewidth: 1.3,
            transparent: true,
            opacity: .6
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        line.position.set(pos[0],pos[1],pos[2]);
        scene.add(line)
    }
    
    function getRandomPositions() {
        const xpos = (Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1);
        const ypos = (Math.random() * 7) * (Math.round(Math.random()) ? 1 : -1);
        const zpos = (Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1);

        return [xpos,ypos,zpos]
    }

    const xfunc1 = (i) => Math.sin(i) + 2 * Math.sin(2 * i);
    const yfunc1 = (i) => Math.cos(i) - 2 * Math.cos(2 * i);
    const zfunc1 = (i) => -1 * Math.sin(3 * i);

    for (let i = 0; i < 20; i++) {
        makeLineShape(200,xfunc1,yfunc1,zfunc1,getRandomPositions());
    }

    let lines = []

    for (let child of scene.children) {
        if (child.type == 'Line') {
            lines.push(child);
        }
    }

    console.log(lines);

})