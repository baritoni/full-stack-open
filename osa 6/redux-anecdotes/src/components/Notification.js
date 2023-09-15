import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    console.log('notification: ', notification)
    if (notification !== '') {
      return notification
    }
    return null
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: 10
  }
  if (notification !== null) {
    return <div style={style}>{notification}</div>
  }
  return null
}

export default Notification
