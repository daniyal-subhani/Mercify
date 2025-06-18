import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";


export function TypewriterText({
  texts = [],
  loop = true,
  typeSpeed = 150,
  deleteSpeed = 100,
  delaySpeed = 2000,
  className = "",
}) {
  const [text] = useTypewriter({
    words: texts,
    loop,
    typeSpeed,
    deleteSpeed,
    delaySpeed,
  });

  return (
    <span className={className}>
      {text}
      <Cursor cursorStyle="|" />
    </span>
  );
}
