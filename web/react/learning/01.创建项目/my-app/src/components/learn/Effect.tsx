import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }: { src: string, isPlaying: boolean }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();  // 渲染期间不能调用 `play()`。 
    } else {
      ref.current.pause(); // 同样，调用 `pause()` 也不行。
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export function Effect() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '暂停' : '播放'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
