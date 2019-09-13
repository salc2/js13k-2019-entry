function E(c) {
    this.n = c.createGain()
    this.n.gain.value = 0
    this.add = function(){
      this.n.gain.linearRampToValueAtTime(0, c.currentTime);
      this.n.gain.linearRampToValueAtTime(1, c.currentTime + 0.001);
      this.n.gain.linearRampToValueAtTime(0.3, c.currentTime + 0.101);
      this.n.gain.linearRampToValueAtTime(0, c.currentTime + 0.500);
    }
  }
  
  function WNB (c) {
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
  
  
  
  let fs = () => {
    
   if(!std){
      std = true
      n.s.start(0)
    }
    
    
       vs++
        if(vs > 4){
          vs = 1
        }
        if (vs == 1){
          v1.add()
        }
        if (vs == 2){
          v2.add()
        }
        if (vs == 3){
          v3.add()
        }
        if (vs == 4){
          v4.add()
        }
  }

function Setup(t){
  this.o = ctx.createOscillator();
  this.o.type = t
  this.v = ctx.createGain();
  this.o.connect(this.v)
  this.v.connect(ctx.destination)
  this.v.gain.setValueAtTime(0,ctx.currentTime)
  this.std = false
}
const SQ = 'square'

let jsSet = new Setup(SQ)
let js = () => {
  const r = (Math.random() * (3 - 1) + 1)/2
  if(!jsSet.std){
    jsSet.o.start(0)
    jsSet.std = true
  }
  jsSet.o.frequency.setValueAtTime(200*r, ctx.currentTime)
  jsSet.v.gain.setValueAtTime(0.05,ctx.currentTime)
  jsSet.v.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + 0.1);
  jsSet.o.frequency.exponentialRampToValueAtTime(280*r, ctx.currentTime + 0.4);
  jsSet.v.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  jsSet.v.gain.setValueAtTime(0,ctx.currentTime + 0.4)
}

let hs = () => {
  let hsSet = new Setup(SQ)
  hsSet.o.connect(hsSet.v)
  hsSet.v.connect(ctx.destination);
  hsSet.v.gain.setValueAtTime(0,ctx.currentTime)
  hsSet.o.frequency = 880.6;
  hsSet.o.start(0)
  hsSet.v.gain.setValueAtTime(1,ctx.currentTime)
  hsSet.o.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  hsSet.v.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  hsSet.v.gain.setValueAtTime(0,ctx.currentTime + 0.5)
}


let csSet = new Setup(SQ)
let cs = () => {
  if(!csSet.std){
    csSet.o.start(0)
      csSet.std = true
  }
csSet.o.frequency.setValueAtTime(1800, ctx.currentTime)
csSet.v.gain.setValueAtTime(0.005,ctx.currentTime)
csSet.v.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.1);
csSet.o.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.4);
csSet.v.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
csSet.v.gain.setValueAtTime(0,ctx.currentTime + 0.4)
}

window['fs'] = fs;
window['js'] = js;
window['hs'] = hs;
window['cs'] = cs;





  
  