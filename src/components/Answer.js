import React from 'react'
import profile from '../images/User.png'
const Answer = ({answer,userName}) => {
    return (
        <div className='the_hole-question'>
            <hr />
            <div className="avatar-container">
                <div className="av-user">
                    <img
                        className="avatar"
                        src={profile}
                        alt="User Avatar"
                    />
                    <h6 className="">{userName}</h6>
                </div>
                <div className="">
                    <div className="">
                       <div dangerouslySetInnerHTML={{__html: (answer)}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Answer