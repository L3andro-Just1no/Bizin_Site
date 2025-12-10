# WordPress + Next.js Deployment Guide

This guide covers deploying your headless WordPress + Next.js application to production.

## Architecture Overview

```
┌─────────────────┐         ┌──────────────────┐
│                 │         │                  │
│  Next.js App    │────────▶│  WordPress CMS   │
│  (Frontend)     │  API    │  (Backend)       │
│                 │         │                  │
└─────────────────┘         └──────────────────┘
     Vercel/                    VPS/Shared
     Netlify                    Hosting
```

## Option 1: Separate Hosting (Recommended)

### WordPress Hosting

**Recommended Providers:**
- **Shared Hosting:** SiteGround, Bluehost, HostGator
- **Managed WordPress:** WP Engine, Kinsta, Flywheel
- **VPS:** DigitalOcean, Linode, Vultr
- **Cloud:** AWS EC2, Google Cloud, Azure

**Setup Steps:**

1. **Install WordPress on your hosting**
   - Use hosting provider's WordPress installer, or
   - Follow manual installation guide (see INSTALLATION.md)

2. **Configure WordPress for headless use**
   - Install required plugins (see PLUGINS.md)
   - Configure CORS headers
   - Set up SSL certificate (required for production)

3. **Set up subdomain (recommended)**
   ```
   cms.yourdomain.com → WordPress installation
   yourdomain.com → Next.js application
   ```

4. **Configure DNS**
   - Point subdomain to WordPress server
   - Point main domain to Next.js hosting (Vercel/Netlify)

### Next.js Hosting

**Recommended: Vercel (easiest)**

1. **Connect your Git repository**
   - Push code to GitHub/GitLab/Bitbucket
   - Import project in Vercel dashboard

2. **Configure environment variables**
   ```
   WORDPRESS_API_URL=https://cms.yourdomain.com/wp-json/wp/v2
   NEXT_PUBLIC_WORDPRESS_URL=https://cms.yourdomain.com
   ```

3. **Configure build settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**
   - Vercel will automatically deploy on git push
   - ISR will work out of the box

**Alternative: Netlify**

1. **Connect repository**
2. **Build settings:**
   ```
   Build command: npm run build
   Publish directory: .next
   ```
3. **Add environment variables**
4. **Enable Next.js plugin**
5. **Deploy**

## Option 2: Same Server Hosting

If hosting both on the same server:

### Server Requirements

