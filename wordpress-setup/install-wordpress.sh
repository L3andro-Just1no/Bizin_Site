#!/bin/bash

# WordPress Installation Script for Headless CMS
# This script will download and set up WordPress in a subdirectory

echo "=========================================="
echo "WordPress Headless CMS Installation Script"
echo "=========================================="

# Configuration
WP_DIR="wordpress"
WP_VERSION="latest"
DB_NAME="wordpress_db"
DB_USER="wordpress_user"
DB_PASS=""  # Will be generated
DB_HOST="localhost"

# Generate a secure database password
DB_PASS=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)

echo ""
echo "Step 1: Creating WordPress directory..."
mkdir -p $WP_DIR
cd $WP_DIR

echo ""
echo "Step 2: Downloading WordPress..."
curl -O https://wordpress.org/latest.tar.gz

echo ""
echo "Step 3: Extracting WordPress files..."
tar -xzf latest.tar.gz --strip-components=1
rm latest.tar.gz

echo ""
echo "Step 4: Setting up database..."
echo "Please enter your MySQL root password:"

# Create database and user
mysql -u root -p <<MYSQL_SCRIPT
CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'${DB_HOST}' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'${DB_HOST}';
FLUSH PRIVILEGES;
MYSQL_SCRIPT

echo ""
echo "Step 5: Creating wp-config.php..."
cp wp-config-sample.php wp-config.php

# Generate WordPress salts
SALTS=$(curl -s https://api.wordpress.org/secret-key/1.1/salt/)

# Update wp-config.php with database credentials
sed -i "s/database_name_here/${DB_NAME}/" wp-config.php
sed -i "s/username_here/${DB_USER}/" wp-config.php
sed -i "s/password_here/${DB_PASS}/" wp-config.php
sed -i "s/localhost/${DB_HOST}/" wp-config.php

# Replace the salts section
sed -i "/put your unique phrase here/d" wp-config.php
echo "$SALTS" >> wp-config.php

# Add CORS configuration
cat >> wp-config.php <<'EOF'

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

/* Custom REST API adjustments */
add_filter('rest_url_prefix', function() {
    return 'wp-json';
});

EOF

echo ""
echo "Step 6: Setting file permissions..."
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

echo ""
echo "=========================================="
echo "WordPress Installation Complete!"
echo "=========================================="
echo ""
echo "Database Configuration:"
echo "  Database: ${DB_NAME}"
echo "  User: ${DB_USER}"
echo "  Password: ${DB_PASS}"
echo ""
echo "IMPORTANT: Save these credentials securely!"
echo ""
echo "Next Steps:"
echo "1. Configure your web server (Apache/Nginx) to serve the wordpress directory"
echo "2. Visit http://yourdomain.com/wordpress to complete the installation wizard"
echo "3. Install recommended plugins (see wordpress-setup/PLUGINS.md)"
echo "4. Update your .env.local file with the WordPress API URL"
echo ""

