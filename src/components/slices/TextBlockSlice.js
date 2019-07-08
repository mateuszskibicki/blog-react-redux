import React from "react";
import PropTypes from "prop-types";
import { RichText } from "prismic-reactjs";

const TextBlockSlice = ({ content }) => {
  if (!content) return null;

  const { title, text_align, button_url, button_title, description } = content;

  return (
    <section className="my-2 slice-text-box">
      <div className={`container ${text_align && "text-" + text_align}`}>
        <div className="row">
          <div className="col-12 col-md-10 col-xl-9 mx-auto">
            {title && <h1>{title}</h1>}
            {description &&
              description.length > 0 &&
              RichText.render(description)}
            {button_url && button_title && (
              <a className="btn btn-danger" href={button_url}>
                {button_title}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

TextBlockSlice.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    text_align: PropTypes.string,
    type: PropTypes.string,
    button_url: PropTypes.string,
    button_title: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.object)
  })
};

export default TextBlockSlice;
