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
          <input
            type="text"
            value={username}
            autoComplete="username"
            onChange={(target) => {
              setUsername(target.value);
            }}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(target) => {
              setPassword(target.value);
            }}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
