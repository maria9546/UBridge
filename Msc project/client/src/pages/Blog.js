import React from 'react'

const Blog = () => {

  const posts = [
    {
      id:1,
      title: "Student life at Roehampton University",
      desc: "I met students from all over the world, made friends and discovered different cultures. The universities here are great, with modern resources and excellent professors. They have helped me think critically and solve problems in my field.Living in a new country has made me more independent and flexible. Every day I learn something new about the local customs and traditions which was very exciting.",
      img: "https://www.montevallo.edu/wp-content/uploads/2021/05/aGreen_resized.jpg",
    },
    {
      id:2,
      title:"Student life in United Kingdom",
      desc:"The time I spent studying in the UK was truly extraordinary.Partner cultures and experiences made me more understanding and open minded.The education system here is top notch. The teachers use creative methods and provide strong support, allowing me to grow intellectually. I developed critical thinking skills, immersed myself in my interests, and gained practical knowledge for my future career",
      img:"https://images.pexels.com/photos/6334869/pexels-photo-6334869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id:3,
      title:"Student life at Greenwich University",
      desc:"Studying at the University of Greenwich was a great experience. The campus is vibrant and the faculty is exceptional, creating a learning environment. The programs are comprehensive and the teaching methods are innovative, allowing me to think critically and apply my skills in practice. Interdisciplinary collaborative projects broadened my mind and prepared me for real-life situations.",
      img:"https://images.pexels.com/photos/3978518/pexels-photo-3978518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id:4,
      title:"University Experiences in united Kingdom",
      desc: "I encountered different traditions and languages every day, which broadened my global awareness and made me more flexible.Apart from the classes, the rich culture of the UK fascinated me. Visiting historical sites, participating in cultural events and making friends from different backgrounds showed me how our world is connected.Exploring historic sites and attending cultural events was great fun",
      img:"https://images.pexels.com/photos/15093000/pexels-photo-15093000/free-photo-of-young-man-after-graduation.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
  return (
    <div class='blog'>
      <div class='posts'>
        {posts.map((post) => (
          <div class='post' key={post.id}>
            <div class='img'>
              <img src={post.img} alt=""/>
            </div>
            <div class='content'>
                <h1>{post.title}</h1>
              <p>{post.desc}</p>
            </div>
          </div>
        ))}
      </div><br/><br/><br/>
    </div>
  );
};

export default Blog
