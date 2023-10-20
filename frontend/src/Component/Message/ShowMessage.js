import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Message from "./Message"
import jwt_decode from "jwt-decode";
import useGetUserList from "../../Hook/useGetUserList";


export default function ShowMessage({setMessage, message, convId}) {

  const [userList, setUserList] = useState([]);

  const token = sessionStorage.token
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8245/message/${convId}`, {
      headers: new Headers({
        "Authorization" : "Bearer " + token
      })
    })
      .then(data => data.json())
      .then(json => {
        if (json.message) {
          if (json.message === "invalid cred") {
            sessionStorage.removeItem('token');
            navigate("/login")
            return
          }
        }
        setMessage(json)
      })

    const url = new URL('http://localhost:9090/.well-known/mercure');
    url.searchParams.append('topic', 'https://example.com/my-private-topic');

    const eventSource = new EventSource(url, {withCredentials: true});
    eventSource.onmessage = handleMessage;

    return () => {
      eventSource.close()
    }
  },[])

  const handleMessage = (e) => {
    const data = JSON.parse(e.data)
    setMessage(
      prevState => {
        return {
          message: [
            ...prevState.message,
            data.message,
          ]
        }
      }
    )
  }

  return (
    <div style={{marginBottom: '250px'}}>
      {message.message.map((value, index) => {
        return (<Message key={index} {...value}/>)
      })}
    </div>
  )
}
