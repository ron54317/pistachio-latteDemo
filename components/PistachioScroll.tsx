'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FRAME_COUNT = 80; // We have 80 frames (000-079)

interface TextBeat {
    title: string;
    subtitle: string;
    cta?: string;
    range: [number, number]; // scroll progress range [start, end]
}

const TEXT_BEATS: TextBeat[] = [
    {
        title: 'PURE PISTACHIO',
        subtitle: 'Where premium meets perfection.',
        range: [0, 0.2],
    },
    {
        title: 'CRACK THE SHELL',
        subtitle: 'Hand-selected Sicilian pistachios roasted to unlock intense flavor.',
        range: [0.25, 0.45],
    },
    {
        title: 'DEFY GRAVITY',
        subtitle: 'Ice-cold precision. Rich espresso. Velvety oat milk.',
        range: [0.5, 0.7],
    },
    {
        title: 'TASTE ELEVATION',
        subtitle: 'A symphony of flavors in every sip.',
        range: [0.75, 0.95],
    },
];

export default function PistachioScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    // Scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Smooth spring animation for buttery smoothness
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Preload all images
    useEffect(() => {
        let isMounted = true;
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        const loadImage = (index: number): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                const paddedIndex = String(index).padStart(3, '0');
                img.src = `/A_worldclass_highspeed_1080p_202601281755_${paddedIndex}.jpg`;


                img.onload = () => {
                    loadedCount++;
                    if (isMounted) {
                        setLoadProgress((loadedCount / FRAME_COUNT) * 100);
                    }
                    resolve(img);
                };

                img.onerror = () => reject(new Error(`Failed to load frame ${index}`));
            });
        };

        const loadAllImages = async () => {
            try {
                const promises = Array.from({ length: FRAME_COUNT }, (_, i) => loadImage(i));
                const results = await Promise.all(promises);

                if (isMounted) {
                    setImages(results);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };

        loadAllImages();

        return () => {
            isMounted = false;
        };
    }, []);

    // Draw canvas based on scroll progress
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Helper function to draw a specific frame
        const drawFrame = (frameIndex: number) => {
            const img = images[frameIndex];
            if (!img) return;

            // Set canvas size to match window
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            // Scale context for retina displays
            ctx.scale(dpr, dpr);

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate scaling to cover viewport while maintaining aspect ratio
            const canvasAspect = window.innerWidth / window.innerHeight;
            const imgAspect = img.width / img.height;

            let drawWidth = window.innerWidth;
            let drawHeight = window.innerHeight;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasAspect > imgAspect) {
                // Canvas is wider - fit to width
                drawHeight = drawWidth / imgAspect;
                offsetY = (window.innerHeight - drawHeight) / 2;
            } else {
                // Canvas is taller - fit to height
                drawWidth = drawHeight * imgAspect;
                offsetX = (window.innerWidth - drawWidth) / 2;
            }

            // Draw image centered and scaled
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Draw the first frame immediately to prevent glitches
        drawFrame(0);

        const unsubscribe = smoothProgress.on('change', (latest) => {
            // Clamp the progress value to prevent any negative values or overshooting
            const clampedProgress = Math.max(0, Math.min(1, latest));

            // Finish animation at 90% of visual scroll to allow a "hold" at the end
            const ANIMATION_END_THRESHOLD = 0.9;
            const normalizedProgress = Math.min(1, clampedProgress / ANIMATION_END_THRESHOLD);

            const frameIndex = Math.min(
                Math.max(0, Math.floor(normalizedProgress * FRAME_COUNT)),
                FRAME_COUNT - 1
            );

            drawFrame(frameIndex);
        });

        return () => {
            unsubscribe();
        };
    }, [images, smoothProgress]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            // Trigger redraw on resize
            smoothProgress.set(smoothProgress.get());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [smoothProgress]);

    // Scroll indicator fade out
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
                <div className="w-64 space-y-4">
                    <div className="text-center text-white text-xl font-light tracking-wider mb-8">
                        LOADING EXPERIENCE
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 loading-shimmer"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>

                    {/* Progress Percentage */}
                    <div className="text-center text-green-500/60 text-sm font-light tracking-widest">
                        {Math.floor(loadProgress)}%
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
            {/* Sticky Canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0"
                    style={{ background: '#000000' }}
                />

                {/* Text Overlays */}
                {TEXT_BEATS.map((beat, index) => (
                    <TextBeatOverlay
                        key={index}
                        beat={beat}
                        scrollYProgress={scrollYProgress}
                    />
                ))}

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-50/60"
                >
                    <span className="text-xs tracking-widest uppercase">Scroll to Explore</span>
                    <svg
                        className="w-6 h-6 animate-bounce-slow"
                        fill="none"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
}

function TextBeatOverlay({ beat, scrollYProgress }: { beat: TextBeat, scrollYProgress: any }) {
    const [rangeStart, rangeEnd] = beat.range;
    const fadeInEnd = rangeStart + 0.05;
    const fadeOutStart = rangeEnd - 0.05;

    const opacity = useTransform(
        scrollYProgress,
        [rangeStart, fadeInEnd, fadeOutStart, rangeEnd],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [rangeStart, fadeInEnd, fadeOutStart, rangeEnd],
        [20, 0, 0, -20]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
            <div className="max-w-5xl">
                <h2 className="text-4xl md:text-8xl lg:text-9xl font-bold tracking-[-0.02em] mb-4 md:mb-6 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                    {beat.title}
                </h2>
                <p className="text-lg md:text-2xl lg:text-3xl text-green-50/70 max-w-3xl mx-auto font-light leading-relaxed">
                    {beat.subtitle}
                </p>
            </div>

            {beat.cta && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 md:mt-10 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-white to-green-50 text-black font-bold tracking-[0.1em] text-xs md:text-sm rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 pointer-events-auto hover:scale-105"
                >
                    {beat.cta}
                </motion.button>
            )}
        </motion.div>
    );
}
