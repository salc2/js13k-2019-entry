import './lib/tiny-canvas.js';
import './lib/sounds.js';
import { resolve } from 'url';
import { rejects } from 'assert';
//import 'fpsmeter';

declare var fs: any;
declare var js: any;
declare var hs: any;
declare var cs: any;

//declare var FPSMeter: any;

//const fpsM = new FPSMeter();

declare var TC: any;
declare var TCTex: any;
let rnd: () => number = Math.random
let rou: (number) => number = Math.round

interface Vector {
  x: number
  y: number
}
interface Camera{
  p: Vector
  w: number
  h: number
}

interface Particle extends Body{
}

interface Bullet extends Body {
}
interface Body {
  p: Vector
  v: Vector
  d: Dir
  h: number
  w: number
  vi: boolean
}
interface Player extends Body {
  s: boolean
  c?: Body
  l:number
}
interface Enemy extends Body {
  l: number
  hi: boolean
}

interface State {
  p: Player
  es: Enemy[]
  bs: Bullet[],
  hs: Body[]
  s: S
}
enum S{
  M,G,GO
}

interface ImgTexture {
  w: number
  h: number
  t: WebGLTexture
}
enum Dir {
  L,
  R
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
var cn = TC(document.getElementById('c'))
interface AABB {
  lt: Vector
  rt: Vector
  rb: Vector
  lb: Vector
}

let rdnAngle: () => number = () => {
  const v = (rnd() * (125-0) + 0)/1000
  if(rnd() >= 0.5){
      return (2-v) * Math.PI 
  }else{
      return v * Math.PI
  }
}

let collide: (body1: Body, body2: Body) => boolean =  (body1: Body, body2: Body) =>{
  const result = body1.p.x < (body2.p.x + body2.w) &&
    body1.p.x + (body1.w) > body2.p.x &&
    body1.p.y < body2.p.y + body2.h &&
    body1.p.y + body1.h > body2.p.y;
  return result;
}

let loadTextures:(urls: string[]) => Promise<ImgTexture[]> =  (urls: string[]) => {
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

        let createText: () => ImgTexture = () => { 
          return {
          w: img.width,
          h: img.height,
          t: TCTex(cn.g, g.canvas, img.width, img.height) as WebGLTexture
        }
      }

        const tex1 = createText()

        g.clearRect(0, 0, img.width, img.height)
        g.save()
        g.scale(-1, 1)
        g.drawImage(img, img.width * -1, 0, img.width, img.height)
        g.restore()

        const tex2 = createText()
        
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

let createBulletTexture: () => any = () => {
  const g = document.createElement("canvas").getContext("2d")
  g.canvas.width = 4
  g.canvas.height = 4
  g.clearRect(0, 0, cn.width, cn.height);
  g.fillStyle = '#ff6';
  g.beginPath();
  g.arc(2, 2, 2, 0, 2 * Math.PI);
  g.fill()
  return TCTex(cn.g, g.canvas, 4, 4) as WebGLTexture
}

loadTextures(["sh.png","h.png","bh.png"
,"m.png","f.png", "sr.png", "si.png", 
"ss.png", "b.png", "a.png"]).then((textures) => {
  const [rSolHost,lSolHost,rHost,lHost,rbotHit,lbotHit,
    ,lMountain,rightFloor,leftFloor, rightRun, leftRun, rightIdle
    , leftIdle, rightShoot, leftShoot, rightBot, leftBot, abc,,] = textures

  const bulletTexture = createBulletTexture()

  let currentDelta = 0.0
  let currentTime = 0.0
  let currentAction: Action = null
  const GRAVITY = 10

  let score = 0
  let startPhysics = false
  let addScore = 0
  let toNextScore = 10

  const JUMP_VEL = 30
  const WALK_SPEED = 6
  let startTime = 0;
  let id = 0;
  const [width, height] = [cn.g.canvas.width, cn.g.canvas.height]

  let particles: Particle[] = []
  let persistence: Particle[] = []

  let initBullets: (num: number) => Bullet[] = (num: number) => {
    const bs: Bullet[] = []
    for (let i = 0; i < num; i++) {
      bs.push({ p: { x: 50, y: 50 }, v: { x: 0, y: 0 }, vi: false, d: Dir.L, w: 4, h: 4 })
    }
    return bs
  }

  let initHosta:(num: number) => Body[] = (num: number) => {
    const bs: Body[] = []
    for (let i = 0; i < num; i++) {
      bs.push({ p: { x: 250, y: 0 }, v: { x: 0, y: 0 }, vi: false, d: Dir.L, w: 16, h: 16 })
    }
    return bs
  }


  let newEnemy: (x: number, y:number, vel: number) => Enemy = (x: number, y:number, vel: number) => {
    return {
      p: { x: x, y: y },
      v: { x: vel, y: 0.0 },
      d: Dir.L,
      w: 20,
      h: 20,
      vi: false,
      hi: false,
      l: 3
    }
  }
  let newEnemies: (x: number, y:number, n: number) => Enemy [] = (x: number, y:number, n: number) => {
    const es = []
    for(var i=0;  i< n; i++){
      es.push(newEnemy(x,y,WALK_SPEED* rnd() * (3.9-1.7) + 1.7))
    }
    return  es
  }

  const cam: Camera = {p:{x:0,y:0},w:300,h: 150}
  window["cam"] = cam

  let camCenter = cam.p
  let radioToShake = 0
  let shake = false

  let shaking: () => void = () => {
    const x = 0, y = 0
    const ang = rnd() % Math.PI * 2
    const nx = Math.sin(ang) * radioToShake
    const ny = Math.cos(ang) * radioToShake
    cam.p.x = x + nx
    cam.p.y = y + ny
    radioToShake *= 0.9
  }

let spawnEnemyId:number = 0

 let spawnEnemy: () => void = () => {
   let take = rou(rnd() * (3-1) + 1)
   let pos:Vector[] = [{x:394,y:38},{x:686,y:38}]
   let ind = Math.floor(rnd()*pos.length)

  for(var i = 0; i < currentState.es.length; i++){
    const ene = currentState.es[i]
    if(!ene.vi && take > 0){
      ene.p.x = cam.p.x+pos[ind].x
      ene.p.y = cam.p.y+pos[ind].y
      ene.vi = true
      ene.l = 5
      ene.v.x =  rnd() * (3.9-1.7) + 1.7  * ( currentState.p.p.x > ene.p.x ?
      WALK_SPEED : -WALK_SPEED)
      ene.d = ene.v.x > 0 ? Dir.L : Dir.R
      take --
    }
  }
 }

 let spawnHostId:number = 0

 let spawnHost: ()=> void = () => {
   let pos:Vector[] = [{x:817,y:81},{x:580,y:81},{x:716,y:120},{x:498,y:120}]
   let ind = Math.floor(rnd()*pos.length)
  for(var i = 0; i < currentState.hs.length; i++){
    const hos = currentState.hs[i]
    if(!hos.vi){
      hos.p.x = cam.p.x+pos[ind].x
      hos.p.y = cam.p.y+pos[ind].y
      hos.vi = true
      hos.d = ind > 2 ? Dir.L : Dir.R
      break;
    }
  }
 }

  let explodeParticles: (x: number, y: number) => void = (x: number, y: number)  => {
    var rnd = Math.random
    const sp = WALK_SPEED*2
    const jp = JUMP_VEL*3
		for (var i = 0; i < 10; i++) {
			const vx = rnd() * (sp - (-sp)) + (-sp)
			const vy = rnd() * (jp - (-jp)) + (-jp)
			var angle = rnd() * Math.PI * 2;
			particles.push({p: {x: x,y:y},v:{x: vx * Math.cos(angle), y:vy * Math.sin(angle)},d:Dir.L,h:4,w:4,vi:true})
		}
  }


  let createInitState: () => Model = () =>  {
    score = 0
    addScore = 0
    particles = []
    persistence = []


    window.clearInterval(spawnEnemyId)
    spawnEnemyId = window.setInterval(spawnEnemy,5000)
    window.clearInterval(spawnHostId)
    spawnHostId = window.setInterval(spawnHost,5000)

    return {
      p: {
        p: { x: 128, y: 0.0 },
        v: { x: 0.0, y: 0.0 },
        d: Dir.R,
        s: false,
        w: 20,
        h: 20,
        vi: true,
        l: 10
      },
      es: newEnemies(34,0,50),
      bs: initBullets(60),
      hs: initHosta(5),
      s: S.M
    }
  }

  let currentState: Model = createInitState()

  const FLOOR = height - 10
  const SECOND_FLOOR = FLOOR * 0.7
  const THIRD_FLOOR = SECOND_FLOOR * 0.6
  const zone: Body = { p: { x: -20, y: FLOOR }, v: { x: 0, y: 0 }, vi: true, d: Dir.L, w: 150, h: 20 }


  let createFloor: (x:number, y:number, width: number) => Body = (x:number, y:number, width: number) => {
    return {p:{x:x, y: y},w: width, h: 20,d: Dir.L,v:{x:0,y:0},vi: true}
  }

  const floors = [createFloor(0.0,FLOOR,950), 
    createFloor(300.0,SECOND_FLOOR,160),
    createFloor(540.0,SECOND_FLOOR,320),
    createFloor(380.0,THIRD_FLOOR,320)
  ]

  const keepAnimation = (time: number) => {
    currentDelta = (time - startTime) / 100;
    currentTime = time
    startTime = time;
    
    render(currentState)
    update(currentAction, currentState)
    currentAction = null
    id = requestAnimationFrame(keepAnimation);
  };

  let runGame: () => void = () => {
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
      case "l":
        currentAction = EventType.LP
        break;
      case "r":
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
      case "l":
        currentAction = EventType.LR
        break;
      case "r":
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
    rec.addEventListener("touchmove", handlerStart, psOp);
    rec.addEventListener("touchend", handlerEnd, psOp);
    rec.addEventListener("touchcancel", handlerEnd, psOp);
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
        currentAction = EventType.AP
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
      case 13:
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

    this.reset = () => {
      if (!(frameIndex < nFrames - 1)) {
        frameIndex = 0;
      }
    }
    this.update = (p: Body) => {
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
      let text = p.d == Dir.R ? rightT : leftT
      cn.img(
        text.t,
        -cam.p.x+ (p.p.x - (p.w / 2) ),
        -cam.p.y+p.p.y,
        p.w,
        p.h,
        v0,
        u0,
        v1,
        u1
      );
    }

  }

  let isOverFloor: (b: Body) => boolean = (b: Body)  => {
    let floorBottoms: boolean = false;
    for(var i=0;i<floors.length;i++){
      floorBottoms = floorBottoms || collideFloorBottom(b,floors[i])
    }
    return b.p.y + b.h == FLOOR || floorBottoms;
  }
  
  const botHittedAnim = new BodyAnimation(rbotHit, lbotHit, 2, true, [[0, 0, 1, 1]])
  const botAnim = new BodyAnimation(rightBot, leftBot, 5, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]])
  const ONETHIRD = 1/3 
  const soldierHostAni = new BodyAnimation(rSolHost, lSolHost, 14, false, [[0, 0, 1, ONETHIRD], [0, ONETHIRD, 1, ONETHIRD*2],[0, ONETHIRD*2, 1, 1]])
  const idleAnim = new BodyAnimation(rightIdle, leftIdle, 20, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]])
  const hostAnim = new BodyAnimation(rHost, lHost, 20, true, [[0, 0, 1, 0.5], [0, 0.505, 1, 1]])
  const runAnim = new BodyAnimation(rightRun, leftRun, 8, true, [[0, 0, 1, 0.2], [0, .2, 1, 0.4], [0, .4, 1, 0.6], [0, .6, 1, 0.8], [0, .8, 1, 1.0]])
  const shootingAnim = new BodyAnimation(rightShoot, leftShoot, 3, false, [[0, 0, 1, 0.25], [0, .25, 1, 0.5], [0, .5, 1, 0.75], [0, .75, 1, 1.0]])
  let menuSelection: number = 0 
  let gunReady: number = 0
  let jumpTries:number = 2
  let ticksHitted: number = 0
  let update:(a: Action, m: Model) => void = (a: Action, m: Model) => {
    
    if(m.s == S.G){
    if(radioToShake > 0.0002){
      shaking()
    }
    const p = m.p
    if (isOverFloor(p)) {
      jumpTries = 2
    }
    switch (a) {
      case EventType.JP:
        if(jumpTries > 0){
          jumpTries--
          
          p.v.y = p.c ? -JUMP_VEL/2 : -JUMP_VEL
          js()
        }
        p.s = false
        break;
      case EventType.LP:
        p.d = Dir.L
        p.v.x = p.c ? -WALK_SPEED/2 : -WALK_SPEED
        p.s = false
        break;
      case EventType.RP:
        p.d = Dir.R
        p.v.x = p.c ? WALK_SPEED/2 : WALK_SPEED
        p.s = false
        break;
      case EventType.LR:
        p.v.x = 0
        break;
      case EventType.RR:
        p.v.x = 0
        break;
      case EventType.AP:
        if(!m.p.c){
        shootingAnim.reset()
        p.s = true
        p.v.x = (p.d == Dir.L ? 1.5 : -1.5)

        for (var i = 0; i < m.bs.length; i++) {
          const b = m.bs[i]
          if (!b.vi && gunReady == 0) {
            const angle = rdnAngle()
            b.p.x = p.p.x - (p.w  / 2 )
            b.p.y = p.p.y + (p.h / 2.4)
            b.v.x = (p.d == Dir.R ? 35 : -35) * Math.cos(angle)
            b.v.y = 5 * Math.sin(angle)
            b.vi = true
            gunReady = 3
            fs()
            radioToShake = 2
            break;
          }
        }
      }else{
        let host = m.p.c
        host.vi = true
        host.p.x = m.p.d == Dir.L ? m.p.p.x - 25 : m.p.p.x + 25
        host.p.y = m.p.p.y - 3
        m.p.c = null
      }

        break;
      case EventType.AR:
        p.v.x = 0
        //p.shooting = false
        //ShootingAnim.reset()
        break;
      default:
        break;
    }

     move(m.p)
     m.p.p.x = Math.max(m.p.p.x,0)
      m.p.l = m.p.p.y > height ? 0 : m.p.l
    for (var i = 0; i < m.hs.length; i++) {
      const h = m.hs[i]
      move(h)
      h.vi = h.p.y > height ? false : h.vi 
      if(h.vi && collide(m.p,h) && !m.p.c){
        h.vi = false
        m.p.c = h
      }

      if(h.vi && collide(h,zone) || (m.p.c && collide(m.p,zone) ) ){
        addScore += 500
        h.vi = false
        m.p.c = null
      }
    }
    for (var i = 0; i < m.es.length; i++) {
      const e = m.es[i]
      ticksHitted = Math.max(ticksHitted-1,0)
      if(ticksHitted == 0){
        e.hi = false
      }
      move(e)
      if (e.p.x < 0 || (e.p.x + 20 > 950)) {
        e.v.x = e.v.x * -1
        e.d = e.v.x > 0 ? Dir.L : Dir.R
      }
      for(var j = 0;j< m.bs.length;j++){
        const b = m.bs[j]
        if (e.vi && b.vi && collide(b, e)) {
          hs()
          e.hi = true
          ticksHitted = 8
          e.p.x += (b.v.x > 0 ? + 18 : -18)
          if(e.l == 0){
            radioToShake = 4
            explodeParticles(e.p.x+(e.w/2),e.p.y+(e.h/2))
            e.vi = false
            e.v.x = 0
            addScore += 100

          }else{
            e.l = Math.max(e.l-1,0)
          }
          b.vi = false
          b.v.x = 0
        }
      }
      if(e.vi && collide(e,m.p)){
        m.p.l--
        hs()
        m.p.p.x +=  m.p.d == Dir.L ? 10 : -10
        m.p.p.y +=  -3
      }
    }
    for (var i = 0; i < m.bs.length; i++) {
      const b = m.bs[i]
      moveBullet(b)
    }
    for (var i = 0; i < particles.length; i++) {
      const p = particles[i]
      move(p)

      for(var f=0; f<floors.length;f++){
        if(collideFloorBottom(p,floors[f])){
          particles.splice(i, 1)
          persistence.push(p)         
        }
      }
    }

    gunReady = Math.max(0, gunReady - 1);
    moveCam(m.p)

    if(toNextScore <= 0 && addScore>0){
      score+=10
      cs()
      toNextScore = 10
      addScore = Math.max(addScore-10,0)

    }
    toNextScore--
    zone.p.y += ((FLOOR-10) - zone.p.y) * 0.1 
    zone.p.y = Math.floor(zone.p.y) == FLOOR-10 ? FLOOR : zone.p.y
  
  }else if(m.s == S.M){
    if(a == EventType.AP){
      m.s = S.G
      fs()
    startPhysics = true    
    }
  }else{
    if(a == EventType.LP || a == EventType.RP){
      menuSelection =  (menuSelection+1) % 2
      cs()
    }
    if(a == EventType.AP && menuSelection == 0 && navigator.onLine){
      window.location.href = 'https://twitter.com/intent/tweet?url=https%3A%2F%2Fjs13kgames.com%2Fentries%2Fback-to-rescue&text=I%20played%20Back%20to%20Rescue%20by%20@salc2%20and%20reached%20'+(addScore+score)+'%20points%20&hashtags=js13k%2Cjs13games';
    }
    if(a == EventType.AP && menuSelection == 1){
      currentState = createInitState()
      currentState.s = S.G
    }
  }
if(m.p.l <= 0){
  m.s = S.GO
}  
}
  let moveCam: (b: Body) => void = (b: Body) => { 
    cam.p.x = Math.max(b.p.x - (cam.w/2),0)
  }

  let renderMountain: () => void = () => {
    cn.push()
    cn.scale(6,6)
    for (var x = 0; x < 100; x += 20) {
      cn.img(
        lMountain.t,
       (-cam.p.x*0.06) + x,
       (-cam.p.y*0.06) + 5,
        lMountain.w,
        lMountain.h,
        0,
        0,
        1,
        1
      );
    }
      cn.pop()
  }

  let renderFloor: () => void = () => {
      for(var f=0; f<floors.length;f++){
        const floor = floors[f]
        for (var x = floor.p.x; x <= floor.p.x+floor.w ; x += 20) {
          const text = x % 7 == 0 ? leftFloor : rightFloor
          cn.img(
            text.t,
            -cam.p.x + (x - (text.w/2)),
            -cam.p.y+(floor.p.y-10),
            text.w,
            text.h,
            0,
            0,
            1,
            1
          );
          }
      }
  }

  let ifOnTheFloorgetY: (b: Body) => number = (b: Body)  => {
    let bottomCollide: number = -1
    for(var i = 0;i< floors.length;i++){
       bottomCollide = collideFloorBottom(b,floors[i]) ? floors[i].p.y : -1 
    }
    return bottomCollide;
  }

  let applyGravity: (b: Body) => void = (b: Body) => {
    b.v.y =  ifOnTheFloorgetY(b) < 0 ? b.v.y + (GRAVITY * currentDelta) : b.v.y
  }

  let outsideScreen: (b: Bullet) => boolean = (b: Bullet) => {
    return b.p.x < 0 || b.p.x > 900
  }

  let moveBullet: (b: Bullet)=>  void = (b: Bullet) => {
    if (outsideScreen(b)) {
      b.vi = false
      b.v.x = 0
    }
    b.p.x += b.v.x * currentDelta
    b.p.y += b.v.y * currentDelta
  }

  let collideFloorTop: (b: Body, f: Body) => boolean = (b: Body, f: Body) => {
   return collide(b,f) &&
    f.p.y+(f.h/2) > b.p.y
  }
  let collideFloorBottom:(b: Body, f: Body) => boolean= (b: Body, f: Body) => {
    return collide(b,f) &&
    b.p.y < f.p.y
   }

  let move: (b: Body) => void = (b: Body) => {
    if(startPhysics){
    const groundY = ifOnTheFloorgetY(b)
    b.p.y = groundY < 0 ? b.p.y + (b.v.y * currentDelta) : groundY - b.h
    b.p.x += b.v.x * currentDelta
    applyGravity(b)

    for(var f =0; f< floors.length; f++){

      if(collideFloorTop(b,floors[f])){
        if(b.v.y < 0){
          b.v.y = 0
        }
      }
      if(collideFloorBottom(b,floors[f])){
        if(b.v.y > 0){
          b.v.y = 0
        }
      }
    }
  }
  }


