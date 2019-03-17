module.exports = class {

    constructor(ship, PIXI) {
        this.bulletImage = PIXI.Sprite.from('../../res/bullet.png')
        this.bulletImage.x = (ship.sprite.width / 2) + ship.x - 20
        this.bulletImage.y = (ship.y - 10)
        this.fired = false
    }


    getX() {
        return this.bulletImage.x
    }

    getY() {
        return this.bulletImage.y
    }

    getBulletSprite() {
        return this.bulletImage
    }

    setFired(fired){
        this.fired= fired
    }

    getFired(){
        return this.fired
    }

    update(delta) {

            this.bulletImage.y -= 100 * delta
            console.log('moving')

    }

}
