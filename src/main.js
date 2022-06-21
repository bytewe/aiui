/*
 * @Author: airobot
 * @Date: 2022-01-24 22:33:43
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-02 00:26:58
 * @Description: 应用入口
 */

import Vue from 'vue';
import App from './App';
import config from './config/config';
import util from './util/util';

Vue.config.productionTip = false;

uni.$config = config;
uni.$util = util;

App.mpType = 'app';

const app = new Vue({
    ...App,
});
app.$mount();
