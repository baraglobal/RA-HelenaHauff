const Paragraph = (props) => {
  const { data } = props;
  return <p className="paragraph">{data.text}</p>;
};

export default Paragraph;
