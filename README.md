coming soon

#example queries

```
search(search: { query: "Beatles Help" }){
  discogs {
    releases {
      pageInfo { ... }
      nodes {
        artist
      }
    }
  }
}
```

```
search {
  discogs(search: { query: "Beatles" }) {
    releases {
      nodes {
        artist
      }
    }
  }
}
```

```
lookup {
  discogs {
    release(id: 44444) {
      artist
    }
  }
}
```

```
spotify {
  album(id: 55555) {
    artist
    discogs {
      releases {
        artist
      }
    }
  }
}
```
