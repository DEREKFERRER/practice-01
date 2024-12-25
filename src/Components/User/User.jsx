import Edituser from '../UpdateInfoUser/UpdateInfoUser';
import './style.css'
const User = ({ name }) => {
    return (
        <>
        <div className='container_user'>
            <div className="user_info">
                <p>{name}</p>
                <p>Birthday</p>
                <p>Motto</p>
                <a onClick={() => editRoute(editUser)}>Edit</a>
            </div>
        </div>
        </>
    )
}

export default User;