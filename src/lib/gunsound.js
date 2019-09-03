function Envelope(context){
    this.node = context.createGain()
    this.node.gain.value = 0
    this.addEventToQueue = function(){
      this.node.gain.linearRampToValueAtTime(0, context.currentTime);
      this.node.gain.linearRampToValueAtTime(1, context.currentTime + 0.001);
      this.node.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.101);
      this.node.gain.linearRampToValueAtTime(0, context.currentTime + 0.500);
    }
  }
  
  function WhiteNoiseBuffer(context){
    var bufferSize = context.sampleRate;
    var buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    var output = buffer.getChannelData(0);
  
    for (var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  
    this.source = context.createBufferSource();
    this.source.buffer = buffer;
    this.source.loop = true
  };
  
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  
  var noise = new WhiteNoiseBuffer(audioCtx)
  var voice1 = new Envelope(audioCtx)
  var voice2 = new Envelope(audioCtx)
  var voice3 = new Envelope(audioCtx)
  var voice4 = new Envelope(audioCtx)
  
  noise.source.connect(voice1.node)
  noise.source.connect(voice2.node)
  noise.source.connect(voice3.node)
  noise.source.connect(voice4.node)
  
  var filter = audioCtx.createBiquadFilter()
  filter.type = "lowpass"
  filter.Q.value = 1
  filter.frequency.value = 800
  voice1.node.connect(filter)
  voice2.node.connect(filter)
  voice3.node.connect(filter)
  voice4.node.connect(filter)
  var gainMaster = audioCtx.createGain()
  gainMaster.gain.value = 5
  filter.connect(gainMaster)
  gainMaster.connect(audioCtx.destination)
  
  var voiceSelect = 0
  var started = false
  
  function fireSound(){
    
   if(!started){
      started = true
      noise.source.start(0)
    }
    
    
       voiceSelect++
        if(voiceSelect > 4){
          voiceSelect = 1
        }
        if (voiceSelect == 1){
          voice1.addEventToQueue()
        }
        if (voiceSelect == 2){
          voice2.addEventToQueue()
        }
        if (voiceSelect == 3){
          voice3.addEventToQueue()
        }
        if (voiceSelect == 4){
          voice4.addEventToQueue()
        }
  }

  window['fireSound'] = fireSound;
  
  