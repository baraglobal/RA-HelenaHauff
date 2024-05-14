import { useState, useEffect } from "react";

const TextToSpeech = (props) => {
  const { data } = props;

  const [isPaused, setIsPaused] = useState(false);
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
    setVoice(voices[159])
    setUtterance(u);
    return () => {
      synth.cancel();
    };
  }, []);

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    if (isPaused) {
      synth.resume();
        utterance.voice = voice;
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div>
      <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default TextToSpeech;
