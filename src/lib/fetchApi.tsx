import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "./config";

type TSearchTrack =(query: string, accessToken: string)=>Promise<any>;

export const searchTrack: TSearchTrack = async (query, accessToken) => {
  const requestOptions:AxiosRequestConfig<any>= {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  const response:AxiosResponse = await axios.get(
    `${config.SPOTIFY_BASE_URL}/search?type=track&q=${query}`,
    requestOptions
  );

  return response.data;
}; 


type TGetUserProfile = (accessToken: string) => Promise<any>;
export const getUserProfile: TGetUserProfile = async (accessToken) => {
  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(
    `${config.SPOTIFY_BASE_URL}/me`,
    requestOptions
  );
  return response.data;
};

interface IPlaylist {
  name: string;
  description: string;
}
type TCreatePlaylist = (
  accessToken: string,
  userId: string,
  playlist: IPlaylist
) => Promise<any>;
export const createPlaylist: TCreatePlaylist = async (
  accessToken,
  userId,
  playlist
) => {
  const data = JSON.stringify({
    name: playlist.name,
    description: playlist.description,
    public: false,
    collaborative: false,
  });
  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`,
    data,
    requestOptions
  );
  return response.data;
};

type TAddTrackToPlaylist = (
  accessToken: string,
  playlistId: string,
  uris: string
) => Promise<any>;
export const addTracksToPlaylist: TAddTrackToPlaylist = async (
  accessToken,
  playlistId,
  uriTracks
) => {
  const data = JSON.stringify({
    uris: uriTracks,
  });
  const requestOptions = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `${config.SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
    data,
    requestOptions
  );
  return response.data;
};
