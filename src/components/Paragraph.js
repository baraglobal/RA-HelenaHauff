const Paragraph = (props) => {
  const { data } = props;

  // Converting the quotes in the text to show as italics.
  // This could be extended for Bold, Caps, Links etc.
  
  function convertQuotesToItalic(text) {
    return text.replace(/"([^"]*)"/g, (match, p1) => `<em>"${p1}"</em>`);
  }

  const processedText = convertQuotesToItalic(data.text);

  return <p className="paragraph" dangerouslySetInnerHTML={{ __html: processedText }}></p>;
};


export default Paragraph;
