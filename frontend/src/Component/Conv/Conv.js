import {redirect, useNavigate} from "react-router-dom";

export default function Conv({name, id}) {
    const navigate = useNavigate()
    const redirect = ()  => {
        navigate(`/conversation/${id}`)
    }

    return (
        <div className="container py-2 h-100" onClick={redirect}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-light text-black " style={{borderRadius: '1rem'}}>
                        <div className="card-body p-5">
                            <h3>{name}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
