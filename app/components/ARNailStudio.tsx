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
  SwitchCamera,
  Smartphone,
} from 'lucide-react';
import { useSavedDesigns, useARHistory } from '../hooks/useLocalStorage';

interface ARNailStudioProps {
  isSpanish?: boolean;
  onClose?: () => void;
}

// Nail color categories with 50+ options
const NAIL_COLOR_CATEGORIES = {
  reds: {
    name: { en: 'Reds & Wines', es: 'Rojos & Vinos' },
    colors: [
      { name: 'Classic Red', hex: '#C41E3A' },
      { name: 'Burgundy', hex: '#4A0404' },
      { name: 'Wine', hex: '#722F37' },
      { name: 'Cherry', hex: '#DE3163' },
      { name: 'Ruby', hex: '#9B111E' },
      { name: 'Crimson', hex: '#DC143C' },
      { name: 'Blood Red', hex: '#8A0303' },
      { name: 'Scarlet', hex: '#FF2400' },
    ],
  },
  pinks: {
    name: { en: 'Pinks & Blush', es: 'Rosas & Rubor' },
    colors: [
      { name: 'Hot Pink', hex: '#FF69B4' },
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Blush', hex: '#E8B4B8' },
      { name: 'Coral Pink', hex: '#F88379' },
      { name: 'Magenta', hex: '#FF0090' },
      { name: 'Dusty Rose', hex: '#D4A5A5' },
      { name: 'Salmon', hex: '#FA8072' },
      { name: 'Bubblegum', hex: '#FFC1CC' },
      { name: 'Fuchsia', hex: '#C154C1' },
    ],
  },
  nudes: {
    name: { en: 'Nudes & Neutrals', es: 'Nude & Neutros' },
    colors: [
      { name: 'Nude', hex: '#E8D0C4' },
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Beige', hex: '#D4B5A0' },
      { name: 'Caramel', hex: '#C19A6B' },
      { name: 'Almond', hex: '#EFDECD' },
      { name: 'Mocha', hex: '#967259' },
      { name: 'Toffee', hex: '#A47551' },
      { name: 'Cafe Latte', hex: '#C8A276' },
    ],
  },
  metallics: {
    name: { en: 'Metallics', es: 'Metálicos' },
    colors: [
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Rose Gold', hex: '#E8A4B8' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Chrome', hex: '#DBE4EB' },
      { name: 'Copper', hex: '#B87333' },
      { name: 'Bronze', hex: '#CD7F32' },
      { name: 'Platinum', hex: '#E5E4E2' },
      { name: 'Holographic', hex: '#B4A7D6' },
    ],
  },
  purples: {
    name: { en: 'Purples', es: 'Morados' },
    colors: [
      { name: 'Lavender', hex: '#E6E6FA' },
      { name: 'Purple', hex: '#9B59B6' },
      { name: 'Violet', hex: '#8B00FF' },
      { name: 'Plum', hex: '#8E4585' },
      { name: 'Orchid', hex: '#DA70D6' },
      { name: 'Grape', hex: '#6F2DA8' },
      { name: 'Mauve', hex: '#E0B0FF' },
    ],
  },
  blues: {
    name: { en: 'Blues', es: 'Azules' },
    colors: [
      { name: 'Navy', hex: '#191970' },
      { name: 'Royal Blue', hex: '#4169E1' },
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Teal', hex: '#008080' },
      { name: 'Turquoise', hex: '#40E0D0' },
      { name: 'Ocean', hex: '#0077B6' },
      { name: 'Ice Blue', hex: '#A5F2F3' },
    ],
  },
  greens: {
    name: { en: 'Greens', es: 'Verdes' },
    colors: [
      { name: 'Forest', hex: '#228B22' },
      { name: 'Emerald', hex: '#50C878' },
      { name: 'Sage', hex: '#9CAF88' },
      { name: 'Mint', hex: '#98FF98' },
      { name: 'Olive', hex: '#808000' },
      { name: 'Hunter', hex: '#355E3B' },
    ],
  },
  darks: {
    name: { en: 'Darks & Dramatic', es: 'Oscuros & Dramáticos' },
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Jet Black', hex: '#0A0A0A' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Midnight', hex: '#191970' },
      { name: 'Dark Chocolate', hex: '#3D2B1F' },
      { name: 'Oxblood', hex: '#4A0000' },
    ],
  },
  special: {
    name: { en: 'French & Special', es: 'Francés & Especiales' },
    colors: [
      { name: 'French White', hex: '#FFFFF0' },
      { name: 'French Pink', hex: '#FFE4E1' },
      { name: 'Pearl', hex: '#F5E6D3' },
      { name: 'Glitter Gold', hex: '#FFE5B4' },
      { name: 'Clear', hex: '#FFEEF2' },
    ],
  },
};

