# Deployment Guide

## Quick Deploy Options

### 1. Netlify (Recommended - Fastest)

**One-click deploy:**
1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. "Add new site" → "Import an existing project"
4. Connect GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Custom domain:**
- Go to Site settings → Domain management
- Add custom domain: `audiobookspeedcalculator.co`

### 2. Vercel

**Deploy:**
1. Push to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import repository
4. Framework preset: Vite
5. Deploy

### 3. GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

Then enable GitHub Pages in repository settings pointing to `gh-pages` branch.

### 4. Cloudflare Pages

1. Push to GitHub
2. Go to Cloudflare Pages
3. Create application
4. Build command: `npm run build`
5. Output directory: `dist`

### 5. AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://audiobookspeedcalculator.co --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## Environment Configuration

No environment variables needed - this is a pure static site with no backend!

## Performance Optimization

Already included:
- ✅ Production build optimized
- ✅ CSS/JS minification
- ✅ Gzip compression (107 KB)
- ✅ Code splitting via Vite

Optional improvements:
- Add CDN for faster global delivery (Netlify/Vercel do this automatically)
- Enable HTTP/2 server push
- Configure caching headers:
  ```
  /assets/*  Cache-Control: max-age=31536000
  /index.html  Cache-Control: max-age=0
  ```

## SEO Setup

After deployment:

1. **Add Google Analytics** (optional)
   - Add tracking code to `index.html`

2. **Submit sitemap to Google Search Console**
   - Create `public/sitemap.xml`
   - Submit at search.google.com/search-console

3. **Meta tags** (already included in index.html)
   - Title
   - Description
   - Open Graph tags (can add)

4. **robots.txt** (create if needed)
   ```
   User-agent: *
   Allow: /
   Sitemap: https://audiobookspeedcalculator.co/sitemap.xml
   ```

## Domain Setup

Point your domain to the hosting platform:

**Netlify/Vercel:**
- Add CNAME record: `audiobookspeedcalculator.co` → `your-site.netlify.app`
- Or use Netlify/Vercel nameservers

**Cloudflare:**
- Add A record pointing to server IP
- Enable Cloudflare proxy

## SSL Certificate

All modern platforms (Netlify, Vercel, Cloudflare) automatically provision free SSL certificates via Let's Encrypt.

## Monitoring

**Uptime monitoring** (free options):
- UptimeRobot
- Pingdom
- StatusCake

**Analytics:**
- Google Analytics
- Plausible (privacy-friendly)
- Netlify Analytics (built-in if using Netlify)

## Continuous Deployment

Once connected to GitHub, any push to `main` branch will:
1. Auto-build
2. Run tests (if any)
3. Deploy to production

## Rollback

All platforms keep deployment history:
- Netlify: Deploys tab → select previous deploy → Publish
- Vercel: Deployments → select previous → Promote to Production

## Cost

- **Netlify Free tier:** 100 GB bandwidth/month (plenty for this site)
- **Vercel Free tier:** 100 GB bandwidth/month
- **GitHub Pages:** Free unlimited
- **Cloudflare Pages:** Free unlimited

This site should stay **completely free** on any platform unless you get millions of visitors.

## Post-Deploy Checklist

- [ ] Site loads at custom domain
- [ ] HTTPS enabled (green lock icon)
- [ ] All 7 sections render correctly
- [ ] Calculator slider works smoothly
- [ ] Quiz saves results to localStorage
- [ ] Reading queue persists after refresh
- [ ] Mobile responsive (test on phone)
- [ ] Page load < 2 seconds
- [ ] Google Search Console verified
- [ ] Analytics tracking enabled (if desired)

## Support

The site is 100% static with no backend, so there's minimal maintenance needed. Just monitor uptime and renew domain annually.
