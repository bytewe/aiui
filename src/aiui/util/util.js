/*
 * @Author: airobot
 * @Date: 2022-01-25 20:43:47
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-13 21:27:55
 * @Description: 工具函数
 */

import base from './base/base';
import style from './style/style';
import format from './format/format';
import test from './test/test';
import ui from './ui/ui';
import system from './system/system';
import router from './router/router';
import debounce from './debounce/debounce';
import throttle from './throttle/throttle';
import request from './request/request';
import location from './location/location';
import storage from './storage/storage';
import user from './user/user';

export default {
    ...base,
    ...style,
    ...format,
    test,
    ...ui,
    ...system,
    ...router,
    debounce,
    throttle,
    request,
    ...location,
    ...storage,
    ...user,
};
