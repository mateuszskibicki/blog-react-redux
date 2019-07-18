import React, { useState } from "react";
//@ts-ignore
import Prism from "prismjs";

import { ICodeSlice } from "../../types/slices.types";

const CodeSlice: React.FC<{ content: ICodeSlice }> = ({
  content
}: {
  content: ICodeSlice;
}) => {
  const [show, setShow] = useState<boolean>(false);

  const { title, language, code }: ICodeSlice = content;

  const copyToClipboard = (): void | null => {
    if (!code) return null;
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
        <pre className="language-javascript shadow rounded">
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
        <pre className="language-html shadow rounded">
          <code
            className="language-html"
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(code, Prism.languages.html, "html")
            }}
          />
        </pre>
      )}
      {language === "css" && (
        <pre className="language-css shadow rounded">
          <code
            className="language-css"
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(code, Prism.languages.css, "css")
            }}
          />
        </pre>
      )}
      {language === "json" && (
        <pre className="language-javascript shadow rounded">
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
      <button
        onClick={copyToClipboard}
        className="btn btn-main shadow rounded-sm"
      >
        <i className="far fa-save mr-2" /> Copy to clipboard
      </button>
      {show && (
        <span className="ml-2">
          <button className="btn btn-main-outlined btn-copied shadow">
            Copied!
          </button>
        </span>
      )}
    </section>
  );
};

export default CodeSlice;
