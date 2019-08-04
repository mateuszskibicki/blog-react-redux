import React, { useState } from "react";
import { connect } from "react-redux";
import { subscribeToMailchimp } from "../../../store/actions/mailchimp/mailchimpActions";

interface IProps {
  error: null | string;
  loading: boolean;
  success: boolean;
  subscribeToMailchimp: Function;
}

const SubscribeEmailFullWidth: React.FC<any> = ({
  error,
  loading,
  success,
  subscribeToMailchimp
}: IProps): JSX.Element => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // send email
  const handleButtonClick = (): void => {
    subscribeToMailchimp(inputValue);
  };

  if (success)
    return (
      <div className="container mx-auto my-5 py-5 mailchimp rounded shadow">
        <div className="row justify-content-center align-items-center  mb-2">
          <h3 className="text-center mailchimp__title">
            Thank you for subscribtion! From time to time you can expect email
            with new articles.
          </h3>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto my-5 py-5 mailchimp rounded shadow">
      <div className="row justify-content-center align-items-center  mb-2">
        <div className="col-12 mb-3">
          <h2 className="text-center mailchimp__title">
            Subscribe to be up to date.
          </h2>
        </div>
        <div className="col-12 col-sm-6 col-xl-5">
          <input
            type="text"
            placeholder="Enter your email"
            className="mailchimp__input rounded shadow-sm"
            onChange={handleInputChange}
            value={inputValue}
          />
        </div>
        <div className="col-12 col-sm-3 col-xl-2">
          <button
            disabled={loading}
            className="btn mailchimp__button w-100 shadow-sm rounded"
            onClick={handleButtonClick}
          >
            {loading ? "Loading..." : "Subscribe"}
          </button>
        </div>
        {error && (
          <div className="col-12 col-sm-9 col-xl-7 mt-3">
            <div className="alert alert-danger">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ mailchimp }: any) => mailchimp;

const mapDispatchToProps = { subscribeToMailchimp };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeEmailFullWidth);