// Flatten colors for simple access
const NAIL_COLORS = Object.values(NAIL_COLOR_CATEGORIES).flatMap(cat => cat.colors);

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
  const [useBackCamera, setUseBackCamera] = useState(true); // Default to back camera for better nail viewing
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof NAIL_COLOR_CATEGORIES>('reds');

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
      switchCamera: 'Switch Camera',
      backCamera: 'Back Camera',
      frontCamera: 'Front Camera',
      categories: 'Categories',
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
      switchCamera: 'Cambiar Cámara',
      backCamera: 'Cámara Trasera',
      frontCamera: 'Cámara Frontal',
      categories: 'Categorías',
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
      // Use back camera (environment) for better nail viewing on phones
      const facingMode = useBackCamera ? 'environment' : 'user';
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        // Don't mirror when using back camera
        if (useBackCamera) {
          setIsMirrored(false);
        }
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

  // Draw nail overlays on hand landmarks - Enhanced with realistic effects
  const drawNailsOnHand = (
    ctx: CanvasRenderingContext2D,
    landmarks: { x: number; y: number; z: number }[],
    width: number,
    height: number
  ) => {
    const baseNailWidth = width * 0.028; // Slightly larger for better visibility
    const baseNailHeight = width * 0.045;

    for (let i = 0; i < FINGER_TIPS.length; i++) {
      const tipIdx = FINGER_TIPS[i];
      const midIdx = FINGER_MIDS[i];

      const tip = landmarks[tipIdx];
      const mid = landmarks[midIdx];

      // Calculate position (accounting for mirror)
      const x = isMirrored ? (1 - tip.x) * width : tip.x * width;
      const y = tip.y * height;

      // Calculate angle from mid to tip
      const dx = (isMirrored ? (1 - tip.x) : tip.x) - (isMirrored ? (1 - mid.x) : mid.x);
      const dy = tip.y - mid.y;
      const angle = Math.atan2(dy, dx) - Math.PI / 2;

      // Finger-specific size adjustments
      const fingerSizes = [0.85, 0.95, 1, 0.95, 0.8]; // thumb, index, middle, ring, pinky
      const w = baseNailWidth * fingerSizes[i];
      const h = baseNailHeight * fingerSizes[i];

      ctx.save();
      ctx.translate(x, y - h * 0.35);
      ctx.rotate(angle);

      // === LAYER 1: Base nail with gradient ===
      const baseGradient = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
      baseGradient.addColorStop(0, adjustColor(selectedColor, 25));
      baseGradient.addColorStop(0.3, selectedColor);
      baseGradient.addColorStop(0.7, selectedColor);
      baseGradient.addColorStop(1, adjustColor(selectedColor, -30));

      // Premium almond nail shape
      ctx.beginPath();
      ctx.moveTo(-w / 2, h / 3);
      ctx.bezierCurveTo(-w / 2, 0, -w / 2.5, -h / 2.5, -w / 6, -h / 1.8);
      ctx.bezierCurveTo(0, -h / 1.5, w / 6, -h / 1.8, w / 6, -h / 1.8);
      ctx.bezierCurveTo(w / 2.5, -h / 2.5, w / 2, 0, w / 2, h / 3);
      ctx.bezierCurveTo(w / 2, h / 2.2, w / 4, h / 2, 0, h / 2);
      ctx.bezierCurveTo(-w / 4, h / 2, -w / 2, h / 2.2, -w / 2, h / 3);
      ctx.closePath();

      // Apply base color with slight shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = baseGradient;
      ctx.fill();
      ctx.shadowColor = 'transparent';

      // === LAYER 2: Side shadows for 3D effect ===
      const leftShadow = ctx.createLinearGradient(-w / 2, 0, -w / 4, 0);
      leftShadow.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
      leftShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = leftShadow;
      ctx.fill();

      const rightShadow = ctx.createLinearGradient(w / 2, 0, w / 4, 0);
      rightShadow.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
      rightShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rightShadow;
      ctx.fill();

      // === LAYER 3: Main glossy highlight ===
      ctx.beginPath();
      ctx.ellipse(-w / 6, -h / 5, w / 4, h / 3.5, -0.2, 0, Math.PI * 2);
      const glossGradient = ctx.createRadialGradient(-w / 6, -h / 5, 0, -w / 6, -h / 5, h / 3);
      glossGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      glossGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
      glossGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glossGradient;
      ctx.fill();

      // === LAYER 4: Small secondary highlight ===
      ctx.beginPath();
      ctx.ellipse(w / 5, -h / 8, w / 10, h / 8, 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.fill();

      // === LAYER 5: Top edge shine ===
      ctx.beginPath();
      ctx.moveTo(-w / 4, -h / 2.2);
      ctx.quadraticCurveTo(0, -h / 1.8, w / 4, -h / 2.2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // === LAYER 6: Cuticle line (subtle) ===
      ctx.beginPath();
      ctx.moveTo(-w / 2.5, h / 2.5);
      ctx.quadraticCurveTo(0, h / 1.8, w / 2.5, h / 2.5);
      ctx.strokeStyle = adjustColor(selectedColor, -40);
      ctx.lineWidth = 1;
      ctx.stroke();

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

  // Switch between front and back camera
  const switchCamera = async () => {
    // Stop current camera
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }

    // Toggle camera
    const newUseBackCamera = !useBackCamera;
    setUseBackCamera(newUseBackCamera);
    setIsMirrored(!newUseBackCamera); // Mirror front camera, don't mirror back

    // Restart with new camera
    try {
      const facingMode = newUseBackCamera ? 'environment' : 'user';
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        drawSimpleOverlay();
      }
    } catch (err) {
      console.error('[AR] Camera switch error:', err);
    }
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
            <p className="text-sm text-white">{t[lang].subtitle}</p>
          </div>
          <div className="flex gap-2">
            {/* Camera switch button - important for mobile users */}
            {isActive && (
              <button
                onClick={switchCamera}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center hover:from-amber-600 hover:to-amber-700 transition text-white shadow-lg"
                title={t[lang].switchCamera}
              >
                <SwitchCamera className="w-5 h-5" />
              </button>
            )}
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
        {/* Color Picker with Categories */}
        <AnimatePresence>
          {showColorPicker && isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-4"
            >
              {/* Category tabs */}
              <div className="flex gap-1 overflow-x-auto pb-2 mb-3 scrollbar-hide">
                {Object.entries(NAIL_COLOR_CATEGORIES).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as keyof typeof NAIL_COLOR_CATEGORIES)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === key
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#1A1A1A] shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {category.name[lang]}
                  </button>
                ))}
              </div>

              {/* Selected category colors */}
              <p className="text-white text-xs mb-2">
                {NAIL_COLOR_CATEGORIES[selectedCategory].name[lang]} • {NAIL_COLOR_CATEGORIES[selectedCategory].colors.length} {lang === 'en' ? 'colors' : 'colores'}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {NAIL_COLOR_CATEGORIES[selectedCategory].colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => {
                      setSelectedColor(color.hex);
                      setSelectedColorName(color.name);
                    }}
                    className={`relative w-12 h-12 rounded-xl flex-shrink-0 transition-all shadow-lg ${
                      selectedColor === color.hex
                        ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-transparent'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${adjustColor(color.hex, 30)}, ${color.hex}, ${adjustColor(color.hex, -20)})`,
                    }}
                    title={color.name}
                  >
                    {/* Glossy shine effect */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl" />
                    </div>
                    {selectedColor === color.hex && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Sparkles className="w-5 h-5 text-white drop-shadow-lg" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              {/* Selected color name */}
              {selectedColorName && (
                <motion.div
                  key={selectedColorName}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-center"
                >
                  <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm font-medium">
                    {selectedColorName}
                  </span>
                </motion.div>
              )}
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
