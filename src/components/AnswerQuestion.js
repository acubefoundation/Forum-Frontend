import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import "./answerQuestion.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/UserContext';

const AnswerQuestion = ({ questionId }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [value, setValue] = useState('');

  // const [form, setForm] = useState({});
  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4500/api/answer`,
        {
          id: userData.user.id,
          questionId: questionId,
          answer:value,
        }
      );   
      window.location.reload(false);
    } catch (err) {
      console.log("problem", err);
    }
  }
  return (
    <div className="answer_container">
      <form onSubmit={handleSubmit} className="">
        <h3 className="">Answer The Top Question</h3>
        <div className='text-reset'>

       
        <Link to="/">
          Go to Question page
        </Link>
         </div>

        {/* <textarea
          onChange={handleChange}
          className="answer_input"
          placeholder="Your Answer..."
          name="answer"
          id=""
        ></textarea> */}

        <ReactQuill className="answer_input" theme="snow" value={value} onChange={setValue}          
                placeholder="Question Description..."/>

        <button className="answer_post_btn" type="">
          Post Your Answer
        </button>
      </form>
    </div>
  )
}

export default AnswerQuestion