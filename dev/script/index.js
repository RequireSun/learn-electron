/**
 * Created by kelvinsun on 2016/9/19.
 */
'use strict';

const { ipcRenderer, remote }= require('electron');

document.getElementById('btn-get')
        .addEventListener('click', () => ipcRenderer.send('get-remain-request'));

ipcRenderer.on('get-remain-success', (event, remain) => console.log(remain));

ipcRenderer.on('get-remain-error', (event, error) => console.error(error));

document.getElementById('btn-close')
        .addEventListener('click', () => remote.getCurrentWindow().hide());