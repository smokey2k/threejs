import * as THREE from 'three'
import * as IMG from './imageLoader.js';
//import { scene } from './init.js'
import { Projector } from './three/jsm/renderers/Projector.js';
import * as INIT from './init.js';
import * as RNDCUBES from './randomCubes.js'; 

const modelPath = './assets/models/quarto/';

var selectedObject = null;
var oldColor = 0;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const game = new THREE.Object3D(0,0,0);

export function main() {
    let figures = [
        'kerek_alacsony_lukas', 
        'kerek_alacsony_teli',
        'kerek_magas_lukas',
        'kerek_magas_teli',
        'kocka_alacsony_lukas', 
        'kocka_alacsony_teli',
        'kocka_magas_lukas',
        'kocka_magas_teli'
    ]
    
    const disks = new THREE.Object3D();
    const figuresLight = new THREE.Object3D(0,0,0);
    const figuresDark = new THREE.Object3D(0,0,0);
    const diskBase = new THREE.Vector3(0.325 , 0.07, 0.325 );
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            const geometry = new THREE.CylinderGeometry( 0.18, 0.18, 0.01, 32 );
            var number = Math.floor(Math.random() * 10) + 1;
            const material = new THREE.MeshBasicMaterial( {color: Math.floor(Math.random() * 255) + 1} );
            const disk = new THREE.Mesh( geometry, material );
            disk.position.set( diskBase.x + (0.45 *x), diskBase.y, diskBase.z + (0.45 *y) )
            disks.add( disk );
        }
    }
    
    IMG.STL(INIT.scene,`${modelPath}board.stl`,"green",1,0,1);
    for (let i = 0; i < figures.length; i++) {
        IMG.STL(figuresLight,`${modelPath}${figures[i]}.stl`,"red",-0.3,0.2,0.3*i);
        IMG.STL(figuresDark,`${modelPath}${figures[i]}.stl`,"blue",2.3,0.2,0.3*i);
    }
    game.add(figuresLight,figuresDark,disks) //RNDCUBES.myCubes()
    game.position.set(0,0,0);
    INIT.scene.add( game, );
    document.addEventListener( 'pointermove', onPointerMove );
}


function onPointerMove( event ) {
    if ( selectedObject ) {
        selectedObject.material.color.setHex( oldColor );
        selectedObject = null;
    }
    let canvasBounds = INIT.renderer.domElement.getBoundingClientRect();
    pointer.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
    pointer.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
    raycaster.setFromCamera( pointer, INIT.camera );
    const intersects = raycaster.intersectObject( game, true );
    if ( intersects.length > 0 ) {
        const res = intersects.filter( function ( res ) {
            return res && res.object;
        } )[ 0 ];
        if ( res && res.object ) {
            selectedObject = res.object;
            oldColor = selectedObject.material.color.getHex();
            selectedObject.material.color.set( '#FFFFFF' );
        }
    }
}

