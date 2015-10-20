----
Libs
----

This folder contains TypeScript declaration files for a number of libraries and APIs used in Geocortex Viewer for HTML5. These declaration files assist developers working in TypeScript by providing code-completion for methods and properties within the IDE. Declaration files are also used by the compiler to catch errors in how libraries and APIs are used and help prevent bugs which may not be discovered until later on.

-----------------------------
Using These Declaration Files
-----------------------------

TypeScript developers will need to install TypeScript from http://www.typescriptlang.org/. For code completion, developers will need to use a supported IDE such as Microsoft Visual Studio 2012 or JetBrains WebStorm 6.

A declaration file can be referenced by adding the following to the top of your TypeScript (*.ts) files:

/// <reference path="../../Path/To/Libs/declaration_file.d.ts" />

The referenced path is relative to the TypeScript file in which you are working.

It's that simple!