const Card = ({ job }) => {
  
  
  const getClassName = () => {
    switch (job.status) {
      case "Applied":
        return "applied";
      case "Rejected":
        return "rejected";

      case "Interview":
        return "interview";

      case "Offer":
        return "offer";

      default:
        return "default";
    }
  };

  return (
    <div className="card">
      {/* üst */}
      <div className="head">
        <div className="letter">
          <p>{job.company[0]}</p>
        </div>
        <div className="info">
          <p>{job.position}</p>
          <p>{job.company}</p>
        </div>
      </div>
      {/* alt kisim */}
      <div className="body">
        <div className="field">
          <img src="/img/map.png" />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <img src="/img/calendar.png" />
          <p>{job.date}</p>
        </div>
        <div className="field">
          <img src="/img/bag.png" />
          <p>{job.type}</p>
        </div>

        <div className="status">
          <span className={getClassName()}>{job.status}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
