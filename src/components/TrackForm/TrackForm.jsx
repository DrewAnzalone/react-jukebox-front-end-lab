import { useState } from "react"


const TrackForm = (props) => {
  const initialState = {
    title: '',
    artist: '',
  }

  const [formData, setFormData] = useState(props.selected ?? initialState);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (props.selected) {
      props.handleUpdateTrack(formData, props.selected._id);
    } else {
      props.handleAddTrack(formData);
    }
    setFormData(initialState)
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"> Title </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="artist"> Artist </label>
        <input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {props.selected? "Update Track" : "Add New Track"}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
