import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((resp) =>resp.json())
    .then((data) => {
      setQuestions(data)
    })
    },[])


    function handleDelete(id) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then(() => {
          const updatedQuestions = questions.filter((quest) => quest.id !== id);
          setQuestions(updatedQuestions);
        });
    }

    function handleChange(id, correctIndex) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      })
        .then((resp) => resp.json())
        .then((updatedQuestion) => {
          const updatedQuestions = questions.map((quest) => {
            if (quest.id === updatedQuestion.id) return updatedQuestion;
            return quest;
          });
          setQuestions(updatedQuestions);
        });
    }

    const questionItems = questions.map((quest) => (
      <QuestionItem
        key={quest.id}
        question={quest}
        onDeleteClick={handleDelete}
        onAnswerChange={handleChange}
      />
    ));


    return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
