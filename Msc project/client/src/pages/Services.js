import React from 'react'
import Icon1 from '../img/icon 1.png'
import Icon2 from '../img/icon 2.png'
import Icon3 from '../img/icon3.png'
import Icon4 from '../img/icon 4.jpeg'

const Service = () => {
    return (
        <div>
        <div className="service-container">
            <div className="service-content">
                <h1 className="service-title">SERVICES</h1>
                <div className="service-icons">
                    <div className="service-icon">
                        <img src={Icon1} alt="icon1" />
                        <h1>Connects</h1>
                        <p>International students face one of the challenges of connecting with students from other universities, Using this website students can connect with peers from other universities.</p>
                    </div>
                    <div className="service-icon">
                        <img src={Icon2} alt="icon2" />
                        <h1>Sharing</h1>
                        <p>Students can share accommodation availabilities, study resources, study materials, and job opportunities with peers. It will help to improve career prospects.</p>
                    </div>
                    <div className="service-icon">
                        <img src={Icon3} alt="icon3" />
                        <h1>Advice</h1>                        
                        <p>Students can take advice from graduate students about career opportunities, university life, and the lifestyle of the UK.</p>
                    </div>
                    <div className="service-icon">
                        <img src={Icon4} alt="icon4" />
                        <h1>Filtering</h1>
                        <p>Students can filter students based on courses and universities. It will help to find out who has taken specific courses, and who is studying in specific universities based on our needs.</p>
                    </div>
                </div>
            </div>
        </div>
        <br/><br/>
        </div>
        
    );
}

export default Service;
