import * as THREE from 'three'
import Stats from './three/jsm/libs/stats.module.js';
import { OrbitControls } from './three/jsm/controls/OrbitControls.js'
import * as QUARTO from './quarto_main.js';

export var  stats1,stats2,camera, cameraTarget, scene,
            renderer, controls,myWidth,myHeight, canvasBounds
export const container = document.getElementsByClassName('webgl-container')[0];
let border = +getComputedStyle(container).borderTopWidth.slice(0, -2)
var oldCanvasWidth;



export function init() {
var statsStatus;
    
myCamera();
    myScene()
    myGround();
    myLights();
    myControls();
    myHelpers();
    myRenderer();
    QUARTO.main();
    container.appendChild( renderer.domElement );
//    myStats();
    window.addEventListener( 'resize', Resize );
    window.addEventListener('orientationchange',(event) => {    
        Resize();
        orientationchange(event);    
   });
  

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
    myWidth = container.offsetWidth;
    myHeight = container.offsetHeight;
    oldCanvasWidth = myWidth;
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( myWidth / myHeight ); //window.devicePixelRatio
    renderer.setSize(myWidth, myHeight);
    //renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    
}

function myCamera(){
    //myWidth = container.offsetWidth;
    //myHeight = container.offsetHeight;
    myWidth = container.offsetWidth;
    myHeight = container.offsetHeight;
    camera = new THREE.PerspectiveCamera( 35, myWidth / myHeight, 1, 1000 );
    //camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15 );
    /*
    if (window.innerWidth < 500) {
        camera.position.set( 1,10, 1.15 );
    } else {
        camera.position.set( 1,5, 1.15 );
    }
    */
    camera.position.set( 1,4, 3 );
    cameraTarget = new THREE.Vector3(1, 0, 1 );
    camera.lookAt( cameraTarget );
    
    
}

function myScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x72645b );
    scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
    
}

function myControls () {
    controls = new OrbitControls(camera, container);  //container  
    controls.listenToKeyEvents( window );
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI / 2;
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

function Resize() {
    
    myWidth = container.offsetWidth; // offsetWidth
    myHeight = container.offsetHeight; // offsetHeight
    /*
    if (oldCanvasWidth > myWidth && camera.position.y > 5.1 && camera.position.y < 9.9)  {
        camera.position.y = camera.position.y - 0.1;
    } 
    if (oldCanvasWidth < myWidth && camera.position.y > 5.1 && camera.position.y < 9.9)  {
        camera.position.y = camera.position.y + 0.1;
    }
    oldCanvasWidth = myWidth;
    */
    if (container.width !== myWidth || container.height !== myHeight) {
        if (window.innerWidth < 500) {
            camera.position.set( 1,10, 1.15 );
        } else {
            camera.position.set( 1,5, 1.15 );
        }
        
        renderer.setPixelRatio( myWidth / myHeight );
        renderer.setSize(myWidth, myHeight);//, false
        //renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = myWidth / myHeight;
        camera.updateProjectionMatrix();
      }
    render();
}


export function animate() {
    requestAnimationFrame( animate );
    render();
    controls.update();
    //stats1.update();
    
}

function render() {
    //const timer = Date.now() * 0.0005;
    //camera.position.x = Math.cos( timer ) * 3;
    //camera.position.z = Math.sin( timer ) * 3;
    //camera.lookAt( cameraTarget );
    renderer.render( scene, camera );
}
