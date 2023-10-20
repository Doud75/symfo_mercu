import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import useGetUserList from "../../Hook/useGetUserList";
import { MultiSelect } from "react-multi-select-component";
import jwt_decode from "jwt-decode";


export default function Form({setConv, conv}) {

  const [formData, setFormData] = useState({name: ""})
  const [userList, setUserList] = useState([]);
  const [selected, setSelected] = useState([]);

  const token = sessionStorage.token
  const decodeToken = (jwt_decode(token));
  const currentUserName = decodeToken.mercure.payload.username;
  const navigate = useNavigate()
  const getUserList = useGetUserList();
  let options = [];
  let input = document.querySelector("#typeEmailX")

  let disable = false
  userList.forEach(user => {
    if (user.username === currentUserName) {
      disable = true;
    }
    options.push({label: user.username, value: user.username, disabled: disable});
    disable = false;
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.convUserName = JSON.stringify(selected);
    setSelected(() => []);
    input.value = '';

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
        console.log(json)
        if (json.message) {
          console.log(json.message)
          if (json.message === "invalid cred") {
            sessionStorage.removeItem('token');
            navigate("/login")
            return
          }
        }
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


  useEffect(() => {
    getUserList().then(data => setUserList(data.users))
  }, [])

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
            <div className="card bg-light text-black " style={{borderRadius: '1rem'}}>
              <form className="card-body p-5" onSubmit={handleSubmit}>
                <h3>Créer une nouvelle conversation</h3>
                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeEmailX">Nom</label>
                  <input type="text" id="typeEmailX" className="form-control form-control-lg" name="name" onChange={handleChange}/>
                </div>
                <div className="form-outline form-white mb-4">
                  <label className="form-label" htmlFor="typeEmailX">Utilisateur</label>
                  {/*<pre>{JSON.stringify(selected)}</pre>*/}
                  <MultiSelect
                    id="typeEmailX"
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                  />
                </div>
                <button className="btn btn-outline-dark btn-lg px-5" type="submit">Valider</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
