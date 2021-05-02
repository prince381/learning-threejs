document.addEventListener('DOMContentLoaded',function() {

    /*
        This file contains code for the basics of Three.js which entails
        creating a scene, camera, and a renderer. Other features like using
        the orbitcontrols.js to control the camera's postioning is also
        included in this file.
                    We just create a simple cube with wireframe that sits
        right in the center of an axes which is positioned in the center of
        the screen. We use the dat.gui to create controls for our 3D object.

    */

    // create a scene, camera and a GUI control system.
    const scene = new THREE.Scene(),
          camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000),
          renderer = new THREE.WebGLRenderer({antialias: true}),
          gui = new dat.GUI();

    // set the size, color, and the shadow effect of the renderer.
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMap.enabled = true;

    // set the postion of the camera
    camera.position.set(-30,40,30);
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
    cameraFolder.add(camera,'zoom',0,2).onChange(updateCamera);

    // create an axes helper to help see the axes.
    const axes = new THREE.AxesHelper(50);
    scene.add(axes);
    // console.log(axes)

    // create a cube using the box geometry
    let cubeGeom = new THREE.BoxGeometry(5,5,5);
    let cubeMaterial = new THREE.MeshBasicMaterial({
        color: 'crimson',
        wireframe: true
    });
    let cube = new THREE.Mesh(cubeGeom, cubeMaterial);
    cube.position.set(0,0,0);
    scene.add(cube);
    // create a GUI folder for the cube's positioning
    const cubePositionFolder = gui.addFolder('Cube Position');
    cubePositionFolder.add(cube.position,'x',-50,50);
    cubePositionFolder.add(cube.position,'y',-50,50);
    cubePositionFolder.add(cube.position,'z',-50,50);
    // create a GUI folder for the cube's scaling
    const cubeScaleFolder = gui.addFolder('Cube Scale');
    cubeScaleFolder.add(cube.scale,'x',0,5);
    cubeScaleFolder.add(cube.scale,'y',0,5);
    cubeScaleFolder.add(cube.scale,'z',0,5);
    // create a GUI folder for the cube's rotation
    const cubeRotationFolder = gui.addFolder('Cube Rotation');
    cubeRotationFolder.add(cube.rotation,'x',0,Math.PI * 2);
    cubeRotationFolder.add(cube.rotation,'y',0,Math.PI * 2);
    cubeRotationFolder.add(cube.rotation,'z',0,Math.PI * 2);
    // console.log(cube)

    const output = document.querySelector('.webgl-output');
    output.appendChild(renderer.domElement);
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

    animate();
})