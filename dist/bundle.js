/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./lib/tiny-canvas.js */ "./src/lib/tiny-canvas.js");
__webpack_require__(/*! ./lib/sounds.js */ "./src/lib/sounds.js");
let rnd = Math.random;
var Dir;
(function (Dir) {
    Dir[Dir["Left"] = 0] = "Left";
    Dir[Dir["Right"] = 1] = "Right";
})(Dir || (Dir = {}));
var EventType;
(function (EventType) {
    EventType[EventType["RP"] = 0] = "RP";
    EventType[EventType["LR"] = 1] = "LR";
    EventType[EventType["RR"] = 2] = "RR";
    EventType[EventType["LP"] = 3] = "LP";
    EventType[EventType["JP"] = 4] = "JP";
    EventType[EventType["UP"] = 5] = "UP";
    EventType[EventType["AP"] = 6] = "AP";
    EventType[EventType["AR"] = 7] = "AR";
})(EventType || (EventType = {}));
var canvas = TC(document.getElementById('c'));
function rdnAngle() {
    const v = (rnd() * (125 - 0) + 0) / 1000;
    if (rnd() >= 0.5) {
        return (2 - v) * Math.PI;
    }
    else {
        return v * Math.PI;
    }
}
function getAABB(b) {
    return {
        lt: { x: b.position.x, y: b.position.y },
        rt: { x: b.position.x + b.width, y: b.position.y },
        rb: { x: b.position.x + b.width, y: b.position.y + b.height },
        lb: { x: b.position.x, y: b.position.y + b.height }
    };
}
function getTileIndeces(v) {
    return Math.floor(v.y / 20 /* tileSize */) * 50 /* worldSize */ + Math.floor(v.x / 20);
}
function collide(body1, body2) {
    const result = body1.position.x < (body2.position.x + body2.width) &&
        body1.position.x + (body1.width) > body2.position.x &&
        body1.position.y < body2.position.y + body2.height &&
        body1.position.y + body1.height > body2.position.y;
    return result;
}
exports.collide = collide;
function loadTextures(urls) {
    return new Promise((resolver, rejects) => {
        let result = new Array();
        urls.forEach((url, index) => {
            const img = new Image;
            img.src = url;
            img.onload = () => {
                const g = document.createElement("canvas").getContext("2d");
                g.canvas.height = img.height;
                g.canvas.width = img.width;
                g.drawImage(img, 0, 0, img.width, img.height);
                const tex1 = {
                    width: img.width,
                    height: img.height,
                    text: TCTex(canvas.g, g.canvas, img.width, img.height)
                };
                g.clearRect(0, 0, img.width, img.height);
                g.save();
                g.scale(-1, 1);
                g.drawImage(img, img.width * -1, 0, img.width, img.height);
                g.restore();
                const tex2 = {
                    width: img.width,
                    height: img.height,
                    text: TCTex(canvas.g, g.canvas, img.width, img.height)
                };
                var i = index * 2;
                result[i++] = tex1;
                result[i] = tex2;
                if (index == urls.length - 1) {
                    setTimeout(() => {
                        resolver(result);
                    }, 1000);
                }
            };
        });
    });
}
function createBulletTexture() {
    const g = document.createElement("canvas").getContext("2d");
    g.canvas.width = 4;
    g.canvas.height = 4;
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.fillStyle = '#ff6';
    g.beginPath();
    g.arc(2, 2, 2, 0, 2 * Math.PI);
    g.fill();
    return TCTex(canvas.g, g.canvas, 4, 4);
}
loadTextures(["bothitted.png", "mountain.png", "floor.png", "soldier_run.png", "soldier_idle.png", "soldier_shooting.png", "bot.png"]).then((textures) => {
    const [rbotHit, lbotHit, rMountain, lMountain, rightFloor, leftFloor, rightRun, leftRun, rightIdle, leftIdle, rightShoot, leftShoot, rightBot, leftBot] = textures;
    const bulletTexture = createBulletTexture();
    let currentDelta = 0.0;
    let currentTime = 0.0;
    let currentAction = null;
    const GRAVITY = 10;
    const JUMP_VEL = 30;
    const WALK_SPEED = 6;
    let startTime = 0;
    let id = 0;
    const [width, height] = [canvas.g.canvas.width, canvas.g.canvas.height];
    let particles = [];
    let persistence = [];
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) * 0.3,
            y: (evt.clientY - rect.top) * 0.15
        };
    }
    function initBullets(num) {
        const bs = [];
        for (let i = 0; i < num; i++) {
            bs.push({ position: { x: 50, y: 50 }, velocity: { x: 0, y: 0 }, visible: false, dir: Dir.Left, width: 4, height: 4 });
        }
        return bs;
    }
    function newEnemy(x, y, vel) {
        return {
            position: { x: x, y: y },
            velocity: { x: vel, y: 0.0 },
            dir: Dir.Left,
            width: 20,
            height: 20,
            visible: true,
            hitted: false,
            life: 3
        };
    }
    function newEnemies(x, y, n) {
        const es = [];
        for (var i = 0; i < n; i++) {
            es.push(newEnemy(x, y, WALK_SPEED * rnd() * (2.9 - 1.5) + 1.5));
        }
        return es;
    }
    const cam = { position: { x: 0, y: 0 }, width: 300, height: 150, maxX: 0, maxY: 0 };
    window["cam"] = cam;
    let camCenter = cam.position;
    let radioToShake = 0;
    let shake = false;
    function shaking() {
        const x = 0, y = 0;
        const ang = rnd() % Math.PI * 2;
        const nx = Math.sin(ang) * radioToShake;
        const ny = Math.cos(ang) * radioToShake;
        cam.position.x = x + nx;
        cam.position.y = y + ny;
        radioToShake *= 0.9;
    }
    canvas.g.canvas.addEventListener("click", (event) => {
        const pos = getMousePos(canvas.g.canvas, event);
        /*     var rnd = Math.random
            const sp = WALK_SPEED*2
            const jp = JUMP_VEL*4
                for (var i = 0; i < 10; i++) {
                    const vx = rnd() * (sp - (-sp)) + (-sp)
                    const vy = rnd() * (jp - (-jp)) + (-jp)
                    var angle = rnd() * Math.PI * 2;
                //	particles.push(Particle(pos.x, pos.y, vx * Math.cos(angle), vy * Math.sin(angle)))
                    particles.push({position: {x: pos.x,y:pos.y},velocity:{x: vx * Math.cos(angle), y:vy * Math.sin(angle)},dir:Dir.Left,height:4,width:4,visible:true})
                } */
    });
    function explodeParticles(x, y) {
        var rnd = Math.random;
        const sp = WALK_SPEED * 2;
        const jp = JUMP_VEL * 3;
        for (var i = 0; i < 10; i++) {
            const vx = rnd() * (sp - (-sp)) + (-sp);
            const vy = rnd() * (jp - (-jp)) + (-jp);
            var angle = rnd() * Math.PI * 2;
            particles.push({ position: { x: x, y: y }, velocity: { x: vx * Math.cos(angle), y: vy * Math.sin(angle) }, dir: Dir.Left, height: 4, width: 4, visible: true });
        }
    }
    let currentState = {
        player: {
            position: { x: 128, y: 0.0 },
            velocity: { x: 0.0, y: 0.0 },
            dir: Dir.Right,
            shooting: false,
            width: 20,
            height: 20,
            visible: true
        },
        enemies: newEnemies(34, 0, 5),
        bullets: initBullets(10)
    };
    const FLOOR = height - 10;
    const SECOND_FLOOR = FLOOR * 0.7;
    function createFloor(x, y, width) {
        return { position: { x: x, y: y }, width: width, height: 20, dir: Dir.Left, velocity: { x: 0, y: 0 }, visible: true };
    }
    const floors = [createFloor(0.0, FLOOR, 900), createFloor(40.0, SECOND_FLOOR, 100), createFloor(230.0, SECOND_FLOOR, 290)];
    const keepAnimation = (time) => {
        currentDelta = (time - startTime) / 100;
        currentTime = time;
        startTime = time;
        render(currentState);
        update(currentAction, currentState);
        currentAction = null;
        id = requestAnimationFrame(keepAnimation);
    };
    function runGame() {
        requestAnimationFrame(keepAnimation);
    }
    const handlerStart = (ev) => {
        switch (ev.currentTarget['id']) {
            case "a":
                currentAction = EventType.JP;
                break;
            case "b":
                currentAction = EventType.AP;
                break;
            case "left":
                currentAction = EventType.LP;
                break;
            case "right":
                currentAction = EventType.RP;
                break;
            default:
                // code...
                break;
        }
    };
    const handlerEnd = (ev) => {
        switch (ev.currentTarget['id']) {
            case "b":
                currentAction = EventType.AR;
                break;
            case "left":
                currentAction = EventType.LR;
                break;
            case "right":
                currentAction = EventType.RR;
                break;
            default:
                // code...
                break;
        }
    };
    const svgs = document.querySelectorAll("rect");
    const psOp = { passive: true };
    svgs.forEach(rec => {
        rec.addEventListener("touchstart", handlerStart, psOp);
        rec.addEventListener("touchend", handlerEnd, psOp);
    });
    const handlerKBDown = (e) => {
        switch (e.keyCode) {
            case 37:
                currentAction = EventType.LP;
                break;
            case 39:
                currentAction = EventType.RP;
                break;
            case 38:
                currentAction = EventType.JP;
                break;
            case 13:
                currentAction = EventType.UP;
                break;
            case 32:
                currentAction = EventType.AP;
                break;
            default:
                break;
        }
    };
    window.addEventListener('keydown', handlerKBDown, true);
    const handlerKBUp = (e) => {
        switch (e.keyCode) {
            case 37:
                currentAction = EventType.LR;
                break;
            case 39:
                currentAction = EventType.RR;
                break;
            case 32:
                currentAction = EventType.AR;
                break;
            default:
                break;
        }
    };
    window.addEventListener('keyup', handlerKBUp, true);
    function BodyAnimation(rightT, leftT, ticksPerFrame, loop, frames) {
        const nFrames = frames.length;
        let frameIndex = 0, tickCount = 0;
        this.reset = function () {
            if (!(frameIndex < nFrames - 1)) {
                frameIndex = 0;
            }
        };
        this.update = function (p) {
            tickCount += 1;
            if (tickCount > ticksPerFrame) {
                tickCount = 0;
                if (frameIndex < frames.length - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                }
                else if (loop) {
                    frameIndex = 0;
                }
            }
            const [v0, u0, v1, u1] = frames[frameIndex];
            let text = p.dir == Dir.Right ? rightT : leftT;
            canvas.img(text.text, -cam.position.x + (p.position.x + (p.width / 2)), -cam.position.y + p.position.y, p.width, p.height, v0, u0, v1, u1);
        };
    }
    /*   function isOverFloor(b: Body): boolean{
        return b.position.y + b.height == FLOOR || collideFloorBottom(b,secondFloorBody);
      }
     */
    function isOverFloor(b) {
        let floorBottoms = false;
        for (var i = 0; i < floors.length; i++) {
            floorBottoms = floorBottoms || collideFloorBottom(b, floors[i]);
        }
        return b.position.y + b.height == FLOOR || floorBottoms;
    }
    const botHittedAnim = new BodyAnimation(rbotHit, lbotHit, 2, true, [[0, 0, 1, 1]]);
    const botAnim = new BodyAnimation(rightBot, leftBot, 5, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const idleAnim = new BodyAnimation(rightIdle, leftIdle, 20, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const runAnim = new BodyAnimation(rightRun, leftRun, 8, true, [[0, 0, 1, 0.2], [0, .2, 1, 0.4], [0, .4, 1, 0.6], [0, .6, 1, 0.8], [0, .8, 1, 1.0]]);
    const shootingAnim = new BodyAnimation(rightShoot, leftShoot, 3, false, [[0, 0, 1, 0.25], [0, .25, 1, 0.5], [0, .5, 1, 0.75], [0, .75, 1, 1.0]]);
    let gunReady = 0;
    let jumpTries = 2;
    let ticksHitted = 0;
    function update(a, m) {
        if (radioToShake > 0.0002) {
            shaking();
        }
        const p = m.player;
        if (isOverFloor(p)) {
            jumpTries = 2;
        }
        switch (a) {
            case EventType.JP:
                if (jumpTries > 0) {
                    jumpTries--;
                    p.velocity.y = -JUMP_VEL;
                    jumpSound();
                }
                p.shooting = false;
                break;
            case EventType.LP:
                p.dir = Dir.Left;
                p.velocity.x = -WALK_SPEED;
                p.shooting = false;
                break;
            case EventType.RP:
                p.dir = Dir.Right;
                p.velocity.x = WALK_SPEED;
                p.shooting = false;
                break;
            case EventType.LR:
                p.velocity.x = 0;
                break;
            case EventType.RR:
                p.velocity.x = 0;
                break;
            case EventType.AP:
                shootingAnim.reset();
                p.shooting = true;
                p.velocity.x = (p.dir == Dir.Left ? 1.5 : -1.5);
                for (var i = 0; i < m.bullets.length; i++) {
                    const b = m.bullets[i];
                    if (!b.visible && gunReady == 0) {
                        const angle = rdnAngle();
                        b.position.x = p.position.x + p.width + b.width;
                        b.position.y = p.position.y + (p.height / 2.4);
                        b.velocity.x = (p.dir == Dir.Right ? 35 : -35) * Math.cos(angle);
                        b.velocity.y = 5 * Math.sin(angle);
                        b.visible = true;
                        gunReady = 8;
                        fireSound();
                        radioToShake = 2;
                        break;
                    }
                }
                break;
            case EventType.AR:
                p.velocity.x = 0;
                //p.shooting = false
                //ShootingAnim.reset()
                break;
            default:
                break;
        }
        move(m.player);
        for (var i = 0; i < m.enemies.length; i++) {
            const e = m.enemies[i];
            ticksHitted = Math.max(ticksHitted - 1, 0);
            if (ticksHitted == 0) {
                e.hitted = false;
            }
            move(e);
            if (e.position.x < 0 || (e.position.x + 20 > 900)) {
                e.velocity.x = e.velocity.x * -1;
                e.dir = e.velocity.x > 0 ? Dir.Left : Dir.Right;
            }
            m.bullets.filter(b => b.visible).forEach(b => {
                if (e.visible && collide(b, e)) {
                    hitSound();
                    e.hitted = true;
                    ticksHitted = 8;
                    e.position.x += (b.velocity.x > 0 ? +18 : -18);
                    if (e.life == 0) {
                        radioToShake = 4;
                        explodeParticles(e.position.x + (e.width / 2), e.position.y + (e.height / 2));
                        e.visible = false;
                        e.velocity.x = 0;
                    }
                    else {
                        e.life = Math.max(e.life - 1, 0);
                    }
                    b.visible = false;
                    b.velocity.x = 0;
                }
            });
        }
        for (var i = 0; i < m.bullets.length; i++) {
            const b = m.bullets[i];
            moveBullet(b);
        }
        for (var i = 0; i < particles.length; i++) {
            const p = particles[i];
            move(p);
            for (var f = 0; f < floors.length; f++) {
                if (collideFloorBottom(p, floors[f])) {
                    persistence.push(particles[i]);
                    particles.splice(i, 1);
                }
            }
        }
        gunReady = Math.max(0, gunReady - 1);
        moveCam(m.player);
    }
    function moveCam(b) {
        cam.position.x = Math.max(b.position.x - (cam.width / 2), 0);
    }
    //canvas.scale(4, 4)
    let texDataFloor = [];
    for (var i = 0; i < 20 * 20 * 4; i++) {
        texDataFloor[i] = 1.0;
    }
    function renderMountain() {
        canvas.push();
        canvas.scale(6, 6);
        for (var x = 0; x < 100; x += 20) {
            canvas.img(lMountain.text, (-cam.position.x * 0.06) + x, (-cam.position.y * 0.06) + 5, lMountain.width, lMountain.height, 0, 0, 1, 1);
        }
        canvas.pop();
    }
    function renderFloor() {
        for (var f = 0; f < floors.length; f++) {
            const floor = floors[f];
            for (var x = floor.position.x; x <= floor.position.x + floor.width; x += 20) {
                const text = x % 7 == 0 ? leftFloor : rightFloor;
                canvas.img(text.text, -cam.position.x + x, -cam.position.y + (floor.position.y - 10), text.width, text.height, 0, 0, 1, 1);
            }
        }
    }
    function ifOnTheFloorgetY(b) {
        let bottomCollide = -1;
        for (var i = 0; i < floors.length; i++) {
            bottomCollide = collideFloorBottom(b, floors[i]) ? floors[i].position.y : -1;
        }
        return bottomCollide;
    }
    function applyGravity(b) {
        b.velocity.y = ifOnTheFloorgetY(b) < 0 ? b.velocity.y + (GRAVITY * currentDelta) : b.velocity.y;
    }
    function outsideScreen(b) {
        return b.position.x < 0 || b.position.x > 900;
    }
    function moveBullet(b) {
        if (outsideScreen(b)) {
            b.visible = false;
            b.velocity.x = 0;
        }
        b.position.x += b.velocity.x * currentDelta;
        b.position.y += b.velocity.y * currentDelta;
    }
    function collideFloorTop(b, f) {
        return collide(b, f) &&
            f.position.y + (f.height / 2) > b.position.y;
    }
    function collideFloorBottom(b, f) {
        return collide(b, f) &&
            b.position.y < f.position.y;
    }
    function collideFloorLeft(b, f) {
        return collide(b, f) &&
            b.position.x < f.position.x && b.position.x + b.width > f.position.x;
    }
    function collideFloorRight(b, f) {
        return collide(b, f) &&
            b.position.x + (b.width * 0.9) < f.position.x && b.velocity.x > 0;
    }
    function move(b) {
        const groundY = ifOnTheFloorgetY(b);
        b.position.y = groundY < 0 ? b.position.y + (b.velocity.y * currentDelta) : groundY - b.height;
        b.position.x += b.velocity.x * currentDelta;
        applyGravity(b);
        for (var f = 0; f < floors.length; f++) {
            if (collideFloorTop(b, floors[f])) {
                if (b.velocity.y < 0) {
                    b.velocity.y = 0;
                }
            }
            if (collideFloorBottom(b, floors[f])) {
                if (b.velocity.y > 0) {
                    b.velocity.y = 0;
                }
            }
        }
    }
    const render = (m) => {
        canvas.g.canvas.style.width = "auto";
        canvas.g.canvas.style.height = Math.round(window.innerHeight * 0.95) + "px";
        canvas.g.viewport(0, 0, canvas.g.canvas.width, canvas.g.canvas.height);
        renderMountain();
        const p = m.player;
        canvas.cls();
        canvas.bkg(57 / 255, 73 / 255, 81 / 255);
        renderFloor();
        if (p.shooting) {
            shootingAnim.update(p);
        }
        else if (p.velocity.x == 0) {
            idleAnim.update(p);
        }
        else {
            runAnim.update(p);
        }
        for (var i = 0; i < m.enemies.length; i++) {
            const e = m.enemies[i];
            if (e.visible) {
                if (e.hitted) {
                    botHittedAnim.update(e);
                }
                else {
                    botAnim.update(e);
                }
            }
        }
        for (var i = 0; i < m.bullets.length; i++) {
            const b = m.bullets[i];
            if (b.visible) {
                canvas.img(bulletTexture, -cam.position.x + b.position.x, -cam.position.y + b.position.y, 4, 4, 0, 0, 1, 1);
            }
        }
        for (var i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (p.visible) {
                canvas.img(rbotHit.text, -cam.position.x + p.position.x, -cam.position.y + p.position.y, 8, 8, 0, 0, .7, 1);
            }
        }
        for (var i = 0; i < persistence.length; i++) {
            const p = persistence[i];
            if (p.visible) {
                canvas.img(rbotHit.text, -cam.position.x + p.position.x, -cam.position.y + p.position.y, 8, 8, 0, 0, .7, 1);
            }
        }
        canvas.flush();
        //fpsM.tick()
    };
    /*  */ if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const svgs = document.querySelectorAll("svg");
        svgs.forEach(svg => {
            svg.style.display = "block";
        });
    }
    runGame();
});


