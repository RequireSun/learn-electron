<template>
    <div class="stage">
        <aside class="toolbar">
            <button @click="options"><span class="icon icon-list"></span></button>
            <div class="space"></div>
            <button @click="close"><span class="icon icon-remove"></span></button>
        </aside>
        <div class="main"></div>
    </div>
</template>

<script>
import { mapGetters, mapActions, } from 'vuex';

export default {
    computed: mapGetters([
        'remainTime',
    ]),
    methods: mapActions([
        'options',
        'close',
    ]),
};
</script>