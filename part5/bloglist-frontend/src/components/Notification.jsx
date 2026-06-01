const Notification = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="notification">
      <strong>{message}</strong>
    </div>
  );
};

export default Notification;
