import './lib/tiny-canvas.js';
import './lib/sounds.js';
import { resolve } from 'url';
import { rejects } from 'assert';
import 'fpsmeter';

declare var fireSound: any;
declare var jumpSound: any;
declare var hitSound: any;
declare var coinSound: any;
declare var FPSMeter: any;

const fpsM = new FPSMeter();

declare var TC: any;
declare var TCTex: any;
let rnd: () => number = Math.random

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
    lt: { x: b.p.x, y: b.p.y },
    rt: { x: b.p.x + b.w, y: b.p.y },
    rb: { x: b.p.x + b.w, y: b.p.y + b.h },
    lb: { x: b.p.x, y: b.p.y + b.h }
  }
}

function getTileIndeces(v: Vector): number {
  return Math.floor(v.y / 20 /* tileSize */) * 50 /* worldSize */ + Math.floor(v.x / 20);
}

export function collide(body1: Body, body2: Body): boolean {
  const result = body1.p.x < (body2.p.x + body2.w) &&
    body1.p.x + (body1.w) > body2.p.x &&
    body1.p.y < body2.p.y + body2.h &&
    body1.p.y + body1.h > body2.p.y;
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
        const tex1: ImgTexture  = {
          w: img.width,
          h: img.height,
          t: TCTex(canvas.g, g.canvas, img.width, img.height) as WebGLTexture
        }

        g.clearRect(0, 0, img.width, img.height)
        g.save()
        g.scale(-1, 1)
        g.drawImage(img, img.width * -1, 0, img.width, img.height)
        g.restore()
        const tex2: ImgTexture = {
          w: img.width,
          h: img.height,
          t: TCTex(canvas.g, g.canvas, img.width, img.height) as WebGLTexture
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
  let addScore = 0
  let toNextScore = 10

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
      bs.push({ p: { x: 50, y: 50 }, v: { x: 0, y: 0 }, vi: false, d: Dir.L, w: 4, h: 4 })
    }
    return bs
  }

  function initHosta(num: number): Body[] {
    const bs: Body[] = []
    for (let i = 0; i < num; i++) {
      bs.push({ p: { x: 250, y: 0 }, v: { x: 0, y: 0 }, vi: true, d: Dir.L, w: 16, h: 16 })
    }
    return bs
  }


  function newEnemy(x: number, y:number, vel: number): Enemy {
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
  function newEnemies(x: number, y:number, n: number): Enemy []{
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

  function shaking(){
    const x = 0, y = 0
    const ang = rnd() % Math.PI * 2
    const nx = Math.sin(ang) * radioToShake
    const ny = Math.cos(ang) * radioToShake
    cam.p.x = x + nx
    cam.p.y = y + ny
    radioToShake *= 0.9
  }
/*   canvas.g.canvas.addEventListener("click", (event) => {
    const pos = getMousePos(canvas.g.canvas, event)
    for(var i = 0; i < currentState.hostages.length; i++){
      const host = currentState.hostages[i]
        host.position.x = cam.position.x+pos.x
        host.position.y = cam.position.y+pos.y
        host.visible = true
    }
  }) */

  canvas.g.canvas.addEventListener("click", (event) => {
    let take = 1
    const pos = getMousePos(canvas.g.canvas, event)
    for(var i = 0; i < currentState.es.length; i++){
      const ene = currentState.es[i]
      if(!ene.vi && take > 0){
        ene.p.x = cam.p.x+pos.x
        ene.p.y = cam.p.y+pos.y
        ene.vi = true
        ene.vi = true
        ene.l = 5
        ene.v.x =  rnd() * (3.9-1.7) + 1.7  * ( currentState.p.p.x > ene.p.x ?
        WALK_SPEED : -WALK_SPEED)
        ene.d = ene.v.x > 0 ? Dir.L : Dir.R
        take --
      }
    }
  })

  function explodeParticles(x: number, y: number): void{
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

  let currentState: Model = {
    p: {
      p: { x: 128, y: 0.0 },
      v: { x: 0.0, y: 0.0 },
      d: Dir.R,
      s: false,
      w: 20,
      h: 20,
      vi: true,
      l: 3
    },
    es: newEnemies(34,0,50),
    bs: initBullets(60),
    hs: initHosta(1),
    s: S.M
  }

  const FLOOR = height - 10
  const SECOND_FLOOR = FLOOR * 0.7
  const zone: Body = { p: { x: 50, y: FLOOR }, v: { x: 0, y: 0 }, vi: true, d: Dir.L, w: 150, h: 20 }


  function createFloor(x:number, y:number, width: number): Body {
    return {p:{x:x, y: y},w: width, h: 20,d: Dir.L,v:{x:0,y:0},vi: true}
  }

  const floors = [createFloor(0.0,FLOOR,900), createFloor(200.0,SECOND_FLOOR,260),createFloor(300.0,SECOND_FLOOR,360)]

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
      let text = p.d == Dir.R ? rightT : leftT
      canvas.img(
        text.t,
        -cam.p.x+(p.p.x + (p.w / 2)),
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

/*   function isOverFloor(b: Body): boolean{
    return b.position.y + b.height == FLOOR || collideFloorBottom(b,secondFloorBody);
  }
 */
  function isOverFloor(b: Body): boolean{
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
  const hostAnim = new BodyAnimation(rHost, lHost, 20, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]])
  const runAnim = new BodyAnimation(rightRun, leftRun, 8, true, [[0, 0, 1, 0.2], [0, .2, 1, 0.4], [0, .4, 1, 0.6], [0, .6, 1, 0.8], [0, .8, 1, 1.0]])
  const shootingAnim = new BodyAnimation(rightShoot, leftShoot, 3, false, [[0, 0, 1, 0.25], [0, .25, 1, 0.5], [0, .5, 1, 0.75], [0, .75, 1, 1.0]])

  let gunReady: number = 0
  let jumpTries:number = 2
  let ticksHitted: number = 0
  function update(a: Action, m: Model) {
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
          jumpSound()
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
            b.p.x = p.p.x + p.w + b.w
            b.p.y = p.p.y + (p.h / 2.4)
            b.v.x = (p.d == Dir.R ? 35 : -35) * Math.cos(angle)
            b.v.y = 5 * Math.sin(angle)
            b.vi = true
            gunReady = 3
            fireSound()
            radioToShake = 2
            break;
          }
        }
      }else{
        let host = m.p.c
        host.vi = true
        host.p.x = m.p.d == Dir.L ? m.p.p.x - 25 : m.p.p.x + 25
        host.p.y = m.p.p.y - 10
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

    for (var i = 0; i < m.hs.length; i++) {
      const h = m.hs[i]
      move(h)
      if(h.vi && collide(m.p,h) && !m.p.c){
        h.vi = false
        m.p.c = h
      }
      if(h.vi && collide(h,zone)){
        addScore += 500
        h.vi = false
      }
    }
    for (var i = 0; i < m.es.length; i++) {
      const e = m.es[i]
      ticksHitted = Math.max(ticksHitted-1,0)
      if(ticksHitted == 0){
        e.hi = false
      }
      move(e)
      if (e.p.x < 0 || (e.p.x + 20 > 900)) {
        e.v.x = e.v.x * -1
        e.d = e.v.x > 0 ? Dir.L : Dir.R
      }
      for(var j = 0;j< m.bs.length;j++){
        const b = m.bs[j]
        if (e.vi && b.vi && collide(b, e)) {
          hitSound()
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
      coinSound()
      toNextScore = 10
      addScore = Math.max(addScore-10,0)

    }
    toNextScore--
    zone.p.y += ((FLOOR-10) - zone.p.y) * 0.1 
    zone.p.y = Math.floor(zone.p.y) == FLOOR-10 ? FLOOR : zone.p.y
  
  }else if(m.s == S.M){
    if(a == EventType.AP){
      m.s = S.G
    }
  }
  }
  function moveCam(b: Body): void{
    cam.p.x = Math.max(b.p.x - (cam.w/2),0)
  }

  function renderMountain() {
    canvas.push()
    canvas.scale(6,6)
    for (var x = 0; x < 100; x += 20) {
      canvas.img(
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
      canvas.pop()
  }

  function renderFloor() {
      for(var f=0; f<floors.length;f++){
        const floor = floors[f]
        for (var x = floor.p.x; x <= floor.p.x+floor.w ; x += 20) {
          const text = x % 7 == 0 ? leftFloor : rightFloor
          canvas.img(
            text.t,
            -cam.p.x+x,
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

  function ifOnTheFloorgetY(b: Body): number{
    let bottomCollide: number = -1
    for(var i = 0;i< floors.length;i++){
       bottomCollide = collideFloorBottom(b,floors[i]) ? floors[i].p.y : -1 
    }
    return bottomCollide;
  }

  function applyGravity(b: Body) {
    b.v.y =  ifOnTheFloorgetY(b) < 0 ? b.v.y + (GRAVITY * currentDelta) : b.v.y
  }

  function outsideScreen(b: Bullet) {
    return b.p.x < 0 || b.p.x > 900
  }

  function moveBullet(b: Bullet): void {
    if (outsideScreen(b)) {
      b.vi = false
      b.v.x = 0
    }
    b.p.x += b.v.x * currentDelta
    b.p.y += b.v.y * currentDelta
  }

  function collideFloorTop(b: Body, f: Body): boolean {
   return collide(b,f) &&
    f.p.y+(f.h/2) > b.p.y
  }
  function collideFloorBottom(b: Body, f: Body): boolean {
    return collide(b,f) &&
    b.p.y < f.p.y
   }

   function collideFloorLeft(b: Body,f: Body): boolean {
    return collide(b,f) &&
    b.p.x < f.p.x && b.p.x+b.w > f.p.x
   }
   function collideFloorRight(b: Body,f: Body): boolean {
    return collide(b,f) &&
    b.p.x+(b.w*0.9) < f.p.x && b.v.x > 0
   }

  function move(b: Body): void {
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


function renderText(w: string,x: number,y:number,s:number){
  const coor = renderCoord(w)
  var newX = -((w.length* (4*s) ) /2) ;
  for(var c = 0; c<coor.length;c++){
    canvas.img(
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

function renderCoord(w: string): [number,number,number,number][]{
  const letters: string[] = ['abcdefghijklm','nopqrstuvwxyz', '0123456789:!+']
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
    canvas.g.canvas.style.width = "auto";
    canvas.g.canvas.style.height =  Math.round(window.innerHeight*0.95) + "px" ;
    canvas.g.viewport(0, 0, canvas.g.canvas.width, canvas.g.canvas.height);

    if(window.innerHeight>window.innerWidth){
      canvas.cls()
      canvas.bkg(0,0,0)
      renderText("flip:phone",40,60,1)
    }else{
    if(m.s == S.G ){
    canvas.cls()
    canvas.bkg(57/255,73/255,81/255)
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
        canvas.img(
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


    for (var i = 0; i < particles.length; i++) {
      const p = particles[i]
        if(p && p.vi){
          canvas.img(
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

    for (var i = 0; i < persistence.length; i++) {
      const p = persistence[i]
        if(p && p.vi){
          canvas.img(
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
    renderText("score: "+score,width/2,10,2)
    }else if(m.s == S.M){
      renderText("back",width/2,height/3,4)
      renderText("to",width/2,height/3 + (4*4)+4 ,4)
      renderText("rescue",width/2,height/3+ (4*4*2)+8,4)
      renderText("press+attack+to+start",width/2,height/2+ (4*4*2)+14,1)
    }
  }
    canvas.flush();
    fpsM.tick()
  }

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const svgs: any = document.querySelectorAll("svg")
    svgs.forEach(svg => {
      svg.style.display = "block";
    });
  }


  runGame()
})
