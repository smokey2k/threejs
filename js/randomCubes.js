import * as THREE from 'three'
import * as IMG from './imageLoader.js';
import * as INIT from './init.js';
var cubes, geom

var range = 1

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
    return cubes;
}


