<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-26 18:18:24
 * @Description: 头像
-->

<template>
    <view class="ai-avatar" :class="[`ai-avatar--${shape}`]" :style="[style]" @click="click">
        <slot>
            <!-- #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU  -->
            <open-data v-if="mpAvatar && allowMp" type="userAvatarUrl" :style="[imageStyle]" />
            <!-- #endif -->
            <!-- #ifndef MP-WEIXIN && MP-QQ && MP-BAIDU  -->
            <template v-if="mpAvatar && allowMp" />
            <!-- #endif -->
            <ai-icon v-else-if="icon" :name="icon" :size="fontSize" :color="color" />
            <ai-text
                v-else-if="text"
                :text="text"
                :size="fontSize"
                :color="color"
                align="center"
                custom-style="justify-content: center"
            />
            <image
                v-else
                class="ai-avatar__image"
                :class="[`ai-avatar__image--${shape}`]"
                :src="avatarUrl || defaultUrl"
                :mode="mode"
                :style="[imageStyle]"
                @error="error"
            />
        </slot>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
export default {
    name: 'AiAvatar',
    mixins: [mixins],
    props: {
        // 头像图片路径(不能为相对路径)
        src: {
            type: String,
            default: '',
        },
        // 头像形状，circle-圆形，square-方形
        shape: {
            type: String,
            default: 'circle',
        },
        // 头像尺寸
        size: {
            type: [String, Number],
            default: '80rpx',
        },
        // 裁剪模式
        mode: {
            type: String,
            default: 'scaleToFill',
        },
        // 文字
        text: {
            type: String,
            default: '',
        },
        // 背景色
        background: {
            type: String,
            default: '#c0c4cc',
        },
        // 文字颜色
        color: {
            type: String,
            default: '#ffffff',
        },
        // 文字大小
        fontSize: {
            type: [String, Number],
            default: '36rpx',
        },
        // 图标
        icon: {
            type: String,
            default: '',
        },
        // 显示小程序头像，只对百度，微信，QQ小程序有效
        mpAvatar: {
            type: Boolean,
            default: false,
        },
        // 是否使用随机背景色
        randomBackground: {
            type: Boolean,
            default: false,
        },
        // 加载失败的默认头像(组件有内置默认图片)
        defaultUrl: {
            type: String,
            default: `${uni.$config.static}account/avatar.jpg`,
        },
        // 如果配置了randomBackground为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
        colorIndex: {
            type: [String, Number],
            default: '',
        },
        // 随机背景色列表
        colors: {
            type: Array,
            default: () => [
                '#ffb34b',
                '#f2bba9',
                '#f7a196',
                '#f18080',
                '#88a867',
                '#bfbf39',
                '#89c152',
                '#94d554',
                '#f19ec2',
                '#afaae4',
                '#e1b0df',
                '#c38cc1',
                '#72dcdc',
                '#9acdcb',
                '#77b1cc',
                '#448aca',
                '#86cefa',
                '#98d1ee',
                '#73d1f1',
                '#80a7dc',
            ],
        },
        // 组件标识符
        name: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            avatarUrl: this.src,
            allowMp: false,
        };
    },
    computed: {
        // 样式
        style() {
            const { text, icon, colorIndex, randomBackground, colors, background, size } = this;
            const max = colors.length - 1;
            const index = colorIndex !== '' && colorIndex < max ? colorIndex : uni.$util.random(0, max);
            const style = {
                backgroundColor: !text && !icon ? 'transparent' : randomBackground && max ? colors[index] : background,
                width: uni.$util.addUnit(size),
                height: uni.$util.addUnit(size),
            };
            return uni.$util.deepMerge(style, uni.$util.addStyle(this.customStyle));
        },
        // 图片样式
        imageStyle() {
            const { size } = this;
            return {
                width: uni.$util.addUnit(size),
                height: uni.$util.addUnit(size),
            };
        },
    },
    watch: {
        // 监听头像src的变化，赋值给内部的avatarUrl变量，因为图片加载失败时，需要修改图片的src为默认值
        // 而组件内部不能直接修改props的值，所以需要一个中间变量
        src: {
            immediate: true,
            handler(newVal) {
                this.avatarUrl = newVal;
            },
        },
    },
    created() {
        this.init();
    },
    methods: {
        // 初始化
        init() {
            // 目前只有这几个小程序平台具有open-data标签
            // 其他平台可以通过uni.getUserInfo类似接口获取信息，但是需要弹窗授权(首次)，不合符组件逻辑
            // 故目前自动获取小程序头像只支持这几个平台
            // #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU
            this.allowMp = true;
            // #endif
        },
        // 图片加载时失败时触发
        error() {
            this.avatarUrl = this.defaultUrl;
        },
        // 点击
        click() {
            this.$emit('click', this.name);
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-avatar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &--circle {
        border-radius: 200rpx;
    }

    &--square {
        border-radius: 8rpx;
    }

    &__image {
        &--circle {
            border-radius: 200rpx;
        }

        &--square {
            border-radius: 8rpx;
        }
    }
}
</style>
