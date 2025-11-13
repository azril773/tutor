
# Tutor App



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:iyB58hfinwUCUjtCaezZfdYl1wNNBnhw0ojh1R+w7XY=
APP_DEBUG=true
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
# APP_MAINTENANCE_STORE=database

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=tutor
DB_USERNAME=azril
DB_PASSWORD=123

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
# CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
# MAIL_SCHEME=null
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME="a76411416@gmail.com"
MAIL_PASSWORD='moml nrws ztzp djgu'
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="a76411416@gmail.com"
MAIL_FROM_NAME="Aplikasi Tutor"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

```
## Installation

- Update package
```bash
composer update
```
- Install package
```
composerinstall
```
- Migrate database
```
php artisan migrate
```
- Run application
```
composer run dev
```