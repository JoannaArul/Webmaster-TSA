import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

const SOUNDS = [
  { id: "silent", label: "Silent" },
  { id: "rain",   label: "Rain"   },
  { id: "forest", label: "Forest" },
  { id: "lofi",   label: "Lo-Fi"  },
];

function makeBrownNoise(ctx, seconds = 4) {
  const rate   = ctx.sampleRate;
  const length = rate * seconds;
  const buffer = ctx.createBuffer(1, length, rate);
  const data   = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  return buffer;
}

function createLoopingBrownNoise(ctx, gainValue, lpFreq, lpQ = 0.8) {
  const buf    = makeBrownNoise(ctx);
  const source = ctx.createBufferSource();
  source.buffer = buf;
  source.loop   = true;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass"; lp.frequency.value = lpFreq; lp.Q.value = lpQ;

  const gain = ctx.createGain(); gain.gain.value = gainValue;
  source.connect(lp); lp.connect(gain); gain.connect(ctx.destination);
  source.start();
  return [source, lp, gain];
}

function useAudio() {
  const ctxRef   = useRef(null);
  const nodesRef = useRef([]);

  const stop = useCallback(() => {
    nodesRef.current.forEach((n) => {
      try { if (n.stop) n.stop(); n.disconnect(); } catch {}
    });
    nodesRef.current = [];
  }, []);

  const start = useCallback(
    (soundType) => {
      stop();
      if (soundType === "silent") return;
      if (!ctxRef.current || ctxRef.current.state === "closed") {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      let nodes = [];

      if (soundType === "rain") {
        const layer1 = createLoopingBrownNoise(ctx, 0.55, 280, 0.6);
        const layer2 = createLoopingBrownNoise(ctx, 0.18, 900, 0.4);
        const layer3 = createLoopingBrownNoise(ctx, 0.06, 2200, 0.3);
        const master = ctx.createGain(); master.gain.value = 0.38;
        layer1[2].disconnect(); layer1[2].connect(master);
        layer2[2].disconnect(); layer2[2].connect(master);
        layer3[2].disconnect(); layer3[2].connect(master);
        master.connect(ctx.destination);
        nodes = [...layer1, ...layer2, ...layer3, master];

      } else if (soundType === "forest") {
        const wind    = createLoopingBrownNoise(ctx, 0.3, 350, 0.5);
        const shimmer = createLoopingBrownNoise(ctx, 0.06, 1800, 2.5);
        const rustle  = createLoopingBrownNoise(ctx, 0.09, 700, 1.0);
        const lfo     = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = "sine"; lfo.frequency.value = 0.07;
        lfoGain.gain.value = 0.12;
        lfo.connect(lfoGain); lfoGain.connect(wind[2].gain);
        lfo.start();
        const master = ctx.createGain(); master.gain.value = 0.42;
        wind[2].disconnect();    wind[2].connect(master);
        shimmer[2].disconnect(); shimmer[2].connect(master);
        rustle[2].disconnect();  rustle[2].connect(master);
        master.connect(ctx.destination);
        nodes = [...wind, ...shimmer, ...rustle, lfo, lfoGain, master];

      } else if (soundType === "lofi") {
        const freqs = [130.81, 155.56, 196.0, 233.08, 261.63];
        const master = ctx.createGain(); master.gain.value = 0.18;
        master.connect(ctx.destination);
        const crackle = createLoopingBrownNoise(ctx, 0.04, 3500, 0.5);
        crackle[2].disconnect(); crackle[2].connect(master);
        freqs.forEach((freq, i) => {
          const osc  = ctx.createOscillator();
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.028, ctx.currentTime + 1.5 + i * 0.3);
          osc.type = "sine"; osc.frequency.value = freq;
          osc.connect(gain); gain.connect(master); osc.start();
          nodes.push(osc, gain);
        });
        nodes = [...nodes, ...crackle, master];
      }

      nodesRef.current = nodes;
    },
    [stop]
  );

  useEffect(() => () => stop(), [stop]);
  return { start, stop };
}

