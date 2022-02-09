import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
export const container = document.getElementsByClassName('container')[0];
export const canvas = document.getElementsByClassName('webgl')[0];
export const scene = new THREE.Scene()
export const light = new THREE.SpotLight()
