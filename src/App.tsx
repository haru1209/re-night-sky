import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const discriptionContainerRef = useRef<HTMLDivElement>(null);
  const discriptionRef = useRef<HTMLParagraphElement>(null);
  const inputRowRef = useRef<HTMLDivElement>(null);
  const inputHintRef = useRef<HTMLSpanElement>(null);
  const sentenceRef = useRef<HTMLDivElement>(null);
  const romanceSentenceRef = useRef<HTMLParagraphElement>(null);
  const retryRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLParagraphElement>(null);

  const enterText = "Enter a number to create a romantic sky:";
  const reEnterDiscriptionText =
    "Please re-enter a number to create a romantic sky:";
  const outOfRangeDiscriptionText =
    "I admire the confidence, but let’s keep it realistic :D";
  const romanceSentenceText =
    "Every moment with you is a gift, just like the stars above.";

  const [discriptionText, setDiscriptionText] = useState("");
  const [inputValue, setInputValue] = useState("");

  const typewriterEffect = (textArg: string, callback: () => void) => {
    let discriptionArr = Array.from(textArg);
    for (let i = 0; i < discriptionArr.length; i++) {
      setTimeout(() => {
        setDiscriptionText((prev) => prev + discriptionArr[i]);
        if (i === discriptionArr.length - 1) {
          setTimeout(callback, 50);
        }
      }, 50 * i);
    }
  };

  const parseFiniteNumber = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed === "") return null;
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : null;
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const n = parseFiniteNumber(inputValue);

      if (n === null) {
        setInputValue("");
        setDiscriptionText("");
        inputRowRef.current?.classList.add("hidden");
        typewriterEffect(reEnterDiscriptionText, () => {
          inputRowRef.current?.classList.remove("hidden");
          inputRef.current?.focus();
        });
        return;
      }
    }
  };

  useEffect(() => {
    typewriterEffect(enterText, () => {
      inputRowRef.current?.classList.remove("hidden");
      inputRef.current?.focus();
    });
  }, []);

  return (
    <>
      <div className="discription-container" ref={discriptionContainerRef}>
        <p className="discription" ref={discriptionRef}>
          {discriptionText}
        </p>
        <div className="input-row hidden" ref={inputRowRef}>
          <span className="input-hint" ref={inputHintRef}>
            &gt;
          </span>
          <input
            className="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            type="text"
          />
        </div>
      </div>
      <div className="sentence" ref={sentenceRef}>
        <p className="romance-sentence" ref={romanceSentenceRef}></p>
        <div className="retry btn-disabled" ref={retryRef}>
          Retry
        </div>
      </div>
      <p className="author" ref={authorRef}>
        By Haru 2026
      </p>
    </>
  );
}

export default App;
