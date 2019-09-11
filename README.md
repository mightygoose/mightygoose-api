coming soon

#example queries

```
search(query: { query: "Beatles Help" }){
  discogs {
    releases {
      artist
    }
  }
}
```

```
discogs(search: { query: "Beatles" }) {
  releases {
    artist
  }
}
```

```
discogs {
  release(id: 44444) {
    artist
  }
}
```

```
spotify {
  album(id: 55555) {
    artist
    connection {
      discogs {
        releases {
          artist
        }
      }
    }
  }
}
```
