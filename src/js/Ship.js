const Bullet = require('./Bullet')
module.exports = class Ship {

    constructor(PIXI, app) {
        this.PIXI = PIXI
        this.app = app
        this.sprite = this.PIXI.Sprite.from('../../res/ship.png')
        this.sprite.x = 0
        this.sprite.y = parseInt(this.app.view.style.height.replace('px', '')) - this.sprite.height /2 + 50
        this.x = this.sprite.x
        this.y = this.sprite.y
        this.bullets = 150
        this.bulletsArray = []
        this.init()

    }


    init() {
        for (let i = 0; i < this.bullets; i++) {
            this.bulletsArray.push(new Bullet(this, this.PIXI))
        }
    }

    shoot() {
        if(this.bullets > 0) {
            this.app.stage.addChild(this.bulletsArray[this.bullets - 1].getBulletSprite())
            this.bulletsArray[this.bullets - 1].setFired(true)
        }
    }

    moveLeft() {
        this.sprite.x -= 50
    }

    moveRight() {
        this.sprite.x += 50
    }

    superPower() {

    }


    update(delta) {
        this.x = this.sprite.x
        this.y = this.sprite.y
        if(this.bulletsArray[this.bullets -1].getFired()){
            this.bulletsArray[this.bullets - 1].update(delta)
            if(this.bulletsArray[this.bullets - 1].getBulletSprite().y < -  500){
                this.bullets-=1
            }
        }
        this.bulletsArray.forEach(bullet => {
            if(!bullet.fired) {
                bullet.bulletImage.x = (this.sprite.width / 2) + this.x - 20
                bullet.bulletImage.y = (this.y - 10)
            }
        })
    }

    getSprite() {
        return this.sprite
    }
}
