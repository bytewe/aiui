<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-02-15 02:10:41
 * @Description: 头像组
-->

<template>
    <view class="ai-avatar-group">
        <view
            v-for="(item, index) in showUrl"
            :key="index"
            class="ai-avatar-group__item"
            :style="{
                marginLeft: index === 0 ? 0 : $util.addUnit(-size * gap),
            }"
        >
            <ai-avatar
                :size="size"
                :shape="shape"
                :mode="mode"
                :src="$util.test.object(item) ? (keyName && item[keyName]) || item.url : item"
            />
            <view
                v-if="showMore && index === showUrl.length - 1 && (urls.length > maxCount || extraValue > 0)"
                class="ai-avatar-group__item__show-more"
                @click="onClick"
            >
                <ai-text
                    color="#ffffff"
                    :size="size * 0.4"
                    :text="`+${extraValue || urls.length - showUrl.length}`"
                    align="center"
                    custom-style="justify-content: center"
                />
            </view>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
export default {
    name: 'AiAvatarGroup',
    mixins: [mixins],
    props: {
        // 头像图片组
        urls: {
            type: Array,
            default: () => [],
        },
        // 最多展示的头像数量
        maxCount: {
            type: [String, Number],
            default: 5,
        },
        // 头像形状
        shape: {
            type: String,
            default: 'circle',
        },
        // 图片裁剪模式
        mode: {
            type: String,
            default: 'scaleToFill',
        },
        // 超出maxCount时是否显示查看更多的提示
        showMore: {
            type: Boolean,
            default: true,
        },
        // 头像大小
        size: {
            type: [String, Number],
            default: 40,
        },
        // 指定从数组的对象元素中读取哪个属性作为图片地址
        keyName: {
            type: String,
            default: '',
        },
        // 头像之间的遮挡比例
        gap: {
            type: [String, Number],
            validator(value) {
                return value >= 0 && value <= 1;
            },
            default: 0.5,
        },
        // 需额外显示的值
        extraValue: {
            type: [Number, String],
            default: 0,
        },
    },
    data() {
        return {};
    },
    computed: {
        showUrl() {
            return this.urls.slice(0, this.maxCount);
        },
    },
    methods: {
        onClick() {
            this.$emit('showMore');
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-avatar-group {
    display: flex;
    flex-direction: row;

    &__item {
        margin-left: -20rpx;
        position: relative;

        &--no-indent {
            // 如果你想质疑作者不会使用:first-child，说明你太年轻，因为nvue不支持
            margin-left: 0;
        }

        &__show-more {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            border-radius: 200rpx;
        }
    }
}
</style>
