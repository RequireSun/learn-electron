/**
 * Created by kelvinsun on 2016/9/19.
 */
'use strict';

const { ipcRenderer, remote }= require('electron');

document.getElementById('btn-close')
        .addEventListener('click', () => remote.getCurrentWindow().hide());