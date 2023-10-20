import {useEffect, useRef, useState} from "react";
import React from "react";
import FormMessage from "../Component/Message/FormMessage";
import {useNavigate, useParams} from "react-router-dom";
import ShowMessage from "../Component/Message/ShowMessage";

export default function Home() {
  const { id } = useParams()
  const idNum = Number(id);

  const [message, setMessage] = useState({message: []})
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  },[message])

  const deco = () => {
    sessionStorage.removeItem('token');
    navigate("/login");
  }

  return(
    <>
      <ShowMessage setMessage={setMessage} message={message} convId={idNum}/>
      <FormMessage setMessage={setMessage} message={message} convId={idNum}/>
    </>
  )
}
