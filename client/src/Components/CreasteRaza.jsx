import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";



export default function CartelCreasteRaza() {  
    const user = useSelector(state => state.user)

    return (
        <div>
            <h1>FELICITACIONES! {user.username} creaste una nueva raza de perro</h1>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <Link to="/perfil">
                <button>Razas creadas</button>
            </Link>
        </div>
    )
}