import * as IMG from './imageLoader.js';

export function main() {
    let figures = ['round-high-mark', 'round-high','round-low-mark','round-low','square-high-mark','square-high','square-low-mark','square-low'];
    var cnt = 0;
    for (let i = 0; i < figures.length; i++) {
        IMG.loadSTL(`./assets/models/quarto/${figures[i]}.stl`,"cbinary",0.3*i,0,0);
    }
}