export default function FocusSpace() {
  const [phase,    setPhase]    = useState("focus");
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [running,  setRunning]  = useState(false);
  const [sound,    setSound]    = useState("silent");

  const TOTAL = phase === "break" ? BREAK_TIME : FOCUS_TIME;

  const { start: startAudio, stop: stopAudio } = useAudio();
  const intervalRef = useRef(null);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setPhase("focus");
    setTimeLeft(FOCUS_TIME);
    stopAudio();
  }, [stopAudio]);

  const toggle = useCallback(() => {
    if (phase === "done") { reset(); return; }
    setRunning((r) => {
      if (r) { clearInterval(intervalRef.current); stopAudio(); }
      else   { startAudio(sound); }
      return !r;
    });
  }, [phase, reset, sound, startAudio, stopAudio]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          stopAudio();
          setPhase((p) => {
            if (p === "focus") {
              setTimeLeft(BREAK_TIME);
              return "break";
            }
            setTimeLeft(0);
            return "done";
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, stopAudio]);

  const R        = 88;
  const CIRC     = 2 * Math.PI * R;
  const progress = 1 - timeLeft / TOTAL;
  const dash     = CIRC * progress;
  const gap      = CIRC - dash;

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  const done      = phase === "done";
  const isBreak   = phase === "break";
  const isStarted = timeLeft < TOTAL && !done;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Merriweather:wght@700;900&display=swap');

        .fs-root {
          min-height: calc(100vh - var(--header-h, 64px));
          background: #F5FCEF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          padding: 40px 16px;
          position: relative;
          overflow: hidden;
        }

        .fs-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .fs-blob-1 {
          width: min(480px, 80vw);
          height: min(480px, 80vw);
          background: #4B9CD3;
          opacity: 0.18;
          top: -130px;
          left: -100px;
        }
        .fs-blob-2 {
          width: min(320px, 60vw);
          height: min(320px, 60vw);
          background: #4B9CD3;
          opacity: 0.12;
          bottom: -80px;
          right: -60px;
        }

        .fs-card {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(75, 156, 211, 0.2);
          border-radius: 28px;
          padding: clamp(32px, 6vw, 56px) clamp(28px, 7vw, 64px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(20px, 3.5vw, 32px);
          box-shadow:
            0 8px 48px rgba(75, 156, 211, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.05);
          width: min(460px, 90vw);
        }

        .fs-title {
          font-family: 'Merriweather', serif;
          font-size: clamp(1.55rem, 4.5vw, 2rem);
          font-weight: 900;
          color: #494A48;
          letter-spacing: -0.4px;
          text-align: center;
          line-height: 1.15;
        }
        .fs-title span { color: #4B9CD3; }

        .fs-ring-wrap {
          position: relative;
          width: clamp(170px, 44vw, 220px);
          height: clamp(170px, 44vw, 220px);
          flex-shrink: 0;
        }
        .fs-ring-wrap svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .fs-ring-bg       { fill: none; stroke: #e4f1f9; stroke-width: 9; }
        .fs-ring-progress {
          fill: none;
          stroke: #4B9CD3;
          stroke-width: 9;
          stroke-linecap: round;
          transition: stroke-dasharray 0.85s cubic-bezier(.4, 0, .2, 1);
        }
        .fs-ring-break .fs-ring-progress { stroke: #6dbf97; }
        .fs-ring-done  .fs-ring-progress { stroke: #6dbf97; }

        .fs-time-label {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }
        .fs-time {
          font-family: 'Merriweather', serif;
          font-size: clamp(2.2rem, 9vw, 3rem);
          font-weight: 700;
          color: #000;
          letter-spacing: 3px;
          line-height: 1;
        }
        .fs-time-sub {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.62rem, 1.8vw, 0.72rem);
          font-weight: 600;
          color: #494A48;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.65;
          margin-top: 2px;
        }

        .fs-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #4B9CD3;
          margin-top: 5px;
          animation: fsDot 1.5s ease-in-out infinite;
        }
        @keyframes fsDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(0.6); }
        }

        .fs-sound-row {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .fs-pill {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.72rem, 2vw, 0.8rem);
          font-weight: 500;
          padding: 6px 16px;
          border-radius: 999px;
          border: 1.5px solid #cde4f0;
          background: transparent;
          color: #494A48;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .fs-pill:hover  { border-color: #4B9CD3; color: #4B9CD3; }
        .fs-pill.active { background: #4B9CD3; border-color: #4B9CD3; color: #fff; }

        .fs-btn-primary {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.88rem, 2.5vw, 0.95rem);
          font-weight: 600;
          padding: clamp(12px, 2.5vw, 15px) clamp(28px, 7vw, 40px);
          border-radius: 999px;
          border: none;
          background: #4B9CD3;
          color: #fff;
          cursor: pointer;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 20px rgba(75, 156, 211, 0.3);
          transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .fs-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(75, 156, 211, 0.38);
          background: #3a8bc2;
        }
        .fs-btn-primary:active { transform: translateY(0); }
        .fs-btn-primary.paused    { background: #494A48; box-shadow: 0 4px 18px rgba(73,74,72,0.2); }
        .fs-btn-primary.paused:hover { background: #333; }
        .fs-btn-primary.celebrate { background: #6dbf97; box-shadow: 0 4px 18px rgba(109,191,151,0.32); }
        .fs-btn-primary.breakmode { background: #6dbf97; box-shadow: 0 4px 18px rgba(109,191,151,0.32); }
        .fs-btn-primary.breakmode:hover { background: #59ae85; }

        .fs-btn-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; justify-content: center; }

        .fs-btn-reset {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.78rem, 2vw, 0.84rem);
          font-weight: 500;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1.5px solid #cde4f0;
          background: transparent;
          color: #494A48;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .fs-btn-reset:hover { border-color: #4B9CD3; color: #4B9CD3; }

        .fs-done {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.8rem, 2.2vw, 0.88rem);
          color: #494A48;
          opacity: 0.7;
          text-align: center;
        }

        .fs-hint {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 1.8vw, 0.76rem);
          color: #494A48;
          opacity: 0.45;
          text-align: center;
          letter-spacing: 0.01em;
        }

        @media (max-width: 480px) {
          .fs-card {
            border-radius: 20px;
          }
          .fs-btn-primary {
            width: 100%;
            justify-content: center;
          }
          .fs-btn-row {
            width: 100%;
            flex-direction: column;
          }
          .fs-btn-reset {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <main className="fs-root">
        <div className="fs-blob fs-blob-1" />
        <div className="fs-blob fs-blob-2" />

        <motion.div
          className="fs-card"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          <h1 className="fs-title">Focus <span>Space</span></h1>

          <div className={`fs-ring-wrap${done ? " fs-ring-done" : isBreak ? " fs-ring-break" : ""}`}>
            <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
              <circle className="fs-ring-bg" cx="110" cy="110" r={R} />
              <circle
                className="fs-ring-progress"
                cx="110" cy="110" r={R}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset="0"
              />
            </svg>
            <div className="fs-time-label">
              <div className="fs-time">{mins}:{secs}</div>
              <div className="fs-time-sub">
                {done
                  ? "all done!"
                  : isBreak
                  ? running ? "on break" : "break paused"
                  : running ? "focusing" : isStarted ? "paused" : "ready"}
              </div>
              {running && <div className="fs-dot" />}
            </div>
          </div>

          <div className="fs-sound-row">
            {SOUNDS.map((s) => (
              <button
                key={s.id}
                className={`fs-pill${sound === s.id ? " active" : ""}`}
                onClick={() => {
                  setSound(s.id);
                  if (running) startAudio(s.id);
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="fs-btn-row">
            <button
              className={`fs-btn-primary${
                done      ? " celebrate"
                : isBreak  ? " breakmode"
                : running  ? " paused"
                : ""
              }`}
              onClick={toggle}
            >
              {done
                ? "🎉 Start Again"
                : isBreak
                ? running ? "Pause Break" : isStarted ? "Resume Break" : "Start Break"
                : running ? "Pause"
                : isStarted ? "Resume"
                : "Focus for 25 min"}
            </button>
            {(running || (isStarted && !done)) && (
              <button className="fs-btn-reset" onClick={reset}>Reset</button>
            )}
          </div>

          {done
            ? <p className="fs-done">Full session complete. You crushed it!</p>
            : isBreak
            ? <p className="fs-done" style={{color:"#59ae85", opacity:0.85}}>Focus complete! Enjoy your 5-min break</p>
            : <p className="fs-hint">Minimize distractions. You've got this.</p>
          }
        </motion.div>
      </main>
    </>
  );
}
