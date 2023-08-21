import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../img/image1.jpg';
import image2 from '../img/image2.jpeg';
import image3 from '../img/image3.jpg';
import image4 from '../img/image4.jpg';
import Icon1 from '../img/icon 1.png'
import Icon2 from '../img/icon 2.png'
import Icon3 from '../img/icon3.png'
import Icon4 from '../img/icon 4.jpeg'


function Home() {
  return (
    <div class='home'>
      <section class='image-slider'>
        <Carousel>
          <div>
            <p class='text'>Strengthening spirit, bridging the future. <br/>
            Discover endless opportunities for education and growth on our platform. <br/>
            Join us in building a better future!</p>
            <img src={image1} alt='Slide 1' class='slider-image' />
          </div>
          <div>
            <img src={image2} alt='Slide 2' class='slider-image' />
          </div>
          <div>
            <img src={image3} alt='Slide 3' class='slider-image' />
          </div>
          <div>
            <img src={image4} alt='Slide 4' class='slider-image' />
          </div>
        </Carousel>
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
          <p>International students face one of the challenges of connecting with students from other universities ,
            Using this website students can connect with peers from other universities .</p>
        </div>
        <div class="icon">
          <img src={Icon2} alt="icon2"/>
          <p>Students can share accomodation availabilities, study resources, study materials and job
             opportunities with peers.It will help to improve career as stronger.</p>
        </div>
        <div class="icon">
          <img src={Icon3} alt="icon3"/>
          <p>Students can take advice from the graduate students about the career opportunities, 
            university life  and the lifestyle of the UK.</p>
        </div>
        <div class="icon">
          <img src={Icon4} alt="icon4"/>
          <p>Students can filter the students based on the courses and universities .It will help to find out who has taken the specific courses ,
            and who is studying in the specific universities based on our needs.</p>
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
        <a href="/contact" class="button">GIVE FEEDBACK</a>
      </div>
    </div>
  );
};

export default Home;



