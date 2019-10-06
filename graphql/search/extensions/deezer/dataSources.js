import {RESTDataSource} from 'apollo-datasource-rest';


export class DeezerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.deezer.com/search';
  }

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

  searchAlbums(params) {
    return this.get('album', {
      q: (params.query || '').replace(/[ ]/gi, '+'),
    });
  }
}
export const dataSources = {deezerApi: new DeezerAPI()};
