const LoginForm = ({
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <br />
          <input
            type="text"
            value={username}
            autoComplete="username"
            onChange={setUsername}
          />
        </label>
        <br />
        <br />
        <label>
          Password
          <br />
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={setPassword}
          />
        </label>
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
