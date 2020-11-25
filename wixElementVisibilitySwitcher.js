// ----------------------------------------------------------------------------------------------------------------------------------
// wixElementVisibilitySwitcher.js - Version 1.0.1
// 
// Hide/Show Elemenets for Mobile / Non/Mobile views
// 
// Supports Object Types of: Text, Image, Strip, StripColumn and Html with the Page, Header and Footer areas on web and blog pages
// 
// Usage:
// 
// 1) Add the javascript file wixElementVisibilitySwitcher.js to the Wix site code files: CODE FILES / Public
//
// 2) Add the following code to the masterPage.js file (to work on all pages) or on the relevant page javascript file
// 
// import {switchElementVisibility} from 'public/wixElementVisibilitySwitcher.js'
// 
// $w.onReady(function () {	
//    switchElementVisibility();
// });
// 
// 3) In DevMode edit the element id and include "DesktopContent", "TabletContent" or "MobileContent" in the id  to show on the
// relevant views (form factors) When hidden the vertical area will be collapsed by default, add NoCollapse to prevent collapsing.
// (No Collapse is handy for not adjusting the view when simlar elements are stacked on top of each other in the editor)
//
// Examples: 
//
// id = text1DesktopContent - Will be displayed for Desktop Only
// id = html2DesktopContentTabletContent - Will be displayed for Desktop and Tablet views Only
// id = strip3MobileContent - Will be displayed for Mobile views only
// id = html2DesktopContentTabletContentNoCollapse - Will be displayed for Desktop and Tablet views Only and will not collapse the
//                                                   are on mobile views.
//
//
// Created by Brighter Tools Ltd - www.brightertools.com
// Latest version at: https://github.com/brightertools/WixElementVisibilitySwitcher
// ---------------------------------------------------------------------------------------------------------------------------------

import wixWindow from 'wix-window';

// Set to true to output console debug messages
const debugMode = true;

// defaultSettings (currently used to set all defaults)
const defaultSettings = {
	showHideTextElement: true,
	showHideStripElements: true,
	showHideHtmlElements: true,
	showHideButtonElements: true
};

var settings = {};

// Console log, enabled using debugMode
function consoleLog(text)
{
	if (!debugMode)
	{
		return;
	}
	console.log(text);
}

// Shows/Hides element based on ID
// Returns true if element is hidden we use this to prevent traversinhg hidden elements
function hideShowElement(webElement)
{
	consoleLog("Web Element: " + webElement.id);

    var result = false;

	var shown = false;
	var hidden = false;

    var collapse = true;

    if (webElement.id.indexOf("NoCollapse") >= 0)
    {
        collapse = false;
    }

	if (webElement.id.indexOf("MobileContent") >= 0) {

		if (wixWindow.formFactor === "Mobile") {
			if (!hidden)
			{
				$w("#" + webElement.id).show();
				$w("#" + webElement.id).expand();
				shown = true;
				consoleLog(webElement.id + " - shown");
			}
		}
		else
		{
			if (!shown)
			{
				$w("#" + webElement.id).hide();
                if (collapse)
                {
                    $w("#" + webElement.id).collapse();
                }
				consoleLog(webElement.id + " - hidden");
                result = true;
			}
		}
	}

	if (webElement.id.indexOf("TabletContent") >= 0) {
		if (wixWindow.formFactor === "Tablet") {
			if (!hidden)
			{
				$w("#" + webElement.id).show();
				$w("#" + webElement.id).expand();
				shown = true;
				consoleLog(webElement.id + " - shown");
			}
		}
		else
		{
			if (!shown)
			{
				$w("#" + webElement.id).hide();
                if (collapse)
                {
                    $w("#" + webElement.id).collapse();
                }
				consoleLog(webElement.id + " - hidden");
                result = true;
			}
		}
	}
	if (webElement.id.indexOf("DesktopContent") >= 0) {
		if (wixWindow.formFactor === "Desktop") {
			if (!hidden)
			{
				$w("#" + webElement.id).show();
				$w("#" + webElement.id).expand();
				shown = true;
				consoleLog(webElement.id + " - shown");
			}
		}
		else
		{
			if (!shown)
			{
				$w("#" + webElement.id).hide();
                if (collapse)
                {
                    $w("#" + webElement.id).collapse();
                }
				consoleLog(webElement.id + " - hidden");
                result = true;
			}
		}
	}

    return result;
}

function showHideElements(level, parentElement)
{
	consoleLog("showHideElements called: level " + level + " element - " + parentElement.type + " : " + parentElement.id);    

    var elementHidden = false;

    if (parentElement.type !== "$w.Page" && parentElement.type !== "$w.Header" && parentElement.type !== "$w.Footer" && (parentElement.type === "$w.ColumnStrip" || parentElement.type === "$w.Column" || parentElement.type === "$w.HtmlComponent" || parentElement.type ===  "$w.IFrame" || parentElement.type ===  "$w.Text" || parentElement.type ===  "$w.Image" || parentElement.type ===  "$w.StylableButton"))
	{
		elementHidden = hideShowElement(parentElement);
	}

    if (elementHidden === false && parentElement.children !== undefined)
    {
        parentElement.children.forEach(function(childElement) {

            consoleLog("Child Element: level " + level + " element - " + childElement.type + " : " + childElement.id);

            if (childElement.type === "$w.HtmlComponent" || childElement.type ===  "$w.Text" || childElement.type ===  "$w.Image" || childElement.type ===  "$w.ColumnStrip" || childElement.type ===  "$w.Column" || childElement.type ===  "$w.StylableButton")
	        {
		        hideShowElement(childElement);
	        }

            if (childElement.type === "$w.Page")
            {
                consoleLog("level " + level + " element / Page - " + childElement.id);
                showHideElements(level + 1, childElement);
            }

            if (childElement.type === "$w.Header")
            {
                consoleLog("level " + level + " element / Header - " + childElement.id);
                showHideElements(level + 1, childElement);
            }

            if (childElement.type === "$w.Footer")
            {
                consoleLog("level " + level + " element / Footer - " + childElement.id);
                showHideElements(level + 1, childElement);
            }

            if (childElement.type === "$w.Footer")
            {
                consoleLog("level " + level + " element / Header - " + childElement.id);
                showHideElements(level + 1, childElement);
            }

            if (childElement.type === "$w.ColumnStrip")
            {
                consoleLog("level " + level + " element / ColumnStrip - " + childElement.id);
                showHideElements(level + 1, childElement);
            }

            if (childElement.type === "$w.Column")
            {
                consoleLog("level " + level + " element / Column - " + childElement.id);
                showHideElements(level + 1, childElement);
            }

        });
    }
}

export function switchElementVisibility(config) {

	consoleLog("switchElementVisibility called");
	if (config !== undefined)
	{

	}
	else
	{
		settings = defaultSettings;
	}

    $w("Document").children.forEach(function(childElement) {
        showHideElements(1, childElement);
    });
}
