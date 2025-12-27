'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  CameraOff,
  X,
  Palette,
  Sparkles,
  RotateCcw,
  Download,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FlipHorizontal,
} from 'lucide-react';
import { useSavedDesigns, useARHistory } from '../hooks/useLocalStorage';

interface ARNailStudioProps {
  isSpanish?: boolean;
  onClose?: () => void;
}

// Nail color options
const NAIL_COLORS = [
  { name: 'Burgundy', hex: '#4A0404' },
  { name: 'Rose Gold', hex: '#B76E79' },
  { name: 'Champagne', hex: '#F7E7CE' },
  { name: 'Midnight', hex: '#191970' },
  { name: 'Cherry', hex: '#DE3163' },
  { name: 'Forest', hex: '#228B22' },
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Coral', hex: '#FF7F50' },
  { name: 'Lavender', hex: '#E6E6FA' },
  { name: 'Nude', hex: '#E8D0C4' },
  { name: 'Black', hex: '#1A1A1A' },
];

// Finger tip landmark indices from MediaPipe
const FINGER_TIPS = [4, 8, 12, 16, 20]; // Thumb, Index, Middle, Ring, Pinky
const FINGER_MIDS = [3, 7, 11, 15, 19]; // For nail direction

export default function ARNailStudio({ isSpanish = false, onClose }: ARNailStudioProps) {
  const [isActive, setIsActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState(NAIL_COLORS[0].hex);
  const [selectedColorName, setSelectedColorName] = useState(NAIL_COLORS[0].name);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState(true);
  const [handDetected, setHandDetected] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const handsRef = useRef<unknown>(null);

  const { saveDesign } = useSavedDesigns();
  const { saveSession } = useARHistory();

  const lang = isSpanish ? 'es' : 'en';

  const t = {
    en: {
      title: 'AR Nail Studio',
      subtitle: 'See colors on your real hand',
      startCamera: 'Start Camera',
      stopCamera: 'Stop Camera',
      loading: 'Loading camera...',
      noCamera: 'Camera not available',
      handDetected: 'Hand detected',
      noHand: 'Show your hand to the camera',
      selectColor: 'Select Color',
      takePhoto: 'Capture',
      save: 'Save',
      share: 'Share',
      mirror: 'Mirror',
      fullscreen: 'Fullscreen',
      permissionDenied: 'Camera permission denied. Please allow camera access.',
      tip: 'Hold your hand palm-down for best results',
    },
    es: {
      title: 'Estudio AR',
      subtitle: 'Ve los colores en tu mano real',
      startCamera: 'Iniciar Cámara',
      stopCamera: 'Detener Cámara',
      loading: 'Cargando cámara...',
      noCamera: 'Cámara no disponible',
      handDetected: 'Mano detectada',
      noHand: 'Muestra tu mano a la cámara',
      selectColor: 'Selecciona Color',
      takePhoto: 'Capturar',
      save: 'Guardar',
      share: 'Compartir',
      mirror: 'Espejo',
      fullscreen: 'Pantalla completa',
      permissionDenied: 'Permiso de cámara denegado. Por favor permite el acceso.',
      tip: 'Mantén la mano con la palma hacia abajo para mejores resultados',
    },
  };

  // Initialize MediaPipe Hands
  const initMediaPipe = useCallback(async () => {
    try {
      // Dynamically import MediaPipe
      const { Hands } = await import('@mediapipe/hands');
      const { Camera: MediaPipeCamera } = await import('@mediapipe/camera_utils');

      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResults);
      handsRef.current = hands;

      if (videoRef.current) {
        const camera = new MediaPipeCamera(videoRef.current, {
          onFrame: async () => {
            if (handsRef.current && videoRef.current) {
              await (handsRef.current as { send: (input: { image: HTMLVideoElement }) => Promise<void> }).send({ image: videoRef.current });
            }
          },
          width: 1280,
          height: 720,
        });
        await camera.start();
      }
    } catch (err) {
      console.error('[AR] MediaPipe init error:', err);
      // Fallback to simple camera mode without hand detection
      startSimpleCamera();
    }
  }, []);

  // Fallback simple camera without MediaPipe
  const startSimpleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1280, height: 720 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        drawSimpleOverlay();
      }
    } catch (err) {
      console.error('[AR] Camera error:', err);
      setError(t[lang].permissionDenied);
    }
  };

  // Draw simple nail overlay without hand detection
  const drawSimpleOverlay = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      // Draw video frame
      if (isMirrored) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0);
      if (isMirrored) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }

      // Draw instruction text
      ctx.fillStyle = 'rgba(74, 4, 4, 0.8)';
      ctx.font = '16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(t[lang].tip, canvas.width / 2, canvas.height - 20);

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  // MediaPipe results handler
  const onResults = (results: { multiHandLandmarks?: { x: number; y: number; z: number }[][] }) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Draw video frame
    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);
    if (isMirrored) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // Check if hands detected
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      setHandDetected(true);

      // Draw nails on each detected hand
      for (const landmarks of results.multiHandLandmarks) {
        drawNailsOnHand(ctx, landmarks, canvas.width, canvas.height);
      }
    } else {
      setHandDetected(false);
    }
  };

  // Draw nail overlays on hand landmarks
  const drawNailsOnHand = (
    ctx: CanvasRenderingContext2D,
    landmarks: { x: number; y: number; z: number }[],
    width: number,
    height: number
  ) => {
    const nailWidth = width * 0.025; // Nail width relative to video
    const nailHeight = width * 0.04; // Nail height

    for (let i = 0; i < FINGER_TIPS.length; i++) {
      const tipIdx = FINGER_TIPS[i];
      const midIdx = FINGER_MIDS[i];

      const tip = landmarks[tipIdx];
      const mid = landmarks[midIdx];

      // Calculate position (accounting for mirror)
      let x = isMirrored ? (1 - tip.x) * width : tip.x * width;
      const y = tip.y * height;

      // Calculate angle from mid to tip
      const dx = (isMirrored ? (1 - tip.x) : tip.x) - (isMirrored ? (1 - mid.x) : mid.x);
      const dy = tip.y - mid.y;
      const angle = Math.atan2(dy, dx) - Math.PI / 2;

      // Draw nail shape
      ctx.save();
      ctx.translate(x, y - nailHeight * 0.3);
      ctx.rotate(angle);

      // Nail gradient
      const gradient = ctx.createLinearGradient(0, -nailHeight / 2, 0, nailHeight / 2);
      gradient.addColorStop(0, adjustColor(selectedColor, 20));
      gradient.addColorStop(0.5, selectedColor);
      gradient.addColorStop(1, adjustColor(selectedColor, -20));

      // Draw rounded nail shape
      ctx.beginPath();
      const w = nailWidth * (i === 0 ? 0.9 : 1); // Thumb slightly smaller
      const h = nailHeight * (i === 0 ? 0.85 : 1);

      // Almond shape
      ctx.moveTo(-w / 2, h / 3);
      ctx.quadraticCurveTo(-w / 2, -h / 3, -w / 4, -h / 2);
      ctx.quadraticCurveTo(0, -h / 1.5, w / 4, -h / 2);
      ctx.quadraticCurveTo(w / 2, -h / 3, w / 2, h / 3);
      ctx.quadraticCurveTo(w / 2, h / 2, 0, h / 2);
      ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 3);
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.fill();

      // Glossy shine effect
      ctx.beginPath();
      ctx.ellipse(-w / 4, -h / 4, w / 6, h / 4, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();

      ctx.restore();
    }
  };

  // Helper to adjust color brightness
  const adjustColor = (hex: string, amount: number): string => {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  // Start camera
  const startCamera = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if MediaPipe is available
      const hasMediaPipe = typeof window !== 'undefined';

      if (hasMediaPipe) {
        await initMediaPipe();
      } else {
        await startSimpleCamera();
      }

      setIsActive(true);
    } catch (err) {
      console.error('[AR] Start camera error:', err);
      setError(t[lang].noCamera);
    } finally {
      setIsLoading(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setIsActive(false);
    setHandDetected(false);
  };

  // Capture screenshot
  const captureScreenshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');

    // Save to history
    saveSession({
      screenshot: dataUrl,
      design: {
        id: `ar-${Date.now()}`,
        color: selectedColor,
        colorName: selectedColorName,
        shape: 'almond',
        finish: 'glossy',
        createdAt: new Date().toISOString(),
        isFavorite: false,
      },
    });

    // Download
    const link = document.createElement('a');
    link.download = `iva-ar-nails-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative bg-black ${isFullscreen ? 'fixed inset-0 z-[200]' : 'rounded-2xl overflow-hidden'}`}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-lg font-serif">{t[lang].title}</h3>
            <p className="text-sm text-white/70">{t[lang].subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMirrored(!isMirrored)}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white"
              title={t[lang].mirror}
            >
              <FlipHorizontal className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white"
              title={t[lang].fullscreen}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            {onClose && (
              <button
                onClick={() => {
                  stopCamera();
                  onClose();
                }}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Video/Canvas Area */}
      <div className="relative aspect-video bg-gray-900">
        <video
          ref={videoRef}
          className="hidden"
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-center">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p>{t[lang].loading}</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-center p-6">
              <CameraOff className="w-16 h-16 mx-auto mb-4 text-red-400" />
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Start Camera Button */}
        {!isActive && !isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={startCamera}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#4A0404] to-[#8C7355] text-white rounded-full font-medium hover:opacity-90 transition shadow-2xl"
            >
              <Camera className="w-6 h-6" />
              {t[lang].startCamera}
            </button>
          </div>
        )}

        {/* Hand Detection Status */}
        {isActive && (
          <div className={`absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm ${
            handDetected
              ? 'bg-green-500/80 text-white'
              : 'bg-white/80 text-gray-800'
          }`}>
            {handDetected ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t[lang].handDetected}
              </span>
            ) : (
              <span>{t[lang].noHand}</span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Color Picker */}
        <AnimatePresence>
          {showColorPicker && isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-4"
            >
              <p className="text-white/70 text-sm mb-2">{t[lang].selectColor}</p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {NAIL_COLORS.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => {
                      setSelectedColor(color.hex);
                      setSelectedColorName(color.name);
                    }}
                    className={`w-10 h-10 rounded-full flex-shrink-0 transition-transform ${
                      selectedColor === color.hex ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        {isActive && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition text-white"
            >
              <Palette className="w-5 h-5" />
            </button>

            <button
              onClick={captureScreenshot}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition shadow-lg"
            >
              <Camera className="w-7 h-7 text-[#4A0404]" />
            </button>

            <button
              onClick={stopCamera}
              className="w-12 h-12 rounded-full bg-red-500/80 flex items-center justify-center hover:bg-red-500 transition text-white"
            >
              <CameraOff className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
