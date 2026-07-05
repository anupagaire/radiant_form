"use client";

import { useRef, useState, useEffect } from "react";

interface CameraCaptureProps {
  onCapture: (base64: string) => void;
  onClear?: () => void;
}

export default function CameraCapture({ onCapture, onClear }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [streaming, setStreaming] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStreaming(false);
  };

  // Stop camera if component unmounts while stream is open
  useEffect(() => {
    return () => stopStream();
  }, []);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStreaming(true);
    } catch (err) {
      console.error(err);
      setError("Camera access denied or not available. Please allow camera permission.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL("image/jpeg", 0.9);
    setPreview(base64);
    onCapture(base64);
    stopStream();
  };

  const retake = () => {
    setPreview(null);
    onClear?.();
    startCamera();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-40 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center relative">
        {!preview && !streaming && (
          <span className="text-[11px] text-gray-400 text-center px-2">
            Click &quot;Open Camera&quot; to take a live photo
          </span>
        )}
        <video
          ref={videoRef}
          muted
          playsInline
          className={`w-full h-full object-cover ${streaming ? "block" : "hidden"}`}
        />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Captured" className="w-full h-full object-cover" />
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {error && <p className="text-[12px] text-red-600">{error}</p>}

      <div className="flex gap-2">
        {!streaming && !preview && (
          <button
            type="button"
            onClick={startCamera}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-[13px]"
          >
            Open Camera
          </button>
        )}
        {streaming && (
          <button
            type="button"
            onClick={capturePhoto}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-[13px]"
          >
            Capture
          </button>
        )}
        {preview && (
          <button
            type="button"
            onClick={retake}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded text-[13px]"
          >
            Retake
          </button>
        )}
      </div>
    </div>
  );
}