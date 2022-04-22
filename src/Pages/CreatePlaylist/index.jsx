import FormCreatePlaylist from "../../components/FormCreatePlaylist";
import Searchbar from "../../components/Searchbar";
import Card from "../../components/Card";
// import { useSelector } from "react-redux";
import { useState } from "react";
import DarkMode from "../../components/Darkmode";
import Head from "../../components/Head";

const CreatePlayList = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState([]);

  const onSuccessSearch = (tracks) => {
    const selectedTracks = filterSelectedTracks();
    const searchDistincTracks = tracks.filter(
      (track) => !selected.includes(track.uri)
    );

    setTracks([...selectedTracks, ...searchDistincTracks]);
  };

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selected.includes(uri)) {
      setSelected(selected.filter((item) => item !== uri));
    } else {
      setSelected([...selected, uri]);
    }
  };

  const filterSelectedTracks = () => {
    return tracks.filter((track) => selected.includes(track.uri));
  };

  return (
    <div className="home">
      <div className="darkmode">
        <DarkMode />
      </div>
      <div className="info">
        <Head />
      </div>

      <FormCreatePlaylist uris={selected} />

      <div className="search-bar">
        <Searchbar onSuccess={(tracks) => onSuccessSearch(tracks)} />
      </div>

      <div className="container" data-testid="tracks-list">
        {tracks.map((track) => (
          <Card
            key={track.id}
            className="container"
            img={track.album.images[0].url}
            title={track.name}
            artists={track.artists[0].name}
            duration={track.duration_ms}
            toggleSelect={() => toggleSelect(track)}
          />
        ))}
      </div>
    </div>
  );
};

export default CreatePlayList;