/***/ }),

/***/ "./src/lib/sounds.js":
/*!***************************!*\
  !*** ./src/lib/sounds.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function E(c){
    this.n = c.createGain()
    this.n.gain.value = 0
    this.addEventToQueue = function(){
      this.n.gain.linearRampToValueAtTime(0, c.currentTime);
      this.n.gain.linearRampToValueAtTime(1, c.currentTime + 0.001);
      this.n.gain.linearRampToValueAtTime(0.3, c.currentTime + 0.101);
      this.n.gain.linearRampToValueAtTime(0, c.currentTime + 0.500);
    }
  }
  
  function WNB(c){
    var bs = c.sampleRate;
    var b = c.createBuffer(1, bs, c.sampleRate);
    var o = b.getChannelData(0);
  
    for (var i = 0; i < bs; i++) {
      o[i] = Math.random() * 2 - 1;
    }
  
    this.s = c.createBufferSource();
    this.s.buffer = b;
    this.s.loop = true
  };
  
  var ctx = new (window.AudioContext || window.webkitAudioContext)()
  var n = new WNB(ctx)
  var v1 = new E(ctx)
  var v2 = new E(ctx)
  var v3 = new E(ctx)
  var v4 = new E(ctx)
  var f = ctx.createBiquadFilter()
  var g = ctx.createGain()
  var vs = 0
  var std = false

  
  n.s.connect(v1.n)
  n.s.connect(v2.n)
  n.s.connect(v3.n)
  n.s.connect(v4.n)
  
  f.type = "lowpass"
  f.Q.value = 1
  f.frequency.value = 800
  v1.n.connect(f)
  v2.n.connect(f)
  v3.n.connect(f)
  v4.n.connect(f)
  g.gain.value = 5
  f.connect(g)
  g.connect(ctx.destination)
  
  
  
  function fireSound(){
    
   if(!std){
      std = true
      n.s.start(0)
    }
    
    
       vs++
        if(vs > 4){
          vs = 1
        }
        if (vs == 1){
          v1.addEventToQueue()
        }
        if (vs == 2){
          v2.addEventToQueue()
        }
        if (vs == 3){
          v3.addEventToQueue()
        }
        if (vs == 4){
          v4.addEventToQueue()
        }
  }

var o = ctx.createOscillator();
o.type = 'square'
var v = ctx.createGain();
o.connect(v)
v.connect(ctx.destination);
v.gain.setValueAtTime(0,ctx.currentTime)
var std2 = false

function jumpSound(){
  const r = (Math.random() * (3 - 1) + 1)/2
  if(!std2){
      o.start(0)
    std2 = true
  }
  o.frequency.setValueAtTime(200*r, ctx.currentTime)
  v.gain.setValueAtTime(0.1,ctx.currentTime)
  v.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + 0.1);
  o.frequency.exponentialRampToValueAtTime(280*r, ctx.currentTime + 0.4);
  v.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  v.gain.setValueAtTime(0,ctx.currentTime + 0.4)
}

function hitSound(){
  var oh = ctx.createOscillator();
  oh.type = 'square'
  var vh = ctx.createGain();
  oh.connect(vh)
  vh.connect(ctx.destination);
  vh.gain.setValueAtTime(0,ctx.currentTime)
  oh.type = 'square'
  oh.frequency = 880.6;
  oh.start(0)
  vh.gain.setValueAtTime(1,ctx.currentTime)
  oh.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  vh.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  vh.gain.setValueAtTime(0,ctx.currentTime + 0.5)
}


window['fireSound'] = fireSound;
window['jumpSound'] = jumpSound;
window['hitSound'] = hitSound;





  
  

/***/ }),

/***/ "./src/lib/tiny-canvas.js":
/*!********************************!*\
  !*** ./src/lib/tiny-canvas.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * TinyCanvas module (https://github.com/bitnenfer/tiny-canvas)
 * Developed by Felipe Alfonso -> https://twitter.com/bitnenfer/
 * 
 *  ----------------------------------------------------------------------
 * 
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 * 
 *  Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
 * 
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 * 
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 * 
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 * 
 *  ----------------------------------------------------------------------
 * 
 */

function CompileShader(gl, source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

function CreateShaderProgram(gl, vsSource, fsSource) {
    var program = gl.createProgram(),
        vShader = CompileShader(gl, vsSource, 35633),
        fShader = CompileShader(gl, fsSource, 35632);
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    return program;
}

function CreateBuffer(gl, bufferType, size, usage) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, size, usage);
    return buffer;
}

function CreateTexture(gl, image, width, height) {
    var texture = gl.createTexture();
    gl.bindTexture(3553, texture);
    gl.texParameteri(3553, 10242, 33071);
    gl.texParameteri(3553, 10243, 33071);
    gl.texParameteri(3553, 10240, 9728);
    gl.texParameteri(3553, 10241, 9728);
    gl.texImage2D(3553, 0, 6408, 6408, 5121, image);
    gl.bindTexture(3553, null);
    texture.width = width;
    texture.height = height;
    return texture;
}
window['TCShd'] = CompileShader;
window['TCPrg'] = CreateShaderProgram;
window['TCBuf'] = CreateBuffer;
window['TCTex'] = CreateTexture;

