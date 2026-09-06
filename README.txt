HORSEPOWER — CENSORED LYRIC ANIMATION

Open index.html in a current browser and press Play. No installation or
internet connection is needed. Your photo, your video, and the censored audio
are included.

This version plays the whole supplied excerpt rather than repeating one line
three times. Total playback is 19.30 seconds and covers all three lyric lines:

  Baby please, why won't these n****s just stop playing with me?
  I display greatness for the world to see
  It starts with me and it ends with me

The supplied video (v15044gf0000d4qpbtfog65mbft8h460.mov) is now part of the
animation. It is trimmed at 19.30 seconds, just before the TikTok end card and
its loud outro sting, and it is included as horsepower-censored.mp4.

Picture and sound travel in that one file, so they cannot drift apart. The
animation reads the video's currentTime for every frame, so pausing, buffering,
and seeking keep the lyric cues tied to the recording. Play, pause, replay,
mute, and seek all control it.

HOW THE VIDEO IS USED
The source video burns its own lyrics into the picture, including the
uncensored word, and carries a TikTok watermark and a "Follow For More" line.
So the copy included here is blurred hard enough that none of that text can be
read, and it is composited as drifting colour over the upper part of your
photo. You see the video's motion and colour; the crisp lyrics on screen are
the animation's own, censored typography. The blur is baked into the included
mp4, not applied in CSS, so it cannot be switched off to reveal the word.

CENSORING
The word is shown as n****s and muted in the audio itself. The mute window is
3.59–4.43 seconds, with short fades around the cuts to avoid clicks. It is
applied to the included media assets, so selecting Sound on cannot reveal the
original word. Audio then fades out over 18.75–19.30 seconds.

EDITING
index.html               composition and accessible controls
styles.css               colors, typography, layout, and effects
animation.js             timed lyric cues and playback
photo.png                your supplied photo
horsepower-censored.mp4  the censored, blurred, trimmed video with its audio
horsepower-censored.mp3  the same censored audio, no picture (fallback)

In animation.js, CUES contains each phrase and its wordTimes in seconds from
the start of the excerpt. Timings came from local speech alignment of the
recording, then were checked frame by frame against the moment each word
appears in the source video's own burned-in lyrics. That cross-check moved
three phrase openings that speech alignment had placed too early ("why", "It",
and "and"), and confirmed the mute window ends exactly where "just" begins.
Singing makes word boundaries soft; adjust wordTimes for any further creative
timing preferences.

Each cue also has a lead, the dimmed line shown above the active phrase, and
the LINE 01 / 03 counter follows the three lyric lines.

If the video track cannot be decoded, the animation falls back to
horsepower-censored.mp3 on the same 19.30-second timeline and keeps your photo
as a still backdrop. The lyric cues are unchanged either way.

The separate baby-please.html file embeds the image, video, audio, CSS, and
JavaScript in a single portable document. Playback starts only after pressing
Play. Reduced-motion preferences are respected. Background tabs pause playback.
