import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';
import TrackList from './components/TrackList/TrackList';
import TrackDetail from './components/TrackDetails/TrackDetails';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);

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


  return (
    <>
      <TrackList tracks={tracks} handleSelect={handleSelect} />
      <TrackDetail selected={selected} />
    </>
  );
};

export default App;
