// Rey

const axios = require('axios');
const cheerio = require('cheerio');

async function searchMAL(query) {
  const url = `https://myanimelist.net/anime.php?q=${encodeURIComponent(query)}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const results = [];
  $('.js-categories-seasonal .seasonal-anime').each((i, el) => {
    const title = $(el).find('p.title > a').text().trim();
    const link = $(el).find('p.title > a').attr('href');
    const image = $(el).find('img').attr('data-src') || $(el).find('img').attr('src');
    const type = $(el).find('.info .genre').text().trim();
    const desc = $(el).find('.synopsis').text().trim();

    results.push({ title, link, image, type, desc });
  });

  return results;
}

module.exports = searchMAL;
