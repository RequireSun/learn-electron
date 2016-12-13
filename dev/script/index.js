/**
 * Created by kelvinsun on 2016/9/19.
 */
'use strict';

import '../index.html';
import '../style/index.less';
import './clientWidth';

// import { ipcRenderer, remote } from 'electron';
// import Countdown from '@requiresun/countdown';
import Vue from 'vue';
import Vuex from 'vuex';
import View from './view';
import store from './store';

Vue.use(Vuex);

const App = new Vue({
    el: '#business',
    store,
});

// let cd;
//
// const calcTime = remain => [Math.floor(Math.floor(remain / 60) / 60), Math.floor(remain / 60) % 60, remain % 60];

// document.getElementById('btn-get')
//         .addEventListener('click', () => ipcRenderer.send('xu-ming'));

// ipcRenderer.on('get-remain-success', (event, remain) => {
//     if (10 <= remain) {
//         if (!!cd) {
//             cd.abort();
//         }
//         cd = new Countdown({
//             endTime: Date.now() + 7 * 60 * 1000,    // 五分钟倒计时
//             onTick: rm => console.log(calcTime(remain * 60 + Math.round(rm / 1000) - 7 * 60))
//         });
//     } else {
//         ipcRenderer.send('xu-ming');
//     }
// });

// ipcRenderer.on('get-remain-error', (event, error) => console.error(error));
//
// document.getElementById('btn-close')
//         .addEventListener('click', () => remote.getCurrentWindow().hide());
//
// ipcRenderer.send('get-remain-request');