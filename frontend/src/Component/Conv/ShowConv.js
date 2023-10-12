import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Conv from "./Conv"


export default function ShowConv({setConv, conv}) {

  const token = sessionStorage.token

  useEffect(() => {
    fetch('http://localhost:8245/conv', {
      headers: new Headers({
        "Authorization" : "Bearer " + token
      })
    })
      .then(data => data.json())
      .then(json => {
        setConv(json)
      })

  },[])

  return (
    <>

      {conv.conv.map((value, index) => {
        return (<Conv key={index} {...value}/>)
      })}
    </>
  )
}
