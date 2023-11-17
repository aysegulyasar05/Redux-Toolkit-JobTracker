import { v4 } from "uuid";
import { statusOpt, typeOpt } from "../Helpers/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addJob } from "../redux/JobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AddJob = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault();
   const form = new FormData(e.target);
   const newJob = Object.fromEntries(form.entries())
   
   // select kisimlarinin secilmemmesi durumu
  if (!newJob.type || !newJob.status) {
    toast.info("Please fill them all");
    return;
  }

  //objeye id ekleme
  newJob.id= v4()
  //tarih ekleme
  newJob.date= new Date().toLocaleDateString()
  
//!gelen yeni is verisini apiye ekleme

axios.post("http://localhost:3040/jobs",newJob)
.then(()=>{ 
  //storu güncelle
  dispatch(addJob(newJob));
  // ana sayfaya yönlendir
  navigate('/');
  //bildirim
  toast.success('Added successfuly');
})
.catch(()=> toast.error('Sorry not added.'))
}
  return (
   
      <div className="add-sec">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Position</label>
            < input required type="text" name="position" />
          </div>
          <div>
            <label>Company</label>
            < input required type="text" name="company" />
          </div>
          <div>
            <label>Location</label>
            < input required type="text" name="location" />
          </div>
          <div>
            <label>Status</label>
            <select name="status">
              <option selected disabled>
                Choose
              </option>
              {statusOpt.map((opt, i) => (
                <option key={i}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Type</label>
            <select name="type">
              <option selected disabled>
                Choose
              </option>
              {typeOpt.map((opt, i) => (
                <option key={i}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <button>ADD</button>
          </div>
        </form>
      </div>
   
  );
}



export default AddJob
