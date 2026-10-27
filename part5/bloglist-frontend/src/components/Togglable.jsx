import { useState, useImperativeHandle } from "react"

const Togglable = ({ label, children, ref }) => {
  const [visible, setVisible] = useState(false)

  const handleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { handleVisibility }
  })

  return (
    <div>
      {!visible && <button onClick={handleVisibility}>{label}</button>}
      {visible && children}
    </div>
  )
}

export default Togglable
