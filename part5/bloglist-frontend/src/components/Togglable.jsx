import { useState } from "react";

const Togglable = ({ label, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{label}</button>
      {visible && children}
    </div>
  );
};

export default Togglable;
