import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Film } from 'lucide-react';

/**
 * VideoPlayerModal - Futuristic HUD Media Player for the 30-60s Promotional Reel (Module 3)
 */
export default function VideoPlayerModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset & Auto-play when opened
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
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
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl bg-space-dark/95 border border-cyber-cyan/50 rounded-2xl overflow-hidden shadow-glow-cyan flex flex-col scanlines"
      >
        {/* HUD Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-space-card/80 border-b border-space-border/60">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
            <div>
              <div className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider flex items-center gap-2">
                <Film className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>MODULE 3 // AFTER EFFECTS PROMOTIONAL REEL</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                PROMO-REEL.MP4 &bull; 1280x720 &bull; 30 FPS &bull; DURATION 00:30
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Trailer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewport Area */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/promo-reel.mp4"
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            playsInline
          />

          {/* Big Center Play Overlay Button */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-cyber-cyan/20 border-2 border-cyber-cyan flex items-center justify-center text-cyber-cyan shadow-glow-cyan hover:scale-110 transition-transform"
            >
              <Play className="w-8 h-8 fill-cyber-cyan ml-1" />
            </button>
          )}

          {/* Holographic Watermark HUD Corner */}
          <div className="absolute top-4 left-4 pointer-events-none text-[10px] font-mono text-cyber-cyan/60 bg-black/40 px-2 py-1 rounded border border-cyber-cyan/20">
            SHERYAR // DEV UNIVERSE
          </div>
        </div>

        {/* HUD Media Controller Bar */}
        <div className="p-4 bg-space-dark/95 border-t border-space-border/60 space-y-2">
          {/* Seek Progress Scrubber */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyber-cyan min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 30}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
            />
            <span className="text-xs font-mono text-slate-400 min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls: Play/Pause, Volume, Fullscreen */}
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
                title="Restart Video"
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
                PROMOTIONAL TRAILER (MODULE 3 VERIFIED)
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
  );
}
