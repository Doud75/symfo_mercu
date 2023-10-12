export default function Message({content, id, author}) {

  return (
    <div className="container py-2 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white " style={{borderRadius: '1rem'}}>
            <div className="card-body p-5">
              <h3>{author}</h3>
              <p>{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
