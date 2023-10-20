import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";


export default function Form({setMessage, message, convId}) {

  const [formData, setFormData] = useState({content: ""})

  const token = sessionStorage.token
  const navigate = useNavigate()
  let input = document.querySelector("#typeEmailX")

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.convId = convId;
    input.value = '';

    fetch(`http://localhost:8245/message`, {
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
          }
        }
      })
  }

  const handleChange = (e) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <>
      <div className="container py-2 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-6 col-lg-8 col-xl-8" style={{position: "fixed", bottom: '40px'}}>
            <div className="card bg-light text-black " style={{borderRadius: '1rem'}}>
              <form className="card-body p-4" onSubmit={handleSubmit}>
                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeEmailX">Message</label>
                  <input type="text" id="typeEmailX" className="form-control form-control-lg" name="content" onChange={handleChange}/>
                </div>
                <button className="btn btn-outline-dark btn-lg px-4" type="submit">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
