// Rey 

const axios = require('axios');

async function searchAnilist(query) {
  const url = 'https://graphql.anilist.co';
  const response = await axios.post(url, {
    query: `
      query ($search: String) {
        Media(search: $search, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
          siteUrl
          description(asHtml: false)
          episodes
          status
          averageScore
        }
      }
    `,
    variables: {
      search: query,
    },
  });

  const anime = response.data.data.Media;
  return {
    id: anime.id,
    title: anime.title,
    cover: anime.coverImage.large,
    url: anime.siteUrl,
    description: anime.description,
    episodes: anime.episodes,
    status: anime.status,
    score: anime.averageScore,
  };
}

module.exports = { searchAnilist }
