import PropTypes from "prop-types";

/* Error message page */

function ErrorComponent({ status }) {
  return (
    <div>
      <h1>{status} Error!</h1>
      {status === "404" ? (
        <p>That page isn&apos;t here</p>
      ) : (
        <p>Something went wrong. Please try again.</p>
      )}
    </div>
  );
}

ErrorComponent.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ErrorComponent;