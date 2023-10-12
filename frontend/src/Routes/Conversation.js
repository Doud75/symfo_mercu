import {useEffect, useRef, useState} from "react";
import React from "react";
import FormMessage from "../Component/Message/FormMessage";
import {useParams} from "react-router-dom";
import ShowMessage from "../Component/Message/ShowMessage";

export default function Home() {
  const { id } = useParams()
  const idNum = Number(id);

  const [message, setMessage] = useState({message: []})

  return(
    <>
      <FormMessage setMessage={setMessage} message={message} convId={idNum}/>
      <ShowMessage setMessage={setMessage} message={message} convId={idNum}/>
    </>
  )
}
