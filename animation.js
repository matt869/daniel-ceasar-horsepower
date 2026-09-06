(() => {
  const root=document.getElementById('baby-please-visual');
  const q=selector=>root.querySelector(selector);
  const audio=q('.bp-audio'),surface=q('.bp-surface-toggle'),status=q('.bp-audio-status');
  const photo=q('.bp-photo'),echo=q('.bp-photo-echo'),phrase=q('.bp-phrase');
  const shadow=q('.bp-lyric-shadow'),light=q('.bp-light'),orbit=q('.bp-orbit');
  // The entire music section is copied from the supplied video. The TikTok
  // outro is removed. No filters, speed changes, repeats, or audio censorship
  // are applied. Only the displayed text in CUES contains a masked word.
  // Audio playback time is the single clock for lyrics and all motion.
  const CONFIG={"duration":19.340997732426302,"audioName":"horsepower-full.m4a","audioMime":"audio/mp4","audioUnchanged":true,"envelopeStep":0.04,"envelope":[0.321,0.306,0.359,0.272,0.322,1.0,1.0,0.895,0.939,0.886,0.782,0.7,0.617,0.602,0.509,0.62,0.402,0.33,0.348,0.369,0.548,0.559,0.536,0.58,0.528,0.487,0.502,0.477,0.546,0.511,0.416,0.348,0.282,0.279,0.517,0.316,0.255,0.231,0.215,0.193,0.188,0.242,0.531,0.469,0.433,0.487,0.424,0.365,0.803,1.0,0.412,0.34,0.349,0.292,0.212,0.189,0.597,0.442,0.438,0.376,0.353,0.309,0.229,1.0,1.0,0.714,0.71,0.667,0.646,0.622,0.991,1.0,0.833,0.775,0.76,0.836,0.9,0.778,0.836,0.845,0.845,0.769,0.694,0.497,0.465,0.519,0.633,0.609,0.576,0.448,0.441,0.496,0.49,0.616,0.555,0.554,0.513,0.585,0.51,0.424,0.388,0.54,0.485,0.44,0.449,0.353,0.823,0.794,0.72,0.788,0.77,0.622,0.615,0.579,0.653,0.767,0.622,0.582,0.343,0.1,0.599,1.0,0.726,0.679,0.83,0.769,0.713,0.663,0.632,0.616,0.528,0.57,0.635,0.562,0.559,0.536,0.489,0.559,0.531,0.495,0.469,0.499,0.531,0.552,0.492,0.501,0.385,0.452,0.418,0.589,0.472,0.39,0.479,0.429,0.374,0.388,0.386,0.387,0.284,0.219,0.233,0.188,0.183,0.175,1.0,0.999,0.8,0.727,0.668,0.67,0.656,0.491,0.341,0.402,0.392,0.38,0.359,0.253,0.811,1.0,0.408,0.358,0.336,0.328,0.28,0.36,0.601,0.703,0.639,0.633,0.681,0.711,0.724,0.377,0.339,0.353,0.491,0.472,0.395,0.402,1.0,0.779,0.432,0.6,0.556,0.526,0.476,0.609,0.434,0.45,0.563,0.542,0.565,0.518,0.494,0.497,0.367,0.495,0.479,0.295,0.206,0.966,1.0,0.629,0.657,0.757,0.595,0.596,0.605,0.766,0.613,0.536,0.638,0.526,0.411,0.291,1.0,0.849,0.648,0.782,0.704,0.721,0.732,0.673,0.634,0.367,0.361,0.324,0.335,0.322,0.374,0.369,0.37,0.331,0.402,0.464,0.497,0.502,0.42,0.528,0.485,0.447,0.385,0.385,0.384,0.509,0.322,0.317,0.291,0.281,0.266,0.25,0.339,0.406,0.403,0.41,0.434,0.427,0.355,1.0,1.0,0.572,0.512,0.47,0.465,0.326,0.437,0.633,0.508,0.493,0.439,0.424,0.391,0.402,1.0,0.88,0.824,0.951,0.952,0.901,0.91,0.929,0.827,0.74,0.592,0.594,0.574,0.64,0.714,0.665,0.648,0.667,0.625,0.686,0.662,0.66,0.597,0.596,0.562,0.496,0.437,0.371,0.4,0.527,0.663,0.69,0.655,0.524,0.575,0.517,0.458,0.436,0.393,0.325,0.353,0.319,0.287,0.511,0.389,0.349,0.25,0.23,0.2,0.201,0.447,0.64,0.486,0.519,0.444,0.471,0.439,0.787,1.0,0.699,0.757,0.731,0.748,0.746,0.682,0.716,0.692,0.681,0.576,0.518,0.539,0.522,0.46,0.457,0.462,0.478,0.438,0.422,0.406,0.416,0.362,0.436,0.408,0.391,0.435,0.382,0.481,0.452,0.354,0.364,0.346,0.37,0.348,0.329,0.295,0.252,0.247,0.248,0.237,0.198,0.373,1.0,0.637,0.471,0.399,0.354,0.401,0.379,0.378,0.362,0.34,0.504,0.428,0.145,0.14,0.731,0.822,0.303,0.473,0.434,0.423,0.388,0.407,0.416,0.364,0.201,0.217,0.222,0.211,0.362,0.344,0.323,0.265,0.233,0.318,0.32,0.315,0.702,0.389,0.335,0.33,0.297,0.285,0.259,0.592,0.375,0.213,0.203,0.192,0.201,0.204,0.194,0.138,0.172,0.135,0.069,0.067,0.031,0.163,0.209,0.168,0.152,0.131,0.136,0.114,0.124,0.15,0.085,0.033,0.047,0.04,0.026,0.07,0.04,0.04,0.037,0.04,0.031,0.034,0.027,0.027,0.022,0.019,0.016,0.014,0.009,0.005,0.002,0.0,1.0],"cues":[{"start":0,"end":2.8,"words":["Baby","please,"],"wordTimes":[0.04,0.56],"opening":true},{"start":2.8,"end":4.18,"words":["why","won't","these","n****s"],"wordTimes":[2.8,3.02,3.4,3.64],"opening":false},{"start":4.18,"end":7.62,"words":["just","stop","playing","with","me?"],"wordTimes":[4.18,4.54,4.78,5.22,5.44],"opening":false},{"start":7.62,"end":8.74,"words":["I","display","greatness"],"wordTimes":[7.62,7.84,8.22],"opening":false},{"start":8.74,"end":11.5,"words":["for","the","world","to","see."],"wordTimes":[8.74,9.2,9.38,9.8,10.02],"opening":false},{"start":11.5,"end":12.88,"words":["It","starts","with","me,"],"wordTimes":[11.5,11.76,12.14,12.44],"opening":false},{"start":12.88,"end":16.26,"words":["and","it","ends","with","me."],"wordTimes":[12.88,13.94,14.1,14.46,14.7],"opening":false},{"start":16.26,"end":19.340997732426302,"words":["Eventually."],"wordTimes":[16.26],"opening":true}],"outroRemoved":true};
  const cues=CONFIG.cues;
  const wordOnsets=cues.flatMap(c=>c.wordTimes);
  const motion=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  let duration=CONFIG.duration,active=-1,pending=false,requestId=0,lastGrain=0;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const grainContext=q('.bp-grain').getContext('2d');
  const grain=grainContext?grainContext.createImageData(160,160):null;
  const dust=q('.bp-particles').getContext('2d');
  const particles=Array.from({length:54},(_,i)=>({x:(i*173.3+47)%680,y:(i*217.7+91)%680,r:.45+(i%5)*.28,speed:3.2+(i%7)*1.2,phase:i*1.71}));
  const bars=Array.from({length:23},()=>{const b=document.createElement('i');q('.bp-wave').appendChild(b);return b;});
  echo.style.backgroundImage=`url("${photo.src}")`;
  function controls(){
    const playing=!audio.paused&&!audio.ended;
    surface.setAttribute('aria-label',playing?'Pause music and animation':audio.ended?'Replay music and animation':'Play music and animation');
    surface.setAttribute('aria-busy',String(pending));
  }
  function pause(){requestId++;pending=false;audio.pause();controls();}
  async function play(){
    if(pending||(!audio.paused&&!audio.ended))return;
    if(audio.ended||audio.currentTime>=duration-.025)audio.currentTime=0;
    const ticket=++requestId;pending=true;controls();
    try{await audio.play();if(ticket!==requestId)return;pending=false;status.textContent='Full audio · masked lyrics';}
    catch(error){if(ticket!==requestId)return;pending=false;status.textContent='Tap the image to start the audio.';}
    controls();
  }
  function levelAt(t){
    const index=clamp(t/CONFIG.envelopeStep,0,CONFIG.envelope.length-1);
    const lo=Math.floor(index),hi=Math.min(lo+1,CONFIG.envelope.length-1);
    return CONFIG.envelope[lo]*(1-(index-lo))+CONFIG.envelope[hi]*(index-lo);
  }
  function draw(){
    const t=clamp(audio.currentTime||0,0,duration),level=levelAt(t);
    let index=cues.findIndex(c=>t>=c.start&&t<c.end);
    if(index<0)index=t<cues[0].start?0:cues.length-1;
    const cue=cues[index];
    if(index!==active){
      phrase.replaceChildren(...cue.words.map(word=>{const span=document.createElement('span');span.className='bp-word';span.textContent=word;return span;}));
      phrase.setAttribute('aria-label',cue.words.join(' '));
      phrase.classList.toggle('bp-opening',Boolean(cue.opening));
      shadow.textContent=cue.words.join(' ');shadow.classList.toggle('bp-opening',Boolean(cue.opening));
      active=index;
    }
    const initial=audio.paused&&t<.06;
    [...phrase.children].forEach((span,i)=>{
      const since=t-cue.wordTimes[i];
      const progress=clamp(since/.3,0,1),z=progress-1;
      const reveal=motion?1+2.4*z*z*z+1.4*z*z:1;
      const waiting=since<0&&!initial;
      span.style.opacity=String(initial?1:waiting?.11:motion?.18+.82*clamp(progress*2,0,1):1);
      span.style.transform=motion&&!initial?`translate(${(1-reveal)*(i%2?9:-9)}px,${(1-reveal)*27}px) rotate(${(1-reveal)*(i%2?3:-3)}deg) scale(${.92+.08*reveal})`:'none';
      span.style.filter=motion&&!initial?`blur(${(1-clamp(progress*1.8,0,1))*4}px)`:'none';
      span.style.color=waiting?'#a8bcdf':'#f0f4ff';
      const glow=motion&&since>=0?Math.exp(-since*4)*16:0;
      span.style.textShadow=`0 0 ${glow}px rgba(178,213,255,${glow/32})`;
    });
    let nearest=-20;for(const onset of wordOnsets){if(onset<=t)nearest=onset;else break;}
    const wordPulse=Math.exp(-(t-nearest)*4);
    const phraseProgress=clamp((t-cue.start)/(cue.end-cue.start),0,1);
    if(motion){
      const scale=1.105+.037*Math.sin(t*.27)+level*.008;
      const x=1.65*Math.sin(t*.31),y=1.2*Math.cos(t*.23),angle=.75*Math.sin(t*.22);
      photo.style.transform=`translate(${x}%,${y}%) scale(${scale}) rotate(${angle}deg)`;
      echo.style.transform=`translate(${x+wordPulse*.6}%,${y-.35}%) scale(${scale+.012}) rotate(${angle+.35}deg)`;
      echo.style.opacity=String(.025+wordPulse*.085);
      light.style.transform=`translate(${6*Math.sin(t*.3)}%,${3*Math.cos(t*.23)}%) rotate(${t*2}deg)`;
      light.style.opacity=String(.45+level*.25);
      orbit.style.transform=`translate(${Math.sin(t*.6)*9}px,${Math.cos(t*.8)*8}px) rotate(${t*15}deg) scale(${.9+level*.2})`;
      phrase.style.transform=`translate(${Math.sin(t*.5)*2.5}px,${Math.sin(t*.7)*2}px)`;
      shadow.style.transform=`translate(${10+Math.sin(t*.55)*7}px,${12+wordPulse*5}px)`;
      shadow.style.opacity=String(.06+wordPulse*.06);
      q('.bp-underline').style.transform=`scaleX(${.28+.72*phraseProgress})`;
      q('.bp-edge').style.boxShadow=`inset 0 0 ${10+level*18}px rgba(107,151,255,.09)`;
      q('.bp-scanlines').style.transform=`translateY(${Math.sin(t*.6)*3}px)`;
    }else{
      photo.style.transform='scale(1.08)';echo.style.opacity='0';light.style.transform='none';light.style.opacity='.35';orbit.style.transform='none';phrase.style.transform='none';shadow.style.opacity='0';q('.bp-underline').style.transform='none';q('.bp-edge').style.boxShadow='none';q('.bp-scanlines').style.transform='none';
    }
    if(dust){
      dust.clearRect(0,0,680,680);
      if(motion)for(const p of particles){
        const x=(p.x+Math.sin(t*.23+p.phase)*18+680)%680,y=(p.y-t*p.speed+6800)%680;
        const a=.12+.34*(.5+.5*Math.sin(t*.7+p.phase))+.08*level;
        dust.beginPath();dust.fillStyle=`rgba(173,206,255,${a})`;dust.arc(x,y,p.r*(1+level*.3),0,Math.PI*2);dust.fill();
      }
    }
    bars.forEach((bar,i)=>{const power=motion?levelAt(Math.max(0,t-(Math.abs(i-11)*.023))):.15;bar.style.transform=`scaleY(${.14+power*(.45+.4*Math.abs(Math.sin(i*1.8+t*.3)))})`;});
    q('.bp-grain').style.display=motion?'block':'none';
  }
  surface.addEventListener('click',()=>pending||!audio.paused?pause():play());
  function ready(){if(Number.isFinite(audio.duration)&&audio.duration>0)duration=audio.duration;draw();}
  audio.addEventListener('loadedmetadata',ready);audio.addEventListener('timeupdate',draw);audio.addEventListener('seeked',draw);
  audio.addEventListener('play',controls);audio.addEventListener('pause',controls);
  audio.addEventListener('ended',()=>{pending=false;status.textContent='Full clip finished. Tap the image to replay.';controls();draw();});
  audio.addEventListener('error',()=>{pause();status.textContent='Audio could not load. Open the downloaded animation.';});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  function frame(now){
    if(!root.isConnected){pause();return;}
    if(!audio.paused&&!document.hidden){
      draw();
      if(motion&&grain&&now-lastGrain>140){for(let i=0;i<grain.data.length;i+=4){const n=Math.random()*255;grain.data[i]=n;grain.data[i+1]=n;grain.data[i+2]=n;grain.data[i+3]=Math.random()*75;}grainContext.putImageData(grain,0,0);lastGrain=now;}
    }
    requestAnimationFrame(frame);
  }
  ready();controls();requestAnimationFrame(frame);
})();
