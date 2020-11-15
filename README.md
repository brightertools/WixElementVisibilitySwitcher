# WixElementVisibilitySwitcher

Hide/Show Elemenets for Mobile / Tablet / Desktop views
 
Supports Object Types of: Text, Strip and Html
 
## Usage:
 
1. Add the javascript file switchVisibility.js to the Wix site code files: CODE FILES / Public

2. Add the following code to the masterPage.js file (to work on all pages) or on the relevant page javascript file

```javascript
import {switchElementVisibility} from 'public/wixElementVisibilitySwitcher.js'
 
$w.onReady(function () {	
   switchElementVisibility();
});
```
 
3. In DevMode edit the elementId and include "HideOnMobile" or "ShowOnMobile" in the id eg: test1ShowOnMobile, text2HideOnMobile.

Here is a quick video that deomonstrates setting up on your own website (dont forget to thumns up if you appreciate my help):

