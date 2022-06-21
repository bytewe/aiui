<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-19 20:44:57
 * @Description: 无网络提示
-->

<template>
    <ai-overlay
        :show="!isConnected"
        :custom-style="{
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
        }"
        @touchmove.stop.prevent="preventEvent"
    >
        <view class="ai-no-network">
            <ai-icon :name="image" size="150" img-mode="widthFit" class="ai-no-network__error-icon" />
            <text class="ai-no-network__tips">{{ tips }}</text>
            <!-- 只有APP平台，才能跳转设置页，因为需要调用plus环境 -->
            <!-- #ifdef APP-PLUS -->
            <view class="ai-no-network__app">
                <text class="ai-no-network__app__setting">请检查网络，或前往</text>
                <text class="ai-no-network__app__to-setting" @click="openSettings">设置</text>
            </view>
            <!-- #endif -->
            <view class="ai-no-network__retry">
                <ai-button size="mini" text="重试" type="primary" plain @click="retry" />
            </view>
        </view>
    </ai-overlay>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';

export default {
    name: 'AiNoNetwork',
    mixins: [mixins],
    props: {
        // 页面文字提示
        tips: {
            type: String,
            default: '哎呀，网络信号丢失',
        },
        // 一个z-index值，用于设置没有网络这个组件的层次，因为页面可能会有其他定位的元素层级过高，导致此组件被覆盖
        zIndex: {
            type: [String, Number],
            default: '',
        },
        // image 没有网络的图片提示
        image: {
            type: String,
            default: 'https://ui.bytewe.cn/image/empty/wifi.png',
        },
    },
    data() {
        return {
            isConnected: true, // 是否有网络连接
            networkType: 'none', // 网络类型
        };
    },
    mounted() {
        this.isIOS = uni.getSystemInfoSync().platform === 'ios';
        uni.onNetworkStatusChange((res) => {
            this.isConnected = res.isConnected;
            this.networkType = res.networkType;
            this.emitEvent(this.networkType);
        });
        uni.getNetworkType({
            success: (res) => {
                this.networkType = res.networkType;
                this.emitEvent(this.networkType);
                if (res.networkType == 'none') {
                    this.isConnected = false;
                } else {
                    this.isConnected = true;
                }
            },
        });
    },
    methods: {
        retry() {
            // 重新检查网络
            uni.getNetworkType({
                success: (res) => {
                    this.networkType = res.networkType;
                    this.emitEvent(this.networkType);
                    if (res.networkType == 'none') {
                        uni.$util.toast('无网络连接');
                        this.isConnected = false;
                    } else {
                        uni.$util.toast('网络已连接');
                        this.isConnected = true;
                    }
                },
            });
            this.$emit('retry');
        },
        // 发出事件给父组件
        emitEvent(networkType) {
            this.$emit(networkType === 'none' ? 'disconnected' : 'connected');
        },
        async openSettings() {
            if (this.networkType == 'none') {
                this.openSystemSettings();
                return;
            }
        },
        openAppSettings() {
            this.gotoAppSetting();
        },
        openSystemSettings() {
            // 以下方法来自5+范畴，如需深究，请自行查阅相关文档
            if (this.isIOS) {
                this.gotoiOSSetting();
            } else {
                this.gotoAndroidSetting();
            }
        },
        network() {
            var result = null;
            var cellularData = plus.ios.newObject('CTCellularData');
            var state = cellularData.plusGetAttribute('restrictedState');
            if (state == 0) {
                result = null;
            } else if (state == 2) {
                result = 1;
            } else if (state == 1) {
                result = 2;
            }
            plus.ios.deleteObject(cellularData);
            return result;
        },
        gotoAppSetting() {
            if (this.isIOS) {
                var UIApplication = plus.ios.import('UIApplication');
                var application2 = UIApplication.sharedApplication();
                var NSURL2 = plus.ios.import('NSURL');
                var setting2 = NSURL2.URLWithString('app-settings:');
                application2.openURL(setting2);
                plus.ios.deleteObject(setting2);
                plus.ios.deleteObject(NSURL2);
                plus.ios.deleteObject(application2);
            } else {
                var Intent = plus.android.importClass('android.content.Intent');
                var Settings = plus.android.importClass('android.provider.Settings');
                var Uri = plus.android.importClass('android.net.Uri');
                var mainActivity = plus.android.runtimeMainActivity();
                var intent = new Intent();
                intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                var uri = Uri.fromParts('package', mainActivity.getPackageName(), null);
                intent.setData(uri);
                mainActivity.startActivity(intent);
            }
        },
        gotoiOSSetting() {
            var UIApplication = plus.ios.import('UIApplication');
            var application2 = UIApplication.sharedApplication();
            var NSURL2 = plus.ios.import('NSURL');
            var setting2 = NSURL2.URLWithString('App-prefs:root=General');
            application2.openURL(setting2);
            plus.ios.deleteObject(setting2);
            plus.ios.deleteObject(NSURL2);
            plus.ios.deleteObject(application2);
        },
        gotoAndroidSetting() {
            var Intent = plus.android.importClass('android.content.Intent');
            var Settings = plus.android.importClass('android.provider.Settings');
            var mainActivity = plus.android.runtimeMainActivity();
            var intent = new Intent(Settings.ACTION_SETTINGS);
            mainActivity.startActivity(intent);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-no-network {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -200rpx;

    &__tips {
        color: $color-gray;
        font-size: 28rpx;
        margin-top: 30rpx;
    }

    &__app {
        flex-direction: row;
        margin-top: 12rpx;

        &__setting {
            color: $color-light;
            font-size: 26rpx;
        }

        &__to-setting {
            font-size: 26rpx;
            color: $color-primary;
            margin-left: 6rpx;
        }
    }

    &__retry {
        flex-direction: row;
        justify-content: center;
        margin-top: 30rpx;
    }
}
</style>
