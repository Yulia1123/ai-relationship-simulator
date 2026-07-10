import { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 45, className = '', onComplete }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const onCompleteRef = useRef(onComplete);
  const textRef = useRef(text);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // 避免父组件重新渲染导致文本相同但引用不同而重启
    if (textRef.current === text && displayed.length === text.length) {
      return;
    }
    textRef.current = text;
    setDisplayed('');
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index += 1;
      } else {
        clearInterval(timer);
        onCompleteRef.current?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-0.5 h-[1em] bg-rose/70 ml-0.5 align-middle animate-pulse" />
    </span>
  );
}
