import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="content has-text-centered has-text-white">
          Icons made by{" "}
          <a
            href="https://www.freepik.com/"
            title="Freepik"
            className="has-text-white"
          >
            Freepik
          </a>{" "}
          from{" "}
          <a
            href="https://www.flaticon.com/"
            title="Flaticon"
            className="has-text-white"
          >
            www.flaticon.com
          </a>{" "}
          is licensed by{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
            rel="noopener noreferrer"
            className="has-text-white"
          >
            CC 3.0
          </a>
        </div>
        <div className="content has-text-centered has-text-white">
          <p className="">
            Copyright &copy; {new Date().getFullYear()}{" "}
            <strong className="has-text-white">Salsa App</strong> developed by
            Ivan Garcia.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
