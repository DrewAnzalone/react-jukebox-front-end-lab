import { useState, useEffect } from 'react';
import './App.css'

import * as trackService from './services/trackService';
import TrackList from './components/TrackList/TrackList';
import TrackDetail from './components/TrackDetail/TrackDetail';
import TrackForm from './components/TrackForm/TrackForm';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelect = (track) => {
    setSelected(track);
    setIsFormOpen(false);
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

  function handleFormView(track) {
    if (!track?._id) setSelected(null);

    setIsFormOpen(!isFormOpen);
  }

  async function handleAddTrack(formData) {
    try {
      const newTrack = await trackService.create(formData);
      if (newTrack.err) {
        throw new Error(newTrack.err);
      }

      setTracks([...tracks, newTrack]);
      setSelected(newTrack);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateTrack(formData, id) {
    try {
      const updatedTrack = await trackService.update(formData, id);
      if (updatedTrack.err) {
        throw new Error(updatedTrack.err);
      }

      const newTracks = tracks.map(t => t._id === id ? updatedTrack : t);
      setTracks(newTracks);

      setSelected(updatedTrack);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteTrack(id) {
    try {
      const deletedTrack = await trackService.deleteTrack(id);
      if (deletedTrack.err) {
        throw new Error(deletedTrack.err);
      }

      const newTracks = tracks.filter(t => t._id !== id);
      setTracks(newTracks);

      setSelected(null);
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
        <TrackForm
          handleAddTrack={handleAddTrack}
          handleUpdateTrack={handleUpdateTrack}
          selected={selected}
        />
        :
        <TrackDetail
          selected={selected}
          handleFormView={handleFormView}
          handleDeleteTrack={handleDeleteTrack}
        />
      }
    </>
  );
};

export default App;
