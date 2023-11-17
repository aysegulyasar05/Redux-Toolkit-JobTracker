import { useEffect} from "react";
import Card from "../components/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobs,setError } from "../redux/JobSlice";
import Filter from "../components/Filter";

const JobList = () => {
const dispatch= useDispatch();
const state = useSelector((store)=> store);

    useEffect(()=>{
        axios
        .get("http://localhost:3040/jobs")
        .then((res)=> dispatch(setJobs(res.data)))
        .catch((err)=>dispatch(setError(err)));

    },[]);

  console.log(state);

  return (
    <div className="list-page">
      <div><Filter/></div>

      <h3 className="job-count">
        You are viewing ({state.mainJobs.length}) out of the found ({''}{state.jobs.length}) jobs
      </h3>
      <section className="list-section">
        {/* egerki api den cvp bekleniyorsa */}
        {!state.initialized && <p>Loading...</p>}

        {/* Api'den cevap geldiyse ve herhangi bir hata yoksa */}
        {state.initialized && !state.isError ? (
          <>
            {state.jobs.map((job) => (
              <Card key={job.id} job={job} />
            ))}
          </>
        ) : (
          <p>ERROR....</p>
        )}
      </section>
    </div>
  );
}

export default JobList
