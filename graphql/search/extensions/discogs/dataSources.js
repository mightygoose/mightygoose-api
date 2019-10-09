import {RESTDataSource} from 'apollo-datasource-rest';
import {DISCOGS_TOKEN} from './config';


export class DiscogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.discogs.com/database';
  }

  willSendRequest(request) {
    request.params.set('token', DISCOGS_TOKEN);
  }

  search(params) {
    return this.get('search', params);
  }

  searchRelease(params) {
    return this.search({
      type: 'release',
      ...params,
    });
  }
}
export const dataSources = {discogsApi: new DiscogsAPI()};
