# WixElementVisibilitySwitcher

Hide/Show Elemenets for Mobile / Tablet / Desktop views
 
Supports Object Types of: Text, Strip and Html
 
## Usage:
 
1. Add the javascript file wixElementVisibilitySwitcher.js to the Wix site code files: CODE FILES / Public

2. Add the following code to the masterPage.js file (to work on all pages) or on the relevant page javascript file

```javascript
import {switchElementVisibility} from 'public/wixElementVisibilitySwitcher.js'
 
$w.onReady(function () {	
   switchElementVisibility();
});
```
 
3. In DevMode edit the element id and include "DesktopContent", "TabletContent" or "MobileContent" in the id  to show on the
relevant views (form factors) When hidden the vertical area will be collapsed by default, add NoCollapse to prevent collapsing.
(No Collapse is handy for not adjusting the view when simlar elements are stacked on top of each other in the editor)

### Examples:   
  
id = text1DesktopContent - Will be displayed for Desktop Only  
id = html2DesktopContentTabletContent - Will be displayed for Desktop and Tablet views Only  
id = strip3MobileContent - Will be displayed for Mobile views only  
id = html2DesktopContentTabletContentNoCollapse - Will be displayed for Desktop and Tablet views Only and will not collapse the area on mobile views.

Blog post here: https://www.brightertools.com/post/wix-show-hide-switch-element-visibility-across-mobile-desktop-eg-banner-ads
