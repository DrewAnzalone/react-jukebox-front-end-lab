const TrackList = (props) => {
  return (
    <div className="sidebar-container">
      <h1>Track List</h1>
      <div className="list-container">
        {!props.tracks.length ? (
          <h2>No Tracks Yet!</h2>
        ) : (
          <ul>
            {props.tracks.map((track) => (
              <li className="li-container" key={track._id}>
                <p>{track.title}</p>
                <button
                  style={{ color: "#646CFF" }}
                  onClick={() => props.handleSelect(track)}
                >
                  Play
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={props.handleFormView}>
        {props.isFormOpen ? "Close Form" : "New Track"}
      </button>
    </div>
  );


};

export default TrackList;
