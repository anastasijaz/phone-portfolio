import { useEffect, useState } from 'react';

/** Pixel-sized screen inside the device frame */
export const SCREEN_W = 412;
export const SCREEN_H = 915;
/** Bezel thickness around the screen */
export const BEZEL = 12;
export const DEVICE_W = SCREEN_W + BEZEL * 2;
export const DEVICE_H = SCREEN_H + BEZEL * 2;
/** At or below this viewport width the frame is dropped and the app fills the screen */
export const PHONE_BREAKPOINT = 480;

const compute = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w <= PHONE_BREAKPOINT) return { framed: false, scale: 1 };
  const margin = 32; // breathing room around the device (+ side buttons)
  const scale = Math.min(1, (w - margin) / (DEVICE_W + 8), (h - margin) / DEVICE_H);
  return { framed: true, scale: Math.max(scale, 0.3) };
};

/** Whether to show the device frame, and how much to scale it down so it fits the window. */
export function useFrameScale() {
  const [state, setState] = useState(compute);
  useEffect(() => {
    const onResize = () => setState(compute());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return state;
}
