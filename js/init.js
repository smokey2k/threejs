import * as THREE from 'three'
import Stats from './three/jsm/libs/stats.module.js';
import { OrbitControls } from './three/jsm/controls/OrbitControls.js'
import * as QUARTO from './quarto_main.js';

export var  stats1,stats2,camera, scene,cameraTarget,renderer, controls,myWidth,myHeight, canvasBounds

const container = document.getElementsByClassName('main-mid')[0];
const canvas = document.getElementsByClassName('webgl-container')[0];



//myInput.onclick = QUARTO.webglInput();


var oldCanvasWidth;




export function init() {
var statsStatus;
    myScene()
    myCamera();
    myControls();
   
    //myGround();
    myLights();
    
    //myHelpers();
    myRenderer();
    QUARTO.main();
    canvas.appendChild( renderer.domElement );
//    myStats();

function myHelpers() {
    scene.add(new THREE.AxesHelper(300));
}

function myStats() {
    stats1 = new Stats();
    stats1.showPanel(0);
    stats1.domElement.style.cssText = 'position:absolute;top:0px;left:0px;';
    //stats.classList.add("stats");
    canvas.appendChild( stats1.domElement );
}

function myRenderer() {
    myWidth = container.offsetWidth;
    myHeight = container.offsetHeight;
    oldCanvasWidth = myWidth;
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( myWidth / myHeight ); //window.devicePixelRatio
    renderer.setSize(myWidth, myHeight);
    //renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;

    //renderer.domElement.addEventListener("click", onclick, true);
    renderer.domElement.addEventListener( 'resize', Resize,false ); //window renderer.domElement
    renderer.domElement.addEventListener('orientationchange',(event) => {    
        Resize();
        orientationchange(event);    
   });
}


}



function myScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 ); //0x72645b
    //scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
}

function myCamera(){
    myWidth = container.offsetWidth;
    myHeight = container.offsetHeight;
    camera = new THREE.PerspectiveCamera( 35, myWidth / myHeight, 1, 1000 );
    
    camera.position.set(1,4,5 );

    camera.updateProjectionMatrix();
    scene.add( camera );
}

function myControls () {
    controls = new OrbitControls(camera, canvas);  //canvas  
    //controls.listenToKeyEvents( window );
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    
    controls.minDistance = 2;
    controls.maxDistance = 10;
    
    //controls.minPolarAngle=- - Math.PI/4;
    controls.maxPolarAngle = Math.PI/2;
    controls.minAzimuthAngle = - Math.PI/2;
    controls.maxAzimuthAngle = Math.PI/2;
    //controls.maxZoom = 6;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.rotateSpeed = 0.5;
    controls.keyPanSpeed = 20;
    controls.panSpeed = 1;
    controls.keys = {
        LEFT: 'KeyA', //left arrow
        UP: 'KeyW', // up arrow
        RIGHT: 'KeyD', // right arrow
        BOTTOM: 'KeyS' // down arrow
    }

    controls.target = new THREE.Vector3(1, 1, 1.25);
    
    controls.update();
    
}

function myLights () {
    scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
    addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
    addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );
}

function myGround() {
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 40, 40 ),
        new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = - 0.5;
    scene.add( plane );
    plane.receiveShadow = true;
}

function addShadowedLight( x, y, z, color, intensity ) {
    const directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene.add( directionalLight );
    directionalLight.castShadow = true;
    const d = 1;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;
    directionalLight.shadow.bias = - 0.002;
}


function orientationchange(event) {
    if (event.target.screen.orientation.angle == 90) {
    }
    if (event.target.screen.orientation.angle == 0) {
    }
}

function Resize(event) {
    myWidth = canvas.offsetWidth; // offsetWidth
    myHeight = canvas.offsetHeight; // offsetHeight
    if (container.width !== myWidth || container.height !== myHeight) {
        
        
        
    }
    renderer.setPixelRatio( myWidth / myHeight );
        renderer.setSize(myWidth, myHeight);//, false
        camera.aspect = myWidth / myHeight;
        //camera.lookAt(scene.position);
        camera.updateProjectionMatrix();
        
        controls.update();
    render();
}


export function animate() {
    
    requestAnimationFrame( animate );
    render();
    
    
    //stats1.update();
    
}

function render() {
    //const timer = Date.now() * 0.0005;
    //camera.position.x = Math.cos( timer ) * 3;
    //camera.position.z = Math.sin( timer ) * 3;
    //camera.lookAt( cameraTarget );
    //camera.lookAt(scene.position);
    camera.updateProjectionMatrix();   
    controls.update();
    renderer.render( scene, camera );
}
