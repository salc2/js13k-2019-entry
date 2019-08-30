import './lib/tiny-canvas.js';
declare var TC: any;
declare var TCTex: any;

interface Vector {
  x: number
  y: number
}
interface Player {
  position: Vector
  velocity: Vector
  jumpTo: number
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
type Model = Player;

let currentDelta = 0.0
let currentTime = 0.0
let currentAction: Action = null
const GRAVITY = 9.8
const JUMP_VEL = 20 * 4
const WALK_SPEED = 8.5
let startTime = 0;
let id = 0;

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

let currentState: Model = {
  position: { x: 128, y: 112.0 },
  velocity: { x: 0.0, y: 0.0 },
  jumpTo: 112.0
}
window["player"] = currentState

const keepAnimation = (time: number) => {
  currentDelta = (time - startTime) / 100;
  currentTime = time
  startTime = time;

  update(currentAction, currentState)
  render(currentState)

  id = requestAnimationFrame(keepAnimation);
};

type Animation = [
  number, //timer
  number, //duration
  number, //start_pos
  number, //end_pos
  number //state 0,1,2
]
function createAnim(d: number, s: number, e: number): Animation {
  return [0, d, s, e, 0]
}

function updateAnim(an: Animation, dt: number): number {
  const easeInQuad = (t: number) => t * t
  const easeOutQuad = (t: number) => t * (2 - t)
  if (an[0] < 1.0) {
    an[0] += dt
  }
  let [tr, d, s, e, st] = an
  const t = easeOutQuad(tr / d)
  const nv = s + (t * (e - s))

  return nv
}


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


svgs.forEach(rec => {
  rec.removeEventListener("touchstart", handlerStart, psOp);
  rec.removeEventListener("touchend", handlerEnd, psOp);
})

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

let anim: Animation = null
function update(a: Action, m: Model) {
  switch (a) {
    case EventType.JumpPressed:
      if (!anim) {
        anim = createAnim(1, m.position.y, m.position.y - (20 * 4))
      }
      break;
    case EventType.LeftPressed:
      m.velocity.x = -WALK_SPEED
      break;
    case EventType.RightPressed:
      m.velocity.x = WALK_SPEED
      break;
    case EventType.LeftReleased:
      m.velocity.x = 0
      break;
    case EventType.RightReleased:
      m.velocity.x = 0
      break;
    default:
      break;
  }
  if (anim) {
    m.position.y = updateAnim(anim, currentDelta)
  }
  move(m)
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


function getFloorForce(m: Model) {
  return m.position.y > 192 - 80 ? GRAVITY * -1 : 0
}

function move(model: Model): void {
  model.position.x += model.velocity.x * currentDelta
  // model.position.y += (model.jumpTo - model.position.y) * .1
  //  model.position.y += (GRAVITY + getFloorForce(model)) * currentDelta
}

const render = (m: Model) => {
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

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  const svgs: any = document.querySelectorAll("svg")
  svgs.forEach(svg => {
    svg.style.display = "block";
  });
}


runGame(); 
