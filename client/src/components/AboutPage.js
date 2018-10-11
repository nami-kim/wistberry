import React from 'react';
import Header from './Header';

const AboutPage = () => {
  return (
    <div>
      <Header defaultHeader={true} />
      <div className="container">
        <h1>About Page</h1>
        <div
          className="about__animation"
          style={{
            backgroundImage:
              "url('https://s3-us-west-2.amazonaws.com/wistberry/images/bowery/animation.gif')",
            backgroundSize: 'cover',
            width: '524px',
            height: '282px'
          }}
        />
      </div>
    </div>
  );
};

export default AboutPage;
