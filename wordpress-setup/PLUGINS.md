# Recommended WordPress Plugins for Headless CMS

## Essential Plugins

### 1. Yoast SEO
**Purpose:** SEO metadata in REST API responses  
**URL:** https://wordpress.org/plugins/wordpress-seo/  
**Why:** Adds SEO title, meta description, and other SEO data to REST API responses automatically.

### 2. Disable Comments
**Purpose:** Remove unnecessary comment features  
**URL:** https://wordpress.org/plugins/disable-comments/  
**Why:** Since you're using headless WordPress, you don't need the commenting system.

## Optional but Recommended

### 3. Advanced Custom Fields (ACF)
**Purpose:** Add custom fields to posts  
**URL:** https://wordpress.org/plugins/advanced-custom-fields/  
**Why:** Easily add custom metadata to posts that will be available via REST API.

**Note:** To expose ACF fields in REST API, use ACF to REST API plugin:
https://wordpress.org/plugins/acf-to-rest-api/

### 4. WP REST Filter
**Purpose:** Filter REST API queries  
**URL:** https://wordpress.org/plugins/wp-rest-filter/  
**Why:** Adds filtering capabilities to REST API endpoints.

### 5. WP GraphQL (Alternative to REST)
**Purpose:** GraphQL API instead of REST  
**URL:** https://wordpress.org/plugins/wp-graphql/  
**Why:** More efficient data fetching, but requires different implementation in Next.js.

## Security Plugins

### 6. Wordfence Security
**Purpose:** WordPress security  
**URL:** https://wordpress.org/plugins/wordfence/  
**Why:** Protects WordPress admin from attacks.

### 7. JWT Authentication for WP REST API
**Purpose:** Secure API authentication  
**URL:** https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/  
**Why:** If you need to create/update posts from your Next.js frontend.

## Performance Plugins

### 8. WP Super Cache
**Purpose:** Cache WordPress pages  
**URL:** https://wordpress.org/plugins/wp-super-cache/  
**Why:** Improves API response times.

## Installation Steps

1. Log in to WordPress admin: `http://yourdomain.com/wordpress/wp-admin`
2. Go to **Plugins → Add New**
3. Search for each plugin by name
4. Click **Install Now**, then **Activate**
5. Configure each plugin according to its settings

## Post-Installation Configuration

### Yoast SEO
- Complete the configuration wizard
- Enable REST API output in **SEO → General → Features**

### ACF (if using)
- Create field groups as needed
- Install ACF to REST API plugin
- Fields will automatically appear in REST API responses

### JWT Authentication (if using)
- Add configuration to `wp-config.php` as per plugin documentation
- Generate secret key for JWT tokens

