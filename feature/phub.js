// @ Rey

const axios = require('axios');
const cheerio = require('cheerio');

async function pornhubDetailScraper(videoUrl) {
  const headers = {
    'User-Agent': 'Mozilla/5.0'
  };

  try {
    const res = await axios.get(videoUrl, { headers });
    const $ = cheerio.load(res.data);

    const title = $('h1.title').text().trim();
    const views = $('.videoViewCount').text().trim();
    const likes = $('.votesUp span').first().text().trim();
    const duration = $('span.duration').first().text().trim();

    const categories = [];
    $('.categoriesWrapper a').each((i, el) => {
      categories.push($(el).text().trim());
    });

    const actors = [];
    $('.pornstar-name').each((i, el) => {
      actors.push($(el).text().trim());
    });

    const thumbnail = $('meta[property="og:image"]').attr('content');

    return {
      status: true,
      url: videoUrl,
      title,
      views,
      likes,
      duration,
      thumbnail,
      categories,
      actors
    };
  } catch (err) {
    return {
      status: false,
      message: 'Gagal mengambil detail video.',
      error: err.message
    };
  }
}

module.exports = { pornhubDetailScraper }
