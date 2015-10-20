-----------
Quick Start
-----------

This folder contains the Quick Start - a prepackaged viewer application aimed at getting developers started immediately with custom development.

The Quick Start includes a basic viewer as well as the start of a custom module which developers can begin building on.

This folder includes two build scripts: a batch file script (build.bat) and a shell script (build.sh). Each build script compiles custom 
module code from the folder called "Custom" into the output folder called "Web". When setting up a development environment, you must ensure that
one of the build scripts is set to run in a post-build step.


Deploying the Viewer to a web server
------------------------------------

First, run build.bat (Windows) or build.sh (Unix Bash), depending on your environment.

Follow the instructions given in the Installation Guide to deploy the viewer. Note that there are two approaches to deployment: deployment using
Geocortex Essentials and manual deployment. See the Installation Options section of the Installation Guide for a discussion of the 
implications of each approach.

You may have to set up a proxy page in your web server. A proxy page is required when working with large or cross-domain requests. 
If your workflows are hosted on a separate domain than the one your viewers are served from, a proxy page is required.

The Viewer ships with proxy pages for Java (JSP), PHP, and ASP.NET. For information on setting up a proxy page, refer to the Installation Guide. 

Troubleshooting tip: If any of the functionality is not working (particularly the workflows), try monitoring HTTP transactions with the
browser's development tools, or an HTTP traffic monitoring tool like Fiddler.

By default, the Geocortex Viewer for HTML5 is configured to target a World Cities site on a sample Geocortex server. The Installation Guide gives
instructions for pointing the viewer to your site.