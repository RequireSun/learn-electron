/**
 * Created by kelvinsun on 2016/9/19.
 */
'use strict';

require('../index.html');
require('../style/index.less');
require('./clientWidth');

const { ipcRenderer, remote } = require('electron');
const Countdown = require('@requiresun/countdown');

document.getElementById('btn-get')
        .addEventListener('click', () => ipcRenderer.send('get-remain-request'));

ipcRenderer.on('get-remain-success', (event, remain) => console.log(remain));

ipcRenderer.on('get-remain-error', (event, error) => console.error(error));

document.getElementById('btn-close')
        .addEventListener('click', () => remote.getCurrentWindow().hide());

new Countdown({
    endTime: Date.now() + 10000,
    onTick: remain => console.log(remain),
});

console.log(1234);
