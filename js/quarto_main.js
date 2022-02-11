import * as THREE from 'three'
import * as IMG from './imageLoader.js';
//import { scene } from './init.js'
import { Projector } from './three/jsm/renderers/Projector.js';
import * as INIT from './init.js';
import * as RNDCUBES from './randomCubes.js'; 

var light, light_geom, dark, dark,geom, board;

const modelPath = './assets/models/quarto/';


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
    
    IMG.loadSTL(`${modelPath}board.stl`,"cbinary",1,0,1);

    var cnt = 0;
    for (let i = 0; i < figures.length; i++) {
        IMG.loadSTL(`${modelPath}${figures[i]}.stl`,"cbinary",-0.3,0.2,0.3*i);
    }
   
    for (let i = 0; i < figures.length; i++) {
        IMG.loadSTL(`${modelPath}${figures[i]}.stl`,"cbinary",2.3,0.2,0.3*i);
    }

    RNDCUBES.myCubes();
}


