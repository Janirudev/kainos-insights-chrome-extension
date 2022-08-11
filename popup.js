document.addEventListener('DOMContentLoaded', async () => {
  console.log(process.env.NODE_ENV);

  const linksLink = document.getElementById('linksList');
  const url = 'https://ki.api.janiru.dev/api/insights';
  const key = 'API_KEY';

  const copy = (e) => {
    const str = e.target.dataset.url;
    const el = document.createElement('textarea');
    el.setAttribute('id', 'copybox');
    el.value = str;
    document.body.appendChild(el);

    el.select();

    document.execCommand('copy');
    alert('Copied');

    document.getElementById('copybox').remove();
  };

  try {
    const apiRes = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${key}`,
      },
    });
    const entries = await apiRes.json();

    const entriesHtml = entries.data.entries
      .map((entry) => {
        const entryUrl = `https://www.kainos.com${entry.url}`;
        return `
      <li class="entry-link">
      ${entry.title}
      <span>
      <button class="btn entry-copy" data-url="${entryUrl}">Copy</button>
      <a class="btn" href="${entryUrl}" rel="noonpener noreferrer" target="_blank">Visit</a>
      </span>
      </li>
      `;
      })
      .join('');

    linksLink.innerHTML = entriesHtml;

    const entityLinks = [...document.querySelectorAll('.entry-copy')];
    entityLinks.forEach((link) => link.addEventListener('click', copy));
  } catch (err) {
    console.error(err);
  }
});
