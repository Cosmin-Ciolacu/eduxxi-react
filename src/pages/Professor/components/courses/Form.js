import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { connect } from "react-redux";

const CourseForm = (props) => {
  const [createCourse, setCreateCourse] = useState({
    title: "",
    discipline: "",
    nr_courses: 0,
    courses: [],
    courses_description: [],
    questions: [],
    answers: [],
    files: [],
    course_id: null,
  });

  const [validStep, setValidStep] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (
      currentStep === 1 &&
      createCourse.title !== "" &&
      createCourse.description !== "" &&
      parseInt(createCourse.nr_courses) > 0
    ) {
      setValidStep(true);
    } else if (
      currentStep > 1 &&
      createCourse.courses[currentStep - 2] !== "" &&
      createCourse.courses_description[currentStep - 2] !== "" &&
      createCourse.files[currentStep - 2] !== "" &&
      createCourse.questions[currentStep - 2] !== "" &&
      createCourse.answers[currentStep - 2] !== ""
    ) {
      setValidStep(true);
    } else {
      setValidStep(false);
    }
  }, [createCourse, currentStep]);

  const changeTitle = (value) => {
    setCreateCourse((prevState) => {
      return {
        ...prevState,
        title: value,
      };
    });
  };

  const changeDiscipline = (value) => {
    setCreateCourse((prevState) => {
      return {
        ...prevState,
        discipline: value,
      };
    });
  };

  const changeCoursesNr = (value) => {
    if (value > 0) {
      setCreateCourse((prevState) => {
        return {
          ...prevState,
          nr_courses: value,
          courses: new Array(parseInt(value)).fill(""),
          courses_description: new Array(parseInt(value)).fill(""),
          questions: new Array(parseInt(value)).fill(""),
          answers: new Array(parseInt(value)).fill(""),
          files: new Array(parseInt(value)).fill(""),
        };
      });
    }
  };

  const changeFiles = (e, i) => {
    let files = [...createCourse.files];
    if (files[i] !== e.target.files[0] && e.target.files[0] !== "") {
      files[i] = e.target.files[0];
    } else if (e.target.files[0] === "") {
      files.splice(i, 1);
    }
    setCreateCourse((prevState) => {
      return {
        ...prevState,
        files: files,
      };
    });
  };

  const changeQuestions = (value, i) => {
    let newQuestions = [...createCourse.questions];
    if (newQuestions[i] !== value && value !== "") {
      newQuestions[i] = value;
    } else if (value === "") {
      newQuestions.splice(i, 1);
    }
    setCreateCourse((prevState) => {
      return {
        ...prevState,
        questions: newQuestions,
      };
    });
  };

  const changeAnswers = (value, i) => {
    let newAnswers = [...createCourse.answers];
    if (newAnswers[i] !== value && value !== "") {
      newAnswers[i] = value;
    } else if (value === "") {
      newAnswers.splice(i, 1);
    }
    setCreateCourse((prevState) => {
      return {
        ...prevState,
        answers: newAnswers,
      };
    });
  };

  const changeLessonTitle = (value, i) => {
    let courses = [...createCourse.courses];
    if (courses[i] !== value && value !== "") {
      courses[i] = value;
    } else if (value === "") {
      courses.splice(i, 1);
    }
    setCreateCourse((prevState) => {
      return {
        ...prevState,
        courses: courses,
      };
    });
  };

  const changeLessonDescription = (value, i) => {
    let courses_description = [...createCourse.courses_description];
    if (courses_description[i] !== value && value !== "") {
      courses_description[i] = value;
    } else if (value === "") {
      courses_description.splice(i, 1);
    }

    setCreateCourse((prevState) => {
      return {
        ...prevState,
        courses_description: courses_description,
      };
    });
  };

  const changeStep = () => {
    if (validStep) {
      if (currentStep < parseInt(createCourse.nr_courses) + 2) {
        if (currentStep === 1) {
          let formData = new FormData();
          formData.append("course_name", createCourse.title);
          formData.append("discipline", createCourse.discipline);
          axios
            .post(
              "/plus/course/add-course",
              {
                course_name: createCourse.title,
                discipline: createCourse.discipline,
              },
              {
                headers: {
                  "auth-token": props.user.token,
                },
              }
            )
            .then((response) => {
              setCreateCourse((prevState) => {
                return {
                  ...prevState,
                  course_id: response.data.course_id,
                };
              });
            })
            .catch((err) => {
              console.log(err);
            });
          setCurrentStep((prevState) => {
            return prevState + 1;
          });
          setValidStep(false);
        } else if (currentStep > 1) {
          let formData = new FormData();
          formData.append("course_id", createCourse.course_id);
          formData.append("title", createCourse.courses[currentStep - 2]);
          formData.append(
            "description",
            createCourse.courses_description[currentStep - 2]
          );
          formData.append(
            "question_text",
            createCourse.questions[currentStep - 2]
          );
          formData.append(
            "correct_answer",
            createCourse.answers[currentStep - 2]
          );
          formData.append("video", createCourse.files[currentStep - 2]);
          axios
            .post("/plus/course/add-lesson", formData, {
              headers: {
                "auth-token": props.user.token,
              },
            })
            .then((response) => {
              if (currentStep === parseInt(createCourse.nr_courses) + 1) {
                props.history.push("/plus/instructor/courses");
              }
            })
            .catch((err) => {
              console.log(err);
            });
          if (currentStep !== parseInt(createCourse.nr_courses) + 1) {
            setCurrentStep((prevState) => {
              return prevState + 1;
            });
            setValidStep(false);
            fileRef.current.value = "";
          }
        }
      }
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prevState) => {
        return prevState - 1;
      });
      setValidStep(true);
    }
  };

  let fileRef = React.createRef();

  return (
    <div className="container professor">
      <div className="progress_container row border p-2 align-items-center">
        <h1 className="grey_title title">Pasul {currentStep}</h1>
      </div>
      <div
        className="progress-line"
        style={{
          width:
            parseInt(createCourse.nr_courses) > 0
              ? (currentStep / (parseInt(createCourse.nr_courses) + 1)) * 100 +
                "%"
              : 0 + "%",
        }}
      ></div>
      {currentStep === 1 ? (
        <div>
          <h1 className="title my-3">Alege un titlu al cursului</h1>
          <p className="description mb-3">
            Este ok dacă nu ai inspirație acum pentru un titlu bun. Îl poți
            schimba mai târziu.
          </p>
          <TextField
            value={createCourse.title}
            id="title"
            label="Titlu"
            variant="outlined"
            onChange={(e) => changeTitle(e.target.value)}
          />
          <h1 className="title mt-5 mb-3">Alege disciplina</h1>
          <TextField
            value={createCourse.discipline}
            id="discipline"
            label="Disciplina"
            variant="outlined"
            onChange={(e) => changeDiscipline(e.target.value)}
          />
          <h1 className="title mt-5 mb-3">Alege numărul de cursuri</h1>
          <TextField
            value={parseInt(createCourse.nr_courses)}
            type="number"
            min={0}
            id="nr_courses"
            label="Număr cursuri"
            variant="outlined"
            onChange={(e) => changeCoursesNr(e.target.value)}
          />
        </div>
      ) : currentStep > 1 &&
        currentStep <= parseInt(createCourse.nr_courses) + 1 ? (
        <div>
          <h1 className="title my-3">
            Alege un nume si o descriere pentru lectia {currentStep - 1}
          </h1>
          <div className="border p-3 my-2 questions_container">
            <div className="row align-items-center justify-content-center">
              <TextField
                value={createCourse.courses[currentStep - 2]}
                className="d-block mb-2"
                onChange={(e) =>
                  changeLessonTitle(e.target.value, currentStep - 2)
                }
                id={"question" + currentStep}
                label={"Titlu lectia " + (currentStep - 1)}
              />
            </div>
            <div className="row align-items-center justify-content-center">
              <TextField
                value={createCourse.courses_description[currentStep - 2]}
                className="d-block"
                onChange={(e) =>
                  changeLessonDescription(e.target.value, currentStep - 2)
                }
                id={"answer" + currentStep}
                label="Descriere"
              />
            </div>
          </div>
          <h1 className="title my-3">Alege fisierul</h1>
          <div className="row align-items-center justify-content-center my-2 border p-2">
            <Form.File
              id={"fisier" + currentStep}
              label="alege fisier"
              custom
              ref={fileRef}
              onChange={(e) => changeFiles(e, currentStep - 2)}
              className="my-2"
            />
          </div>
          <h1 className="title my-3">
            Alege întrebarile pentru fiecare curs si răspunsul corect aferent
          </h1>
          <div className="border p-3 my-2 questions_container">
            <div className="row align-items-center justify-content-center">
              <TextField
                value={createCourse.questions[currentStep - 2]}
                className="d-block mb-2"
                onChange={(e) =>
                  changeQuestions(e.target.value, currentStep - 2)
                }
                id={"question" + currentStep}
                label={"Întrebarea " + (currentStep - 1)}
              />
            </div>
            <div className="row align-items-center justify-content-center">
              <TextField
                value={createCourse.answers[currentStep - 2]}
                className="d-block"
                onChange={(e) => changeAnswers(e.target.value, currentStep - 2)}
                id={"answer" + currentStep}
                label="Răspunsul corect"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="row justify-content-between align-items-center mx-0 mt-5 border-top pt-3">
        <Button variant="outlined" color="primary" onClick={goBack}>
          Înapoi
        </Button>
        <Button
          onClick={changeStep}
          variant={validStep ? "contained" : "outlined"}
          color={validStep ? "secondary" : ""}
        >
          {currentStep === parseInt(createCourse.nr_courses) + 1
            ? "Finalizează cursul"
            : "Continuare"}
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: { ...state.user },
  };
};

export default connect(mapStateToProps)(CourseForm);
