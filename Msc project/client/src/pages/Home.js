import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../img/img1.jpeg'
import Icon1 from '../img/icon 1.png'
import Icon2 from '../img/icon 2.png'
import Icon3 from '../img/icon3.png'
import Icon4 from '../img/icon 4.jpeg'


function Home() {
  return (
    <div class='home'>
      <section className='image-slider'>
        <div className='image-container'>
          <img src={img1} alt='Slide 1' className='slider-image' />
        </div>
      </section>
      <div class='about'>
        <h1>EXPLORE OUR FEATURES</h1>
        <p class='description'>Welcome to the UK International Student Centre,we provide an opportunity for students to interact with peers from other universities in the UK. Our platform is tailored to the unique needs of students who are passionate about connection, collaboration, and fulfillment throughout their academic journey.Using this website students can make friends from other university ad they can expand the connections all over the UK.
        Going through the challenges of building relationships overseas can be discouraging, especially if you`re spread across several campuses. <br/>
        Our platform is like a digital meeting place where students from various universities gather to share thoughts, experiences, and useful materials. Whether you want to understand a specific topic better, find study materials, or get guidance for university life, our center is here to make your journey through education more convenient, enjoyable, and fulfilling.
      </p>
      </div>
      <div class='features' id='service'>
        <h1>OUR PROVIDING SERVICES</h1>
        <div class="icon">
          <img src={Icon1} alt="icon1"/>
          <p>Students can connect with peers from other universities .</p>
        </div>
        <div class="icon">
          <img src={Icon2} alt="icon2"/>
          <p>Students can share accomodation availabilities, study resources, study materials and job
             opportunities with peers.</p>
        </div>
        <div class="icon">
          <img src={Icon3} alt="icon3"/>
          <p>Students can take advice from the graduate students about the career opportunities.</p>
        </div>
        <div class="icon">
          <img src={Icon4} alt="icon4"/>
          <p>Students can filter the students based on the courses and universities.</p>
        </div>
      </div>
      <div class='FAQ'>
        <h1>FAQ</h1>
        <details>
          <summary>Will I get free support and update?</summary>
          <div>
            Yes,we provide free update and support.Our support team is here to assist you with any questions or issues.
          </div>
        </details>
        <details>
          <summary>How do I create an account on your website?</summary>
          <div>
            Creating an account is easy.Just click on the Signup/Signin menu and fill the form.
          </div>
        </details>
        <details>
          <summary>Is my personal information secure?</summary>
          <div>
            Yes,We take your privacy seriously.
          </div>
        </details>
      </div>
      <div class='feedback'>
        <div class='feedbacktext'>Share your thoughts how we can improve our website.Your feedback is valuable for us</div>
        <a href="/contact" class="button">GIVE FEEDBACK</a><br/><br/><br/>
      </div>
    </div>
  );
};

export default Home;
