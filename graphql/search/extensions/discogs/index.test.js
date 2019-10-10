import {DiscogsSearchResult} from './index';

describe('Discogs', () => {
  const searchReleasesSpy = jest.fn();

  const contextMock = {
    dataSources: {
      discogsApi: {
        searchReleases: searchReleasesSpy,
      },
    },
  };

  afterEach(() => {
    searchReleasesSpy.mockRestore();
  });

  describe('DiscogsSearchResult', () => {
    const fields = DiscogsSearchResult.getFields();
    const releasesField = fields.releases;
    const resolveReleases = releasesField.resolve;

    [
      {
        title: 'Picks release title correctly',
        parent: {title: 'bar'},
        args: {search: {release_title: 'bla'}, useFields: []},
        expectation: {
          release_title: 'bla',
        }
      }
    ].forEach(({title, parent, args, expectation}, index) => {
      it(title || `case ${index + 1}`, () => {
        resolveReleases(parent, args, contextMock);
        expect(searchReleasesSpy).toHaveBeenCalledWith(expectation);
      });
    });

  });
});
