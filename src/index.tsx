import { Subscriber, create } from './sub';
import { Cmd, emptyCmd, create as createCmd } from './cmd';
import { runGame, Update } from './game.runner';
import './lib/tiny-canvas.js';
declare var TC: any;
declare var TCTex: any;


let currentDelta = 0.0
let currentTime = 0.0
const GRAVITY = 13
const JUMP_VEL = -300
const WALK_SPEED = 8.5


function textureFromPixelArray(gl, dataArray, type, width, height) {
  var dataTypedArray = new Uint8Array(dataArray); // Don't need to do this if the data is already in a typed array
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.UNSIGNED_BYTE, dataTypedArray);
  // Other texture setup here, like filter modes and mipmap generation
  return texture;
}


var canvas = TC(document.getElementById('c'))

var tex = null

const img = new Image
img.src = "soldier_idle.png"
img.onload = () => {
  tex = TCTex(canvas.g, img, img.width, img.height)
}

// Create a scene

// Set background color
interface Vector {
  x: number
  y: number
}
interface Player {
  position: Vector
  velocity: Vector
}

enum EventType {
  Time,
  RightPressed,
  LeftReleased,
  RightReleased,
  LeftPressed,
  JumpPressed,
  UsePressed,
  AttackPressed,
  AttackReleased
}

interface Event {
  kind: EventType
}


export type Action = Event

export type Model = Player;


const initState: Model = {
  position: { x: 0.0, y: 0.0 },
  velocity: { x: 0.0, y: 0.0 }
}


const clockSub = create('c1', (consumer: Subscriber<Action>) => {
  let id = 0;
  let startTime = 0;
  const keepAnimation = (time: number) => {
    currentDelta = (time - startTime) / 100;
    currentTime = time
    consumer({ kind: EventType.Time });
    startTime = time;
    id = requestAnimationFrame(keepAnimation);
  };
  id = requestAnimationFrame(keepAnimation);
  return () => cancelAnimationFrame(id);
});

const touchsSub = create('t1', (consumer: Subscriber<Action>) => {
  const handlerStart = (ev: TouchEvent) => {
    switch (ev.currentTarget['id']) {
      case "a":
        consumer({ kind: EventType.JumpPressed })
        break;
      case "b":
        consumer({ kind: EventType.AttackPressed })
        break;
      case "left":
        consumer({ kind: EventType.LeftPressed })
        break;
      case "right":
        consumer({ kind: EventType.RightPressed })
        break;

      default:
        // code...
        break;
    }
  }
  const handlerEnd = (ev: TouchEvent) => {
    switch (ev.currentTarget['id']) {
      case "b":
        consumer({ kind: EventType.AttackReleased })
        break;
      case "left":
        consumer({ kind: EventType.LeftReleased })
        break;
      case "right":
        consumer({ kind: EventType.RightReleased })
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

  return () => {
    svgs.forEach(rec => {
      rec.removeEventListener("touchstart", handlerStart, psOp);
      rec.removeEventListener("touchend", handlerEnd, psOp);
    })
  }
});



const pressKeySub = create('p1', (consumer: Subscriber<Action>) => {
  const handler = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 37:
        consumer({ kind: EventType.LeftPressed })
        break;
      case 39:
        consumer({ kind: EventType.RightPressed })
        break;
      case 38:
        consumer({ kind: EventType.JumpPressed })
        break;
      case 13:
        consumer({ kind: EventType.UsePressed })
        break;
      case 32:
        consumer({ kind: EventType.AttackPressed })
        break;
      default:
        break;
    }
  };
  window.addEventListener('keydown', handler, true);
  return () => window.removeEventListener('keydown', handler, true);
});

const releaseKeySub = create('r1', (consumer: Subscriber<Action>) => {
  const handler = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 37:
        consumer({ kind: EventType.LeftReleased })
        break;
      case 39:
        consumer({ kind: EventType.RightReleased })
        break;
      case 32:
        consumer({ kind: EventType.AttackReleased })
        break;
      default:
        break;
    }
  };
  window.addEventListener('keyup', handler, true);
  return () => window.removeEventListener('keyup', handler, true);
});

function doNothing(m: Model): [Model, Cmd<Action>] {
  return [m, emptyCmd<Action>()];
}
export const update: Update<Action, Model> = (a: Action, m: Model) => {
  switch (a.kind) {
    case EventType.Time:
      return [move(applyGravity(m)), emptyCmd<Action>()]
    case EventType.JumpPressed:
      console.log("JumpPressed")
      return [move(jump(m)), emptyCmd<Action>()]
    case EventType.LeftPressed:
      return [move(walk(m, -WALK_SPEED)), emptyCmd<Action>()]
    case EventType.RightPressed:
      console.log(m.velocity.x)
      return [move(walk(m, WALK_SPEED)), emptyCmd<Action>()]
    case EventType.LeftReleased:
      return [move(walk(m, 0)), emptyCmd<Action>()]
    case EventType.RightReleased:
      return [move(walk(m, 0)), emptyCmd<Action>()]
    case EventType.UsePressed:
      return doNothing(m)
    case EventType.AttackReleased:
      return doNothing(m)
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

function move(model: Model): Model {
  const { position, velocity } = model
  return { position: { x: position.x + velocity.x, y: position.y + velocity.y }, velocity }
}

function jump(model: Model): Model {
  const { position, velocity } = model
  if (position.y >= 192 - 80) {
    velocity.y = currentDelta * JUMP_VEL
  }
  return { position: position, velocity: velocity }
}

function walk(model: Model, vel: number): Model {
  const { position, velocity } = model
  velocity.x = currentDelta * vel
  return { position: position, velocity: velocity }
}

function applyGravity(model: Model): Model {
  const { position, velocity } = model
  if (position.y < 192 - 80) {
    velocity.y = currentDelta * GRAVITY
  } else {
    velocity.y = 0
  }
  return { position: position, velocity: velocity }
}

export const render = (onEvent: (a: Action) => void) => (m: Model) => {
  canvas.cls()
  canvas.bkg(0.2, 0.2, 0.2)
  renderFloor()


  canvas.img(
    tex,
    m.position.x,
    m.position.y,
    img.width,
    img.height,
    0,
    0,
    1,
    .5
  );
  canvas.flush();
}


export const subs = (m: Model) => {
  const zero: Action = { kind: EventType.Time };
  return [clockSub, pressKeySub, releaseKeySub, touchsSub];
}

export const initStateCmd: [Model, Cmd<Action>] = [initState, createCmd(() => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const svgs: any = document.querySelectorAll("svg")
    svgs.forEach(svg => {
      svg.style.display = "block";
    });
  }

}, null)]

runGame(update, render, subs, initStateCmd);  
