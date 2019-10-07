import {RESTDataSource} from 'apollo-datasource-rest';


export class MusicbrainzAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://musicbrainz.org/ws/2/';
  }

  search({ type, ...params }) {
    return this.get(type, {
      ...params,
      fmt: 'json',
    });
  }

  searchReleases(params) {
    return this.search({
      type: 'release',
      query: encodeURI(params.query),
    });
  }
}

export const dataSources = {musicbrainzApi: new MusicbrainzAPI()};
