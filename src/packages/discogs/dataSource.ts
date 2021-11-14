import { RESTDataSource } from 'apollo-datasource-rest';
import { DISCOGS_TOKEN } from './config';

export class DiscogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.discogs.com/database';
  }

  willSendRequest(request: any) {
    request.params.set('token', DISCOGS_TOKEN);
  }

  search(params: any) {
    return this.get('search', params);
  }

  searchReleases(params: any) {
    return this.search({
      type: 'release',
      ...params,
    });
  }

  searchMasters(params: any) {
    return this.search({
      type: 'master',
      ...params,
    });
  }
}
