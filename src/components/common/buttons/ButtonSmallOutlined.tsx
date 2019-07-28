import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ScrollToTop } from "../../../helpers/ScrollToTop";
interface IProps {
  text: string;
  url?: string;
  external?: boolean;
  internal?: boolean;
  className?: string;
}

const ButtonWithoutStyling: React.FunctionComponent<IProps> = ({
  text,
  url,
  external,
  internal,
  className
}: IProps): JSX.Element | null => {
  if (!text) return null;

  if (!url)
    return (
      <button
        className={`btn btn-sm py-0 px-1 btn-outline-secondary ${className &&
          className}`}
      >
        {text}
      </button>
    );

  if (internal)
    return (
      <Link to={url} onClick={() => ScrollToTop()}>
        <button
          className={`btn btn-sm py-0 px-1 btn-outline-secondary ${className &&
            className}`}
        >
          {text}
        </button>
      </Link>
    );

  if (external)
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button
          className={`btn btn-sm py-0 px-1 btn-outline-secondary ${className &&
            className}`}
        >
          {text}
        </button>
      </a>
    );

  return null;
};

export const ButtonSmallOutlined = styled(ButtonWithoutStyling)`
  margin-right: 0.5rem;
  box-shadow: ${props => props.theme.shadows.sm};
  border-radius: ${props => props.theme.rounded.sm};
`;
