/**
 * Created by kelvinsun on 2016/12/10.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { ipcRenderer, remote } from 'electron';
import Countdown from '@requiresun/countdown';

Vue.use(Vuex);

const state = {
    remainTime: 0,
    countDown : null,
};

const getters = {
    remainTime: state => [
        Math.floor(Math.floor(state['remain'] / 60) / 60),
        Math.floor(state['remain'] / 60) % 60,
        state['remain'] % 60,
    ],
};

const actions = {
    options () {
        ipcRenderer.send('xu-ming');
    },
    close () {},
};