import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import config from "../../lib/config";

import "./index.css";
import { useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import {TRootState} from "../../store";
// import { searchTrack } from "../../lib/fetchApi";

interface IProps{
  onSuccess: (tracks: any[], text: string) => void;
}

const Search: React.FC<IProps> = ({onSuccess}) => {
  const accessToken:string = useSelector((state:TRootState) => state.auth.accessToken);
  const [text, setText] = useState<string>('');

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) =>{
      setText(e.target.value);
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) =>{
      e.preventDefault();

      const requestOptions = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(
          `${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`,
          requestOptions
        ).then((data) => data.json());
  
        const tracks = response.tracks.items;
        onSuccess(tracks, text);
      } catch (e) {
        alert(e);
      }
    };
  return (
    <div>
      <form className="form_inputSearch" onSubmit={onSubmit}>
        <Grid container justify-content="flex-end">
          <TextField
            variant="outlined"
            label="Search a Song"
            required
            onChange={handleInput}
            data-testid="search-input"
          />

          <Button
          data-testid="search-button" variant="contained" className="search-btn" type="submit" >
            Search
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default Search;
