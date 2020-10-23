import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import ReactPlayer from "react-player";
import Typography from "@material-ui/core/Typography";

const CourseDetails = (props) => {
  let course = null;
  let lessons = [];

  if (props.selectedCourse) {
    lessons = props.selectedCourse.lessons;
    course = props.selectedCourse;
  }
  const lessonsOutput = lessons.map((lesson, index) => (
    <div key={index} className="border border-info p-2 mb-2">
      <Typography variant="h6" component="p">
        {index + 1} {lesson.title}
      </Typography>
      <Typography variant="body2" color="subtitle1" component="p">
        {lesson.description}
      </Typography>
    </div>
  ));
  console.log(lessons);

  return (
    <div className="container">
      <div className="title_container">
        <h1 className="title">{course.title}</h1>
      </div>
      <div className="row">
        <div className="col-md-8 col-sm-12 col-12">
          <video
            controls
            className="col-12"
            key={lessons[0] && lessons[0].video_url}
          >
            <source src={lessons[0] && lessons[0].video_url} />
          </video>
          <hr />
          <p className="description">{course.description}</p>
        </div>
        <div className="col-md-4 col-sm-12 col-12">
          <h1 className="title mb-0 border-bottom p-2">Continutul cursului</h1>
          {lessons.length > 0 ? lessonsOutput : <p>nu exista lectii</p>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedCourse: state.selectedCourse,
    user: { ...state.user },
  };
};

export default connect(mapStateToProps)(CourseDetails);
