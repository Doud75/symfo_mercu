import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import React from "react";
import ShowConv from "../Component/Conv/ShowConv";
import FormConv from "../Component/Conv/FormConv";

export default function Home() {

  const [conv, setConv] = useState({conv: []})
  const navigate = useNavigate()

  const deco = () => {
    sessionStorage.removeItem('token');
    navigate("/login");
  }

  return(
    <>
      <button className="btn btn-outline-dark btn-lg px-5" onClick={deco}>Déconnexion</button>
      <FormConv setConv={setConv} conv={conv}/>
      <ShowConv setConv={setConv} conv={conv}/>
    </>
  )
}
