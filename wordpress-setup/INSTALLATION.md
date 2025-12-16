# WordPress Headless CMS Installation Guide

This guide will help you install and configure WordPress as a headless CMS for your Next.js application.

## Prerequisites

- Web server (Apache/Nginx)
- PHP 7.4 or higher
- MySQL 5.7+ or MariaDB 10.3+
- Access to server command line

## Installation Methods

### Method 1: Automated Installation (Linux/Mac)

1. Make the installation script executable:
```bash
chmod +x wordpress-setup/install-wordpress.sh
```

2. Run the installation script:
```bash
./wordpress-setup/install-wordpress.sh
```

3. Follow the prompts and save the database credentials provided at the end.

### Method 2: Manual Installation

#### Step 1: Download WordPress

```bash
mkdir wordpress
cd wordpress
curl -O https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz --strip-components=1
rm latest.tar.gz
```

#### Step 2: Create Database

```sql
CREATE DATABASE wordpress_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wordpress_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON wordpress_db.* TO 'wordpress_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Step 3: Configure WordPress

1. Copy the sample config:
```bash
cp wp-config-sample.php wp-config.php
```

2. Edit `wp-config.php` and update:
   - Database name, user, and password
   - Authentication keys and salts (get from https://api.wordpress.org/secret-key/1.1/salt/)

3. Add CORS configuration to `wp-config.php` (before "That's all, stop editing!"):

```php
/* CORS Configuration for Headless WordPress */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        return $value;
    });
}, 15);
```

#### Step 4: Web Server Configuration

##### Apache (.htaccess)

WordPress includes an .htaccess file by default. Ensure `AllowOverride All` is set in your Apache configuration.

##### Nginx

Add to your server block:

```nginx
location /wordpress {
    try_files $uri $uri/ /wordpress/index.php?$args;
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}

# Add CORS headers for WordPress REST API
location ~* /wordpress/wp-json/ {
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
    
    if ($request_method = 'OPTIONS') {
        return 204;
    }
    
    try_files $uri $uri/ /wordpress/index.php?$args;
}
```

#### Step 5: Complete Installation

1. Visit `http://yourdomain.com/wordpress`
2. Follow the WordPress installation wizard
3. Create an admin account
4. Complete the setup

## WordPress Configuration for Headless Use

### 1. Permalinks

Go to **Settings → Permalinks** and select **Post name**. This provides clean URLs for API endpoints.

### 2. Recommended Plugins

Install and activate these plugins:

1. **Disable Comments** - Remove unnecessary comment features
   ```
   https://wordpress.org/plugins/disable-comments/
   ```

2. **Yoast SEO** - Adds SEO metadata to REST API responses
   ```
   https://wordpress.org/plugins/wordpress-seo/
   ```

3. **Advanced Custom Fields (ACF)** - Optional, for custom fields
   ```
   https://wordpress.org/plugins/advanced-custom-fields/
   ```

4. **WP REST API Controller** - Enhanced REST API control
   ```
   https://wordpress.org/plugins/wp-rest-api-controller/
   ```

### 3. Security Considerations

Since this is a headless setup:

1. **Block frontend access** (optional) - Add to `.htaccess` or Nginx config to redirect all non-API requests
2. **Use JWT authentication** for secure API access if creating/editing posts from frontend
3. **Limit user access** - Only create accounts with necessary permissions
4. **Install security plugins**:
   - Wordfence Security
   - All In One WP Security & Firewall

### 4. Testing the API

Once installed, test these endpoints:

```bash
# Get all posts
curl http://yourdomain.com/wordpress/wp-json/wp/v2/posts

# Get categories
curl http://yourdomain.com/wordpress/wp-json/wp/v2/categories

# Get single post
curl http://yourdomain.com/wordpress/wp-json/wp/v2/posts/1
```

## Next Steps

After WordPress is installed and configured:

1. Create some test blog posts with featured images
2. Update your `.env.local` file with the WordPress API URL
3. The Next.js integration code will automatically fetch and display your posts

## Troubleshooting

### CORS Errors

If you see CORS errors in browser console:
- Verify the CORS configuration in `wp-config.php`
- Check web server headers
- Ensure REST API is accessible at `/wp-json/wp/v2/posts`

### REST API Not Working

- Check permalink settings (must be "Post name" or similar)
- Verify `.htaccess` or Nginx configuration
- Test API endpoint directly in browser

### Database Connection Errors

- Verify database credentials in `wp-config.php`
- Ensure MySQL/MariaDB is running
- Check database user permissions

## Alternative: Using Subdomain

For better separation, consider installing WordPress on a subdomain:

1. Create subdomain: `cms.yourdomain.com`
2. Install WordPress there
3. Update API URL to: `https://cms.yourdomain.com/wp-json/wp/v2`
4. Configure CORS to allow your main domain

