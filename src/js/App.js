const PIXI = require('pixi.js')
const app = new PIXI.Application(1920, 1080, {backgroundColor: 0x000000, antialias: true});
const Ship = require('./Ship')
const ratio = 1920 / 1080;
import "@babel/polyfill";

const request = require('request-promise-native')

let ship = null

let resize = () => {
    let w, h
    if (window.innerWidth / window.innerHeight >= ratio) {
        w = window.innerHeight * ratio;
        h = window.innerHeight;
    } else {
        w = window.innerWidth;
        h = window.innerWidth / ratio;
    }
    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';
}

let createStar = (x, y) => {
    let graphics = new PIXI.Graphics()
    graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
    graphics.beginFill(0xFFFFFF);
    graphics.drawCircle(x, y, 5);
    graphics.endFill();

    return graphics
}

let createStars = async () => {
    let url = 'https://api.random.org/json-rpc/2/invoke'
    let json = {
        "jsonrpc": "2.0"
        , "method": "generateIntegers",
        "params": {
            "apiKey": "4b820666-fbb9-4fe3-8790-5969a3df7deb",
            "n": 60,
            "min": 1,
            "max": 1920,
            "replacement": true,
            "base": 10
        },
        "id": 6064
    }

    let options = {
        json: true,
        body: json,
        method: 'post',
        url: url
    }

    let res2 = await request(options)
    console.log(res2)
    let stars = undefined
    if (res2.result.random) {
        console.log('------> no error')
        stars = res2.result.random.data
    }
   else if (res2.error.code === 403) {
        console.log('------> error')
        stars = []
        for (let i = 0; i < 60; i++) {
            stars.push(Math.floor(Math.random() * 1920) + 1)
        }
    }
    let width = stars.filter(star => star <= 1080)
    let height = stars.filter(star => star <= 1920)
    console.log('do i have stars?   ',width, height)
    let starsArray = []
    for(let x =0; x<width.length; x++){
        for(let y =0; y<height.length; y++ ){
            starsArray.push(createStar(height[y] * Math.random() * 5 , width[x] * Math.random() * 10))
        }
    }
    console.log('finished creating stars')
    console.log('created stars length --->', starsArray.length)
    return starsArray

}


let loadAsessts = () => {
    ship = new Ship(PIXI, app)
}

let main = async () => {
    resize()
    loadAsessts()
    let createdStars = await createStars()
    window.onresize = resize;
    document.body.appendChild(app.view)
    let key = {};
    key.downHandler = event => {
        if (event.key === 'ArrowLeft') {
            ship.moveLeft()
        }
        if (event.key === 'ArrowRight') {
            ship.moveRight()
        }
        console.log(event.code)
        if (event.code === 'Space') {
            ship.shoot()
        }


        event.preventDefault();

    };
    key.upHandler = event => {
        // console.log(event)
        event.preventDefault();

    };
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );
    createdStars.forEach(star => app.stage.addChild(star))
    app.stage.addChild(ship.getSprite());
    //app.stage.addChild(createdStars[0])
    //createdStars.forEach(star => app.stage.addChild(star))


}


main();


app.ticker.add(function (delta) {
    ship.update(delta)

});



