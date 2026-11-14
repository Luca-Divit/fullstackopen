const Logout = ({ user, handleLogout }) => {
  return (
    <p>
      <i>{user.name} logged in </i>
      <button onClick={handleLogout}>
        <i>Logout</i>
      </button>
    </p>
  );
};

export default Logout;
