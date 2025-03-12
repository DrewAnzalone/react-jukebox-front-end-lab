import { useState } from "react"

const TrackForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
  });

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  return (
    <div>
      <form>
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
        <button type="submit">Add New Track</button>
      </form>
    </div>
  );
};

export default TrackForm;
