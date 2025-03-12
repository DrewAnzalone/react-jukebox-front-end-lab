import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';
import TrackList from './components/TrackList/TrackList';
import TrackDetail from './components/TrackDetail/TrackDetail';
import TrackForm from './components/TrackForm/TrackForm';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelect = (track) => {
    setSelected(track)
  }

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchedTracks = await trackService.index();
        if (fetchedTracks.err) {
          throw new Error(fetchedTracks.err);
        }
        setTracks(fetchedTracks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTracks();
  }, []);

  function handleFormView() {
    setIsFormOpen(!isFormOpen);
  }

  async function handleAddTrack(formData) {
    try {
      const newTrack = await trackService.create(formData);
      setTracks([...tracks, newTrack]);
      setSelected(newTrack);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <TrackList
        tracks={tracks}
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ?
        <TrackForm handleAddTrack={handleAddTrack} />
        :
        <TrackDetail selected={selected} />
      }
    </>
  );
};

export default App;
