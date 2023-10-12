import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Form({setConv, conv}) {

  const [formData, setFormData] = useState({name: ""})

  const token = sessionStorage.token
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8245/conv`, {
      method: "POST",
      mode: "cors",
      body: new URLSearchParams({
        ...formData
      }),
      credentials: "include",
      headers: new Headers({
        "Authorization" : "Bearer " + token,
        "Content-type":  "application/x-www-form-urlencoded"
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
        console.log(json)
        setConv(
          prevState => {
            return {
              conv: [
                json.conv,
                ...prevState.conv,
              ]
            }
          }
        )
      })
  }

  const handleChange = (e) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <>
      <div className="container py-2 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white " style={{borderRadius: '1rem'}}>
              <form className="card-body p-5" onSubmit={handleSubmit}>
                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeEmailX">Name</label>
                  <input type="text" id="typeEmailX" className="form-control form-control-lg" name="name" onChange={handleChange}/>
                </div>
                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeEmailX">Utilisateur</label>
                  <input type="text" id="typeEmailX" className="form-control form-control-lg" name="convUserName" onChange={handleChange}/>
                </div>
                <button className="btn btn-outline-light btn-lg px-5" type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
