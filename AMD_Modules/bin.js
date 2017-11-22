#!/usr/bin/env node

'use strict';
const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const formattedArgs = args.join(' ');
let gulpPath = path.join('.', 'node_modules', '.bin', 'gulp');

if (!fs.existsSync(gulpPath)) {
    gulpPath = path.join(__dirname, 'node_modules', '.bin', 'gulp');
}

const gulpFile = path.join(__dirname, 'gulpfile.js');

const cmd = `${gulpPath} --silent --gulpfile "${gulpFile}" --cwd . ${formattedArgs}`;

exec(cmd, { stdio: 'inherit' });