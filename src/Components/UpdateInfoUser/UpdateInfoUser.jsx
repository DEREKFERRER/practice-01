import { useForm } from "react-hook-form";
import './UpdateInfoUser.css'
const UpdateInfoUser = ({ id, back }) => {
  const { register, handleSubmit} = useForm()
  const onSubmit = (data) => {
          fetch(`http://localhost:3000/updateInfo/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
           })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    console.log(user)
                }
            })
            console.log(data)
        }
    return (
        <>
       <div>
          <form className="edit_info" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input 
            className="date"
            type="date"
            placeholder="Birthdate"
            {...register("birthdate", { required: true })}
            />
          </div>
          <div>
            <input 
            className="motto"
            type="text"
            placeholder="motto" 
            {...register("motto")}
            />
          </div>
          <div>
              <button className="saveBtn" type="submit">Save</button>
          </div>
          </form>
          <div className="back_btn">
            <a  onClick={back}>Back</a>
          </div>
        </div>
        </>
    )
}

export default UpdateInfoUser;