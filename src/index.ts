import './lib/tiny-canvas.js';
import './lib/sounds.js';
import { resolve } from 'url';
import { rejects } from 'assert';
//import 'fpsmeter';

declare var fireSound: any;
declare var jumpSound: any;
declare var hitSound: any;
declare var FPSMeter: any;

//const fpsM = new FPSMeter();

declare var TC: any;
declare var TCTex: any;
let rnd: () => number = Math.random

interface Vector {
  x: number
  y: number
}
interface Camera{
  position: Vector
  width: number
  height: number
  maxX: number
  maxY: number
}

interface Particle extends Body{
}

interface Bullet extends Body {
}
interface Body {
  position: Vector
  velocity: Vector
  dir: Dir
  height: number
  width: number
  visible: boolean
}
interface Player extends Body {
  shooting: boolean
}
interface Enemy extends Body {
  life: number
  hitted: boolean
}

interface State {
  player: Player
  enemies: Enemy[]
  bullets: Bullet[]
}

interface ImgTexture {
  width: number
  height: number
  text: WebGLTexture
}
enum Dir {
  Left,
  Right
}

enum EventType {
  RP,
  LR,
  RR,
  LP,
  JP,
  UP,
  AP,
  AR
}

type Action = EventType
type Model = State;
var canvas = TC(document.getElementById('c'))
interface AABB {
  lt: Vector
  rt: Vector
  rb: Vector
  lb: Vector
}

function rdnAngle(): number{
  const v = (rnd() * (125-0) + 0)/1000
  if(rnd() >= 0.5){
      return (2-v) * Math.PI 
  }else{
      return v * Math.PI
  }
}

function getAABB(b: Body): AABB {
  return {
    lt: { x: b.position.x, y: b.position.y },
    rt: { x: b.position.x + b.width, y: b.position.y },
    rb: { x: b.position.x + b.width, y: b.position.y + b.height },
    lb: { x: b.position.x, y: b.position.y + b.height }
  }
}

function getTileIndeces(v: Vector): number {
  return Math.floor(v.y / 20 /* tileSize */) * 50 /* worldSize */ + Math.floor(v.x / 20);
}

export function collide(body1: Body, body2: Body): boolean {
  const result = body1.position.x < (body2.position.x + body2.width) &&
    body1.position.x + (body1.width) > body2.position.x &&
    body1.position.y < body2.position.y + body2.height &&
    body1.position.y + body1.height > body2.position.y;
  return result;
}

function loadTextures(urls: string[]): Promise<ImgTexture[]> {
  return new Promise((resolver, rejects) => {
    let result: ImgTexture[] = new Array<ImgTexture>();

    urls.forEach((url, index) => {
      const img = new Image
      img.src = url
      img.onload = () => {
        const g = document.createElement("canvas").getContext("2d")
        g.canvas.height = img.height
        g.canvas.width = img.width
        g.drawImage(img, 0, 0, img.width, img.height)
        const tex1 = {
          width: img.width,
          height: img.height,
          text: TCTex(canvas.g, g.canvas, img.width, img.height) as WebGLTexture
        }

        g.clearRect(0, 0, img.width, img.height)
        g.save()
        g.scale(-1, 1)
        g.drawImage(img, img.width * -1, 0, img.width, img.height)
        g.restore()
        const tex2 = {
          width: img.width,
          height: img.height,
          text: TCTex(canvas.g, g.canvas, img.width, img.height) as WebGLTexture
        }
        
        var i = index*2;
        result[i++] = tex1
        result[i] = tex2
        if (index == urls.length - 1) {
          setTimeout(() => {
            resolver(result)
          }, 1000)
        }
      }
    })
  })
}

function createBulletTexture(){
  const g = document.createElement("canvas").getContext("2d")
  g.canvas.width = 4
  g.canvas.height = 4
  g.clearRect(0, 0, canvas.width, canvas.height);
  g.fillStyle = '#ff6';
  g.beginPath();
  g.arc(2, 2, 2, 0, 2 * Math.PI);
  g.fill()
  return TCTex(canvas.g, g.canvas, 4, 4) as WebGLTexture
}

