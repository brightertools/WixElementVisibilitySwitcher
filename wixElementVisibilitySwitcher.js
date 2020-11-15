// ----------------------------------------------------------------------------------------------------------------------------------
// switchVisibility.js - Version 1.0.0
// 
// Hide/Show Elemenets for Mobile / Non/Mobile views
// 
// Supports Object Types of: Text, Strip and Html
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
// 3) In DevMode include "DesktopContent", "TabletContent" or "MobileContent" in the element id
// eg: html1DesktopContentTableContent (will show on Desktop and Tablet) html2MobileContentTableContent (will show on Desktop and Tablet)
//
// Created by Brighter Tools Ltd - www.brightertools.com
// Latest version at: https://github.com/brightertools/WixElementVisibilitySwitcher
// ---------------------------------------------------------------------------------------------------------------------------------

import wixWindow from 'wix-window';

const debug = true;
const defaultSettings = {
	showHideTextElement: true,
	showHideStripElements: true,
	showHideHtmlElements: true,
	showHideButtonElements: true
};

var settings = {};

function consoleLog(text)
{
	if (!debug)
	{
		return;
	}
	console.log(text);
}

function switchDesktopMobileHtmlElements(htmlElement)
{
	//$w("#" + htmlElement.id).hide();
	consoleLog("Html Element: " + htmlElement.id);

	var shown = false;

	if (htmlElement.id.indexOf("MobileContent") >= 0) {

		if (wixWindow.formFactor === "Mobile") {
			$w("#" + htmlElement.id).show();
			shown = true;
			consoleLog(htmlElement.id + " - shown");
		}
		else
		{
			$w("#" + htmlElement.id).hide();
			consoleLog(htmlElement.id + " - hidden");
		}
	}
	if (htmlElement.id.indexOf("TabletContent") >= 0) {
		if (wixWindow.formFactor === "Tablet") {
			$w("#" + htmlElement.id).show();
			consoleLog(htmlElement.id + " - shown");
		}
		else
		{
			if (!shown)
			{
				$w("#" + htmlElement.id).hide();
				consoleLog(htmlElement.id + " - hidden");
			}
		}
	}
	if (htmlElement.id.indexOf("DesktopContent") >= 0) {
		if (wixWindow.formFactor === "Desktop") {
			$w("#" + htmlElement.id).show();
			consoleLog(htmlElement.id + " - shown");
		}
		else
		{
			if (!shown)
			{
				$w("#" + htmlElement.id).hide();
				consoleLog(htmlElement.id + " - hidden");
			}
		}
	}
}


function switchDesktopMobileHtmlFromStripAsRoot(stripElement)
{
	stripElement.children.forEach(function(c2)
	{
		if (c2.type === "$w.Column")
		{
			console.log("documentRoot/Page/Strip/Column : " + c2.id);
			c2.children.forEach(function(c3)
			{
				//console.log(c3.type + " : " + c3.id + ", form factor = " + wixWindow.formFactor);
				if (c3.type === "$w.HtmlComponent")
				{
					console.log("is html component");
					switchDesktopMobileHtmlElements(c3);
				}

				if (c2 !== undefined && c2.type === "$w.IFrame")
				{
					// On the blog page, the blog is contained within an IFrame, so this is the root element we will look into
					switchDesktopMobileHtmlFromIFrameAsRoot(c2);
				}
			});
		}
	});
}

function switchDesktopMobileHtmlFromIFrameAsRoot(iFrameElement)
{
	iFrameElement.children.forEach(function(c2)
	{
		if (c2.type === "$w.Column")
		{
			c2.children.forEach(function(c3)
			{
				//console.log(c3.type + " : " + c3.id + ", form factor = " + wixWindow.formFactor);
				if (c3.type === "$w.HtmlComponent")
				{
					console.log("is html component");
					switchDesktopMobileHtmlElements(c3);
				}
			});
		}
	});
}

function switchDesktopMobileFromStripParentElement(rootElement)
{
	console.log("switchDesktopMobileElements called.");
	//console.log(rootElement.type + " : " + rootElement.id);
	
	rootElement.children.forEach(function(c){
		
		console.log("Parent Element = " + rootElement.id + ", Child Element = " + c.type + " : " + c.id);
		
		if (c.type === "$w.ColumnStrip")
		{
			console.log("documentRoot/Page/Strip : " + c.id);
			switchDesktopMobileHtmlFromStripAsRoot(c);
		}

		if (c.type === "$w.Page")
		{
			console.log("documentRoot/Strip/Page : " + c.id);
			// Switch Desktop/Mobile for all element on Page
			switchDesktopMobileFromStripParentElement(c);
		}

		if (c.type === "$w.HtmlComponent")
		{
			console.log("is html component (" + c.id + ")");
			switchDesktopMobileHtmlElements(c);
		}

		//if (c.type === "$w.IFrame")
		//{
		//	console.log("documentRoot/Strip/Iframe : " + c.id, + ", children length =" + c.children.length);
			// On the blog page, the blog is contained within an IFrame, so this is the root element we will look into
			//switchDesktopMobileHtmlFromIFrameAsRoot(c);
		//}
	});
}

function switchRootElements()
{
	consoleLog("root elements");

	$w("Document").children.forEach(function(childElement){
		console.log("documentRoot-" + childElement.type + " : " + childElement.id);

		if (childElement.type === "$w.Page")
		{
			console.log("documentRoot/Page : " + childElement.id);
			// Switch Desktop/Mobile for all element on Page
			switchDesktopMobileFromStripParentElement(childElement);
		}

		console.log("other documentRoot Elements...");

		if (childElement.type === "$w.IFrame")
		{
			console.log("documentRoot/Iframe : " + childElement.id);
			// On the blog page, the blog is contained within an IFrame, so this is the root element we will look into
			switchDesktopMobileHtmlFromIFrameAsRoot(childElement);
		}

		if (childElement.type === "$w.HtmlComponent")
		{
			console.log("is html component");
			switchDesktopMobileHtmlElements(childElement);
		}
	});	
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
	switchRootElements();
	return true;
}
