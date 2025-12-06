Juragan Buah — Embed system WITHOUT Firebase
Files:
- embed-store.html : main page to host (open directly or use iframe)
- store_json.js    : client script that fetches products.json and renders store
- products.json    : sample data (edit to match your real products)

How to deploy:
1) Upload all files to your static hosting (GitHub Pages / Cloudflare Pages / Netlify) root.
   Example: https://<your>.github.io/juraganbuah-embed/embed-store.html

2) If you use GitHub Pages, enable Pages for branch main and root folder.

3) Update products.json whenever you add/edit products:
   - Manual: edit products.json in repo and commit
   - Automated (recommended): add code in your admin panel to push updated products.json to this GitHub repo via GitHub REST API.

Sample snippet (admin panel) to update products.json via GitHub API (requires personal access token with repo scope):

fetch('https://api.github.com/repos/<username>/<repo>/contents/products.json', {
  method: 'PUT',
  headers: {
    Authorization: 'token YOUR_PERSONAL_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'Update products.json',
    content: btoa(JSON.stringify(productsArray, null, 2)),
    branch: 'main'
  })
}).then(r=>r.json()).then(console.log).catch(console.error);

Notes:
- btoa in browser may fail for unicode; use proper base64 encode if needed.
- Keep your token secure; consider using a server-side function or Netlify Function to proxy updates.

If you want, I can also:
- Provide admin-side code to auto-generate products.json and push to GitHub/Netlify.
- Create a Netlify Function to accept POST from admin and write products.json to the site.
