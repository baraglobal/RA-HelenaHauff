const Paragraph = (props) => {
  const { data } = props;

  function convertQuotesToItalic(text) {
    return text.replace(/"([^"]*)"/g, (match, p1) => `<em>"${p1}"</em>`);
  }

  const processedText = convertQuotesToItalic(data.text);

  return <p className="paragraph" dangerouslySetInnerHTML={{ __html: processedText }}></p>;
};


export default Paragraph;
