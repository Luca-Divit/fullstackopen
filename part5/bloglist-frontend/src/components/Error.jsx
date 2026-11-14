const Error = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="error">
      <strong>{message}</strong>
    </div>
  );
};

export default Error;
