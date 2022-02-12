import * as THREE from 'three'
import * as IMG from './imageLoader.js';
import * as INIT from './init.js';
var cubes, geom

var range = 1
var selectedObject = null;
var oldColor = 0;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


export function myCubes() {
    geom = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    cubes = new THREE.Object3D();
    INIT.scene.add( cubes );
    for(var i = 0; i < 100; i++ ) {
        var grayness = Math.random() * 0.5 + 0.25,
            mat = new THREE.MeshBasicMaterial(),
            cube = new THREE.Mesh( geom, mat );
        mat.color.setRGB( grayness, grayness, grayness );
        cube.position.set ( 
            1 + range * (0.5 - Math.random()),
            1 + range * (0.5 - Math.random()),
            1 + range * (0.5 - Math.random())
        );
        var scalarTest = new THREE.Vector3(
            Math.random(),
            Math.random(),
            Math.random()
        ).multiplyScalar( 0.01 * Math.PI );
        
        cube.rotation.set(scalarTest.x,scalarTest.y,scalarTest.z);
        
        cube.grayness = grayness; // *** NOTE THIS
        cubes.add( cube );

    }
    document.addEventListener( 'pointermove', onPointerMove );
}


function onPointerMove( event ) {
    if ( selectedObject ) {
        selectedObject.material.color.setHex( oldColor );
        selectedObject = null;
    }
    var myWidth = INIT.myWidth;
    var myHeight = INIT.myHeight;
    pointer.x = ( event.clientX /  window.innerWidth) * 2 - 1; //window.innerWidth INIT.myWidth
    pointer.y =  - ( event.clientY / window.innerHeight ) * 2 + 1; //window.innerHeight INIT.myHeight
    //INIT.camera.aspect = INIT.myWidth / INIT.myHeight;
    raycaster.setFromCamera( pointer, INIT.camera );
    const intersects = raycaster.intersectObject( cubes, true );
    if ( intersects.length > 0 ) {
        const res = intersects.filter( function ( res ) {
            return res && res.object;
        } )[ 0 ];
        if ( res && res.object ) {
            selectedObject = res.object;
            oldColor = selectedObject.material.color.getHex();
            selectedObject.material.color.set( '#FFFF00' );
        }
    }

}