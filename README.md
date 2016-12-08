# WP-Plugin-Embed
Plugin that uses the WP API to embed WordPress plugin details into a WordPress website

Developed for https://brettshumaker.com/my-work

Feel free to use this on your site. The styling will most likely need to be tweaked to fit in with your site. 😄

## Usage
`[wp-plugin-embed slug="simple-staff-list" github="https://github.com/brettshumaker/Staff-List-Plugin"]`

**slug** (required) - the plugin's slug on the WordPress.org repository - no error checking is done on this yet.

**github** (optional) - the plugin's repository on GitHub - this is very loose, no validation or sanitization is done on this URL yet. 
