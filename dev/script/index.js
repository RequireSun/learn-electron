/**
 * Created by kelvinsun on 2016/9/19.
 */
'use strict';

const { ipcRenderer }= require('electron');

document.getElementById('btn-close')
        .addEventListener('click', () => ipcRenderer.send('close-main-window'));