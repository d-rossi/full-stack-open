const Notification = ({ message }) => {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 10
    }

    return (message === '' 
    ? null 
    :  
    <div style={style}>
        {message}
    </div>)
  }
  
  export default Notification