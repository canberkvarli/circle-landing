"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VideoPhoneFrameProps {
  videoSrc: string;
  title: string;
  description: string;
  detailedDescription?: string;
  className?: string;
  size?: "default" | "large";
  onInfoClick?: () => void;
}

const VideoPhoneFrame = ({ 
  videoSrc, 
  title, 
  description,
  detailedDescription,
  className = "",
  size = "default",
  onInfoClick
}: VideoPhoneFrameProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const frameWidth = size === "large" ? "w-72 md:w-80" : "w-64 md:w-72";
  const frameHeight = size === "large" ? "h-[580px] md:h-[680px]" : "h-[520px] md:h-[580px]";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video loops
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    const handlePlay = () => {
      setIsLoading(false);
    };
    const handleLoadedData = () => setIsLoading(false);
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      console.error('Video failed to load:', videoSrc);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    
    // Try to play the video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Video autoplay failed:', error);
        setHasError(true);
      });
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Video play failed:', error);
        });
      }
    }
  };

  // Determine video MIME type based on file extension
  const getVideoType = (src: string) => {
    if (src.endsWith('.mov')) {
      // .mov files are not well-supported in browsers (only Safari)
      // Try to use .mp4 version if available
      return 'video/quicktime';
    }
    if (src.endsWith('.mp4')) return 'video/mp4';
    return 'video/mp4'; // default
  };

  // Check if video source needs conversion
  const getVideoSources = (src: string) => {
    if (src.endsWith('.mov')) {
      // Try .mp4 version first, then fallback to .mov
      const mp4Version = src.replace('.mov', '.mp4');
      return [
        { src: mp4Version, type: 'video/mp4' },
        { src: src, type: 'video/quicktime' }
      ];
    }
    return [{ src: src, type: getVideoType(src) }];
  };

  return (
    <motion.div 
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Premium Card Container */}
      <div className="group relative bg-gradient-to-br from-white via-white to-spiritual-tertiary/30 dark:from-spiritual-dark-card dark:via-spiritual-dark-card dark:to-spiritual-dark-tertiary/20 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-spiritual-accent/10 dark:border-spiritual-dark-border/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-visible">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-spiritual-accent/0 via-spiritual-primary/0 to-spiritual-secondary/0 group-hover:from-spiritual-accent/5 group-hover:via-spiritual-primary/5 group-hover:to-spiritual-secondary/5 transition-all duration-500 -z-10"></div>
        
        {/* Phone Frame */}
        <div className="flex justify-center mb-8 relative">
          {/* Info Button - Top Right Corner */}
          {onInfoClick && (
            <button
              onClick={onInfoClick}
              className="absolute top-0 right-0 z-30 w-10 h-10 bg-spiritual-accent/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group border-2 border-white/20"
              aria-label="More information"
            >
              <svg 
                className="w-5 h-5 text-white group-hover:text-spiritual-background transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </button>
          )}
          
          <motion.div 
            className={`relative ${frameWidth} ${frameHeight} bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] shadow-2xl border-[6px] border-gray-950 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950`}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
          >
            {/* Screen Content - Thinner bezels, no Dynamic Island */}
            <div className="absolute inset-[8px] bg-black rounded-[2.4rem] overflow-hidden dark:bg-black">
              {hasError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-spiritual-background to-spiritual-tertiary p-4">
                  <p className="text-spiritual-text-muted text-sm text-center mb-2">
                    Video unavailable
                  </p>
                  {videoSrc.endsWith('.mov') && (
                    <p className="text-spiritual-text-muted/70 text-xs text-center">
                      Please convert to .mp4 format
                    </p>
                  )}
                </div>
              ) : (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                      <div className="w-8 h-8 border-2 border-spiritual-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 70%' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={() => setIsLoading(false)}
                    onError={(e) => {
                      console.error('Video error:', e);
                      setHasError(true);
                      setIsLoading(false);
                    }}
                  >
                    {getVideoSources(videoSrc).map((source, index) => (
                      <source key={index} src={source.src} type={source.type} />
                    ))}
                    Your browser does not support the video tag. Please convert .mov files to .mp4 format for better compatibility.
                  </video>
                </>
              )}
            </div>
          </motion.div>
          
          {/* Reset Button - Outside frame, very close to bottom right corner */}
          <button
            onClick={handleReset}
            className="absolute bottom-0 right-0 translate-x-0.5 translate-y-0.5 z-20 w-10 h-10 bg-gradient-to-br from-spiritual-primary to-spiritual-accent backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group border-2 border-white/20"
            aria-label="Reset video"
          >
            <svg 
              className="w-5 h-5 text-white group-hover:text-spiritual-background transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
          </button>
        </div>

        {/* Content Section - Enhanced Typography */}
        <div className="text-center space-y-4 min-h-[180px] flex flex-col justify-start pt-6 pb-4" style={{ overflow: 'visible' }}>
          <div className="inline-block py-2 px-2" style={{ overflow: 'visible', lineHeight: '1.7' }}>
            <h4 
              className="text-3xl md:text-4xl font-spirituality font-bold bg-gradient-to-r from-spiritual-text-dark via-spiritual-accent to-spiritual-primary bg-clip-text text-transparent dark:from-spiritual-dark-accent dark:via-spiritual-dark-accent dark:to-spiritual-dark-secondary mb-3"
              style={{ 
                lineHeight: '1.7',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                display: 'block',
                overflow: 'visible'
              }}
            >
              {title}
            </h4>
          </div>
          <p className="text-lg md:text-xl text-spiritual-text-muted dark:text-spiritual-dark-text-muted font-semibold tracking-wide mb-2">
            {description}
          </p>
          {detailedDescription && (
            <p className="text-sm md:text-base text-spiritual-text-muted/70 dark:text-spiritual-dark-text-light leading-relaxed max-w-lg mx-auto pt-1">
              {detailedDescription}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPhoneFrame;

