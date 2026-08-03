import { useEffect, useState } from "react";

export function useTypewriter(
  words,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDelay = 2000
) {

  const [wordIndex, setWordIndex] =
    useState(0);

  const [currentText, setCurrentText] =
    useState("");

  const [isDeleting, setIsDeleting] =
    useState(false);

  useEffect(() => {

    let timer;

    const currentWord =
      words[wordIndex % words.length];

    if (isDeleting) {

      timer = setTimeout(() => {

        setCurrentText((prev) =>
          prev.slice(0, -1)
        );

      }, deletingSpeed);

    } else {

      timer = setTimeout(() => {

        setCurrentText((prev) =>
          currentWord.slice(
            0,
            prev.length + 1
          )
        );

      }, typingSpeed);

    }

    if (
      !isDeleting &&
      currentText === currentWord
    ) {

      timer = setTimeout(() => {

        setIsDeleting(true);

      }, pauseDelay);

    }

    else if (
      isDeleting &&
      currentText === ""
    ) {

      setIsDeleting(false);

      setWordIndex((prev) =>
        prev + 1
      );

    }

    return () => clearTimeout(timer);

  }, [
    currentText,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
  ]);

  return currentText;
}