import React from 'react'
import "./Question.css";
import profile from "../images/user3.png";


// icons 
import { Icon } from "react-icons-kit";
import {chevronRight} from 'react-icons-kit/fa/chevronRight'

const Question = ({question,userName}) => {
    return (
        <div className='the_hole-question' >


        <div className="avatar-container">
            <div className="av-user">
                <img className="avatar" src={profile} alt="Avatar" />
                <h6 className="">{userName}</h6>
            </div>
            <div className="que-desc">
                <h6 className="">{question}</h6>
            </div>
           
        </div>
        <div className='fieldIcon' style={{ color: 'black', }}>
        <Icon className="field-icon" icon={chevronRight} size={30} />
        </div>
        </div>

    )
}

export default Question