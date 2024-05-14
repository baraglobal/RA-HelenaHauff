import { useState, useEffect } from "react";

const TextToSpeech = (props) => {
  const { data } = props;

  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  const [text, setText] = useState();

  useEffect(() => {
    const newText = data
      .filter(
        (item) =>
          item.type === "Paragraph" ||
          item.type === "PullQuote" ||
          item.type === "StandFirst"
      )
      .map((item) => item.text.trim())
      .join(" ");

    setText(newText);
  }, []);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    setVoice(voices[84]);
    setUtterance(u);
    // return () => {
    //   synth.cancel();
    // };
  }, []);

  const togglePlay = () => {
    const synth = window.speechSynthesis;
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    if (hasPlayed && isPaused) {
      synth.resume();
      setIsPaused(false);
    } else if (!hasPlayed) {
      synth.speak(utterance);
      setHasPlayed(true);
      setIsPaused(false);
    } else {
      synth.pause();
      setIsPaused(true);
    }
    synth.speak(utterance);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(true);
    setHasPlayed(false);
  };

  return (
    <aside className="tts__wrapper">
      <button
        onClick={handleStop}
        className={`tts__button stop ${hasPlayed ? "active" : ""}`}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          className="tts__icon"
          viewBox="0 0 49.04 49.31"
        >
          <rect fill="#E52F28" x="-.48" y="-.34" width="50" height="50" />
        </svg>
      </button>
      <div className={`tts__text ${isPaused && !hasPlayed ? "active" : ""}`}>
        <h4>Listen to the article</h4>
      </div>
      <button onClick={togglePlay} className={`tts__button active play`}>
        {isPaused ? (
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49.04 49.31"
            className="tts__icon"
          >
            <polygon fill="#E52F28" points="0 49.31 0 0 49.04 26.43 0 49.31" />
          </svg>
        ) : (
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49.04 49.31"
            className="tts__icon"
          >
            <rect fill="#E52F28" y=".26" width="20" height="48.8" />
            <rect fill="#E52F28" x="29.04" y=".26" width="20" height="48.8" />
          </svg>
        )}
      </button>
    </aside>
  );
};

export default TextToSpeech;
