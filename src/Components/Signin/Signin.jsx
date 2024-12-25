import { useForm } from "react-hook-form";
import './style.css'
const Signin = ({ onRouteChange, updateUser }) => {
const { register, handleSubmit, formState: { errors }} = useForm()
   
const onSubmit = (data) => {
    fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    console.log(user)
                    updateUser(user);
                    onRouteChange('home')
                }
            })
            .catch(err => console.log("Duplicate user or No user exist!", err))
        }
    return (
        <>
        <div className="container">
             <div className="Signin_form">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        className="email"
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}/>
                        {errors.email && <span style={{color: "#FC2E20", paddingLeft: "15px"}}>Email is required</span>}
                    <input 
                        className="password"
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true})} />
                         {errors.password && <span style={{color: "#FC2E20", paddingLeft: "15px"}}>Password is required</span>}
                    <div  className="signup_btn">
                        <a  
                            onClick={() => onRouteChange('signup')}>
                            Sign Up
                        </a>
                    </div>
                    <div className="Btn">
                            <button
                                className="submitBtn"
                                type="submit"
                                >
                                Sign In
                            </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Signin;