let renderText: (w: string,x: number,y:number,s:number) => void = (w: string,x: number,y:number,s:number) => {
  const coor = renderCoord(w)
  var newX = -((w.length* (4*s) ) /2) ;
  for(var c = 0; c<coor.length;c++){
    cn.img(
      abc.t,
      newX+x,
      y,
      4*s,
      4*s,
      coor[c][0],
      coor[c][1],
      coor[c][2],
      coor[c][3]
    );

    newX+= (4*s)+1
  }
}

let renderCoord: (w: string) => [number,number,number,number][] = (w: string) => {
  const letters: string[] = ['abcdefghijklm','nopqrstuvwxyz', '0123456789:! ']
  let resp:[number,number,number,number][] = new Array<[number,number,number,number]>()

  for(var i = 0;i<w.length;i++){
    const l = w.charAt(i)
    for(var r = 0; r<letters.length;r++){
      const index = letters[r].indexOf(l)
      if(index > -1){
        resp.push([(index*4)/52, (r*4) /12, ((index*4)+4)/52 , ((r*4)+4)/12])
      }
    }
  }

  return resp
}


  const render = (m: Model) => {
    cn.g.canvas.style.width = "auto";
    cn.g.canvas.style.height =  rou(window.innerHeight*0.95) + "px" ;
    cn.g.viewport(0, 0, cn.g.canvas.width, cn.g.canvas.height);

    if(window.innerHeight>window.innerWidth){
      cn.cls()
      cn.bkg(0,0,0)
      renderText("flip phone",40,60,1)
    }else{
      if(m.s == S.GO ){
        let t = "",p =""
        if(menuSelection > 0){
          t = "!"
        }else{
          p = "!"
        }

          renderText("game over",width/2,height/5,4)
          renderText(t+"play again"+t,width/3-10,height/3,2)
          renderText(p+"tweet score"+p,width/3 * 2+10,height/3,2)
          
    }else if(m.s == S.G ){
    cn.cls()
    cn.bkg(57/255,73/255,81/255)
    renderMountain()

    const p = m.p

    renderFloor()

    renderText("extraction",-cam.p.x+ zone.p.x+(zone.w/2) ,zone.p.y-15,1)
    renderText("area",-cam.p.x+ zone.p.x+(zone.w/2),zone.p.y-10,1)

    if (p.s) {
      shootingAnim.update(p)
    } else if (p.v.x == 0) {
      if(p.c){
       soldierHostAni.update(p)
      }else{
      idleAnim.update(p)
      }
    } else {
      if(p.c){
        soldierHostAni.reset()
        soldierHostAni.update(p)
       }else{
        runAnim.update(p)
       }
    }

    for (var i = 0; i < m.es.length; i++) {
      const e = m.es[i]
      if(e.vi){
        if(e.hi){
          botHittedAnim.update(e)
        }else{
          botAnim.update(e)
        }
      }
    }

    for (var i = 0; i < m.bs.length; i++) {
      const b = m.bs[i]
      if (b.vi) {
        cn.img(
          bulletTexture,
          -cam.p.x+b.p.x,
          -cam.p.y+b.p.y,
          4,
          4,
          0,
          0,
          1,
          1
        );
      }
    }

    for (var i = 0; i < m.hs.length; i++) {
      const b = m.hs[i]
      if (b.vi) {
        hostAnim.update(b)
      }
    }

    renderParticles(particles)
    renderParticles(persistence)
    renderText("life: "+m.p.l,width/2,24,1)
    renderText("score: "+score,width/2,10,2)
    }else if(m.s == S.M){
      renderText("back",width/2,height/3,4)
      renderText("to",width/2,height/3 + (4*4)+4 ,4)
      renderText("rescue",width/2,height/3+ (4*4*2)+8,4)
      if(currentTime % 500 > 250){
        cs()
        renderText("press space to start",width/2,height/2+ (4*4*2)+14,1)
      }
    }
  }
    cn.flush();
  // fpsM.tick()
  }

  let renderParticles: (ps: Body[]) => void = (ps: Body[]) => {
    for (var i = 0; i < ps.length; i++) {
      const p = ps[i]
        if(p && p.vi){
          cn.img(
            rbotHit.t,
            -cam.p.x+p.p.x,
            -cam.p.y+p.p.y,
            8,
            8,
            0,
            0,
            .7,
            1
          );
        }
    }
  }

  window.addEventListener("touchstart", () =>{
    const svgs: any = document.querySelectorAll("svg")
    svgs.forEach(svg => {
      svg.style.display = "block";
    });
  })


  runGame()
})
