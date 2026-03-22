'use client';

import { useState } from 'react';

export default function SwipeConfirm({ disabled, onConfirm }) {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const reset = () => {
    setDragging(false);
    setProgress(0);
  };

  const handlePointerMove = (event) => {
    if (!dragging) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const next = ((event.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, next)));
  };

  const handlePointerUp = () => {
    if (progress >= 78 && !disabled) {
      onConfirm();
      reset();
      return;
    }
    reset();
  };

  return (
    <div className={disabled ? 'swipe-wrap disabled' : 'swipe-wrap'}>
      <p className="swipe-label">Swipe to confirm</p>
      <div
        className="swipe-track"
        onPointerDown={(event) => {
          if (disabled) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          if (dragging) handlePointerUp();
        }}
      >
        <div className="swipe-fill" style={{ width: `${progress}%` }} />
        <span className="swipe-text">{disabled ? 'Complete details first' : 'Swipe here to confirm'}</span>
        <div className="swipe-thumb" style={{ left: `calc(${progress}% - 22px)` }} />
      </div>
      <p className="helper-text">Release after moving the thumb across the track.</p>
    </div>
  );
}
