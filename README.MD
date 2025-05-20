# Lingoport InContext Capture
Lingoport Incontext Capture is a WebExtension compatible with Chrome that helps you to send a web page to a Lingoport InContext Server.

## Chrome Extension Overview
Unlike Chrome apps (which are being discontinued), extensions are small programs
that download to your computer in the form of a CRX file.
They're saved to a specific location within Chrome's installation folder, so you can't
typically choose where on your computer to save the extension.
Chrome stores it somewhere safe and can use it anytime you open the browser.

To view the location:
* open up a Chrome browser:
* type chrome:extension to view the id of the InContext Capture extension
* type chrome:version
  * The *profile path* is the location, on your local machine, of the user data that is stored by the Chrome Browser
* go to the *profile path* on your local machine.
  * The local extension settings are in the *Local Extension Settings* sub-folder
  * The InContext Capture local storage is located in the folder where the name matches the extension id.
  * Example path: *C:\Users\linda\AppData\Local\Google\Chrome\User Data\Default\Local Extension Settings\fkabnkhcnendkljbipfpkgdmncmehala*

See https://developer.chrome.com/extensions for more details.

## Components
### Option Page
The options page will contain the credentials for sending information to InContext Server.
The options page is available on the extensions management page at chrome:extensions as well
as a button on the popup menu.

Files:
* options.js
* options.html

### Manifest File
A JSON-formatted manifest file that describe the LRM-Incontext Chrome Extension.
See https://developer.chrome.com/extensions/manifest

Field Summary:
* background - Once it has been loaded, a background page will stay running as long as it
is performing an action, such as calling a Chrome API or issuing a network request
	* persistence is false
	* scripts - an array of background scripts
* browser-action - put icons in the main Google Chrome toolbar, to the right of the address bar.
Also defines the popup html
* content_scripts - files that run in content of the web page. By using the standard
Document Object Model (DOM), they are able to read details of the web pages the browser visits,
make changes to them and pass information to their parent extension and the background script.
	* matches - Specifies which pages this content script will be injected into. Chrome extension
	supports the following schemas; http, https, file, ftp. If a URL does not have this schema then
	the Incontext Capture menu will not display its submenu. In addition, in order to access a
	schema file, the user must enable 'Allow access to file URLs' located in the extensions
	management page (chrome://extensions)
	* css - The list of CSS files to be injected into matching pages
	* js - The list of JavaScript files to be injected into matching pages.
* content_security_policy - mitigates potential cross-site scripting issues
* default_locale - required for localization
* description - The description should be suitable for both the browser's extension
management UI and the Chrome Web Store
* icons - icons that represent the extension (required to be square)
	* 16x16 - icon is used as the favicon for an extension's pages
	* 48x48 - icon is used in the extensions management page (chrome://extensions)
	* 128x128 - icon is used during installation and by the Chrome Web Store
* permissions - allows specific access to chrome's API
	* activeTabs - access to browser action and context menu item
	* contextMenus - access to the chrome.contextMenus API.
	* storage - access to the chrome.storage API. Incontext Capture uses local storage which
	has a limit of 5MB
	* tabs - access to privileged fields of the Tab objects used by several APIs
	including chrome.tabs and chrome.windows.
	* match patterns such as http://*/. This should match what is defined in 'content_scripts'
	and must be a chrome extension supported schema.
* options_page - the page that will be displayed by navigating to the extension management page
at chrome://extensions
* options_ui - Allows for the option page is be displayed by clicking on the 'Options' icon in the
navigation bar of the Incontext Capture extension.
* short_name - (maximum of 12 characters recommended) is a short version of the extension's name

File:
* manifest.json

## Publishing the extension
* Sign into the Chrome Extension Developers Dashboard
	* https://chrome.google.com/webstore/developer/dashboard
	* The login needs to be the login that is used to publish the extension
* In 'Your Listings', the current extension version is displayed.
* Upload a new version:
	* Create a zip file of the InContext repo except for the git files
	* Click the 'edit' button for the extension listing
	* Upload the new zip file and click 'Publish'.
* Permissions - currently, the extension is 'Public'.

## Adding the extension

To add the latest extension to Chrome:

* After signin, go to link to the extension -
TODO
* Will see the Lingoport InContext Capture extension with the option to
'Add to Chrome' otherwise they will get a page not found error.
* Click on the 'Add to Chrome' button. The extension will be added to Google Chrome.
* For local file access (i.e. file://), verify that the InContext Capture extension allows for locale file access.
	* Right-click on the Incontext Capture extension and select 'Manage Extensions'
	* Turn option 'Allow access of file URL's' on (to the right)
	* Close all chrome windows and reopen chrome through the console. To determine where chrome.exe is located
on your machine type *chrome://version* into your Chrome Browser and search for *Executable Path*.	i.e.
	*"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files*


## Install
 - Chrome Web Store:TODO

 ## Code derived from third party projects

 - csstree: https://github.com/csstree/csstree
 - postcss-media-query-parser:
   https://github.com/dryoma/postcss-media-query-parser
 - postcss-selector-parser: https://github.com/postcss/postcss-selector-parser
 - UglifyCSS: https://github.com/fmarcia/UglifyCSS
 - parse-srcset: https://github.com/albell/parse-srcset
 - parse-css-font: https://github.com/jedmao/parse-css-font
 - Readability: https://github.com/mozilla/readability
 - whatwg-mimetype: https://github.com/jsdom/whatwg-mimetype
