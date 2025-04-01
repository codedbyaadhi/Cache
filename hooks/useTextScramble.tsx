import { useState, useEffect } from "react";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export const useTextScramble = (text: string, isScrambling: boolean) => {
  const [scrambledText, setScrambledText] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 30; // Increased frames for smoother animation
    let interval: NodeJS.Timeout;

    const scramble = (isHovering: boolean) => {
      frame++;

      const progress = frame / totalFrames;
      const scrambled = text
        .split("")
        .map((char, idx) => {
          if (char === " ") return " ";

          // Calculate when this character should stop scrambling
          const charProgress = (idx / text.length) * 0.5; // Spread the effect over half the duration

          if (isHovering) {
            // During hover-in scramble phase
            if (progress < charProgress + 0.5) {
              return characters[Math.floor(Math.random() * characters.length)];
            }
          } else {
            // During hover-out scramble phase
            if (progress > charProgress + 0.5) {
              return char; // Show original after halfway point
            }
            return characters[Math.floor(Math.random() * characters.length)];
          }

          return char;
        })
        .join("");

      setScrambledText(scrambled);

      if (frame < totalFrames) {
        interval = setTimeout(() => scramble(isHovering), 27); // Faster updates for smoother animation
      }
    };

    if (isScrambling) {
      scramble(true); // Start scrambling when hovering in
    } else {
      scramble(false); // Start scrambling when hovering out
    }

    return () => clearTimeout(interval);
  }, [text, isScrambling]);

  return scrambledText;
};
