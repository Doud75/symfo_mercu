import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Message from "./Message"


export default function ShowMessage({setMessage, message, convId}) {

  const token = sessionStorage.token

  useEffect(() => {
    fetch(`http://localhost:8245/message/${convId}`, {
      headers: new Headers({
        "Authorization" : "Bearer " + token
      })
    })
      .then(data => data.json())
      .then(json => {
        setMessage(json)
      })

    const url = new URL('https://localhost:9090/.well-known/mercure');
    url.searchParams.append('topic', 'https://example.com/my-private-topic');

    const eventSource = new EventSource(url, {withCredentials: true});
    eventSource.onmessage = handleMessage;

    return () => {
      eventSource.close()
    }
  },[])

  const handleMessage = (e) => {
    console.log(JSON.parse(e.data));
  }

  return (
    <>
      {message.message.map((value, index) => {
        return (<Message key={index} {...value}/>)
      })}
    </>
  )
}
