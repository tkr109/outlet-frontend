'use client';
import { useRef, useState, useCallback } from 'react';

export default function SwipeConfirm({ onConfirm, disabled = false }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const startX = useRef(0);

  const getMaxTravel = useCallback(() => {
    if (!trackRef.current) return 200;
    return trackRef.current.offsetWidth - 64 - 8;
  }, []);

  const handleStart = useCallback((e) => {
    if (disabled) return;
    e.preventDefault();
    e.target.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    setDragging(true);
  }, [disabled]);

  const handleMove = useCallback((e) => {
    if (!dragging) return;
    const delta = Math.max(0, Math.min(e.clientX - startX.current, getMaxTravel()));
    setOffsetX(delta);
  }, [dragging, getMaxTravel]);

  const handleEnd = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    if (offsetX / getMaxTravel() >= 0.78) {
      onConfirm?.();
    }
    setOffsetX(0);
  }, [dragging, offsetX, getMaxTravel, onConfirm]);

  const progress = getMaxTravel() > 0 ? offsetX / getMaxTravel() : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e] to-transparent z-50">
      <div className="max-w-md mx-auto relative group">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div
          ref={trackRef}
          className="relative bg-surface-container-highest h-20 rounded-full flex items-center p-2 overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-label text-sm font-black text-white/30 tracking-[2.8px] uppercase">
              {disabled ? 'Complete Details' : 'Swipe to Confirm'}
            </span>
          </div>
          <div
            className="absolute left-0 top-0 h-full bg-primary/10 rounded-l-full"
            style={{ width: `${Math.min(progress * 100 + 20, 100)}%`, transition: dragging ? 'none' : 'width 0.3s' }}
          />
          <div
            className={`liquid-gradient h-16 w-16 rounded-full flex items-center justify-center shadow-lg z-10 touch-none select-none ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'
            }`}
            style={{
              transform: `translateX(${offsetX}px)`,
              transition: dragging ? 'none' : 'transform 0.3s',
            }}
            onPointerDown={handleStart}
            onPointerMove={handleMove}
            onPointerUp={handleEnd}
            onPointerCancel={handleEnd}
          >
            <span className="material-symbols-outlined text-3xl font-bold text-white">double_arrow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
