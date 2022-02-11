import * as THREE from 'three'
import Stats from './three/jsm/libs/stats.module.js';
import { OrbitControls } from './three/jsm/controls/OrbitControls.js'
import * as QUARTO from './quarto_main.js';

export var stats1,stats2,camera, cameraTarget, scene, renderer, controls,myWidth,myHeight
export const container = document.getElementsByClassName('webgl-container')[0];
let border = +getComputedStyle(container).borderTopWidth.slice(0, -2)
export function init() {
var statsStatus;
    
    
    // container = document.createElement( 'div' );
    // container.classList.add("webgl-container");
    // document.body.appendChild( container );
    myCamera();
    myScene()
    myGround();
    myLights();
    myControls();
    
    myHelpers();
    myRenderer();
    QUARTO.main();
    //renderer.domElement.style.cssText = 'position:absolute;top:0px;left:0px;';
    container.appendChild( renderer.domElement );
    myStats();
    window.addEventListener( 'resize', onWindowResize );
    
}

function myHelpers() {
    scene.add(new THREE.AxesHelper(300));
}

function myStats() {
    stats1 = new Stats();
    stats1.showPanel(0);
    stats1.domElement.style.cssText = 'position:absolute;top:0px;left:0px;';
    //stats.classList.add("stats");
    container.appendChild( stats1.domElement );
}

function myRenderer() {
    myWidth = container.offsetWidth-(border*2);
    myHeight = container.offsetHeight-(border*2);
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( myWidth / myHeight ); //window.devicePixelRatio
    renderer.setSize(myWidth, myHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
}

function myCamera(){
    //myWidth = container.offsetWidth-(border*2);
    //myHeight = container.offsetHeight-(border*2);
    myWidth = container.offsetWidth;
    myHeight = container.offsetHeight;
    camera = new THREE.PerspectiveCamera( 35, myWidth / myHeight, 1, 1000 );
    //camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15 );
    camera.position.set( 1,3, 4 );
    cameraTarget = new THREE.Vector3( 1, -0.1, 1 );
}

function myScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x72645b );
    scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
    
}

function myControls () {
    controls = new OrbitControls(camera, container);  //container  
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
    myWidth = container.offsetWidth-(border*2);
    myHeight = container.offsetHeight-(border*2);
    renderer.setSize(myWidth,myHeight);
    renderer.setSize(myWidth,myHeight);
    camera.aspect = myWidth / myHeight; //window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    
    render();
}

export function animate() {
    requestAnimationFrame( animate );
    render();
    stats1.update();
    
}

function render() {
    const timer = Date.now() * 0.0005;

    //camera.position.x = Math.cos( timer ) * 3;
    //camera.position.z = Math.sin( timer ) * 3;
    camera.lookAt( cameraTarget );
    renderer.render( scene, camera );
    controls.update();
}
