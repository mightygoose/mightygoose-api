import {RESTDataSource} from 'apollo-datasource-rest';
import SpotifyWebApi from 'spotify-web-api-node';
import {SPOTIFY_ID, SPOTIFY_SECRET} from './config';


const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_ID,
  clientSecret: SPOTIFY_SECRET,
});

const getToken = (() => {
  let token = null;
  return async () => {
    if (token) {
      return token;
    }
    console.log('refreshing spotify token');
    try {
      const {body} = await spotifyApi.clientCredentialsGrant();
      token = body['access_token'];
      setTimeout(() => (token = null), +body['expires_in'] * 1000);
      return token;
    } catch (e) {
      throw new Error(
        `Something went wrong when retrieving an access token ${e}`,
      );
    }
  };
})();

export class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${await getToken()}`);
  }

  // workaround to prevent '+' sign escape
  // TODO: remove it, do not replace it in query
  resolveURL(request) {
    const url = super.resolveURL(request);
    url.searchParams.append = () => {};
    const params = [];
    for (const [name, value] of request.params) {
      params.push([name, value].join('='));
    }
    url.search = `?${params.join('&')}`;
    return url;
  }

  search(params) {
    return this.get('search', params);
  }

  searchAlbums(params = {}) {
    return this.search({
      type: 'album',
      q: (params.query || '').replace(/[ ]/gi, '+'),
    });
  }
}

export const dataSources = {spotifyApi: new SpotifyAPI()};
