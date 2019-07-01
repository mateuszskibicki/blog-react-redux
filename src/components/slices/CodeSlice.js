import React, { useState } from "react";
import PropTypes from "prop-types";
import Prism from "prismjs";

const CodeSlice = ({ slice }) => {
  if (!slice) return null;

  const [show, setShow] = useState(false);

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = code;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  return (
    <section className="my-2 container code-slice">
      {title && <h4 className="code-slice__title">{title}</h4>}
      {language === "javascript" && (
        <pre className="language-javascript shadow">
          <code
            className="language-javascript"
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                code,
                Prism.languages.javascript,
                "javascript"
              )
            }}
          />
        </pre>
      )}
      {language === "html" && (
        <pre className="language-html shadow">
          <code
            className="language-html"
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(code, Prism.languages.html, "html")
            }}
          />
        </pre>
      )}
      {language === "css" && (
        <pre className="language-css shadow">
          <code
            className="language-css"
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(code, Prism.languages.css, "css")
            }}
          />
        </pre>
      )}
      {language === "json" && (
        <pre className="language-javascript shadow">
          <code
            className="language-javascript"
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                code,
                Prism.languages.javascript,
                "javascript"
              )
            }}
          />
        </pre>
      )}
      <button onClick={copyToClipboard}>
        <i className="far fa-save mr-2" /> Copy to clipboard
      </button>
      {show && (
        <span className="ml-2">
          <button className="btn btn-copied btn-small">Copied!</button>
        </span>
      )}
    </section>
  );
};

CodeSlice.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    language: PropTypes.string,
    code: PropTypes.string
  })
};

export default CodeSlice;
