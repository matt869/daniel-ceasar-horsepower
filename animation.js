(() => {
  const root = document.getElementById('baby-please-visual');
  const q = selector => root.querySelector(selector);
  const photo=q('.bp-photo'), video=q('.bp-video'), phrase=q('.bp-phrase'), kicker=q('.bp-kicker');
  const audioEl=q('.bp-audio'), timeline=q('.bp-timeline'), status=q('.bp-audio-status');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Measured against the user's supplied clip (v15044gf0000d4qpbtfog65mbft8h460.mov).
  // All values are seconds in the included, pre-censored 19.30s excerpt, which is
  // the source clip trimmed just before its TikTok end card. Word times come from
  // local speech alignment, cross-checked frame by frame against the lyrics the
  // source video burns into its own picture. Every frame follows media.currentTime.
  const CUES = [
    {"start":0.0,"end":2.5,"opening":true,"lead":"","words":["Baby","please,"],"wordTimes":[0.04,0.62]},
    {"start":2.5,"end":4.3,"opening":false,"lead":"Baby please,","words":["why","won't","these","n****s"],"wordTimes":[2.5,3.0,3.4,3.64]},
    {"start":4.3,"end":7.16,"opening":false,"lead":"why won't these n****s","words":["just","stop","playing","with","me?"],"wordTimes":[4.3,4.54,4.76,5.2,5.48]},
    {"start":7.16,"end":8.72,"opening":false,"lead":"","words":["I","display","greatness"],"wordTimes":[7.16,7.78,8.18]},
    {"start":8.72,"end":11.4,"opening":false,"lead":"I display greatness","words":["for","the","world","to","see"],"wordTimes":[8.72,9.18,9.38,9.8,10.0]},
    {"start":11.4,"end":13.45,"opening":false,"lead":"","words":["It","starts","with","me"],"wordTimes":[11.4,11.74,12.04,12.46]},
    {"start":13.45,"end":19.3,"opening":false,"lead":"It starts with me","words":["and","it","ends","with","me"],"wordTimes":[13.45,13.96,14.12,14.48,14.7]}
  ];
  const SECTION_STARTS = [0.0,7.16,11.4];
  const EXPECTED_DURATION = 19.3;
  let media=video,duration=EXPECTED_DURATION,active=-1,lastGrain=0,pending=false,requestId=0;
  const wave=q('.bp-wave');
  const bars=Array.from({length:19},()=>{const b=document.createElement('i');wave.appendChild(b);return b;});
  const ctx=q('.bp-grain').getContext('2d');
  const grain=ctx?ctx.createImageData(180,180):null;
  const clock=seconds=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  function updateControls(){
    const playing=!media.paused&&!media.ended;
    q('.bp-toggle-text').textContent=pending?'Starting…':playing?'Pause':'Play';
    q('.bp-play-icon').textContent=playing?'Ⅱ':'▶';
    q('.bp-toggle').setAttribute('aria-label',playing?'Pause music and animation':'Play music and animation');
    q('.bp-toggle').setAttribute('aria-busy',String(pending));
    q('.bp-mute').textContent=media.muted?'Sound off':'Sound on';
    q('.bp-mute').setAttribute('aria-pressed',String(media.muted));
    q('.bp-mute').setAttribute('aria-label',media.muted?'Unmute audio':'Mute audio');
  }
  function pause(){requestId++;pending=false;media.pause();updateControls();}
  async function play(){
    if(pending||(!media.paused&&!media.ended))return;
    if(media.ended||media.currentTime>=duration-.03)media.currentTime=0;
    const ticket=++requestId;pending=true;updateControls();
    try{await media.play();if(ticket!==requestId)return;pending=false;status.textContent='Your clip · censored';}
    catch(error){if(ticket!==requestId)return;pending=false;status.textContent='Tap Play to start playback.';}
    updateControls();
  }
  // The picture and the sound ship in one file, so they cannot drift apart. If the
  // video track will not load, fall back to the identical audio-only excerpt and
  // keep the supplied photo as the still backdrop.
  function useAudioOnly(message){
    if(media===audioEl)return;
    const at=video.currentTime||0,wasPlaying=!video.paused&&!video.ended;
    try{video.pause();}catch(error){}
    root.classList.add('bp-no-video');
    audioEl.preload='auto';audioEl.muted=video.muted;
    media=audioEl;
    const seek=()=>{try{audioEl.currentTime=at;}catch(error){}};
    if(audioEl.readyState>0)seek();else audioEl.addEventListener('loadedmetadata',seek,{once:true});
    status.textContent=message;updateControls();
    if(wasPlaying)play();
  }
  function draw(){
    const t=clamp(media.currentTime||0,0,duration);
    let index=CUES.findIndex(c=>t>=c.start&&t<c.end);
    if(index<0)index=t<CUES[0].start?0:CUES.length-1;
    const cue=CUES[index];
    if(active!==index){
      phrase.replaceChildren(...cue.words.map(word=>{const s=document.createElement('span');s.className='bp-word';s.textContent=word;return s;}));
      phrase.classList.toggle('bp-opening',Boolean(cue.opening));
      kicker.textContent=cue.lead;
      kicker.style.opacity=cue.lead?'.72':'0';active=index;
    }
    const initial=media.paused&&t<.06;
    const children=[...phrase.children];
    children.forEach((s,i)=>{
      const since=t-cue.wordTimes[i];
      const reveal=reduced?1:clamp(since/.11,0,1);
      const eased=1-Math.pow(1-reveal,3);
      s.style.opacity=initial?'1':String(.13+.87*eased);
      s.style.transform=`translateY(${reduced||initial?0:(1-eased)*8}px)`;
      s.style.filter=`blur(${reduced||initial?0:(1-eased)*2}px)`;
      s.style.color=since>=0?'#f0f4ff':'#abb9d7';
    });
    let section=0;SECTION_STARTS.forEach((start,i)=>{if(t>=start)section=i;});
    q('.bp-take').textContent=`LINE ${String(section+1).padStart(2,'0')} / ${String(SECTION_STARTS.length).padStart(2,'0')}`;
    if(!reduced){
      photo.style.transform=`translate(${Math.sin(t*.16)*.8}%,${Math.cos(t*.11)*.55}%) scale(${1.045+Math.sin(t*.13)*.021})`;
      video.style.transform=`translate(${Math.sin(t*.12+1.7)*-1.1}%,${Math.cos(t*.09+.6)*-.8}%) scale(${1.02+Math.cos(t*.1)*.03})`;
      q('.bp-orbit').style.transform=`rotate(${t*3}deg)`;
    }
    bars.forEach((b,i)=>{b.style.transform=`scaleY(${reduced?.3:.18+Math.abs(Math.sin(t*2.1+i*.67)*Math.cos(t*.7+i*.18))*.82})`;});
    timeline.value=String(t);timeline.setAttribute('aria-valuetext',`${clock(t)} of ${clock(duration)}`);
    q('.bp-duration').textContent=`${clock(t)} / ${clock(duration)}`;q('.bp-timecode').textContent=clock(t);
  }
  q('.bp-toggle').addEventListener('click',()=>pending||!media.paused?pause():play());
  q('.bp-replay').addEventListener('click',()=>{media.currentTime=0;draw();play();});
  q('.bp-mute').addEventListener('click',()=>{media.muted=!media.muted;updateControls();});
  timeline.addEventListener('input',()=>{media.currentTime=clamp(Number(timeline.value),0,duration);draw();});
  function ready(element){
    if(element!==media)return;
    if(Number.isFinite(media.duration)&&media.duration>0){duration=media.duration;timeline.max=String(duration);}
    draw();
  }
  function bind(element){
    element.addEventListener('loadedmetadata',()=>ready(element));
    element.addEventListener('timeupdate',()=>{if(element===media)draw();});
    element.addEventListener('seeked',()=>{if(element===media)draw();});
    element.addEventListener('play',()=>{if(element===media)updateControls();});
    element.addEventListener('pause',()=>{if(element===media)updateControls();});
    element.addEventListener('ended',()=>{if(element!==media)return;pending=false;status.textContent='Finished · Replay';updateControls();draw();});
  }
  bind(video);bind(audioEl);
  video.addEventListener('error',()=>useAudioOnly('Video unavailable · playing the audio only'));
  audioEl.addEventListener('error',()=>{if(media===audioEl){pause();status.textContent='Audio could not load. Open the downloaded animation.';}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  function frame(now){
    if(!root.isConnected){pause();return;}
    if(!media.paused&&!document.hidden){
      draw();
      if(grain&&!reduced&&now-lastGrain>160){for(let i=0;i<grain.data.length;i+=4){const n=Math.random()*255;grain.data[i]=n;grain.data[i+1]=n;grain.data[i+2]=n;grain.data[i+3]=Math.random()*80;}ctx.putImageData(grain,0,0);lastGrain=now;}
    }
    requestAnimationFrame(frame);
  }
  timeline.max=String(duration);ready(media);updateControls();requestAnimationFrame(frame);
})();
