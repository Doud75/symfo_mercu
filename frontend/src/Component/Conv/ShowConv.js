import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Conv from "./Conv"


export default function ShowConv({setConv, conv}) {

  const token = sessionStorage.token
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8245/conv', {
      headers: new Headers({
        "Authorization" : "Bearer " + token
      })
    })
      .then(data => data.json())
      .then(json => {
        if (json.message) {
          console.log(json.message)
          if (json.message === "invalid cred") {
            sessionStorage.removeItem('token');
            navigate("/login")
            return
          }
        }
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
