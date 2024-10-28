const Notification = ({message, className}) => {
    if (message !== null) {
        return (
          <div className={className}>
            <p>{message}</p>
          </div>
        );
      } else {
        return null;
      }
}

export default Notification