- Ubuntu 20.04+ or similar Linux distribution
- Nginx or Apache
- Node.js 18+
- PHP 7.4+
- MySQL 5.7+ or MariaDB
- SSL certificate (Let's Encrypt)

### Directory Structure

```
/var/www/
├── wordpress/          # WordPress installation
└── nextjs/            # Next.js application
```

### Nginx Configuration

```nginx
# WordPress (API only)
server {
    listen 80;
    server_name cms.yourdomain.com;
    root /var/www/wordpress;
    index index.php;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cms.yourdomain.com;
    root /var/www/wordpress;
    index index.php;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/cms.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cms.yourdomain.com/privkey.pem;

    # CORS Headers for API
    add_header 'Access-Control-Allow-Origin' 'https://yourdomain.com' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Deny access to sensitive files
    location ~ /\.ht {
        deny all;
    }
}

# Next.js Application
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### PM2 Configuration for Next.js

```bash
# Install PM2
npm install -g pm2

# Start Next.js
cd /var/www/nextjs
npm run build
pm2 start npm --name "nextjs" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

## Environment Variables

### Production Environment Variables

Create `.env.production` or set in hosting platform:

```bash
# WordPress API
WORDPRESS_API_URL=https://cms.yourdomain.com/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_URL=https://cms.yourdomain.com

# Optional: Authentication
WORDPRESS_AUTH_TOKEN=your_production_token

# Next.js
NODE_ENV=production
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate for WordPress
sudo certbot --nginx -d cms.yourdomain.com

# Get certificate for Next.js domain
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is configured automatically
# Test renewal:
sudo certbot renew --dry-run
```

## Database Backup

### Automated WordPress Backups

```bash
#!/bin/bash
# backup-wordpress.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/wordpress"
WP_DIR="/var/www/wordpress"
DB_NAME="wordpress_db"
DB_USER="wordpress_user"
DB_PASS="your_password"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup files
tar -czf $BACKUP_DIR/files_$DATE.tar.gz $WP_DIR/wp-content/uploads

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
```

Add to crontab:
```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup-wordpress.sh
```

## Performance Optimization

### WordPress Optimization

1. **Install caching plugin**
   - WP Super Cache or W3 Total Cache

2. **Optimize database**
   ```sql
   OPTIMIZE TABLE wp_posts;
   OPTIMIZE TABLE wp_postmeta;
   ```

3. **Enable object caching**
   - Redis or Memcached

4. **CDN for images**
   - Cloudflare, CloudFront, or Bunny CDN

### Next.js Optimization

1. **Enable image optimization**
   - Already configured in `next.config.js`

2. **Configure ISR revalidation**
   - Adjust `revalidate` time based on content update frequency

3. **Use CDN**
   - Vercel automatically provides CDN
   - For self-hosted: Use Cloudflare

## Monitoring

### WordPress Monitoring

1. **Uptime monitoring**
   - UptimeRobot (free)
   - Pingdom

2. **Error logging**
   - Enable WordPress debug log
   - Monitor PHP error logs

3. **Security monitoring**
   - Wordfence plugin
   - Sucuri

### Next.js Monitoring

1. **Vercel Analytics** (if using Vercel)
   - Built-in analytics
   - Web Vitals monitoring

2. **Error tracking**
   - Sentry
   - LogRocket

3. **Performance monitoring**
   - Google Analytics
   - Vercel Speed Insights

## Security Checklist

### WordPress Security

- [ ] SSL certificate installed
- [ ] Strong admin password
- [ ] Limit login attempts (plugin)
- [ ] Two-factor authentication
- [ ] Regular updates (WordPress, plugins, themes)
- [ ] Firewall configured
- [ ] Database prefix changed from `wp_`
- [ ] File permissions set correctly
- [ ] Disable XML-RPC if not needed
- [ ] Hide WordPress version
- [ ] Regular backups

### Next.js Security

- [ ] Environment variables secured
- [ ] API routes protected
- [ ] Content Security Policy configured
- [ ] HTTPS enforced
- [ ] Dependencies updated regularly
- [ ] No sensitive data in client-side code

## Deployment Checklist

Before going live:

- [ ] WordPress installed and configured
- [ ] SSL certificates installed
- [ ] DNS configured correctly
- [ ] Environment variables set
- [ ] Test blog posts created
- [ ] API endpoints tested
- [ ] Images loading correctly
- [ ] ISR working properly
- [ ] SEO metadata correct
- [ ] Performance tested
- [ ] Mobile responsive
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Security hardened

## Rollback Plan

If deployment fails:

1. **Revert Next.js deployment**
   - Vercel: Rollback to previous deployment in dashboard
   - Self-hosted: `git checkout` previous commit and rebuild

2. **Restore WordPress backup**
   ```bash
   # Restore database
   gunzip < backup.sql.gz | mysql -u user -p database_name
   
   # Restore files
   tar -xzf backup.tar.gz -C /var/www/wordpress/
   ```

## Maintenance

### Regular Tasks

**Daily:**
- Monitor error logs
- Check uptime

**Weekly:**
- Review analytics
- Check for WordPress updates
- Test backups

**Monthly:**
- Security audit
- Performance review
- Update dependencies
- Database optimization

## Support Resources

- **Next.js:** https://nextjs.org/docs
- **WordPress REST API:** https://developer.wordpress.org/rest-api/
- **Vercel:** https://vercel.com/docs
- **Let's Encrypt:** https://letsencrypt.org/docs/

## Troubleshooting Production Issues

### Issue: API not accessible

1. Check CORS headers
2. Verify SSL certificates
3. Test API endpoint directly
4. Check firewall rules

### Issue: Images not loading

1. Verify `next.config.js` remotePatterns
2. Check WordPress media URLs
3. Test image URLs directly
4. Check CDN configuration

### Issue: Slow performance

1. Enable caching
2. Optimize images
3. Use CDN
4. Increase ISR revalidation time
5. Optimize database queries

### Issue: Build failures

1. Check environment variables
2. Verify WordPress is accessible
3. Review build logs
4. Test locally first

