import Part from './Part';

const Content = (props) => {
  return (
    <div>
      <Part parts={props.course.parts} />
    </div>
  );
};

export default Content;
