import { useForm } from "react-hook-form";
import './signup.css'
const Signup = ({ onRouteChange, updateUser }) => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    
    const onSubmit = (data) => {
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(user => {
            if (user) {
                updateUser(user)
                onRouteChange('home')
            }
        })
    }
   
    return (
        <>
       <div className="container">
            <div className="Signup_form">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                   <input 
                        className="name"
                        type="name"
                        placeholder="Name"
                        {...register("name", { required: true })}/>
                        {errors.name && <span style={{color: "#FC2E20", paddingLeft: "15px"}}>Name is required</span>}
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
                        {...register("password", { required: true })}/>
                        {errors.email && <span style={{color: "#FC2E20", paddingLeft: "15px"}}>Password is required</span>}
                    <div className="signin_btn" >
                        <a 
                            onClick={() => onRouteChange('signin')}>
                            Sign In
                        </a>
                    </div>
                    <div className="Btn">
                        <button
                            className="submitBtn" 
                            type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Signup;