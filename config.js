import dotenv from 'dotenv';


dotenv.config();


export const {
  PORT = 8000,
  SPOTIFY_ID,
  SPOTIFY_SECRET,
  DISCOGS_TOKEN,
} = process.env;