loadTextures(["bothitted.png","mountain.png","floor.png", "soldier_run.png", "soldier_idle.png", "soldier_shooting.png", "bot.png"]).then((textures) => {
  const [rbotHit,lbotHit,rMountain,lMountain,rightFloor,leftFloor, rightRun, leftRun, rightIdle, leftIdle, rightShoot, leftShoot, rightBot, leftBot] = textures

  const bulletTexture = createBulletTexture()

  let currentDelta = 0.0
  let currentTime = 0.0
  let currentAction: Action = null
  const GRAVITY = 10

  const JUMP_VEL = 30
  const WALK_SPEED = 6
  let startTime = 0;
  let id = 0;
  const [width, height] = [canvas.g.canvas.width, canvas.g.canvas.height]


  let particles: Particle[] = []
  let persistence: Particle[] = []

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left)*0.3,
      y: (evt.clientY - rect.top) * 0.15
    };
  }
  function initBullets(num: number): Bullet[] {
    const bs: Bullet[] = []
    for (let i = 0; i < num; i++) {
      bs.push({ position: { x: 50, y: 50 }, velocity: { x: 0, y: 0 }, visible: false, dir: Dir.Left, width: 4, height: 4 })
    }
    return bs
  }

  function newEnemy(x: number, y:number, vel: number): Enemy {
    return {
      position: { x: x, y: y },
      velocity: { x: vel, y: 0.0 },
      dir: Dir.Left,
      width: 20,
      height: 20,
      visible: true,
      hitted: false,
      life: 3
    }
  }
  function newEnemies(x: number, y:number, n: number): Enemy []{
    const es = []
    for(var i=0;  i< n; i++){
      es.push(newEnemy(x,y,WALK_SPEED* rnd() * (2.9-1.5) + 1.5))
    }
    return  es
  }

  const cam: Camera = {position:{x:0,y:0},width:300,height: 150, maxX:0,maxY:0}
  window["cam"] = cam

  let camCenter = cam.position
  let radioToShake = 0
  let shake = false

  function shaking(){
    const x = 0, y = 0
    const ang = rnd() % Math.PI * 2
    const nx = Math.sin(ang) * radioToShake
    const ny = Math.cos(ang) * radioToShake
    cam.position.x = x + nx
    cam.position.y = y + ny
    radioToShake *= 0.9
  }

  canvas.g.canvas.addEventListener("click", (event) => {
    const pos = getMousePos(canvas.g.canvas, event)
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
  })

  function explodeParticles(x: number, y: number): void{
    var rnd = Math.random
    const sp = WALK_SPEED*2
    const jp = JUMP_VEL*3
		for (var i = 0; i < 10; i++) {
			const vx = rnd() * (sp - (-sp)) + (-sp)
			const vy = rnd() * (jp - (-jp)) + (-jp)
			var angle = rnd() * Math.PI * 2;
			particles.push({position: {x: x,y:y},velocity:{x: vx * Math.cos(angle), y:vy * Math.sin(angle)},dir:Dir.Left,height:4,width:4,visible:true})
		}
  }

  let currentState: Model = {
    player: {
      position: { x: 128, y: 0.0 },
      velocity: { x: 0.0, y: 0.0 },
      dir: Dir.Right,
      shooting: false,
      width: 20,
      height: 20,
      visible: true
    },
    enemies: newEnemies(34,0,5),
    bullets: initBullets(10)
  }

  const FLOOR = height - 10
  const SECOND_FLOOR = FLOOR * 0.7


  function createFloor(x:number, y:number, width: number): Body {
    return {position:{x:x, y: y},width: width, height: 20,dir: Dir.Left,velocity:{x:0,y:0},visible: true}
  }

  const floors = [createFloor(0.0,FLOOR,900), createFloor(40.0,SECOND_FLOOR,100),createFloor(230.0,SECOND_FLOOR,290)]

  const keepAnimation = (time: number) => {
    currentDelta = (time - startTime) / 100;
    currentTime = time
    startTime = time;
    
    render(currentState)
    update(currentAction, currentState)
    currentAction = null
    id = requestAnimationFrame(keepAnimation);
  };

  function runGame() {
    requestAnimationFrame(keepAnimation);
  }


  const handlerStart = (ev: TouchEvent) => {
    switch (ev.currentTarget['id']) {
      case "a":
        currentAction = EventType.JP
        break;
      case "b":
        currentAction = EventType.AP
        break;
      case "left":
        currentAction = EventType.LP
        break;
      case "right":
        currentAction = EventType.RP
        break;

      default:
        // code...
        break;
    }
  }
  const handlerEnd = (ev: TouchEvent) => {
    switch (ev.currentTarget['id']) {
      case "b":
        currentAction = EventType.AR
        break;
      case "left":
        currentAction = EventType.LR
        break;
      case "right":
        currentAction = EventType.RR
        break;
      default:
        // code...
        break;
    }
  }

  const svgs: any = document.querySelectorAll("rect");
  const psOp = { passive: true };
  svgs.forEach(rec => {
    rec.addEventListener("touchstart", handlerStart, psOp);
    rec.addEventListener("touchend", handlerEnd, psOp);
  });

  const handlerKBDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 37:
        currentAction = EventType.LP
        break;
      case 39:
        currentAction = EventType.RP
        break;
      case 38:
        currentAction = EventType.JP
        break;
      case 13:
        currentAction = EventType.UP
        break;
      case 32:
        currentAction = EventType.AP
        break;
      default:
        break;
    }
  };
  window.addEventListener('keydown', handlerKBDown, true);

  const handlerKBUp = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 37:
        currentAction = EventType.LR
        break;
      case 39:
        currentAction = EventType.RR
        break;
      case 32:
        currentAction = EventType.AR
        break;
      default:
        break;
    }
  };
  window.addEventListener('keyup', handlerKBUp, true);

  function BodyAnimation(
    rightT: ImgTexture,
    leftT: ImgTexture,
    ticksPerFrame: number,
    loop: boolean,
    frames: number[][]) {
    const nFrames = frames.length;
    let frameIndex = 0,
      tickCount = 0

    this.reset = function () {
      if (!(frameIndex < nFrames - 1)) {
        frameIndex = 0;
      }
    }
    this.update = function (p: Body) {
      tickCount += 1
      if (tickCount > ticksPerFrame) {
        tickCount = 0
        if (frameIndex < frames.length - 1) {
          // Go to the next frame
          frameIndex += 1;
        } else if (loop) {
          frameIndex = 0;
        }
      }
      const [v0, u0, v1, u1] = frames[frameIndex]
      let text = p.dir == Dir.Right ? rightT : leftT
      canvas.img(
        text.text,
        -cam.position.x+(p.position.x + (p.width / 2)),
        -cam.position.y+p.position.y,
        p.width,
        p.height,
        v0,
        u0,
        v1,
        u1
      );
    }

  }

