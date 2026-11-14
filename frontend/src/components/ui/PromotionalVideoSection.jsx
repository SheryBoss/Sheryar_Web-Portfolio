import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Film, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * PromotionalVideoSection - Dedicated In-Page Showcase for the 30-60s Promotional Reel
 * Uses standard H.264 MP4 with progressive download (+faststart)
 */
export default function PromotionalVideoSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(40);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setVideoError(null);
        })
        .catch((err) => {
          console.warn('Video playback notice:', err);
          setIsPlaying(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTo;
      setCurrentTime(seekTo);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="promotional-video" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-violet/10 border border-cyber-violet/30 text-cyber-violet text-xs font-mono font-semibold">
          <Film className="w-3.5 h-3.5" />
          <span>MODULE 3 // AFTER EFFECTS MOTION REEL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-gaming font-bold uppercase tracking-tight text-white">
          PROMOTIONAL <span className="text-cyber-cyan glow-text-cyan">VIDEO</span>
        </h2>
        <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
          40-second promotional motion graphics trailer encoded in standard H.264 (yuv420p) progressive format. Click anywhere on the player to start playback.
        </p>
      </div>

      {/* Main Theater Viewport */}
      <div className="max-w-5xl mx-auto space-y-6">
        <div
          ref={containerRef}
          className="relative bg-space-dark/95 border border-cyber-cyan/50 rounded-2xl overflow-hidden shadow-glow-cyan flex flex-col scanlines group"
        >
          {/* Top HUD Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-space-card/80 border-b border-space-border/60">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
              <div>
                <div className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider flex items-center gap-2">
                  <Film className="w-3.5 h-3.5 text-cyber-cyan" />
                  <span>AFTER EFFECTS 40s PROMOTIONAL TRAILER</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  H.264 AVC1 &bull; 1280x720 &bull; 30 FPS &bull; FASTSTART PROGRESSIVE
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30">
              MODULE 3 COMPLIANT
            </span>
          </div>

          {/* Video Viewport Area */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden cursor-pointer">
            <video
              ref={videoRef}
              src="/videos/promo-reel.mp4"
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
              playsInline
              preload="auto"
              onError={(e) => {
                console.error('Video load error:', e);
                setVideoError('Unable to load video format.');
              }}
            />

            {/* Big Center Play Overlay Button */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-cyber-cyan/20 border-2 border-cyber-cyan flex items-center justify-center text-cyber-cyan shadow-glow-cyan hover:scale-110 transition-transform z-20 backdrop-blur-sm"
                title="Play Promotional Trailer"
              >
                <Play className="w-10 h-10 fill-cyber-cyan ml-1.5" />
              </button>
            )}

            {/* Error Overlay if any */}
            {videoError && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 text-center z-30">
                <div className="space-y-2">
                  <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                  <p className="text-sm font-mono text-slate-200">{videoError}</p>
                </div>
              </div>
            )}

            {/* Corner HUD Watermark */}
            <div className="absolute top-4 left-4 pointer-events-none text-[10px] font-mono text-cyber-cyan/80 bg-black/60 px-2 py-1 rounded border border-cyber-cyan/30 z-10">
              SHERYAR // DEVELOPER'S UNIVERSE
            </div>
          </div>

          {/* HUD Controller Bar */}
          <div className="p-4 bg-space-dark/95 border-t border-space-border/60 space-y-2">
            {/* Seek Progress Scrubber */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyber-cyan min-w-[40px]">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 40}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
              />
              <span className="text-xs font-mono text-slate-400 min-w-[40px]">
                {formatTime(duration)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-cyber-cyan" />}
                </button>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Restart Trailer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 pl-2">
                  <button
                    onClick={toggleMute}
                    className="text-slate-300 hover:text-cyber-cyan transition-colors"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
                  AFTER EFFECTS COMPOSITING REEL
                </span>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Toggle Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
