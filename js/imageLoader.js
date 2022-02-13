import * as THREE from 'three'
import { STLLoader } from './three/jsm/loaders/STLLoader.js';
import { scene } from './init.js'

var box = new THREE.Box3();
const materials = {
    "red":  { color: 0xFF0000, specular: 0x111111, shininess: 100 },
    "green":  { color: 0x00FF00, specular: 0x111111, shininess: 100 },
    "blue":  { color: 0x0000FF, specular: 0x111111, shininess: 100 }
}

const boxSizes = new THREE.Vector3();

export function STL(container3D,model,material,x,y,z) {
    const loader = new STLLoader();
    let meshMaterial = new THREE.MeshPhongMaterial( materials[material] );
    loader.load ( model, function ( geometry ) {
        const mesh = new THREE.Mesh( geometry, meshMaterial );
        mesh.geometry.center();
        let box = new THREE.Box3().setFromObject(mesh);
        box.getSize(boxSizes);
        mesh.geometry.translate( 0, 0, boxSizes.z/2 );
        mesh.scale.set( 0.01, 0.01, 0.01 );
        mesh.rotation.set( -Math.PI / 2, 0, 0 );
        mesh.position.set( x , y, z )
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        container3D.add( mesh );
    });
}



export function loadSTL(stl,type,x,y,z){
    var material = [];
    let meshMaterial = material;
    const loader = new STLLoader();
    loader.load( stl, function ( geometry ) {
        switch (type) {
            case "ascii":
                material = materials["ascii"]; 
                meshMaterial = new THREE.MeshPhongMaterial( material );
                break;
            case "binary":
                material = materials["binary"]; 
                meshMaterial = new THREE.MeshPhongMaterial( material );
                break;
            case "cbinary":
                material = materials["binary"];
                if ( geometry.hasColors ) {
                    material = { opacity: geometry.alpha, vertexColors: true };
                }
                meshMaterial = new THREE.MeshPhongMaterial( material );
                break;
            case "extra":
                meshMaterial = new THREE.MeshLambertMaterial();
                //meshMaterial = new THREE.MeshBasicMaterial();
                break;
            }
        
        const mesh = new THREE.Mesh( geometry, meshMaterial );
        //mesh.position.set( x, y, z );
        
        boxSizes = new THREE.Vector3();
            
        mesh.geometry.center();
        box = new THREE.Box3().setFromObject(mesh);
        box.getSize(boxSizes);

        mesh.position.set( x , y,z )
        mesh.geometry.translate( 0, 0, boxSizes.z/2 );
        mesh.scale.set( 0.01, 0.01, 0.01 );
        mesh.rotation.set( -Math.PI / 2, 0, 0 );

        mesh.position.set( x , y,z )

        var boxhelper = new THREE.BoxHelper( mesh, 0xffff00 );
       
        boxhelper.update();

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add( mesh,boxhelper );
    } );
}