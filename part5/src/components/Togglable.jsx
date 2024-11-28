import { useState } from 'react'

const Togglable = (props) => {
  const [isHidden, setIsHidden] = useState(true)
  return (
    <div>
      {isHidden ?
        <button data-testid='showBlogsForm' onClick={() => setIsHidden(false)}>{props.buttonLabelForShow}</button>
        :
        <div>
          {props.children}
          <button onClick={() => setIsHidden(true)}>{props.buttonLabelForHide}</button>
        </div>
      }
    </div>
  )
}

export default Togglable