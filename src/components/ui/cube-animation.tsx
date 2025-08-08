"use client";
import { useEffect, useRef } from "react";

interface CubeTransitionProps {
  images: string[];
  currentImageIndex: number;
  onTransitionComplete?: () => void;
}

export default function CubeTransition({
  images,
  currentImageIndex,
  onTransitionComplete,
}: CubeTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const cubesRef = useRef<any[]>([]);
  const isTransitioningRef = useRef(false);
  const lastImageIndexRef = useRef(currentImageIndex);

  useEffect(() => {
    // Load all images
    const loadImages = async () => {
      try {
        const loadedImages = await Promise.all(
          images.map((src) => {
            return new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = src;
            });
          })
        );
        imagesRef.current = loadedImages;
        console.log("Images loaded:", loadedImages.length);
      } catch (error) {
        console.error("Failed to load images:", error);
      }
    };

    loadImages();
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Cube settings
    const cubeSize = 25;
    const cols = Math.ceil(canvas.width / cubeSize);
    const rows = Math.ceil(canvas.height / cubeSize);

    // Initialize cubes
    cubesRef.current = [];
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        cubesRef.current.push({
          x: col * cubeSize,
          y: row * cubeSize,
          col,
          row,
          progress: 0,
          delay: (col + row) * 0.02,
          rotationY: 0,
          isFlipping: false,
        });
      }
    }

    let transitionStart = 0;
    const transitionDuration = 1500;

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check if we need to start transition
      if (
        currentImageIndex !== lastImageIndexRef.current &&
        !isTransitioningRef.current
      ) {
        isTransitioningRef.current = true;
        transitionStart = timestamp;
        lastImageIndexRef.current = currentImageIndex;

        // Reset cubes
        cubesRef.current.forEach((cube) => {
          cube.progress = 0;
          cube.rotationY = 0;
          cube.isFlipping = false;
        });
      }

      const currentImg = imagesRef.current[lastImageIndexRef.current];
      const nextImg = imagesRef.current[currentImageIndex];

      if (isTransitioningRef.current && transitionStart > 0) {
        const elapsed = timestamp - transitionStart;
        const globalProgress = Math.min(elapsed / transitionDuration, 1);

        cubesRef.current.forEach((cube) => {
          const cubeProgress = Math.max(
            0,
            Math.min(1, (globalProgress - cube.delay) / 0.6)
          );

          if (cubeProgress > 0) {
            cube.isFlipping = true;
            cube.progress = cubeProgress;
            cube.rotationY = cubeProgress * Math.PI;
          }

          // Draw cube
          ctx.save();
          ctx.translate(cube.x + cubeSize / 2, cube.y + cubeSize / 2);

          if (cube.isFlipping) {
            const scale = Math.abs(Math.cos(cube.rotationY));
            ctx.scale(scale, 1);

            const imgToDraw =
              cube.rotationY < Math.PI / 2 ? currentImg : nextImg;

            if (imgToDraw && imgToDraw.complete) {
              ctx.drawImage(
                imgToDraw,
                cube.x,
                cube.y,
                cubeSize,
                cubeSize,
                -cubeSize / 2,
                -cubeSize / 2,
                cubeSize,
                cubeSize
              );
            } else {
              // Fallback colored cube
              ctx.fillStyle =
                cube.rotationY < Math.PI / 2 ? "#4a5568" : "#f59e0b";
              ctx.fillRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
            }

            // Glow effect
            const glow = Math.sin(cube.rotationY) * 0.5;
            ctx.strokeStyle = `rgba(245, 158, 11, ${glow})`;
            ctx.lineWidth = 2;
            ctx.strokeRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
          } else {
            // Static cube
            if (currentImg && currentImg.complete) {
              ctx.drawImage(
                currentImg,
                cube.x,
                cube.y,
                cubeSize,
                cubeSize,
                -cubeSize / 2,
                -cubeSize / 2,
                cubeSize,
                cubeSize
              );
            } else {
              ctx.fillStyle = "#4a5568";
              ctx.fillRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
            }

            // Subtle border
            ctx.strokeStyle = "rgba(245, 158, 11, 0.1)";
            ctx.lineWidth = 0.5;
            ctx.strokeRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
          }

          ctx.restore();
        });

        // Complete transition
        if (globalProgress >= 1) {
          isTransitioningRef.current = false;
          if (onTransitionComplete) {
            onTransitionComplete();
          }
        }
      } else {
        // No transition - show pixelated current image
        cubesRef.current.forEach((cube) => {
          ctx.save();
          ctx.translate(cube.x + cubeSize / 2, cube.y + cubeSize / 2);

          if (currentImg && currentImg.complete) {
            ctx.drawImage(
              currentImg,
              cube.x,
              cube.y,
              cubeSize,
              cubeSize,
              -cubeSize / 2,
              -cubeSize / 2,
              cubeSize,
              cubeSize
            );
          } else {
            // Show colorful grid as fallback to ensure visibility
            ctx.fillStyle = `hsl(${(cube.col + cube.row) * 15}, 60%, 50%)`;
            ctx.fillRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
          }

          // Always show cube borders for pixelated effect
          ctx.strokeStyle = "rgba(245, 158, 11, 0.2)";
          ctx.lineWidth = 1;
          ctx.strokeRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);

          ctx.restore();
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [currentImageIndex, onTransitionComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 1,
        display: "block",
        background: "transparent",
      }}
    />
  );
}
