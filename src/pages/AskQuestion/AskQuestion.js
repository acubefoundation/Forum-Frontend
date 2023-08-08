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
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const [value, setValue] = useState('');



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  



  const handleSubmit = async (e) => {
    e.preventDefault();

    const { question, questionDescription } = form; // Assuming you have the form state

    // // Check if question and questionDescription are not empty
    // if (!question || !questionDescription) {
    //     alert("Please fill out both the title and description before submitting.");
    //     return;
    // }

    // Set loading state to true before making the API request
    setLoading(true);

    try {
        // Make a POST request to your API endpoint for posting questions
        const response = await axios.post(`https://lazy-battledress-fawn.cyclic.cloud/api/question`, {
          user_id: userData.user.id,
            question: form.question,
            description: value
        });

        // Handle the response data if needed

        // Reset the form after successful submission
        setForm({
            question: '',
            questionDescription: ''
        });

        // Navigate or perform any other actions on successful submission
    } catch (err) {
        console.log("Error posting question:", err);
        // Set error state with the error message
        setError("Error posting the question. Please try again later.");
    } finally {
        // Set loading state back to false after the API request is completed (whether it succeeded or failed)
        setLoading(false);
        setError(null);
    }
};

  console.log(userData)
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
      {error && (
  <div className="error-message">{error}</div>
)}
      {loading ? (
  <div>Loading...</div>
) : (
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
)};
    </div>
  );
}

export default AskQuestion;