import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";

type Star = {
  id: number;
  left: number;
  top: number;
  twinkleDelay: number;
  appearDelay: number;
};

const generateStars = (count: number): Star[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    twinkleDelay: Math.random() * 2,
    appearDelay: i * 0.1,
  }));

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const enterText = "Enter a number to create a romantic sky:";
  const reEnterDiscriptionText =
    "Please re-enter a number to create a romantic sky:";
  const outOfRangeDiscriptionText =
    "I admire the confidence, but let’s keep it realistic :D";
  const romanceSentenceText =
    "Every moment with you is a gift, just like the stars above.";

  const [discriptionText, setDiscriptionText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [romanceSentence, setRomanceSentence] = useState("");
  const [stars, setStars] = useState<Star[]>([]);
  const [inputRowHidden, setInputRowHidden] = useState(true);
  const [hideDiscription, setHideDiscription] = useState(false);
  const [showSentence, setShowSentence] = useState(false);

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
        typewriterEffect(reEnterDiscriptionText, () => {
          setInputRowHidden(false);
        });
        return;
      }

      if (!Number.isInteger(n) || n < 1 || n > 100) {
        setInputValue("");
        setDiscriptionText("");
        typewriterEffect(outOfRangeDiscriptionText, () => {
          setInputRowHidden(false);
        });
        return;
      }
      setHideDiscription(true);
      setStars(generateStars(n));
    }
  };

  const showRomanceSentence = (textArg: string) => {
    const romanceSentenceArr = Array.from(textArg);
    romanceSentenceArr.forEach((char, i) => {
      setTimeout(() => {
        setRomanceSentence((prev) => prev + char);
      }, 50 * i);
    });
  };

  useEffect(() => {
    if (stars.length === 0) return;

    const timer = setTimeout(() => {
      setShowSentence(true);
      showRomanceSentence(romanceSentenceText);
    }, 100 * stars.length);

    return () => clearTimeout(timer);
  }, [stars]);

  useLayoutEffect(() => {
    if (!inputRowHidden) {
      inputRef.current?.focus();
    }
  }, [inputRowHidden]);

  useEffect(() => {
    typewriterEffect(enterText, () => {
      setInputRowHidden(false);
    });
  }, []);

  const resetScene = () => {
    setStars([]);
    setShowSentence(false);
    setHideDiscription(false);
    setInputValue("");
    setDiscriptionText("");
    setInputRowHidden(true);
    setRomanceSentence("");
    typewriterEffect(enterText, () => {
      setInputRowHidden(false);
    });
  };

  return (
    <>
      <div className="container">
        {stars.map((star) => (
          <span
            className="star"
            style={
              {
                top: star.top + "%",
                left: star.left + "%",
                "--twinkle-delay": star.twinkleDelay + "s",
                "--appear-delay": star.appearDelay + "s",
              } as React.CSSProperties
            }
          >
            *
          </span>
        ))}
        <div
          className={`discription-container ${hideDiscription ? "transparent" : ""}`}
        >
          <p className="discription">{discriptionText}</p>
          <div className={`input-row ${inputRowHidden ? "hidden" : ""}`}>
            <span className="input-hint">&gt;</span>
            <input
              className="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              type="text"
              ref={inputRef}
            />
          </div>
        </div>
        <div className={`sentence ${showSentence ? "show" : ""}`}>
          <p className="romance-sentence">{romanceSentence}</p>
          <div
            className={`retry  ${showSentence ? "" : "btn-disabled"}`}
            onClick={resetScene}
          >
            Retry
          </div>
        </div>
        <p className="author">By Haru 2026</p>
      </div>
    </>
  );
}

export default App;