function TinyCanvas(canvas) {
    var gl = canvas.getContext('webgl'),
        VERTEX_SIZE = (4 * 2) + (4 * 2) + (4),
        MAX_BATCH = 10922, // floor((2 ^ 16) / 6)
        MAX_STACK = 100,
        MAT_SIZE = 6,
        VERTICES_PER_QUAD = 6,
        MAT_STACK_SIZE = MAX_STACK * MAT_SIZE,
        VERTEX_DATA_SIZE = VERTEX_SIZE * MAX_BATCH * 4,
        INDEX_DATA_SIZE = MAX_BATCH * (2 * VERTICES_PER_QUAD),
        width = canvas.width,
        height = canvas.height,
        shader = CreateShaderProgram(
            gl, [
                'precision lowp float;',
                // IN Vertex Position and
                // IN Texture Coordinates
                'attribute vec2 a, b;',
                // IN Vertex Color
                'attribute vec4 c;',
                // OUT Texture Coordinates
                'varying vec2 d;',
                // OUT Vertex Color
                'varying vec4 e;',
                // CONST View Matrix
                'uniform mat4 m;',
                'uniform vec2 r;',
                'void main(){',
                'gl_Position=m*vec4(a,1.0,1.0);',
                'd=b;',
                'e=c;',
                '}'
            ].join('\n'), [
                'precision lowp float;',
                // OUT Texture Coordinates
                'varying vec2 d;',
                // OUT Vertex Color
                'varying vec4 e;',
                // CONST Single Sampler2D
                'uniform sampler2D f;',
                'void main(){',
                'gl_FragColor=texture2D(f,d)*e;',
                '}'
            ].join('\n')
        ),
        glBufferSubData = gl.bufferSubData.bind(gl),
        glDrawElements = gl.drawElements.bind(gl),
        glBindTexture = gl.bindTexture.bind(gl),
        glClear = gl.clear.bind(gl),
        glClearColor = gl.clearColor.bind(gl),
        vertexData = new ArrayBuffer(VERTEX_DATA_SIZE),
        vPositionData = new Float32Array(vertexData),
        vColorData = new Uint32Array(vertexData),
        vIndexData = new Uint16Array(INDEX_DATA_SIZE),
        IBO = CreateBuffer(gl, 34963, vIndexData.byteLength, 35044),
        VBO = CreateBuffer(gl, 34962, vertexData.byteLength, 35048),
        count = 0,
        mat = new Float32Array([1, 0, 0, 1, 0, 0]),
        stack = new Float32Array(100),
        stackp = 0,
        cos = Math.cos,
        sin = Math.sin,
        currentTexture = null,
        renderer = null,
        locA, locB, locC;

    gl.blendFunc(770, 771);
    gl.enable(3042);
    gl.useProgram(shader);
    gl.bindBuffer(34963, IBO);
    for (var indexA = indexB = 0; indexA < MAX_BATCH * VERTICES_PER_QUAD; indexA += VERTICES_PER_QUAD, indexB += 4)
        vIndexData[indexA + 0] = indexB,
            vIndexData[indexA + 1] = indexB + 1,
            vIndexData[indexA + 2] = indexB + 2,
            vIndexData[indexA + 3] = indexB + 0,
            vIndexData[indexA + 4] = indexB + 3,
            vIndexData[indexA + 5] = indexB + 1;

    glBufferSubData(34963, 0, vIndexData);
    gl.bindBuffer(34962, VBO);
    locA = gl.getAttribLocation(shader, 'a');
    locB = gl.getAttribLocation(shader, 'b');
    locC = gl.getAttribLocation(shader, 'c');
    gl.enableVertexAttribArray(locA);
    gl.vertexAttribPointer(locA, 2, 5126, 0, VERTEX_SIZE, 0);
    gl.enableVertexAttribArray(locB);
    gl.vertexAttribPointer(locB, 2, 5126, 0, VERTEX_SIZE, 8);
    gl.enableVertexAttribArray(locC);
    gl.vertexAttribPointer(locC, 4, 5121, 1, VERTEX_SIZE, 16);
    gl.uniformMatrix4fv(gl.getUniformLocation(shader, 'm'), 0,
        new Float32Array([
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 1, 1, -1, 1, 0, 0
        ])
    );
    gl.activeTexture(33984);
    renderer = {
        'g': gl,
        'c': canvas,
        'col': 0xFFFFFFFF,
        'bkg': function (r, g, b) {
            glClearColor(r, g, b, 1);
        },
        'cls': function () {
            glClear(16384);
        },
        'trans': function (x, y) {
            mat[4] = mat[0] * x + mat[2] * y + mat[4];
            mat[5] = mat[1] * x + mat[3] * y + mat[5];
        },
        'scale': function (x, y) {
            mat[0] = mat[0] * x;
            mat[1] = mat[1] * x;
            mat[2] = mat[2] * y;
            mat[3] = mat[3] * y;
        },
        'rot': function (r) {
            var a = mat[0],
                b = mat[1],
                c = mat[2],
                d = mat[3],
                sr = sin(r),
                cr = cos(r);

            mat[0] = a * cr + c * sr;
            mat[1] = b * cr + d * sr;
            mat[2] = a * -sr + c * cr;
            mat[3] = b * -sr + d * cr;
        },
        'push': function () {
            stack[stackp + 0] = mat[0];
            stack[stackp + 1] = mat[1];
            stack[stackp + 2] = mat[2];
            stack[stackp + 3] = mat[3];
            stack[stackp + 4] = mat[4];
            stack[stackp + 5] = mat[5];
            stackp += 6;
        },
        'pop': function () {
            stackp -= 6;
            mat[0] = stack[stackp + 0];
            mat[1] = stack[stackp + 1];
            mat[2] = stack[stackp + 2];
            mat[3] = stack[stackp + 3];
            mat[4] = stack[stackp + 4];
            mat[5] = stack[stackp + 5];
        },
        'img': function (texture, x, y, w, h, u0, v0, u1, v1) {
            var x0 = x,
                y0 = y,
                x1 = x + w,
                y1 = y + h,
                x2 = x,
                y2 = y + h,
                x3 = x + w,
                y3 = y,
                a = mat[0],
                b = mat[1],
                c = mat[2],
                d = mat[3],
                e = mat[4],
                f = mat[5],
                offset = 0,
                argb = renderer['col'];

            if (texture != currentTexture ||
                count + 1 >= MAX_BATCH) {
                glBufferSubData(34962, 0, vertexData);
                glDrawElements(4, count * VERTICES_PER_QUAD, 5123, 0);
                count = 0;
                if (currentTexture != texture) {
                    currentTexture = texture;
                    glBindTexture(3553, currentTexture);
                }
            }

            offset = count * VERTEX_SIZE;
            // Vertex Order
            // Vertex Position | UV | ARGB
            // Vertex 1
            vPositionData[offset++] = x0 * a + y0 * c + e;
            vPositionData[offset++] = x0 * b + y0 * d + f;
            vPositionData[offset++] = u0;
            vPositionData[offset++] = v0;
            vColorData[offset++] = argb;

            // Vertex 2
            vPositionData[offset++] = x1 * a + y1 * c + e;
            vPositionData[offset++] = x1 * b + y1 * d + f;
            vPositionData[offset++] = u1;
            vPositionData[offset++] = v1;
            vColorData[offset++] = argb;

            // Vertex 3
            vPositionData[offset++] = x2 * a + y2 * c + e;
            vPositionData[offset++] = x2 * b + y2 * d + f;
            vPositionData[offset++] = u0;
            vPositionData[offset++] = v1;
            vColorData[offset++] = argb;

            // Vertex 4
            vPositionData[offset++] = x3 * a + y3 * c + e;
            vPositionData[offset++] = x3 * b + y3 * d + f;
            vPositionData[offset++] = u1;
            vPositionData[offset++] = v0;
            vColorData[offset++] = argb;

            if (++count >= MAX_BATCH) {
                glBufferSubData(34962, 0, vertexData);
                glDrawElements(4, count * VERTICES_PER_QUAD, 5123, 0);
                count = 0;
            }
        },
        'flush': function () {
            if (count == 0) return;
            glBufferSubData(34962, 0, vPositionData.subarray(0, count * VERTEX_SIZE));
            glDrawElements(4, count * VERTICES_PER_QUAD, 5123, 0);
            count = 0;
        }
    };
    return renderer;
}
window['TC'] = TinyCanvas;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc291bmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvdGlueS1jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLDRFQUE4QjtBQUM5QixrRUFBeUI7QUFjekIsSUFBSSxHQUFHLEdBQWlCLElBQUksQ0FBQyxNQUFNO0FBOENuQyxJQUFLLEdBR0o7QUFIRCxXQUFLLEdBQUc7SUFDTiw2QkFBSTtJQUNKLCtCQUFLO0FBQ1AsQ0FBQyxFQUhJLEdBQUcsS0FBSCxHQUFHLFFBR1A7QUFFRCxJQUFLLFNBU0o7QUFURCxXQUFLLFNBQVM7SUFDWixxQ0FBRTtJQUNGLHFDQUFFO0lBQ0YscUNBQUU7SUFDRixxQ0FBRTtJQUNG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LEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRixNQUFNLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRyxNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuSixNQUFNLFlBQVksR0FBRyxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUs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QUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFHRCxPQUFPLEVBQUU7QUFDWCxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztBQzV3QkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLDZCQUE2QjtBQUM3QiwrQ0FBK0M7QUFDL0MscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQixrQkFBa0I7QUFDbEI7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxxQ0FBcUM7QUFDckMsNkJBQTZCO0FBQzdCLCtDQUErQztBQUMvQyxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsd0NBQXdDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0ICcuL2xpYi90aW55LWNhbnZhcy5qcyc7XG5pbXBvcnQgJy4vbGliL3NvdW5kcy5qcyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IHJlamVjdHMgfSBmcm9tICdhc3NlcnQnO1xuLy9pbXBvcnQgJ2Zwc21ldGVyJztcblxuZGVjbGFyZSB2YXIgZmlyZVNvdW5kOiBhbnk7XG5kZWNsYXJlIHZhciBqdW1wU291bmQ6IGFueTtcbmRlY2xhcmUgdmFyIGhpdFNvdW5kOiBhbnk7XG5kZWNsYXJlIHZhciBGUFNNZXRlcjogYW55O1xuXG4vL2NvbnN0IGZwc00gPSBuZXcgRlBTTWV0ZXIoKTtcblxuZGVjbGFyZSB2YXIgVEM6IGFueTtcbmRlY2xhcmUgdmFyIFRDVGV4OiBhbnk7XG5sZXQgcm5kOiAoKSA9PiBudW1iZXIgPSBNYXRoLnJhbmRvbVxuXG5pbnRlcmZhY2UgVmVjdG9yIHtcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuaW50ZXJmYWNlIENhbWVyYXtcbiAgcG9zaXRpb246IFZlY3RvclxuICB3aWR0aDogbnVtYmVyXG4gIGhlaWdodDogbnVtYmVyXG4gIG1heFg6IG51bWJlclxuICBtYXhZOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFBhcnRpY2xlIGV4dGVuZHMgQm9keXtcbn1cblxuaW50ZXJmYWNlIEJ1bGxldCBleHRlbmRzIEJvZHkge1xufVxuaW50ZXJmYWNlIEJvZHkge1xuICBwb3NpdGlvbjogVmVjdG9yXG4gIHZlbG9jaXR5OiBWZWN0b3JcbiAgZGlyOiBEaXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgd2lkdGg6IG51bWJlclxuICB2aXNpYmxlOiBib29sZWFuXG59XG5pbnRlcmZhY2UgUGxheWVyIGV4dGVuZHMgQm9keSB7XG4gIHNob290aW5nOiBib29sZWFuXG59XG5pbnRlcmZhY2UgRW5lbXkgZXh0ZW5kcyBCb2R5IHtcbiAgbGlmZTogbnVtYmVyXG4gIGhpdHRlZDogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgU3RhdGUge1xuICBwbGF5ZXI6IFBsYXllclxuICBlbmVtaWVzOiBFbmVteVtdXG4gIGJ1bGxldHM6IEJ1bGxldFtdXG59XG5cbmludGVyZmFjZSBJbWdUZXh0dXJlIHtcbiAgd2lkdGg6IG51bWJlclxuICBoZWlnaHQ6IG51bWJlclxuICB0ZXh0OiBXZWJHTFRleHR1cmVcbn1cbmVudW0gRGlyIHtcbiAgTGVmdCxcbiAgUmlnaHRcbn1cblxuZW51bSBFdmVudFR5cGUge1xuICBSUCxcbiAgTFIsXG4gIFJSLFxuICBMUCxcbiAgSlAsXG4gIFVQLFxuICBBUCxcbiAgQVJcbn1cblxudHlwZSBBY3Rpb24gPSBFdmVudFR5cGVcbnR5cGUgTW9kZWwgPSBTdGF0ZTtcbnZhciBjYW52YXMgPSBUQyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYycpKVxuaW50ZXJmYWNlIEFBQkIge1xuICBsdDogVmVjdG9yXG4gIHJ0OiBWZWN0b3JcbiAgcmI6IFZlY3RvclxuICBsYjogVmVjdG9yXG59XG5cbmZ1bmN0aW9uIHJkbkFuZ2xlKCk6IG51bWJlcntcbiAgY29uc3QgdiA9IChybmQoKSAqICgxMjUtMCkgKyAwKS8xMDAwXG4gIGlmKHJuZCgpID49IDAuNSl7XG4gICAgICByZXR1cm4gKDItdikgKiBNYXRoLlBJIFxuICB9ZWxzZXtcbiAgICAgIHJldHVybiB2ICogTWF0aC5QSVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEFBQkIoYjogQm9keSk6IEFBQkIge1xuICByZXR1cm4ge1xuICAgIGx0OiB7IHg6IGIucG9zaXRpb24ueCwgeTogYi5wb3NpdGlvbi55IH0sXG4gICAgcnQ6IHsgeDogYi5wb3NpdGlvbi54ICsgYi53aWR0aCwgeTogYi5wb3NpdGlvbi55IH0sXG4gICAgcmI6IHsgeDogYi5wb3NpdGlvbi54ICsgYi53aWR0aCwgeTogYi5wb3NpdGlvbi55ICsgYi5oZWlnaHQgfSxcbiAgICBsYjogeyB4OiBiLnBvc2l0aW9uLngsIHk6IGIucG9zaXRpb24ueSArIGIuaGVpZ2h0IH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUaWxlSW5kZWNlcyh2OiBWZWN0b3IpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcih2LnkgLyAyMCAvKiB0aWxlU2l6ZSAqLykgKiA1MCAvKiB3b3JsZFNpemUgKi8gKyBNYXRoLmZsb29yKHYueCAvIDIwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxpZGUoYm9keTE6IEJvZHksIGJvZHkyOiBCb2R5KTogYm9vbGVhbiB7XG4gIGNvbnN0IHJlc3VsdCA9IGJvZHkxLnBvc2l0aW9uLnggPCAoYm9keTIucG9zaXRpb24ueCArIGJvZHkyLndpZHRoKSAmJlxuICAgIGJvZHkxLnBvc2l0aW9uLnggKyAoYm9keTEud2lkdGgpID4gYm9keTIucG9zaXRpb24ueCAmJlxuICAgIGJvZHkxLnBvc2l0aW9uLnkgPCBib2R5Mi5wb3NpdGlvbi55ICsgYm9keTIuaGVpZ2h0ICYmXG4gICAgYm9keTEucG9zaXRpb24ueSArIGJvZHkxLmhlaWdodCA+IGJvZHkyLnBvc2l0aW9uLnk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGxvYWRUZXh0dXJlcyh1cmxzOiBzdHJpbmdbXSk6IFByb21pc2U8SW1nVGV4dHVyZVtdPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZXIsIHJlamVjdHMpID0+IHtcbiAgICBsZXQgcmVzdWx0OiBJbWdUZXh0dXJlW10gPSBuZXcgQXJyYXk8SW1nVGV4dHVyZT4oKTtcblxuICAgIHVybHMuZm9yRWFjaCgodXJsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlXG4gICAgICBpbWcuc3JjID0gdXJsXG4gICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIilcbiAgICAgICAgZy5jYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodFxuICAgICAgICBnLmNhbnZhcy53aWR0aCA9IGltZy53aWR0aFxuICAgICAgICBnLmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodClcbiAgICAgICAgY29uc3QgdGV4MSA9IHtcbiAgICAgICAgICB3aWR0aDogaW1nLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogaW1nLmhlaWdodCxcbiAgICAgICAgICB0ZXh0OiBUQ1RleChjYW52YXMuZywgZy5jYW52YXMsIGltZy53aWR0aCwgaW1nLmhlaWdodCkgYXMgV2ViR0xUZXh0dXJlXG4gICAgICAgIH1cblxuICAgICAgICBnLmNsZWFyUmVjdCgwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpXG4gICAgICAgIGcuc2F2ZSgpXG4gICAgICAgIGcuc2NhbGUoLTEsIDEpXG4gICAgICAgIGcuZHJhd0ltYWdlKGltZywgaW1nLndpZHRoICogLTEsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodClcbiAgICAgICAgZy5yZXN0b3JlKClcbiAgICAgICAgY29uc3QgdGV4MiA9IHtcbiAgICAgICAgICB3aWR0aDogaW1nLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogaW1nLmhlaWdodCxcbiAgICAgICAgICB0ZXh0OiBUQ1RleChjYW52YXMuZywgZy5jYW52YXMsIGltZy53aWR0aCwgaW1nLmhlaWdodCkgYXMgV2ViR0xUZXh0dXJlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBpID0gaW5kZXgqMjtcbiAgICAgICAgcmVzdWx0W2krK10gPSB0ZXgxXG4gICAgICAgIHJlc3VsdFtpXSA9IHRleDJcbiAgICAgICAgaWYgKGluZGV4ID09IHVybHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZXIocmVzdWx0KVxuICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWxsZXRUZXh0dXJlKCl7XG4gIGNvbnN0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKVxuICBnLmNhbnZhcy53aWR0aCA9IDRcbiAgZy5jYW52YXMuaGVpZ2h0ID0gNFxuICBnLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICBnLmZpbGxTdHlsZSA9ICcjZmY2JztcbiAgZy5iZWdpblBhdGgoKTtcbiAgZy5hcmMoMiwgMiwgMiwgMCwgMiAqIE1hdGguUEkpO1xuICBnLmZpbGwoKVxuICByZXR1cm4gVENUZXgoY2FudmFzLmcsIGcuY2FudmFzLCA0LCA0KSBhcyBXZWJHTFRleHR1cmVcbn1cblxubG9hZFRleHR1cmVzKFtcImJvdGhpdHRlZC5wbmdcIixcIm1vdW50YWluLnBuZ1wiLFwiZmxvb3IucG5nXCIsIFwic29sZGllcl9ydW4ucG5nXCIsIFwic29sZGllcl9pZGxlLnBuZ1wiLCBcInNvbGRpZXJfc2hvb3RpbmcucG5nXCIsIFwiYm90LnBuZ1wiXSkudGhlbigodGV4dHVyZXMpID0+IHtcbiAgY29uc3QgW3Jib3RIaXQsbGJvdEhpdCxyTW91bnRhaW4sbE1vdW50YWluLHJpZ2h0Rmxvb3IsbGVmdEZsb29yLCByaWdodFJ1biwgbGVmdFJ1biwgcmlnaHRJZGxlLCBsZWZ0SWRsZSwgcmlnaHRTaG9vdCwgbGVmdFNob290LCByaWdodEJvdCwgbGVmdEJvdF0gPSB0ZXh0dXJlc1xuXG4gIGNvbnN0IGJ1bGxldFRleHR1cmUgPSBjcmVhdGVCdWxsZXRUZXh0dXJlKClcblxuICBsZXQgY3VycmVudERlbHRhID0gMC4wXG4gIGxldCBjdXJyZW50VGltZSA9IDAuMFxuICBsZXQgY3VycmVudEFjdGlvbjogQWN0aW9uID0gbnVsbFxuICBjb25zdCBHUkFWSVRZID0gMTBcblxuICBjb25zdCBKVU1QX1ZFTCA9IDMwXG4gIGNvbnN0IFdBTEtfU1BFRUQgPSA2XG4gIGxldCBzdGFydFRpbWUgPSAwO1xuICBsZXQgaWQgPSAwO1xuICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBbY2FudmFzLmcuY2FudmFzLndpZHRoLCBjYW52YXMuZy5jYW52YXMuaGVpZ2h0XVxuXG5cbiAgbGV0IHBhcnRpY2xlczogUGFydGljbGVbXSA9IFtdXG4gIGxldCBwZXJzaXN0ZW5jZTogUGFydGljbGVbXSA9IFtdXG5cbiAgZnVuY3Rpb24gZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpIHtcbiAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogKGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0KSowLjMsXG4gICAgICB5OiAoZXZ0LmNsaWVudFkgLSByZWN0LnRvcCkgKiAwLjE1XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBpbml0QnVsbGV0cyhudW06IG51bWJlcik6IEJ1bGxldFtdIHtcbiAgICBjb25zdCBiczogQnVsbGV0W10gPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgIGJzLnB1c2goeyBwb3NpdGlvbjogeyB4OiA1MCwgeTogNTAgfSwgdmVsb2NpdHk6IHsgeDogMCwgeTogMCB9LCB2aXNpYmxlOiBmYWxzZSwgZGlyOiBEaXIuTGVmdCwgd2lkdGg6IDQsIGhlaWdodDogNCB9KVxuICAgIH1cbiAgICByZXR1cm4gYnNcbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld0VuZW15KHg6IG51bWJlciwgeTpudW1iZXIsIHZlbDogbnVtYmVyKTogRW5lbXkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3NpdGlvbjogeyB4OiB4LCB5OiB5IH0sXG4gICAgICB2ZWxvY2l0eTogeyB4OiB2ZWwsIHk6IDAuMCB9LFxuICAgICAgZGlyOiBEaXIuTGVmdCxcbiAgICAgIHdpZHRoOiAyMCxcbiAgICAgIGhlaWdodDogMjAsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgaGl0dGVkOiBmYWxzZSxcbiAgICAgIGxpZmU6IDNcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbmV3RW5lbWllcyh4OiBudW1iZXIsIHk6bnVtYmVyLCBuOiBudW1iZXIpOiBFbmVteSBbXXtcbiAgICBjb25zdCBlcyA9IFtdXG4gICAgZm9yKHZhciBpPTA7ICBpPCBuOyBpKyspe1xuICAgICAgZXMucHVzaChuZXdFbmVteSh4LHksV0FMS19TUEVFRCogcm5kKCkgKiAoMi45LTEuNSkgKyAxLjUpKVxuICAgIH1cbiAgICByZXR1cm4gIGVzXG4gIH1cblxuICBjb25zdCBjYW06IENhbWVyYSA9IHtwb3NpdGlvbjp7eDowLHk6MH0sd2lkdGg6MzAwLGhlaWdodDogMTUwLCBtYXhYOjAsbWF4WTowfVxuICB3aW5kb3dbXCJjYW1cIl0gPSBjYW1cblxuICBsZXQgY2FtQ2VudGVyID0gY2FtLnBvc2l0aW9uXG4gIGxldCByYWRpb1RvU2hha2UgPSAwXG4gIGxldCBzaGFrZSA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gc2hha2luZygpe1xuICAgIGNvbnN0IHggPSAwLCB5ID0gMFxuICAgIGNvbnN0IGFuZyA9IHJuZCgpICUgTWF0aC5QSSAqIDJcbiAgICBjb25zdCBueCA9IE1hdGguc2luKGFuZykgKiByYWRpb1RvU2hha2VcbiAgICBjb25zdCBueSA9IE1hdGguY29zKGFuZykgKiByYWRpb1RvU2hha2VcbiAgICBjYW0ucG9zaXRpb24ueCA9IHggKyBueFxuICAgIGNhbS5wb3NpdGlvbi55ID0geSArIG55XG4gICAgcmFkaW9Ub1NoYWtlICo9IDAuOVxuICB9XG5cbiAgY2FudmFzLmcuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBwb3MgPSBnZXRNb3VzZVBvcyhjYW52YXMuZy5jYW52YXMsIGV2ZW50KVxuLyogICAgIHZhciBybmQgPSBNYXRoLnJhbmRvbVxuICAgIGNvbnN0IHNwID0gV0FMS19TUEVFRCoyXG4gICAgY29uc3QganAgPSBKVU1QX1ZFTCo0XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHRjb25zdCB2eCA9IHJuZCgpICogKHNwIC0gKC1zcCkpICsgKC1zcClcblx0XHRcdGNvbnN0IHZ5ID0gcm5kKCkgKiAoanAgLSAoLWpwKSkgKyAoLWpwKVxuXHRcdFx0dmFyIGFuZ2xlID0gcm5kKCkgKiBNYXRoLlBJICogMjtcblx0XHQvL1x0cGFydGljbGVzLnB1c2goUGFydGljbGUocG9zLngsIHBvcy55LCB2eCAqIE1hdGguY29zKGFuZ2xlKSwgdnkgKiBNYXRoLnNpbihhbmdsZSkpKVxuXHRcdFx0cGFydGljbGVzLnB1c2goe3Bvc2l0aW9uOiB7eDogcG9zLngseTpwb3MueX0sdmVsb2NpdHk6e3g6IHZ4ICogTWF0aC5jb3MoYW5nbGUpLCB5OnZ5ICogTWF0aC5zaW4oYW5nbGUpfSxkaXI6RGlyLkxlZnQsaGVpZ2h0OjQsd2lkdGg6NCx2aXNpYmxlOnRydWV9KVxuXHRcdH0gKi9cbiAgfSlcblxuICBmdW5jdGlvbiBleHBsb2RlUGFydGljbGVzKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZHtcbiAgICB2YXIgcm5kID0gTWF0aC5yYW5kb21cbiAgICBjb25zdCBzcCA9IFdBTEtfU1BFRUQqMlxuICAgIGNvbnN0IGpwID0gSlVNUF9WRUwqM1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0Y29uc3QgdnggPSBybmQoKSAqIChzcCAtICgtc3ApKSArICgtc3ApXG5cdFx0XHRjb25zdCB2eSA9IHJuZCgpICogKGpwIC0gKC1qcCkpICsgKC1qcClcblx0XHRcdHZhciBhbmdsZSA9IHJuZCgpICogTWF0aC5QSSAqIDI7XG5cdFx0XHRwYXJ0aWNsZXMucHVzaCh7cG9zaXRpb246IHt4OiB4LHk6eX0sdmVsb2NpdHk6e3g6IHZ4ICogTWF0aC5jb3MoYW5nbGUpLCB5OnZ5ICogTWF0aC5zaW4oYW5nbGUpfSxkaXI6RGlyLkxlZnQsaGVpZ2h0OjQsd2lkdGg6NCx2aXNpYmxlOnRydWV9KVxuXHRcdH1cbiAgfVxuXG4gIGxldCBjdXJyZW50U3RhdGU6IE1vZGVsID0ge1xuICAgIHBsYXllcjoge1xuICAgICAgcG9zaXRpb246IHsgeDogMTI4LCB5OiAwLjAgfSxcbiAgICAgIHZlbG9jaXR5OiB7IHg6IDAuMCwgeTogMC4wIH0sXG4gICAgICBkaXI6IERpci5SaWdodCxcbiAgICAgIHNob290aW5nOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAyMCxcbiAgICAgIGhlaWdodDogMjAsXG4gICAgICB2aXNpYmxlOiB0cnVlXG4gICAgfSxcbiAgICBlbmVtaWVzOiBuZXdFbmVtaWVzKDM0LDAsNSksXG4gICAgYnVsbGV0czogaW5pdEJ1bGxldHMoMTApXG4gIH1cblxuICBjb25zdCBGTE9PUiA9IGhlaWdodCAtIDEwXG4gIGNvbnN0IFNFQ09ORF9GTE9PUiA9IEZMT09SICogMC43XG5cblxuICBmdW5jdGlvbiBjcmVhdGVGbG9vcih4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOiBudW1iZXIpOiBCb2R5IHtcbiAgICByZXR1cm4ge3Bvc2l0aW9uOnt4OngsIHk6IHl9LHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiAyMCxkaXI6IERpci5MZWZ0LHZlbG9jaXR5Ont4OjAseTowfSx2aXNpYmxlOiB0cnVlfVxuICB9XG5cbiAgY29uc3QgZmxvb3JzID0gW2NyZWF0ZUZsb29yKDAuMCxGTE9PUiw5MDApLCBjcmVhdGVGbG9vcig0MC4wLFNFQ09ORF9GTE9PUiwxMDApLGNyZWF0ZUZsb29yKDIzMC4wLFNFQ09ORF9GTE9PUiwyOTApXVxuXG4gIGNvbnN0IGtlZXBBbmltYXRpb24gPSAodGltZTogbnVtYmVyKSA9PiB7XG4gICAgY3VycmVudERlbHRhID0gKHRpbWUgLSBzdGFydFRpbWUpIC8gMTAwO1xuICAgIGN1cnJlbnRUaW1lID0gdGltZVxuICAgIHN0YXJ0VGltZSA9IHRpbWU7XG4gICAgXG4gICAgcmVuZGVyKGN1cnJlbnRTdGF0ZSlcbiAgICB1cGRhdGUoY3VycmVudEFjdGlvbiwgY3VycmVudFN0YXRlKVxuICAgIGN1cnJlbnRBY3Rpb24gPSBudWxsXG4gICAgaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa2VlcEFuaW1hdGlvbik7XG4gIH07XG5cbiAgZnVuY3Rpb24gcnVuR2FtZSgpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa2VlcEFuaW1hdGlvbik7XG4gIH1cblxuXG4gIGNvbnN0IGhhbmRsZXJTdGFydCA9IChldjogVG91Y2hFdmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXYuY3VycmVudFRhcmdldFsnaWQnXSkge1xuICAgICAgY2FzZSBcImFcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5KUFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQVBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxQXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUlBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGNvZGUuLi5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGNvbnN0IGhhbmRsZXJFbmQgPSAoZXY6IFRvdWNoRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2LmN1cnJlbnRUYXJnZXRbJ2lkJ10pIHtcbiAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQVJcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxSXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUlJcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBjb2RlLi4uXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN2Z3M6IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJyZWN0XCIpO1xuICBjb25zdCBwc09wID0geyBwYXNzaXZlOiB0cnVlIH07XG4gIHN2Z3MuZm9yRWFjaChyZWMgPT4ge1xuICAgIHJlYy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyU3RhcnQsIHBzT3ApO1xuICAgIHJlYy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlckVuZCwgcHNPcCk7XG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZXJLQkRvd24gPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxQXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5SUFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuSlBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDEzOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlVQXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzMjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5BUFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyS0JEb3duLCB0cnVlKTtcblxuICBjb25zdCBoYW5kbGVyS0JVcCA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuTFJcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlJSXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzMjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5BUlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlcktCVXAsIHRydWUpO1xuXG4gIGZ1bmN0aW9uIEJvZHlBbmltYXRpb24oXG4gICAgcmlnaHRUOiBJbWdUZXh0dXJlLFxuICAgIGxlZnRUOiBJbWdUZXh0dXJlLFxuICAgIHRpY2tzUGVyRnJhbWU6IG51bWJlcixcbiAgICBsb29wOiBib29sZWFuLFxuICAgIGZyYW1lczogbnVtYmVyW11bXSkge1xuICAgIGNvbnN0IG5GcmFtZXMgPSBmcmFtZXMubGVuZ3RoO1xuICAgIGxldCBmcmFtZUluZGV4ID0gMCxcbiAgICAgIHRpY2tDb3VudCA9IDBcblxuICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIShmcmFtZUluZGV4IDwgbkZyYW1lcyAtIDEpKSB7XG4gICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uIChwOiBCb2R5KSB7XG4gICAgICB0aWNrQ291bnQgKz0gMVxuICAgICAgaWYgKHRpY2tDb3VudCA+IHRpY2tzUGVyRnJhbWUpIHtcbiAgICAgICAgdGlja0NvdW50ID0gMFxuICAgICAgICBpZiAoZnJhbWVJbmRleCA8IGZyYW1lcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgLy8gR28gdG8gdGhlIG5leHQgZnJhbWVcbiAgICAgICAgICBmcmFtZUluZGV4ICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobG9vcCkge1xuICAgICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBbdjAsIHUwLCB2MSwgdTFdID0gZnJhbWVzW2ZyYW1lSW5kZXhdXG4gICAgICBsZXQgdGV4dCA9IHAuZGlyID09IERpci5SaWdodCA/IHJpZ2h0VCA6IGxlZnRUXG4gICAgICBjYW52YXMuaW1nKFxuICAgICAgICB0ZXh0LnRleHQsXG4gICAgICAgIC1jYW0ucG9zaXRpb24ueCsocC5wb3NpdGlvbi54ICsgKHAud2lkdGggLyAyKSksXG4gICAgICAgIC1jYW0ucG9zaXRpb24ueStwLnBvc2l0aW9uLnksXG4gICAgICAgIHAud2lkdGgsXG4gICAgICAgIHAuaGVpZ2h0LFxuICAgICAgICB2MCxcbiAgICAgICAgdTAsXG4gICAgICAgIHYxLFxuICAgICAgICB1MVxuICAgICAgKTtcbiAgICB9XG5cbiAgfVxuXG4vKiAgIGZ1bmN0aW9uIGlzT3ZlckZsb29yKGI6IEJvZHkpOiBib29sZWFue1xuICAgIHJldHVybiBiLnBvc2l0aW9uLnkgKyBiLmhlaWdodCA9PSBGTE9PUiB8fCBjb2xsaWRlRmxvb3JCb3R0b20oYixzZWNvbmRGbG9vckJvZHkpO1xuICB9XG4gKi9cbiAgZnVuY3Rpb24gaXNPdmVyRmxvb3IoYjogQm9keSk6IGJvb2xlYW57XG4gICAgbGV0IGZsb29yQm90dG9tczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZvcih2YXIgaT0wO2k8Zmxvb3JzLmxlbmd0aDtpKyspe1xuICAgICAgZmxvb3JCb3R0b21zID0gZmxvb3JCb3R0b21zIHx8IGNvbGxpZGVGbG9vckJvdHRvbShiLGZsb29yc1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIGIucG9zaXRpb24ueSArIGIuaGVpZ2h0ID09IEZMT09SIHx8IGZsb29yQm90dG9tcztcbiAgfVxuXG4gIGNvbnN0IGJvdEhpdHRlZEFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyYm90SGl0LCBsYm90SGl0LCAyLCB0cnVlLCBbWzAsIDAsIDEsIDFdXSlcbiAgY29uc3QgYm90QW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0Qm90LCBsZWZ0Qm90LCA1LCB0cnVlLCBbWzAsIDAsIDEsIDAuNV0sIFswLCAwLjUsIDEsIDFdXSlcbiAgY29uc3QgaWRsZUFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodElkbGUsIGxlZnRJZGxlLCAyMCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjVdLCBbMCwgMC41LCAxLCAxXV0pXG4gIGNvbnN0IHJ1bkFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodFJ1biwgbGVmdFJ1biwgOCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjJdLCBbMCwgLjIsIDEsIDAuNF0sIFswLCAuNCwgMSwgMC42XSwgWzAsIC42LCAxLCAwLjhdLCBbMCwgLjgsIDEsIDEuMF1dKVxuICBjb25zdCBzaG9vdGluZ0FuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodFNob290LCBsZWZ0U2hvb3QsIDMsIGZhbHNlLCBbWzAsIDAsIDEsIDAuMjVdLCBbMCwgLjI1LCAxLCAwLjVdLCBbMCwgLjUsIDEsIDAuNzVdLCBbMCwgLjc1LCAxLCAxLjBdXSlcblxuICBsZXQgZ3VuUmVhZHk6IG51bWJlciA9IDBcbiAgbGV0IGp1bXBUcmllczpudW1iZXIgPSAyXG4gIGxldCB0aWNrc0hpdHRlZDogbnVtYmVyID0gMFxuICBmdW5jdGlvbiB1cGRhdGUoYTogQWN0aW9uLCBtOiBNb2RlbCkge1xuICAgIGlmKHJhZGlvVG9TaGFrZSA+IDAuMDAwMil7XG4gICAgICBzaGFraW5nKClcbiAgICB9XG4gICAgY29uc3QgcCA9IG0ucGxheWVyXG4gICAgaWYgKGlzT3ZlckZsb29yKHApKSB7XG4gICAgICBqdW1wVHJpZXMgPSAyXG4gICAgfVxuICAgIHN3aXRjaCAoYSkge1xuICAgICAgY2FzZSBFdmVudFR5cGUuSlA6XG4gICAgICAgIGlmKGp1bXBUcmllcyA+IDApe1xuICAgICAgICAgIGp1bXBUcmllcy0tXG4gICAgICAgICAgcC52ZWxvY2l0eS55ID0gLUpVTVBfVkVMXG4gICAgICAgICAganVtcFNvdW5kKClcbiAgICAgICAgfVxuICAgICAgICBwLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5MUDpcbiAgICAgICAgcC5kaXIgPSBEaXIuTGVmdFxuICAgICAgICBwLnZlbG9jaXR5LnggPSAtV0FMS19TUEVFRFxuICAgICAgICBwLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5SUDpcbiAgICAgICAgcC5kaXIgPSBEaXIuUmlnaHRcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gV0FMS19TUEVFRFxuICAgICAgICBwLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5MUjpcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gMFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLlJSOlxuICAgICAgICBwLnZlbG9jaXR5LnggPSAwXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuQVA6XG4gICAgICAgIHNob290aW5nQW5pbS5yZXNldCgpXG4gICAgICAgIHAuc2hvb3RpbmcgPSB0cnVlXG4gICAgICAgIHAudmVsb2NpdHkueCA9IChwLmRpciA9PSBEaXIuTGVmdCA/IDEuNSA6IC0xLjUpXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmJ1bGxldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBiID0gbS5idWxsZXRzW2ldXG4gICAgICAgICAgaWYgKCFiLnZpc2libGUgJiYgZ3VuUmVhZHkgPT0gMCkge1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSByZG5BbmdsZSgpXG4gICAgICAgICAgICBiLnBvc2l0aW9uLnggPSBwLnBvc2l0aW9uLnggKyBwLndpZHRoICsgYi53aWR0aFxuICAgICAgICAgICAgYi5wb3NpdGlvbi55ID0gcC5wb3NpdGlvbi55ICsgKHAuaGVpZ2h0IC8gMi40KVxuICAgICAgICAgICAgYi52ZWxvY2l0eS54ID0gKHAuZGlyID09IERpci5SaWdodCA/IDM1IDogLTM1KSAqIE1hdGguY29zKGFuZ2xlKVxuICAgICAgICAgICAgYi52ZWxvY2l0eS55ID0gNSAqIE1hdGguc2luKGFuZ2xlKVxuICAgICAgICAgICAgYi52aXNpYmxlID0gdHJ1ZVxuICAgICAgICAgICAgZ3VuUmVhZHkgPSA4XG4gICAgICAgICAgICBmaXJlU291bmQoKVxuICAgICAgICAgICAgcmFkaW9Ub1NoYWtlID0gMlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5BUjpcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gMFxuICAgICAgICAvL3Auc2hvb3RpbmcgPSBmYWxzZVxuICAgICAgICAvL1Nob290aW5nQW5pbS5yZXNldCgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG1vdmUobS5wbGF5ZXIpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGUgPSBtLmVuZW1pZXNbaV1cbiAgICAgIHRpY2tzSGl0dGVkID0gTWF0aC5tYXgodGlja3NIaXR0ZWQtMSwwKVxuICAgICAgaWYodGlja3NIaXR0ZWQgPT0gMCl7XG4gICAgICAgIGUuaGl0dGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIG1vdmUoZSlcbiAgICAgIGlmIChlLnBvc2l0aW9uLnggPCAwIHx8IChlLnBvc2l0aW9uLnggKyAyMCA+IDkwMCkpIHtcbiAgICAgICAgZS52ZWxvY2l0eS54ID0gZS52ZWxvY2l0eS54ICogLTFcbiAgICAgICAgZS5kaXIgPSBlLnZlbG9jaXR5LnggPiAwID8gRGlyLkxlZnQgOiBEaXIuUmlnaHRcbiAgICAgIH1cbiAgICAgIG0uYnVsbGV0cy5maWx0ZXIoYiA9PiBiLnZpc2libGUpLmZvckVhY2goYiA9PiB7XG4gICAgICAgIGlmIChlLnZpc2libGUgJiYgY29sbGlkZShiLCBlKSkge1xuICAgICAgICAgIGhpdFNvdW5kKClcbiAgICAgICAgICBlLmhpdHRlZCA9IHRydWVcbiAgICAgICAgICB0aWNrc0hpdHRlZCA9IDhcbiAgICAgICAgICBlLnBvc2l0aW9uLnggKz0gKGIudmVsb2NpdHkueCA+IDAgPyArIDE4IDogLTE4KVxuICAgICAgICAgIGlmKGUubGlmZSA9PSAwKXtcbiAgICAgICAgICAgIHJhZGlvVG9TaGFrZSA9IDRcbiAgICAgICAgICAgIGV4cGxvZGVQYXJ0aWNsZXMoZS5wb3NpdGlvbi54KyhlLndpZHRoLzIpLGUucG9zaXRpb24ueSsoZS5oZWlnaHQvMikpXG4gICAgICAgICAgICBlLnZpc2libGUgPSBmYWxzZVxuICAgICAgICAgICAgZS52ZWxvY2l0eS54ID0gMFxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZS5saWZlID0gTWF0aC5tYXgoZS5saWZlLTEsMClcbiAgICAgICAgICB9XG4gICAgICAgICAgYi52aXNpYmxlID0gZmFsc2VcbiAgICAgICAgICBiLnZlbG9jaXR5LnggPSAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBiID0gbS5idWxsZXRzW2ldXG4gICAgICBtb3ZlQnVsbGV0KGIpXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwID0gcGFydGljbGVzW2ldXG4gICAgICBtb3ZlKHApXG5cblxuICAgICAgZm9yKHZhciBmPTA7IGY8Zmxvb3JzLmxlbmd0aDtmKyspe1xuICAgICAgICBpZihjb2xsaWRlRmxvb3JCb3R0b20ocCxmbG9vcnNbZl0pKXtcbiAgICAgICAgICBwZXJzaXN0ZW5jZS5wdXNoKHBhcnRpY2xlc1tpXSkgICAgICAgIFxuICAgICAgICAgIHBhcnRpY2xlcy5zcGxpY2UoaSwgMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGd1blJlYWR5ID0gTWF0aC5tYXgoMCwgZ3VuUmVhZHkgLSAxKTtcbiAgICBtb3ZlQ2FtKG0ucGxheWVyKVxuICB9XG4gIGZ1bmN0aW9uIG1vdmVDYW0oYjogQm9keSk6IHZvaWR7XG4gICAgY2FtLnBvc2l0aW9uLnggPSBNYXRoLm1heChiLnBvc2l0aW9uLnggLSAoY2FtLndpZHRoLzIpLDApXG4gIH1cblxuICAvL2NhbnZhcy5zY2FsZSg0LCA0KVxuICBsZXQgdGV4RGF0YUZsb29yID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAyMCAqIDIwICogNDsgaSsrKSB7XG4gICAgdGV4RGF0YUZsb29yW2ldID0gMS4wXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJNb3VudGFpbigpIHtcbiAgICBjYW52YXMucHVzaCgpXG4gICAgY2FudmFzLnNjYWxlKDYsNilcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDEwMDsgeCArPSAyMCkge1xuICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgbE1vdW50YWluLnRleHQsXG4gICAgICAgKC1jYW0ucG9zaXRpb24ueCowLjA2KSArIHgsXG4gICAgICAgKC1jYW0ucG9zaXRpb24ueSowLjA2KSArIDUsXG4gICAgICAgIGxNb3VudGFpbi53aWR0aCxcbiAgICAgICAgbE1vdW50YWluLmhlaWdodCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMVxuICAgICAgKTtcbiAgICB9XG4gICAgICBjYW52YXMucG9wKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckZsb29yKCkge1xuICAgICAgZm9yKHZhciBmPTA7IGY8Zmxvb3JzLmxlbmd0aDtmKyspe1xuICAgICAgICBjb25zdCBmbG9vciA9IGZsb29yc1tmXVxuICAgICAgICBmb3IgKHZhciB4ID0gZmxvb3IucG9zaXRpb24ueDsgeCA8PSBmbG9vci5wb3NpdGlvbi54K2Zsb29yLndpZHRoIDsgeCArPSAyMCkge1xuICAgICAgICAgIGNvbnN0IHRleHQgPSB4ICUgNyA9PSAwID8gbGVmdEZsb29yIDogcmlnaHRGbG9vclxuICAgICAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgICAgICB0ZXh0LnRleHQsXG4gICAgICAgICAgICAtY2FtLnBvc2l0aW9uLngreCxcbiAgICAgICAgICAgIC1jYW0ucG9zaXRpb24ueSsoZmxvb3IucG9zaXRpb24ueS0xMCksXG4gICAgICAgICAgICB0ZXh0LndpZHRoLFxuICAgICAgICAgICAgdGV4dC5oZWlnaHQsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpZk9uVGhlRmxvb3JnZXRZKGI6IEJvZHkpOiBudW1iZXJ7XG4gICAgbGV0IGJvdHRvbUNvbGxpZGU6IG51bWJlciA9IC0xXG4gICAgZm9yKHZhciBpID0gMDtpPCBmbG9vcnMubGVuZ3RoO2krKyl7XG4gICAgICAgYm90dG9tQ29sbGlkZSA9IGNvbGxpZGVGbG9vckJvdHRvbShiLGZsb29yc1tpXSkgPyBmbG9vcnNbaV0ucG9zaXRpb24ueSA6IC0xIFxuICAgIH1cbiAgICByZXR1cm4gYm90dG9tQ29sbGlkZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5R3Jhdml0eShiOiBCb2R5KSB7XG4gICAgYi52ZWxvY2l0eS55ID0gIGlmT25UaGVGbG9vcmdldFkoYikgPCAwID8gYi52ZWxvY2l0eS55ICsgKEdSQVZJVFkgKiBjdXJyZW50RGVsdGEpIDogYi52ZWxvY2l0eS55XG4gIH1cblxuICBmdW5jdGlvbiBvdXRzaWRlU2NyZWVuKGI6IEJ1bGxldCkge1xuICAgIHJldHVybiBiLnBvc2l0aW9uLnggPCAwIHx8IGIucG9zaXRpb24ueCA+IDkwMFxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZUJ1bGxldChiOiBCdWxsZXQpOiB2b2lkIHtcbiAgICBpZiAob3V0c2lkZVNjcmVlbihiKSkge1xuICAgICAgYi52aXNpYmxlID0gZmFsc2VcbiAgICAgIGIudmVsb2NpdHkueCA9IDBcbiAgICB9XG4gICAgYi5wb3NpdGlvbi54ICs9IGIudmVsb2NpdHkueCAqIGN1cnJlbnREZWx0YVxuICAgIGIucG9zaXRpb24ueSArPSBiLnZlbG9jaXR5LnkgKiBjdXJyZW50RGVsdGFcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbGxpZGVGbG9vclRvcChiOiBCb2R5LCBmOiBCb2R5KTogYm9vbGVhbiB7XG4gICByZXR1cm4gY29sbGlkZShiLGYpICYmXG4gICAgZi5wb3NpdGlvbi55KyhmLmhlaWdodC8yKSA+IGIucG9zaXRpb24ueVxuICB9XG4gIGZ1bmN0aW9uIGNvbGxpZGVGbG9vckJvdHRvbShiOiBCb2R5LCBmOiBCb2R5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbGxpZGUoYixmKSAmJlxuICAgIGIucG9zaXRpb24ueSA8IGYucG9zaXRpb24ueVxuICAgfVxuXG4gICBmdW5jdGlvbiBjb2xsaWRlRmxvb3JMZWZ0KGI6IEJvZHksZjogQm9keSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb2xsaWRlKGIsZikgJiZcbiAgICBiLnBvc2l0aW9uLnggPCBmLnBvc2l0aW9uLnggJiYgYi5wb3NpdGlvbi54K2Iud2lkdGggPiBmLnBvc2l0aW9uLnhcbiAgIH1cbiAgIGZ1bmN0aW9uIGNvbGxpZGVGbG9vclJpZ2h0KGI6IEJvZHksZjogQm9keSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb2xsaWRlKGIsZikgJiZcbiAgICBiLnBvc2l0aW9uLngrKGIud2lkdGgqMC45KSA8IGYucG9zaXRpb24ueCAmJiBiLnZlbG9jaXR5LnggPiAwXG4gICB9XG5cbiAgZnVuY3Rpb24gbW92ZShiOiBCb2R5KTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdW5kWSA9IGlmT25UaGVGbG9vcmdldFkoYilcbiAgICBiLnBvc2l0aW9uLnkgPSBncm91bmRZIDwgMCA/IGIucG9zaXRpb24ueSArIChiLnZlbG9jaXR5LnkgKiBjdXJyZW50RGVsdGEpIDogZ3JvdW5kWSAtIGIuaGVpZ2h0XG4gICAgYi5wb3NpdGlvbi54ICs9IGIudmVsb2NpdHkueCAqIGN1cnJlbnREZWx0YVxuICAgIGFwcGx5R3Jhdml0eShiKVxuXG4gICAgZm9yKHZhciBmID0wOyBmPCBmbG9vcnMubGVuZ3RoOyBmKyspe1xuXG4gICAgICBpZihjb2xsaWRlRmxvb3JUb3AoYixmbG9vcnNbZl0pKXtcbiAgICAgICAgaWYoYi52ZWxvY2l0eS55IDwgMCl7XG4gICAgICAgICAgYi52ZWxvY2l0eS55ID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihjb2xsaWRlRmxvb3JCb3R0b20oYixmbG9vcnNbZl0pKXtcbiAgICAgICAgaWYoYi52ZWxvY2l0eS55ID4gMCl7XG4gICAgICAgICAgYi52ZWxvY2l0eS55ID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBjb25zdCByZW5kZXIgPSAobTogTW9kZWwpID0+IHtcbiAgICBjYW52YXMuZy5jYW52YXMuc3R5bGUud2lkdGggPSBcImF1dG9cIjtcbiAgICBjYW52YXMuZy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gIE1hdGgucm91bmQod2luZG93LmlubmVySGVpZ2h0KjAuOTUpICsgXCJweFwiIDtcbiAgICBjYW52YXMuZy52aWV3cG9ydCgwLCAwLCBjYW52YXMuZy5jYW52YXMud2lkdGgsIGNhbnZhcy5nLmNhbnZhcy5oZWlnaHQpO1xuICAgIHJlbmRlck1vdW50YWluKClcblxuICAgIGNvbnN0IHAgPSBtLnBsYXllclxuICAgIGNhbnZhcy5jbHMoKVxuICAgIGNhbnZhcy5ia2coNTcvMjU1LDczLzI1NSw4MS8yNTUpXG4gICAgcmVuZGVyRmxvb3IoKVxuXG4gICAgaWYgKHAuc2hvb3RpbmcpIHtcbiAgICAgIHNob290aW5nQW5pbS51cGRhdGUocClcbiAgICB9IGVsc2UgaWYgKHAudmVsb2NpdHkueCA9PSAwKSB7XG4gICAgICBpZGxlQW5pbS51cGRhdGUocClcbiAgICB9IGVsc2Uge1xuICAgICAgcnVuQW5pbS51cGRhdGUocClcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZSA9IG0uZW5lbWllc1tpXVxuICAgICAgaWYoZS52aXNpYmxlKXtcbiAgICAgICAgaWYoZS5oaXR0ZWQpe1xuICAgICAgICAgIGJvdEhpdHRlZEFuaW0udXBkYXRlKGUpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGJvdEFuaW0udXBkYXRlKGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uYnVsbGV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYiA9IG0uYnVsbGV0c1tpXVxuICAgICAgaWYgKGIudmlzaWJsZSkge1xuICAgICAgICBjYW52YXMuaW1nKFxuICAgICAgICAgIGJ1bGxldFRleHR1cmUsXG4gICAgICAgICAgLWNhbS5wb3NpdGlvbi54K2IucG9zaXRpb24ueCxcbiAgICAgICAgICAtY2FtLnBvc2l0aW9uLnkrYi5wb3NpdGlvbi55LFxuICAgICAgICAgIDQsXG4gICAgICAgICAgNCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMSxcbiAgICAgICAgICAxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcCA9IHBhcnRpY2xlc1tpXVxuICAgICAgICBpZihwLnZpc2libGUpe1xuICAgICAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgICAgICByYm90SGl0LnRleHQsXG4gICAgICAgICAgICAtY2FtLnBvc2l0aW9uLngrcC5wb3NpdGlvbi54LFxuICAgICAgICAgICAgLWNhbS5wb3NpdGlvbi55K3AucG9zaXRpb24ueSxcbiAgICAgICAgICAgIDgsXG4gICAgICAgICAgICA4LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAuNyxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwZXJzaXN0ZW5jZS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcCA9IHBlcnNpc3RlbmNlW2ldXG4gICAgICAgIGlmKHAudmlzaWJsZSl7XG4gICAgICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgICAgIHJib3RIaXQudGV4dCxcbiAgICAgICAgICAgIC1jYW0ucG9zaXRpb24ueCtwLnBvc2l0aW9uLngsXG4gICAgICAgICAgICAtY2FtLnBvc2l0aW9uLnkrcC5wb3NpdGlvbi55LFxuICAgICAgICAgICAgOCxcbiAgICAgICAgICAgIDgsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIC43LFxuICAgICAgICAgICAgMVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW52YXMuZmx1c2goKTtcbiAgICAvL2Zwc00udGljaygpXG4gIH1cblxuICAvKiAgKi9pZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgY29uc3Qgc3ZnczogYW55ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInN2Z1wiKVxuICAgIHN2Z3MuZm9yRWFjaChzdmcgPT4ge1xuICAgICAgc3ZnLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfSk7XG4gIH1cblxuXG4gIHJ1bkdhbWUoKVxufSlcbiIsImZ1bmN0aW9uIEUoYyl7XG4gICAgdGhpcy5uID0gYy5jcmVhdGVHYWluKClcbiAgICB0aGlzLm4uZ2Fpbi52YWx1ZSA9IDBcbiAgICB0aGlzLmFkZEV2ZW50VG9RdWV1ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLm4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLCBjLmN1cnJlbnRUaW1lKTtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDEsIGMuY3VycmVudFRpbWUgKyAwLjAwMSk7XG4gICAgICB0aGlzLm4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLjMsIGMuY3VycmVudFRpbWUgKyAwLjEwMSk7XG4gICAgICB0aGlzLm4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLCBjLmN1cnJlbnRUaW1lICsgMC41MDApO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gV05CKGMpe1xuICAgIHZhciBicyA9IGMuc2FtcGxlUmF0ZTtcbiAgICB2YXIgYiA9IGMuY3JlYXRlQnVmZmVyKDEsIGJzLCBjLnNhbXBsZVJhdGUpO1xuICAgIHZhciBvID0gYi5nZXRDaGFubmVsRGF0YSgwKTtcbiAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiczsgaSsrKSB7XG4gICAgICBvW2ldID0gTWF0aC5yYW5kb20oKSAqIDIgLSAxO1xuICAgIH1cbiAgXG4gICAgdGhpcy5zID0gYy5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICB0aGlzLnMuYnVmZmVyID0gYjtcbiAgICB0aGlzLnMubG9vcCA9IHRydWVcbiAgfTtcbiAgXG4gIHZhciBjdHggPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkoKVxuICB2YXIgbiA9IG5ldyBXTkIoY3R4KVxuICB2YXIgdjEgPSBuZXcgRShjdHgpXG4gIHZhciB2MiA9IG5ldyBFKGN0eClcbiAgdmFyIHYzID0gbmV3IEUoY3R4KVxuICB2YXIgdjQgPSBuZXcgRShjdHgpXG4gIHZhciBmID0gY3R4LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG4gIHZhciBnID0gY3R4LmNyZWF0ZUdhaW4oKVxuICB2YXIgdnMgPSAwXG4gIHZhciBzdGQgPSBmYWxzZVxuXG4gIFxuICBuLnMuY29ubmVjdCh2MS5uKVxuICBuLnMuY29ubmVjdCh2Mi5uKVxuICBuLnMuY29ubmVjdCh2My5uKVxuICBuLnMuY29ubmVjdCh2NC5uKVxuICBcbiAgZi50eXBlID0gXCJsb3dwYXNzXCJcbiAgZi5RLnZhbHVlID0gMVxuICBmLmZyZXF1ZW5jeS52YWx1ZSA9IDgwMFxuICB2MS5uLmNvbm5lY3QoZilcbiAgdjIubi5jb25uZWN0KGYpXG4gIHYzLm4uY29ubmVjdChmKVxuICB2NC5uLmNvbm5lY3QoZilcbiAgZy5nYWluLnZhbHVlID0gNVxuICBmLmNvbm5lY3QoZylcbiAgZy5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbilcbiAgXG4gIFxuICBcbiAgZnVuY3Rpb24gZmlyZVNvdW5kKCl7XG4gICAgXG4gICBpZighc3RkKXtcbiAgICAgIHN0ZCA9IHRydWVcbiAgICAgIG4ucy5zdGFydCgwKVxuICAgIH1cbiAgICBcbiAgICBcbiAgICAgICB2cysrXG4gICAgICAgIGlmKHZzID4gNCl7XG4gICAgICAgICAgdnMgPSAxXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZzID09IDEpe1xuICAgICAgICAgIHYxLmFkZEV2ZW50VG9RdWV1ZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZzID09IDIpe1xuICAgICAgICAgIHYyLmFkZEV2ZW50VG9RdWV1ZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZzID09IDMpe1xuICAgICAgICAgIHYzLmFkZEV2ZW50VG9RdWV1ZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZzID09IDQpe1xuICAgICAgICAgIHY0LmFkZEV2ZW50VG9RdWV1ZSgpXG4gICAgICAgIH1cbiAgfVxuXG52YXIgbyA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG5vLnR5cGUgPSAnc3F1YXJlJ1xudmFyIHYgPSBjdHguY3JlYXRlR2FpbigpO1xuby5jb25uZWN0KHYpXG52LmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbnYuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSlcbnZhciBzdGQyID0gZmFsc2VcblxuZnVuY3Rpb24ganVtcFNvdW5kKCl7XG4gIGNvbnN0IHIgPSAoTWF0aC5yYW5kb20oKSAqICgzIC0gMSkgKyAxKS8yXG4gIGlmKCFzdGQyKXtcbiAgICAgIG8uc3RhcnQoMClcbiAgICBzdGQyID0gdHJ1ZVxuICB9XG4gIG8uZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDIwMCpyLCBjdHguY3VycmVudFRpbWUpXG4gIHYuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjEsY3R4LmN1cnJlbnRUaW1lKVxuICB2LmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjYsIGN0eC5jdXJyZW50VGltZSArIDAuMSk7XG4gIG8uZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMjgwKnIsIGN0eC5jdXJyZW50VGltZSArIDAuNCk7XG4gIHYuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBjdHguY3VycmVudFRpbWUgKyAwLjQpO1xuICB2LmdhaW4uc2V0VmFsdWVBdFRpbWUoMCxjdHguY3VycmVudFRpbWUgKyAwLjQpXG59XG5cbmZ1bmN0aW9uIGhpdFNvdW5kKCl7XG4gIHZhciBvaCA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gIG9oLnR5cGUgPSAnc3F1YXJlJ1xuICB2YXIgdmggPSBjdHguY3JlYXRlR2FpbigpO1xuICBvaC5jb25uZWN0KHZoKVxuICB2aC5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gIHZoLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCxjdHguY3VycmVudFRpbWUpXG4gIG9oLnR5cGUgPSAnc3F1YXJlJ1xuICBvaC5mcmVxdWVuY3kgPSA4ODAuNjtcbiAgb2guc3RhcnQoMClcbiAgdmguZ2Fpbi5zZXRWYWx1ZUF0VGltZSgxLGN0eC5jdXJyZW50VGltZSlcbiAgb2guZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMSwgY3R4LmN1cnJlbnRUaW1lICsgMC41KTtcbiAgdmguZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDEsIGN0eC5jdXJyZW50VGltZSArIDAuNSk7XG4gIHZoLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCxjdHguY3VycmVudFRpbWUgKyAwLjUpXG59XG5cblxud2luZG93WydmaXJlU291bmQnXSA9IGZpcmVTb3VuZDtcbndpbmRvd1snanVtcFNvdW5kJ10gPSBqdW1wU291bmQ7XG53aW5kb3dbJ2hpdFNvdW5kJ10gPSBoaXRTb3VuZDtcblxuXG5cblxuXG4gIFxuICAiLCIvKlxuICogVGlueUNhbnZhcyBtb2R1bGUgKGh0dHBzOi8vZ2l0aHViLmNvbS9iaXRuZW5mZXIvdGlueS1jYW52YXMpXG4gKiBEZXZlbG9wZWQgYnkgRmVsaXBlIEFsZm9uc28gLT4gaHR0cHM6Ly90d2l0dGVyLmNvbS9iaXRuZW5mZXIvXG4gKiBcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBcbiAqICAgICAgICAgICAgIERPIFdIQVQgVEhFIEZVQ0sgWU9VIFdBTlQgVE8gUFVCTElDIExJQ0VOU0VcbiAqICAgICAgICAgICAgICAgICAgICAgVmVyc2lvbiAyLCBEZWNlbWJlciAyMDA0XG4gKiBcbiAqICBDb3B5cmlnaHQgKEMpIDIwMDQgU2FtIEhvY2V2YXIgPHNhbUBob2NldmFyLm5ldD5cbiAqIFxuICogIEV2ZXJ5b25lIGlzIHBlcm1pdHRlZCB0byBjb3B5IGFuZCBkaXN0cmlidXRlIHZlcmJhdGltIG9yIG1vZGlmaWVkXG4gKiAgY29waWVzIG9mIHRoaXMgbGljZW5zZSBkb2N1bWVudCwgYW5kIGNoYW5naW5nIGl0IGlzIGFsbG93ZWQgYXMgbG9uZ1xuICogIGFzIHRoZSBuYW1lIGlzIGNoYW5nZWQuXG4gKiBcbiAqICAgICAgICAgICAgIERPIFdIQVQgVEhFIEZVQ0sgWU9VIFdBTlQgVE8gUFVCTElDIExJQ0VOU0VcbiAqICAgIFRFUk1TIEFORCBDT05ESVRJT05TIEZPUiBDT1BZSU5HLCBESVNUUklCVVRJT04gQU5EIE1PRElGSUNBVElPTlxuICogXG4gKiAgIDAuIFlvdSBqdXN0IERPIFdIQVQgVEhFIEZVQ0sgWU9VIFdBTlQgVE8uXG4gKiBcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBDb21waWxlU2hhZGVyKGdsLCBzb3VyY2UsIHR5cGUpIHtcbiAgICB2YXIgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICAgIHJldHVybiBzaGFkZXI7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZVNoYWRlclByb2dyYW0oZ2wsIHZzU291cmNlLCBmc1NvdXJjZSkge1xuICAgIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpLFxuICAgICAgICB2U2hhZGVyID0gQ29tcGlsZVNoYWRlcihnbCwgdnNTb3VyY2UsIDM1NjMzKSxcbiAgICAgICAgZlNoYWRlciA9IENvbXBpbGVTaGFkZXIoZ2wsIGZzU291cmNlLCAzNTYzMik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZTaGFkZXIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmU2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICByZXR1cm4gcHJvZ3JhbTtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlQnVmZmVyKGdsLCBidWZmZXJUeXBlLCBzaXplLCB1c2FnZSkge1xuICAgIHZhciBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGJ1ZmZlclR5cGUsIGJ1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShidWZmZXJUeXBlLCBzaXplLCB1c2FnZSk7XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlVGV4dHVyZShnbCwgaW1hZ2UsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZSgzNTUzLCB0ZXh0dXJlKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQyLCAzMzA3MSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaSgzNTUzLCAxMDI0MywgMzMwNzEpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDAsIDk3MjgpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDEsIDk3MjgpO1xuICAgIGdsLnRleEltYWdlMkQoMzU1MywgMCwgNjQwOCwgNjQwOCwgNTEyMSwgaW1hZ2UpO1xuICAgIGdsLmJpbmRUZXh0dXJlKDM1NTMsIG51bGwpO1xuICAgIHRleHR1cmUud2lkdGggPSB3aWR0aDtcbiAgICB0ZXh0dXJlLmhlaWdodCA9IGhlaWdodDtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn1cbndpbmRvd1snVENTaGQnXSA9IENvbXBpbGVTaGFkZXI7XG53aW5kb3dbJ1RDUHJnJ10gPSBDcmVhdGVTaGFkZXJQcm9ncmFtO1xud2luZG93WydUQ0J1ZiddID0gQ3JlYXRlQnVmZmVyO1xud2luZG93WydUQ1RleCddID0gQ3JlYXRlVGV4dHVyZTtcblxuZnVuY3Rpb24gVGlueUNhbnZhcyhjYW52YXMpIHtcbiAgICB2YXIgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSxcbiAgICAgICAgVkVSVEVYX1NJWkUgPSAoNCAqIDIpICsgKDQgKiAyKSArICg0KSxcbiAgICAgICAgTUFYX0JBVENIID0gMTA5MjIsIC8vIGZsb29yKCgyIF4gMTYpIC8gNilcbiAgICAgICAgTUFYX1NUQUNLID0gMTAwLFxuICAgICAgICBNQVRfU0laRSA9IDYsXG4gICAgICAgIFZFUlRJQ0VTX1BFUl9RVUFEID0gNixcbiAgICAgICAgTUFUX1NUQUNLX1NJWkUgPSBNQVhfU1RBQ0sgKiBNQVRfU0laRSxcbiAgICAgICAgVkVSVEVYX0RBVEFfU0laRSA9IFZFUlRFWF9TSVpFICogTUFYX0JBVENIICogNCxcbiAgICAgICAgSU5ERVhfREFUQV9TSVpFID0gTUFYX0JBVENIICogKDIgKiBWRVJUSUNFU19QRVJfUVVBRCksXG4gICAgICAgIHdpZHRoID0gY2FudmFzLndpZHRoLFxuICAgICAgICBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0LFxuICAgICAgICBzaGFkZXIgPSBDcmVhdGVTaGFkZXJQcm9ncmFtKFxuICAgICAgICAgICAgZ2wsIFtcbiAgICAgICAgICAgICAgICAncHJlY2lzaW9uIGxvd3AgZmxvYXQ7JyxcbiAgICAgICAgICAgICAgICAvLyBJTiBWZXJ0ZXggUG9zaXRpb24gYW5kXG4gICAgICAgICAgICAgICAgLy8gSU4gVGV4dHVyZSBDb29yZGluYXRlc1xuICAgICAgICAgICAgICAgICdhdHRyaWJ1dGUgdmVjMiBhLCBiOycsXG4gICAgICAgICAgICAgICAgLy8gSU4gVmVydGV4IENvbG9yXG4gICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IGM7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVGV4dHVyZSBDb29yZGluYXRlc1xuICAgICAgICAgICAgICAgICd2YXJ5aW5nIHZlYzIgZDsnLFxuICAgICAgICAgICAgICAgIC8vIE9VVCBWZXJ0ZXggQ29sb3JcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWM0IGU7JyxcbiAgICAgICAgICAgICAgICAvLyBDT05TVCBWaWV3IE1hdHJpeFxuICAgICAgICAgICAgICAgICd1bmlmb3JtIG1hdDQgbTsnLFxuICAgICAgICAgICAgICAgICd1bmlmb3JtIHZlYzIgcjsnLFxuICAgICAgICAgICAgICAgICd2b2lkIG1haW4oKXsnLFxuICAgICAgICAgICAgICAgICdnbF9Qb3NpdGlvbj1tKnZlYzQoYSwxLjAsMS4wKTsnLFxuICAgICAgICAgICAgICAgICdkPWI7JyxcbiAgICAgICAgICAgICAgICAnZT1jOycsXG4gICAgICAgICAgICAgICAgJ30nXG4gICAgICAgICAgICBdLmpvaW4oJ1xcbicpLCBbXG4gICAgICAgICAgICAgICAgJ3ByZWNpc2lvbiBsb3dwIGZsb2F0OycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFRleHR1cmUgQ29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWMyIGQ7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVmVydGV4IENvbG9yXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjNCBlOycsXG4gICAgICAgICAgICAgICAgLy8gQ09OU1QgU2luZ2xlIFNhbXBsZXIyRFxuICAgICAgICAgICAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCBmOycsXG4gICAgICAgICAgICAgICAgJ3ZvaWQgbWFpbigpeycsXG4gICAgICAgICAgICAgICAgJ2dsX0ZyYWdDb2xvcj10ZXh0dXJlMkQoZixkKSplOycsXG4gICAgICAgICAgICAgICAgJ30nXG4gICAgICAgICAgICBdLmpvaW4oJ1xcbicpXG4gICAgICAgICksXG4gICAgICAgIGdsQnVmZmVyU3ViRGF0YSA9IGdsLmJ1ZmZlclN1YkRhdGEuYmluZChnbCksXG4gICAgICAgIGdsRHJhd0VsZW1lbnRzID0gZ2wuZHJhd0VsZW1lbnRzLmJpbmQoZ2wpLFxuICAgICAgICBnbEJpbmRUZXh0dXJlID0gZ2wuYmluZFRleHR1cmUuYmluZChnbCksXG4gICAgICAgIGdsQ2xlYXIgPSBnbC5jbGVhci5iaW5kKGdsKSxcbiAgICAgICAgZ2xDbGVhckNvbG9yID0gZ2wuY2xlYXJDb2xvci5iaW5kKGdsKSxcbiAgICAgICAgdmVydGV4RGF0YSA9IG5ldyBBcnJheUJ1ZmZlcihWRVJURVhfREFUQV9TSVpFKSxcbiAgICAgICAgdlBvc2l0aW9uRGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkodmVydGV4RGF0YSksXG4gICAgICAgIHZDb2xvckRhdGEgPSBuZXcgVWludDMyQXJyYXkodmVydGV4RGF0YSksXG4gICAgICAgIHZJbmRleERhdGEgPSBuZXcgVWludDE2QXJyYXkoSU5ERVhfREFUQV9TSVpFKSxcbiAgICAgICAgSUJPID0gQ3JlYXRlQnVmZmVyKGdsLCAzNDk2MywgdkluZGV4RGF0YS5ieXRlTGVuZ3RoLCAzNTA0NCksXG4gICAgICAgIFZCTyA9IENyZWF0ZUJ1ZmZlcihnbCwgMzQ5NjIsIHZlcnRleERhdGEuYnl0ZUxlbmd0aCwgMzUwNDgpLFxuICAgICAgICBjb3VudCA9IDAsXG4gICAgICAgIG1hdCA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDEsIDAsIDBdKSxcbiAgICAgICAgc3RhY2sgPSBuZXcgRmxvYXQzMkFycmF5KDEwMCksXG4gICAgICAgIHN0YWNrcCA9IDAsXG4gICAgICAgIGNvcyA9IE1hdGguY29zLFxuICAgICAgICBzaW4gPSBNYXRoLnNpbixcbiAgICAgICAgY3VycmVudFRleHR1cmUgPSBudWxsLFxuICAgICAgICByZW5kZXJlciA9IG51bGwsXG4gICAgICAgIGxvY0EsIGxvY0IsIGxvY0M7XG5cbiAgICBnbC5ibGVuZEZ1bmMoNzcwLCA3NzEpO1xuICAgIGdsLmVuYWJsZSgzMDQyKTtcbiAgICBnbC51c2VQcm9ncmFtKHNoYWRlcik7XG4gICAgZ2wuYmluZEJ1ZmZlcigzNDk2MywgSUJPKTtcbiAgICBmb3IgKHZhciBpbmRleEEgPSBpbmRleEIgPSAwOyBpbmRleEEgPCBNQVhfQkFUQ0ggKiBWRVJUSUNFU19QRVJfUVVBRDsgaW5kZXhBICs9IFZFUlRJQ0VTX1BFUl9RVUFELCBpbmRleEIgKz0gNClcbiAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAwXSA9IGluZGV4QixcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgMV0gPSBpbmRleEIgKyAxLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAyXSA9IGluZGV4QiArIDIsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDNdID0gaW5kZXhCICsgMCxcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgNF0gPSBpbmRleEIgKyAzLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyA1XSA9IGluZGV4QiArIDE7XG5cbiAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjMsIDAsIHZJbmRleERhdGEpO1xuICAgIGdsLmJpbmRCdWZmZXIoMzQ5NjIsIFZCTyk7XG4gICAgbG9jQSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlciwgJ2EnKTtcbiAgICBsb2NCID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyLCAnYicpO1xuICAgIGxvY0MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXIsICdjJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jQSk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NBLCAyLCA1MTI2LCAwLCBWRVJURVhfU0laRSwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jQik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NCLCAyLCA1MTI2LCAwLCBWRVJURVhfU0laRSwgOCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jQyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NDLCA0LCA1MTIxLCAxLCBWRVJURVhfU0laRSwgMTYpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlciwgJ20nKSwgMCxcbiAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgICAyIC8gd2lkdGgsIDAsIDAsIDAsXG4gICAgICAgICAgICAwLCAtMiAvIGhlaWdodCwgMCwgMCxcbiAgICAgICAgICAgIDAsIDAsIDEsIDEsIC0xLCAxLCAwLCAwXG4gICAgICAgIF0pXG4gICAgKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKDMzOTg0KTtcbiAgICByZW5kZXJlciA9IHtcbiAgICAgICAgJ2cnOiBnbCxcbiAgICAgICAgJ2MnOiBjYW52YXMsXG4gICAgICAgICdjb2wnOiAweEZGRkZGRkZGLFxuICAgICAgICAnYmtnJzogZnVuY3Rpb24gKHIsIGcsIGIpIHtcbiAgICAgICAgICAgIGdsQ2xlYXJDb2xvcihyLCBnLCBiLCAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2Nscyc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGdsQ2xlYXIoMTYzODQpO1xuICAgICAgICB9LFxuICAgICAgICAndHJhbnMnOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgICAgbWF0WzRdID0gbWF0WzBdICogeCArIG1hdFsyXSAqIHkgKyBtYXRbNF07XG4gICAgICAgICAgICBtYXRbNV0gPSBtYXRbMV0gKiB4ICsgbWF0WzNdICogeSArIG1hdFs1XTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3NjYWxlJzogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgIG1hdFswXSA9IG1hdFswXSAqIHg7XG4gICAgICAgICAgICBtYXRbMV0gPSBtYXRbMV0gKiB4O1xuICAgICAgICAgICAgbWF0WzJdID0gbWF0WzJdICogeTtcbiAgICAgICAgICAgIG1hdFszXSA9IG1hdFszXSAqIHk7XG4gICAgICAgIH0sXG4gICAgICAgICdyb3QnOiBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgdmFyIGEgPSBtYXRbMF0sXG4gICAgICAgICAgICAgICAgYiA9IG1hdFsxXSxcbiAgICAgICAgICAgICAgICBjID0gbWF0WzJdLFxuICAgICAgICAgICAgICAgIGQgPSBtYXRbM10sXG4gICAgICAgICAgICAgICAgc3IgPSBzaW4ociksXG4gICAgICAgICAgICAgICAgY3IgPSBjb3Mocik7XG5cbiAgICAgICAgICAgIG1hdFswXSA9IGEgKiBjciArIGMgKiBzcjtcbiAgICAgICAgICAgIG1hdFsxXSA9IGIgKiBjciArIGQgKiBzcjtcbiAgICAgICAgICAgIG1hdFsyXSA9IGEgKiAtc3IgKyBjICogY3I7XG4gICAgICAgICAgICBtYXRbM10gPSBiICogLXNyICsgZCAqIGNyO1xuICAgICAgICB9LFxuICAgICAgICAncHVzaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDBdID0gbWF0WzBdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgMV0gPSBtYXRbMV07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAyXSA9IG1hdFsyXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDNdID0gbWF0WzNdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgNF0gPSBtYXRbNF07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyA1XSA9IG1hdFs1XTtcbiAgICAgICAgICAgIHN0YWNrcCArPSA2O1xuICAgICAgICB9LFxuICAgICAgICAncG9wJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RhY2twIC09IDY7XG4gICAgICAgICAgICBtYXRbMF0gPSBzdGFja1tzdGFja3AgKyAwXTtcbiAgICAgICAgICAgIG1hdFsxXSA9IHN0YWNrW3N0YWNrcCArIDFdO1xuICAgICAgICAgICAgbWF0WzJdID0gc3RhY2tbc3RhY2twICsgMl07XG4gICAgICAgICAgICBtYXRbM10gPSBzdGFja1tzdGFja3AgKyAzXTtcbiAgICAgICAgICAgIG1hdFs0XSA9IHN0YWNrW3N0YWNrcCArIDRdO1xuICAgICAgICAgICAgbWF0WzVdID0gc3RhY2tbc3RhY2twICsgNV07XG4gICAgICAgIH0sXG4gICAgICAgICdpbWcnOiBmdW5jdGlvbiAodGV4dHVyZSwgeCwgeSwgdywgaCwgdTAsIHYwLCB1MSwgdjEpIHtcbiAgICAgICAgICAgIHZhciB4MCA9IHgsXG4gICAgICAgICAgICAgICAgeTAgPSB5LFxuICAgICAgICAgICAgICAgIHgxID0geCArIHcsXG4gICAgICAgICAgICAgICAgeTEgPSB5ICsgaCxcbiAgICAgICAgICAgICAgICB4MiA9IHgsXG4gICAgICAgICAgICAgICAgeTIgPSB5ICsgaCxcbiAgICAgICAgICAgICAgICB4MyA9IHggKyB3LFxuICAgICAgICAgICAgICAgIHkzID0geSxcbiAgICAgICAgICAgICAgICBhID0gbWF0WzBdLFxuICAgICAgICAgICAgICAgIGIgPSBtYXRbMV0sXG4gICAgICAgICAgICAgICAgYyA9IG1hdFsyXSxcbiAgICAgICAgICAgICAgICBkID0gbWF0WzNdLFxuICAgICAgICAgICAgICAgIGUgPSBtYXRbNF0sXG4gICAgICAgICAgICAgICAgZiA9IG1hdFs1XSxcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSAwLFxuICAgICAgICAgICAgICAgIGFyZ2IgPSByZW5kZXJlclsnY29sJ107XG5cbiAgICAgICAgICAgIGlmICh0ZXh0dXJlICE9IGN1cnJlbnRUZXh0dXJlIHx8XG4gICAgICAgICAgICAgICAgY291bnQgKyAxID49IE1BWF9CQVRDSCkge1xuICAgICAgICAgICAgICAgIGdsQnVmZmVyU3ViRGF0YSgzNDk2MiwgMCwgdmVydGV4RGF0YSk7XG4gICAgICAgICAgICAgICAgZ2xEcmF3RWxlbWVudHMoNCwgY291bnQgKiBWRVJUSUNFU19QRVJfUVVBRCwgNTEyMywgMCk7XG4gICAgICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV4dHVyZSAhPSB0ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgICAgICAgICAgICAgICAgZ2xCaW5kVGV4dHVyZSgzNTUzLCBjdXJyZW50VGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvZmZzZXQgPSBjb3VudCAqIFZFUlRFWF9TSVpFO1xuICAgICAgICAgICAgLy8gVmVydGV4IE9yZGVyXG4gICAgICAgICAgICAvLyBWZXJ0ZXggUG9zaXRpb24gfCBVViB8IEFSR0JcbiAgICAgICAgICAgIC8vIFZlcnRleCAxXG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgwICogYSArIHkwICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgwICogYiArIHkwICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUwO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MDtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgLy8gVmVydGV4IDJcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDEgKiBhICsgeTEgKiBjICsgZTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDEgKiBiICsgeTEgKiBkICsgZjtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdTE7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHYxO1xuICAgICAgICAgICAgdkNvbG9yRGF0YVtvZmZzZXQrK10gPSBhcmdiO1xuXG4gICAgICAgICAgICAvLyBWZXJ0ZXggM1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MiAqIGEgKyB5MiAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MiAqIGIgKyB5MiAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MDtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjE7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIC8vIFZlcnRleCA0XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgzICogYSArIHkzICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgzICogYiArIHkzICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUxO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MDtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgaWYgKCsrY291bnQgPj0gTUFYX0JBVENIKSB7XG4gICAgICAgICAgICAgICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYyLCAwLCB2ZXJ0ZXhEYXRhKTtcbiAgICAgICAgICAgICAgICBnbERyYXdFbGVtZW50cyg0LCBjb3VudCAqIFZFUlRJQ0VTX1BFUl9RVUFELCA1MTIzLCAwKTtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdmbHVzaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PSAwKSByZXR1cm47XG4gICAgICAgICAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjIsIDAsIHZQb3NpdGlvbkRhdGEuc3ViYXJyYXkoMCwgY291bnQgKiBWRVJURVhfU0laRSkpO1xuICAgICAgICAgICAgZ2xEcmF3RWxlbWVudHMoNCwgY291bnQgKiBWRVJUSUNFU19QRVJfUVVBRCwgNTEyMywgMCk7XG4gICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiByZW5kZXJlcjtcbn1cbndpbmRvd1snVEMnXSA9IFRpbnlDYW52YXM7Il0sInNvdXJjZVJvb3QiOiIifQ==