import {RESTDataSource} from 'apollo-datasource-rest';


export class ItunesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://itunes.apple.com';
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

  async search(params) {
    const response = await this.get('search', params);
    return JSON.parse(response);
  }

  searchAlbums(params) {
    return this.search({
      entity: 'album',
      term: (params.query || '').replace(/[ ]/gi, '+'),
    });
  }
}
export const dataSources = {itunesApi: new ItunesAPI()};
