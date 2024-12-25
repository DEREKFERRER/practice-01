import { useState } from "react";
import UpdateInfoUser from "../UpdateInfoUser/UpdateInfoUser";
import './Home.css'

const Home = ({ id, onRouteChange, name, birthdate, motto }) => {
    const [ isUpdate, setIsUpdate ] = useState(false)

    const updateClick = () => {
        setIsUpdate(true);
    }
    
    const back = () => {
        setIsUpdate(false)
    }

    if (birthdate) {
        const dateObj = new Date(birthdate);
        birthdate = dateObj.toISOString().split('T')[0];
    }
    
    return (
        <>
           <div className="nav_container">
             <a className="navigation" onClick={() => onRouteChange('signin')}>Sign Out</a>
           </div>
            <div className='container_user'>
            <div className="user_info">
                <h1 className="home">WELCOME</h1>
                <h2>{name}</h2>
                { isUpdate 
                 ? 
                 <>
                    <UpdateInfoUser id={id} back={back}/>
                 </>
                 : (
                    <>
                        <p>{birthdate}</p>
                        <p>{motto}</p>
                        <a onClick={updateClick}>Edit</a>
                    </>
                 )
                }
            </div>
        </div>
        </>
    )
}

export default Home;