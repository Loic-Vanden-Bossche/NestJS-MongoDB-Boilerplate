
# Configuration
### Exemple APP environment configuration.
  
| Key | Default | Description | Validators | Protected |
|:--- | :--- | :--- | :--- | :---|
| AP_APP_PORT | 3001 | Port to listen on | isPortNumber | No |
| AP_APP_ENV | dev | Environment to run in | isEnum | No |
| AP_APP_VERBOSE | false | Enable debug mode | isBoolean | No |
| AP_APP_URLS_WHITELIST | http://localhost:4200 | List of urls to proxy | isUrlArray | No |
| AP_APP_FRONTEND_URL | http://localhost:4200 | Path of the frontend | isString | No |
| AP_DB_HOST | localhost | Database host | isString | Yes |
| AP_DB_NAME | exemple | Database name | isString | No |
| AP_DB_USER | mongoose | Database user | isString | Yes |
| AP_DB_PASSWORD | root | Database password | isString | Yes |
| AP_DB_PORT | 27017 | Database port | isPortNumber | No |
| AP_JWT_SECRET | myverysecretkey | JWT secret | isString | Yes |
| AP_JWT_EXPIRE_IN | 1-day | JWT expiration time | isValidPeriod, isString | No |
| AP_RTOKEN_LENGTH | 32 | RToken expiration time | isNumber | No |
| AP_RTOKEN_EXPIRE_IN | 1-day | RToken expiration time | isValidPeriod, isString | No |
| AP_COOKIE_NAME | exemple-app | Cookie name | isString | No |
| AP_COOKIE_EXPIRES_IN | 1-year | Cookie expiration time | isValidPeriod, isString | No |
| AP_COOKIE_SECURE | false | Cookie secure | isBoolean | No |
| AP_MAILS_HOST |  | Mail host | isString | Yes |
| AP_MAILS_USER |  | Mail user | isEmail, isString | No |
| AP_MAILS_PASSWORD |  | Mail password | isString | Yes |
| AP_MAILS_USER_TAG | Exemple App | Mail user tag | isString | No |
| AP_ADMIN_EMAIL | exemple-app.exemple@exemple.com | Admin email | isEmail, isString | No |
| AP_ADMIN_PASSWORD | admin | Admin password | isString | Yes |

Generated on 19/05/2022, 23:13:03