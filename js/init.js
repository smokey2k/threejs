import * as THREE from 'three'
import Stats from './three/jsm/libs/stats.module.js';
import { OrbitControls } from './three/jsm/controls/OrbitControls.js'
import * as QUARTO from './quarto_main.js';

export var container, stats,camera, cameraTarget, scene, renderer, controls


export function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    myRenderer();
    myCamera();
    myScene()
    myGround();
    myLights();
    myControls();
    myStats();
    myHelpers();
    QUARTO.main();
    
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize );
}

function myHelpers() {
    scene.add(new THREE.AxesHelper(300));
}

function myStats() {
    stats = new Stats();
    container.appendChild( stats.dom );
}

function myRenderer() {
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
}

function myCamera(){
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15 );
    camera.position.set( 1.5,2, 5.5 );
    cameraTarget = new THREE.Vector3( 1.3, 1, 1 );
}

function myScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x72645b );
    scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
    
}

function myControls () {
    controls = new OrbitControls(camera, container);    
    controls.enableDamping = true;
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

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

export function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
    
}

function render() {
    const timer = Date.now() * 0.0005;
    //camera.position.x = Math.cos( timer ) * 3;
    //camera.position.z = Math.sin( timer ) * 3;
    camera.lookAt( cameraTarget );
    renderer.render( scene, camera );
}
