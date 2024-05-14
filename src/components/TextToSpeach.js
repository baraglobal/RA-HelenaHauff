import { useState, useEffect } from "react";

const TextToSpeech = (props) => {

  // Using a basic implementation of the native TextToSpeech api to add accesibility
  const { data } = props;

  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  const [text, setText] = useState();

  // reformating the text data into a single, readable string
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
  }, [data]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    setUtterance(u);
    setVoice(voices[84]);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    utterance.voice = voices[84];
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    if (isPaused && !hasPlayed) {
      synth.speak(utterance);
    } else {
      synth.resume();
      
    }
    setIsPaused(false);
    setHasPlayed(true);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
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
      <button onClick={handlePlay} className={`tts__button play ${isPaused?"active":""}`}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49.04 49.31"
            className="tts__icon"
          >
            <polygon fill="#E52F28" points="0 49.31 0 0 49.04 26.43 0 49.31" />
          </svg>
      </button> 
      <button onClick={handlePause} className={`tts__button play ${!isPaused?"active":""}`}>
      <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49.04 49.31"
            className="tts__icon"
          >
            <rect fill="#E52F28" y=".26" width="20" height="48.8" />
            <rect fill="#E52F28" x="29.04" y=".26" width="20" height="48.8" />
          </svg>
      </button> 
      <div className={`tts__text ${isPaused && !hasPlayed ? "active" : ""}`}>
        <h4>Listen to the article</h4>
      </div>
    </aside>
  );
};

export default TextToSpeech;