/*   function isOverFloor(b: Body): boolean{
    return b.position.y + b.height == FLOOR || collideFloorBottom(b,secondFloorBody);
  }
 */
  function isOverFloor(b: Body): boolean{
    let floorBottoms: boolean = false;
    for(var i=0;i<floors.length;i++){
      floorBottoms = floorBottoms || collideFloorBottom(b,floors[i])
    }
    return b.position.y + b.height == FLOOR || floorBottoms;
  }

  const botHittedAnim = new BodyAnimation(rbotHit, lbotHit, 2, true, [[0, 0, 1, 1]])
  const botAnim = new BodyAnimation(rightBot, leftBot, 5, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]])
  const idleAnim = new BodyAnimation(rightIdle, leftIdle, 20, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]])
  const runAnim = new BodyAnimation(rightRun, leftRun, 8, true, [[0, 0, 1, 0.2], [0, .2, 1, 0.4], [0, .4, 1, 0.6], [0, .6, 1, 0.8], [0, .8, 1, 1.0]])
  const shootingAnim = new BodyAnimation(rightShoot, leftShoot, 3, false, [[0, 0, 1, 0.25], [0, .25, 1, 0.5], [0, .5, 1, 0.75], [0, .75, 1, 1.0]])

  let gunReady: number = 0
  let jumpTries:number = 2
  let ticksHitted: number = 0
  function update(a: Action, m: Model) {
    if(radioToShake > 0.0002){
      shaking()
    }
    const p = m.player
    if (isOverFloor(p)) {
      jumpTries = 2
    }
    switch (a) {
      case EventType.JP:
        if(jumpTries > 0){
          jumpTries--
          p.velocity.y = -JUMP_VEL
          jumpSound()
        }
        p.shooting = false
        break;
      case EventType.LP:
        p.dir = Dir.Left
        p.velocity.x = -WALK_SPEED
        p.shooting = false
        break;
      case EventType.RP:
        p.dir = Dir.Right
        p.velocity.x = WALK_SPEED
        p.shooting = false
        break;
      case EventType.LR:
        p.velocity.x = 0
        break;
      case EventType.RR:
        p.velocity.x = 0
        break;
      case EventType.AP:
        shootingAnim.reset()
        p.shooting = true
        p.velocity.x = (p.dir == Dir.Left ? 1.5 : -1.5)

        for (var i = 0; i < m.bullets.length; i++) {
          const b = m.bullets[i]
          if (!b.visible && gunReady == 0) {
            const angle = rdnAngle()
            b.position.x = p.position.x + p.width + b.width
            b.position.y = p.position.y + (p.height / 2.4)
            b.velocity.x = (p.dir == Dir.Right ? 35 : -35) * Math.cos(angle)
            b.velocity.y = 5 * Math.sin(angle)
            b.visible = true
            gunReady = 8
            fireSound()
            radioToShake = 2
            break;
          }
        }

        break;
      case EventType.AR:
        p.velocity.x = 0
        //p.shooting = false
        //ShootingAnim.reset()
        break;
      default:
        break;
    }
    move(m.player)
    for (var i = 0; i < m.enemies.length; i++) {
      const e = m.enemies[i]
      ticksHitted = Math.max(ticksHitted-1,0)
      if(ticksHitted == 0){
        e.hitted = false
      }
      move(e)
      if (e.position.x < 0 || (e.position.x + 20 > 900)) {
        e.velocity.x = e.velocity.x * -1
        e.dir = e.velocity.x > 0 ? Dir.Left : Dir.Right
      }
      m.bullets.filter(b => b.visible).forEach(b => {
        if (e.visible && collide(b, e)) {
          hitSound()
          e.hitted = true
          ticksHitted = 8
          e.position.x += (b.velocity.x > 0 ? + 18 : -18)
          if(e.life == 0){
            radioToShake = 4
            explodeParticles(e.position.x+(e.width/2),e.position.y+(e.height/2))
            e.visible = false
            e.velocity.x = 0
          }else{
            e.life = Math.max(e.life-1,0)
          }
          b.visible = false
          b.velocity.x = 0
        }
      })
    }
    for (var i = 0; i < m.bullets.length; i++) {
      const b = m.bullets[i]
      moveBullet(b)
    }
    for (var i = 0; i < particles.length; i++) {
      const p = particles[i]
      move(p)


      for(var f=0; f<floors.length;f++){
        if(collideFloorBottom(p,floors[f])){
          persistence.push(particles[i])        
          particles.splice(i, 1)
        }
      }
    }

    gunReady = Math.max(0, gunReady - 1);
    moveCam(m.player)
  }
  function moveCam(b: Body): void{
    cam.position.x = Math.max(b.position.x - (cam.width/2),0)
  }

  //canvas.scale(4, 4)
  let texDataFloor = []
  for (var i = 0; i < 20 * 20 * 4; i++) {
    texDataFloor[i] = 1.0
  }

  function renderMountain() {
    canvas.push()
    canvas.scale(6,6)
    for (var x = 0; x < 100; x += 20) {
      canvas.img(
        lMountain.text,
       (-cam.position.x*0.06) + x,
       (-cam.position.y*0.06) + 5,
        lMountain.width,
        lMountain.height,
        0,
        0,
        1,
        1
      );
    }
      canvas.pop()
  }

  function renderFloor() {
      for(var f=0; f<floors.length;f++){
        const floor = floors[f]
        for (var x = floor.position.x; x <= floor.position.x+floor.width ; x += 20) {
          const text = x % 7 == 0 ? leftFloor : rightFloor
          canvas.img(
            text.text,
            -cam.position.x+x,
            -cam.position.y+(floor.position.y-10),
            text.width,
            text.height,
            0,
            0,
            1,
            1
          );
          }
      }
  }

  function ifOnTheFloorgetY(b: Body): number{
    let bottomCollide: number = -1
    for(var i = 0;i< floors.length;i++){
       bottomCollide = collideFloorBottom(b,floors[i]) ? floors[i].position.y : -1 
    }
    return bottomCollide;
  }

  function applyGravity(b: Body) {
    b.velocity.y =  ifOnTheFloorgetY(b) < 0 ? b.velocity.y + (GRAVITY * currentDelta) : b.velocity.y
  }

  function outsideScreen(b: Bullet) {
    return b.position.x < 0 || b.position.x > 900
  }

  function moveBullet(b: Bullet): void {
    if (outsideScreen(b)) {
      b.visible = false
      b.velocity.x = 0
    }
    b.position.x += b.velocity.x * currentDelta
    b.position.y += b.velocity.y * currentDelta
  }

  function collideFloorTop(b: Body, f: Body): boolean {
   return collide(b,f) &&
    f.position.y+(f.height/2) > b.position.y
  }
  function collideFloorBottom(b: Body, f: Body): boolean {
    return collide(b,f) &&
    b.position.y < f.position.y
   }

   function collideFloorLeft(b: Body,f: Body): boolean {
    return collide(b,f) &&
    b.position.x < f.position.x && b.position.x+b.width > f.position.x
   }
   function collideFloorRight(b: Body,f: Body): boolean {
    return collide(b,f) &&
    b.position.x+(b.width*0.9) < f.position.x && b.velocity.x > 0
   }

  function move(b: Body): void {
    const groundY = ifOnTheFloorgetY(b)
    b.position.y = groundY < 0 ? b.position.y + (b.velocity.y * currentDelta) : groundY - b.height
    b.position.x += b.velocity.x * currentDelta
    applyGravity(b)

    for(var f =0; f< floors.length; f++){

      if(collideFloorTop(b,floors[f])){
        if(b.velocity.y < 0){
          b.velocity.y = 0
        }
      }
      if(collideFloorBottom(b,floors[f])){
        if(b.velocity.y > 0){
          b.velocity.y = 0
        }
      }
    }

  }

  const render = (m: Model) => {
    canvas.g.canvas.style.width = "auto";
    canvas.g.canvas.style.height =  Math.round(window.innerHeight*0.95) + "px" ;
    canvas.g.viewport(0, 0, canvas.g.canvas.width, canvas.g.canvas.height);
    renderMountain()

    const p = m.player
    canvas.cls()
    canvas.bkg(57/255,73/255,81/255)
    renderFloor()

    if (p.shooting) {
      shootingAnim.update(p)
    } else if (p.velocity.x == 0) {
      idleAnim.update(p)
    } else {
      runAnim.update(p)
    }

    for (var i = 0; i < m.enemies.length; i++) {
      const e = m.enemies[i]
      if(e.visible){
        if(e.hitted){
          botHittedAnim.update(e)
        }else{
          botAnim.update(e)
        }
      }
    }

    for (var i = 0; i < m.bullets.length; i++) {
      const b = m.bullets[i]
      if (b.visible) {
        canvas.img(
          bulletTexture,
          -cam.position.x+b.position.x,
          -cam.position.y+b.position.y,
          4,
          4,
          0,
          0,
          1,
          1
        );
      }
    }


    for (var i = 0; i < particles.length; i++) {
      const p = particles[i]
        if(p.visible){
          canvas.img(
            rbotHit.text,
            -cam.position.x+p.position.x,
            -cam.position.y+p.position.y,
            8,
            8,
            0,
            0,
            .7,
            1
          );
        }
    }

    for (var i = 0; i < persistence.length; i++) {
      const p = persistence[i]
        if(p.visible){
          canvas.img(
            rbotHit.text,
            -cam.position.x+p.position.x,
            -cam.position.y+p.position.y,
            8,
            8,
            0,
            0,
            .7,
            1
          );
        }
    }

    canvas.flush();
    //fpsM.tick()
  }

  /*  */if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const svgs: any = document.querySelectorAll("svg")
    svgs.forEach(svg => {
      svg.style.display = "block";
    });
  }


  runGame()
})
