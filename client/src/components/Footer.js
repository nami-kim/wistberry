import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-content__subscribe">
        <div className="subscribe" />
        <ul className="footer-social">
          <li className="footer-social__item">
            <a
              href="https://www.instagram/wistberry/"
              className="footer-social__Link"
              target="blank"
            >
              Instagram
            </a>
            <a
              href="https://www.instagram/wistberry/"
              className="footer-social__Link"
              target="blank"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  stroke="#aaa"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  d="M18.768 7.5h-4.268v-1.905c0-.896.594-1.105 1.012-1.105h2.988v-3.942l-4.329-.013c-3.927 0-4.671 2.938-4.671 4.82v2.145h-3v4h3v12h5v-12h3.851l.417-4z"
                  fill="none"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram/wistberry/"
              className="footer-social__Link"
              target="blank"
            >
              twitter
            </a>
          </li>
        </ul>
      </section>
      <nav />
    </footer>
  );
};

export default Footer;
