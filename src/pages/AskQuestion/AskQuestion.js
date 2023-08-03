import React, { useContext, useState } from "react";
import "./AskQuestion.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

 function AskQuestion() {
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_base_url}/api/questions`,
        {
          id:userData.user.id,
          question: form.question,
          questionDescription: value,
        }
      );

      navigate("/");

    } catch (err) {
      console.log("problem", err);
    }
  }


  return (
    <div className="ask-question ">
      <div className="guide_question">
        <h3>Steps to write a good question</h3>
        <ul className="question_steps">
          <li>Summerize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      
      <form onSubmit={handleSubmit} className="question_container">
        <h3>Ask a public question</h3>
        <Link to="/" className="">
          Go to Question page
        </Link>
        <input className="question-input" type="text" name="question" Placeholder="Title" onChange={handleChange} />
        {/* <textarea
          className="question_input"
          placeholder="Question Description..."
          name="questionDescription"
          onChange={handleChange}
        ></textarea> */}

        <ReactQuill className=" quill " theme="snow" value={value} onChange={setValue}          
                placeholder="Question Description..."/>
        <div className="align-left">
        <button className="btn_post" type="">
          Post Your Question
        </button>
        </div>
      </form>
    </div>
  );
}

export default AskQuestion;