import './lib/tiny-canvas.js';
import './lib/sounds.js';
import { resolve } from 'url';
import { rejects } from 'assert';
import 'fpsmeter';

declare var fireSound: any;
declare var jumpSound: any;
declare var hitSound: any;
declare var FPSMeter: any;

const fpsM = new FPSMeter();

declare var TC: any;
declare var TCTex: any;

interface Vector {
  x: number
  y: number
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
  RightPressed,
  LeftReleased,
  RightReleased,
  LeftPressed,
  JumpPressed,
  UsePressed,
  AttackPressed,
  AttackReleased
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
  const v = (Math.random() * (125-0) + 0)/1000
  if(Math.random() >= 0.5){
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
      life: 5
    }
  }

  canvas.g.canvas.addEventListener("click", (event) => {
    const pos = getMousePos(canvas.g.canvas, event)
    console.log(pos)
 //   const vel = WALK_SPEED * (Math.random() * (3 - 1) + 1)/2 
  //  window["state"].enemies.push(newEnemy(pos.x,pos.y, vel))
  })

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
    enemies: [newEnemy(34,24,WALK_SPEED)],
    bullets: initBullets(10)
  }
  const FLOOR = height - 10
  const SECOND_FLOOR = FLOOR * 0.7

  const secondFloorBody: Body = {position:{x:0.0, y: SECOND_FLOOR},width: 60, height: 20,dir: Dir.Left,velocity:{x:0,y:0},visible: true}
  const secondFloorBodySeg2: Body = {position:{x:190.0, y: SECOND_FLOOR},width: 100, height: 20,dir: Dir.Left,velocity:{x:0,y:0},visible: true}
  const floors = [secondFloorBody,secondFloorBodySeg2]

  window["state"] = currentState

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
        currentAction = EventType.JumpPressed
        break;
      case "b":
        currentAction = EventType.AttackPressed
        break;
      case "left":
        currentAction = EventType.LeftPressed
        break;
      case "right":
        currentAction = EventType.RightPressed
        break;

      default:
        // code...
        break;
    }
  }
  const handlerEnd = (ev: TouchEvent) => {
    switch (ev.currentTarget['id']) {
      case "b":
        currentAction = EventType.AttackReleased
        break;
      case "left":
        currentAction = EventType.LeftReleased
        break;
      case "right":
        currentAction = EventType.RightReleased
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
        currentAction = EventType.LeftPressed
        break;
      case 39:
        currentAction = EventType.RightPressed
        break;
      case 38:
        currentAction = EventType.JumpPressed
        break;
      case 13:
        currentAction = EventType.UsePressed
        break;
      case 32:
        currentAction = EventType.AttackPressed
        break;
      default:
        break;
    }
  };
  window.addEventListener('keydown', handlerKBDown, true);

  const handlerKBUp = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 37:
        currentAction = EventType.LeftReleased
        break;
      case 39:
        currentAction = EventType.RightReleased
        break;
      case 32:
        currentAction = EventType.AttackReleased
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
        p.position.x + (p.width / 2),
        p.position.y,
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
    const p = m.player
    if (isOverFloor(p)) {
      jumpTries = 2
    }
    switch (a) {
      case EventType.JumpPressed:
        if(jumpTries > 0){
          jumpTries--
          p.velocity.y = -JUMP_VEL
          jumpSound()
        }
        p.shooting = false
        break;
      case EventType.LeftPressed:
        p.dir = Dir.Left
        p.velocity.x = -WALK_SPEED
        p.shooting = false
        break;
      case EventType.RightPressed:
        p.dir = Dir.Right
        p.velocity.x = WALK_SPEED
        p.shooting = false
        break;
      case EventType.LeftReleased:
        p.velocity.x = 0
        break;
      case EventType.RightReleased:
        p.velocity.x = 0
        break;
      case EventType.AttackPressed:
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
            break;
          }
        }

        break;
      case EventType.AttackReleased:
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
      if (e.position.x < 0 || (e.position.x + 20 > width)) {
        e.velocity.x = e.velocity.x * -1
        e.dir = e.velocity.x > 0 ? Dir.Left : Dir.Right
      }
      m.bullets.filter(b => b.visible).forEach(b => {
        if (e.visible && collide(b, e)) {
          hitSound()
          e.hitted = true
          ticksHitted = 8
          e.position.x += (b.velocity.x > 0 ? + 8 : -8)

          if(e.life == 0){
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

    gunReady = Math.max(0, gunReady - 1);
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
        x,
        5,
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
    for (var x = secondFloorBodySeg2.position.x; x <= secondFloorBodySeg2.position.x+secondFloorBodySeg2.width ; x += 20) {
      const text = x % 7 == 0 ? leftFloor : rightFloor
      canvas.img(
        text.text,
        x,
        secondFloorBodySeg2.position.y-10,
        text.width,
        text.height,
        0,
        0,
        1,
        1
      );
      }

    for (var x = secondFloorBody.position.x; x <= secondFloorBody.position.x+secondFloorBody.width ; x += 20) {
    const text = x % 7 == 0 ? leftFloor : rightFloor
    canvas.img(
      text.text,
      x,
      secondFloorBody.position.y-10,
      text.width,
      text.height,
      0,
      0,
      1,
      1
    );
    }
    
    for (var x = 0; x < 300; x += 20) {
      const text = x % 7 == 0 ? leftFloor : rightFloor

      canvas.img(
        text.text,
        x,
        FLOOR-10,
        text.width,
        text.height,
        0,
        0,
        1,
        1
      );

    }
  }

  function isNotOnFloor(b: Body): boolean{
    return b.position.y + b.height < FLOOR
  }

  function applyGravity(b: Body) {
    b.velocity.y = isNotOnFloor(b) && !collideFloorBottom(b,secondFloorBody) ? b.velocity.y + (GRAVITY * currentDelta) : b.velocity.y
  }

  function outsideScreen(b: Bullet) {
    return b.position.x < 0 || b.position.x > width
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
    b.position.y = Math.min(b.position.y + (b.velocity.y * currentDelta), FLOOR - b.height)
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
          b.position.x,
          b.position.y,
          4,
          4,
          0,
          0,
          1,
          1
        );
      }
    }

    canvas.flush();
    fpsM.tick()
  }

  /*  */if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const svgs: any = document.querySelectorAll("svg")
    svgs.forEach(svg => {
      svg.style.display = "block";
    });
  }


  runGame()
})
