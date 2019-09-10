const mb = require('musicbrainz');


mb.searchReleaseGroups('THE ALTERNATE RUBBER SOUL', {}, function(err, releases){
  console.log('---------');
  const release = releases[0];
  // release.loadArtistCredits();
  console.log(release.artistCreditsString());
  console.log(Object.keys(release));
  console.log('---------');
});
