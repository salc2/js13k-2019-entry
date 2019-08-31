import './lib/tiny-canvas.js';
import { resolve } from 'url';
import { rejects } from 'assert';
declare var TC: any;
declare var TCTex: any;

interface Vector {
  x: number
  y: number
}

interface Body {
  position: Vector
  velocity: Vector
  dir: Dir
}
interface Player extends Body {
  shooting: boolean
}
interface Enemy extends Body {
}

interface State {
  player: Player
  enemies: Enemy[]
}

interface BodyTexture {
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

function loadTextures(urls: string[]): Promise<BodyTexture[]> {
  return new Promise((resolver, rejects) => {
    let result: BodyTexture[] = new Array<BodyTexture>();

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
        const i = index * 2
        result[i] = tex1
        result[i + 1] = tex2

        if (index == urls.length - 1) {
          setTimeout(() => {
            resolver(result)
          }, 400)
        }
      }
    })
  })
}

loadTextures(["soldier_run.png", "soldier_idle.png", "soldier_shooting.png", "bot.png"]).then((textures) => {
  const [rightRun, leftRun, rightIdle, leftIdle, rightShoot, leftShoot, rightBot, leftBot] = textures

  let currentDelta = 0.0
  let currentTime = 0.0
  let currentAction: Action = null
  const GRAVITY = 10

  const JUMP_VEL = 30
  const WALK_SPEED = 6
  let startTime = 0;
  let id = 0;
  const [width, height] = [canvas.g.canvas.width, canvas.g.canvas.height]

  function textureFromPixelArray(gl, dataArray, type, width, height) {
    var dataTypedArray = new Uint8Array(dataArray); // Don't need to do this if the data is already in a typed array
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.UNSIGNED_BYTE, dataTypedArray);
    // Other texture setup here, like filter modes and mipmap generation
    return texture;
  }

  let currentState: Model = {
    player: {
      position: { x: 128, y: 0.0 },
      velocity: { x: 0.0, y: 0.0 },
      dir: Dir.Right,
      shooting: false
    },
    enemies: [
      {
        position: { x: 128, y: 0.0 },
        velocity: { x: WALK_SPEED, y: 0.0 },
        dir: Dir.Left,
      }
    ]
  }
  window["state"] = currentState

  const keepAnimation = (time: number) => {
    currentDelta = (time - startTime) / 100;
    currentTime = time
    startTime = time;

    update(currentAction, currentState)
    render(currentState)
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


  /*   svgs.forEach(rec => {
      rec.removeEventListener("touchstart", handlerStart, psOp);
      rec.removeEventListener("touchend", handlerEnd, psOp);
    }) */

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
    rightT: BodyTexture,
    leftT: BodyTexture,
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
        p.position.x + (10),
        p.position.y + (10),
        20,
        30,
        v0,
        u0,
        v1,
        u1
      );
    }

  }

  const botAnim = new BodyAnimation(rightBot, leftBot, 5, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]])
  const idleAnim = new BodyAnimation(rightIdle, leftIdle, 20, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]])
  const runAnim = new BodyAnimation(rightRun, leftRun, 8, true, [[0, 0, 1, 0.2], [0, .2, 1, 0.4], [0, .4, 1, 0.6], [0, .6, 1, 0.8], [0, .8, 1, 1.0]])
  const ShootingAnim = new BodyAnimation(rightShoot, leftShoot, 3, false, [[0, 0, 1, 0.25], [0, .25, 1, 0.5], [0, .5, 1, 0.75], [0, .75, 1, 1.0]])

  function update(a: Action, m: Model) {
    const p = m.player
    switch (a) {
      case EventType.JumpPressed:
        if (p.position.y == FLOOR) {
          p.velocity.y = -JUMP_VEL
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
        //  p.velocity.x = 0
        break;
      case EventType.RightReleased:
        //  p.velocity.x = 0
        break;
      case EventType.AttackPressed:

        ShootingAnim.reset()
        p.shooting = true
        p.velocity.x = (p.dir == Dir.Left ? 1.5 : -1.5)

        break;
      case EventType.AttackReleased:
        p.velocity.x = 0
        p.shooting = false
        ShootingAnim.reset()
        break;
      default:
        break;
    }
    move(m.player)
    for (var i = 0; i < m.enemies.length; i++) {
      const e = m.enemies[i]
      if (e.position.x < 0 || (e.position.x + 20 > width)) {
        e.velocity.x = e.velocity.x * -1
        e.dir = e.velocity.x > 0 ? Dir.Left : Dir.Right
      }
      move(e)
    }

  }

  //canvas.scale(4, 4)
  let texData = []
  for (var i = 0; i < 20 * 20 * 3; i++) {
    texData[i] = 0.5
  }

  const floorTex = textureFromPixelArray(canvas.g, texData, canvas.g.RGB, 20, 20);
  function renderFloor() {
    for (var y = 0; y < 256; y += 20) {
      canvas.img(
        floorTex,
        y,
        192 - 40,
        20,
        20,
        0,
        0,
        1,
        1
      );
    }
  }

  function applyGravity(b: Body) {
    b.velocity.y = b.position.y < FLOOR ? b.velocity.y + (GRAVITY * currentDelta) : b.velocity.y
  }

  const FLOOR = 192 - 80
  function move(b: Body): void {
    applyGravity(b)
    b.position.x += b.velocity.x * currentDelta
    b.position.y = Math.min(b.position.y + (b.velocity.y * currentDelta), FLOOR)
  }

  const render = (m: Model) => {
    const p = m.player
    canvas.cls()
    canvas.bkg(0.2, 0.2, 0.2)
    renderFloor()

    if (p.shooting) {
      ShootingAnim.update(p)
    } else if (p.velocity.x == 0) {
      idleAnim.update(p)
    } else {
      runAnim.update(p)
    }

    for (var i = 0; i < m.enemies.length; i++) {
      const e = m.enemies[i]
      botAnim.update(e)
    }


    canvas.flush();
  }

  /*  */if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const svgs: any = document.querySelectorAll("svg")
    svgs.forEach(svg => {
      svg.style.display = "block";
    });
    /*  */
  }


  runGame()
})
