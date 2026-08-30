// High quality Web Audio synthesizer & Audio Engine
// Completely self-contained, no external asset network dependencies
// Automatically unlocks on user interaction to comply with modern browser autoplay policies.

let audioCtx = null;
let isAudioUnlocked = false;

// Initialize or get the shared AudioContext
export const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

// Global unlock listener on first user interaction
const unlockAudio = () => {
  const ctx = getAudioContext();
  if (ctx) {
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        isAudioUnlocked = true;
      }).catch(() => {});
    } else {
      isAudioUnlocked = true;
    }
  }
};

if (typeof window !== 'undefined') {
  ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click'].forEach(evt => {
    window.addEventListener(evt, unlockAudio, { passive: true, once: false });
  });
}

/**
 * Play a custom synthesizer tone with smooth envelopes
 */
export const playTone = ({
  freq = 440,
  type = 'sine',
  duration = 0.15,
  volume = 0.25,
  decay = 0.1,
  rampToFreq = null
} = {}) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    if (rampToFreq) {
      osc.frequency.exponentialRampToValueAtTime(rampToFreq, now + duration);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + decay);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + decay + 0.05);
  } catch (e) {
    console.warn('Audio play error:', e);
  }
};

/**
 * 1. Timer countdown tick sound (Crisp short blip)
 */
export const playTimerTick = () => {
  playTone({ freq: 880, type: 'sine', duration: 0.06, volume: 0.2, decay: 0.04 });
};

/**
 * 2. Timer final warning tick (3, 2, 1)
 */
export const playWarningTick = (count = 1) => {
  const pitch = count === 1 ? 980 : 780;
  playTone({ freq: pitch, type: 'triangle', duration: 0.09, volume: 0.3, decay: 0.05 });
};

/**
 * 3. Timer completed sound (Triumphant multi-tone chord)
 */
export const playTimerComplete = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playTone({
        freq,
        type: 'sine',
        duration: 0.3,
        volume: 0.35,
        decay: 0.2
      });
    }, idx * 110);
  });
};

/**
 * 4. Workout Log / Success sound (Harmonic upbeat chime)
 */
export const playSuccessChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  [587.33, 880, 1174.66].forEach((freq, idx) => {
    setTimeout(() => {
      playTone({
        freq,
        type: 'sine',
        duration: 0.18,
        volume: 0.28,
        decay: 0.15
      });
    }, idx * 80);
  });
};

/**
 * 5. Subtle UI Click
 */
export const playClickBeep = () => {
  playTone({ freq: 1200, type: 'sine', duration: 0.03, volume: 0.12, decay: 0.02 });
};

/**
 * 6. Milestone / Badge celebration chord
 */
export const playCelebrationSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
  arpeggio.forEach((freq, idx) => {
    setTimeout(() => {
      playTone({
        freq,
        type: 'triangle',
        duration: 0.25,
        volume: 0.3,
        decay: 0.25
      });
    }, idx * 70);
  });
};

/**
 * 7. Optional voice narration cue using SpeechSynthesis
 */
export const speakVoiceCue = (text) => {
  try {
    if ('speechSynthesis' in window && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    // Speech synthesis optional fallback
  }
};
