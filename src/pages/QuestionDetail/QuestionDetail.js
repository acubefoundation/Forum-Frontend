import React, { useEffect, useState } from "react";
import "./QuestionDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnswerQuestion from "../../components/AnswerQuestion";
import Answer from "../../components/Answer";


const SingleQuestion = () => {
  let params = useParams();
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);

  const questionByPostId = async () => {
    try {
      const question = await axios.get(
        `https://lazy-battledress-fawn.cyclic.cloud/api/question/${params.id}`
      );
      setQuestion(question.data.data);
    } catch (err) {
      console.log("problem", err);
    }
  };
console.log(question)

  const answersByQuestionId = async () => {
    try {
      const answersRes = await axios.get(
      `https://lazy-battledress-fawn.cyclic.cloud/api/answer/${question?.question_id}`
      );
      setAnswers(answersRes.data.data);
    } catch (err) {
      console.log("problem", err);
    }
  };


  useEffect(() => {
    questionByPostId();
    answersByQuestionId();
  }, [question?.question_id]);

  console.log(question);
console.log(answers);

  return (
    <div className="answer_page_container">
      <div className="question_user">
        <h3>Question</h3>
        <h5>{question?.question}</h5>
        <div className="question_desc">
          {/* {question?.question_description} */}
          <div
          // extracting the string/value from html element
            dangerouslySetInnerHTML={{ __html: question?.question_description }}
          />
        </div>
      </div>
      <hr />
      <div className="">{answers.length > 0 && <h3>Answer From The Community</h3>}</div>
      {answers.map((answer) => (
        <div key={answer.answer_id}>
          <Answer answer={answer.answer} userName={answer.user_name} />
        </div>
      ))}
  
     <AnswerQuestion  questionId={question?.question_id} />
     
    </div>
  );
};

export default SingleQuestion;