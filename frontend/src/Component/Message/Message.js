import jwt_decode from "jwt-decode";

export default function Message({content, id, author}) {

  const token = sessionStorage.token
  const decodeToken = (jwt_decode(token));
  const currentUserName = decodeToken.mercure.payload.username;
  let myMessage = "card bg-light text-black";
  let myCard = "row d-flex justify-content-start align-items-center h-100"

  if (currentUserName === author) {
    myMessage = "card bg-success text-white";
    myCard = "row d-flex justify-content-end align-items-center h-100"
  }

  return (
    <div className="container col-5 col-sm-12 col-md-7 col-lg-6 col-xl-5 py-2 h-100">
      <div className={myCard}>
        <div className="col-12 col-sm-6 col-md-8 col-lg-8 col-xl-8">
          <h3>{author}</h3>
          <div className={myMessage} style={{borderRadius: '1rem'}}>
            <div className="small p-1 ms-3 mt-3 rounded-3">
              <p>{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
