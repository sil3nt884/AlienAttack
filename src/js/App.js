const PIXI = require('pixi.js')
const app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
let assets =[]
const ship = new PIXI.Sprite.from('../../res/ship.png')

let loadAsessts = () =>{

   assets.push(ship)

}

loadAsessts()


let main = () =>{
    document.body.appendChild(app.view)
    console.log(ship)
    ship.anchor.set(0.5)
    ship.x = app.screen.width / 2;
    ship.y = app.screen.height / 2;
    console.log('-------------->',ship)

    app.stage.addChild(ship);
}


main();


app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    ship.rotation += 100 * delta;
});

