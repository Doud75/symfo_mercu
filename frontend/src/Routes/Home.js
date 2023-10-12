import {useEffect, useState} from "react";
import React from "react";
import ShowConv from "../Component/Conv/ShowConv";
import FormConv from "../Component/Conv/FormConv";

export default function Home() {

  const [conv, setConv] = useState({conv: []})

  return(
    <>
      <FormConv setConv={setConv} conv={conv}/>
      <ShowConv setConv={setConv} conv={conv}/>
    </>
  )
}
