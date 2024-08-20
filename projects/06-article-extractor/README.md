Aritcle Extractor
=================

Scraping is read a content and extract their data.

Extract article information from structured data.

Launch
------

Run the next command

```sh
pnpm run start
```

You should get the next output:

```json
{
  url: 'https://www.cnbc.com/2022/09/21/what-another-major-rate-hike-by-the-federal-reserve-means-to-you.html',
  title: "Here's what the Federal Reserve's third 75 basis point interest rate hike means for you",
  description: "What the federal funds rate means to youThe federal funds rate, which is set by the U.S. central bank, is the interest rate at which banks borrow and lend to one another overnight. Although that's not the...",
  links: [
    'https://www.cnbc.com/2022/09/21/what-another-major-rate-hike-by-the-federal-reserve-means-to-you.html',
    'https://www.cnbc.com/amp/2022/09/21/what-another-major-rate-hike-by-the-federal-reserve-means-to-you.html'
  ],
  image: 'https://image.cnbcfm.com/api/v1/image/104582226-104582226.jpg?v=1690394429&w=1920&h=1080'
}
```

References
----------

- [Extractor Tools](https://extractor-demos.pages.dev/)