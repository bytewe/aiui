<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:15
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 22:00:50
 * @Description: 相册
-->

<template>
    <view :class="['ai-album', customClass]">
        <view
            v-for="(arr, index) in showUrls"
            ref="ai-album__row"
            :key="index"
            class="ai-album__row"
            :for-computed-use="albumWidth"
        >
            <view
                v-for="(item, index1) in arr"
                :key="index1"
                class="ai-album__row__wrapper"
                :style="[imageStyle(index + 1, index1 + 1)]"
                @click="previewFullImage ? onPreviewTap(getSrc(item)) : ''"
            >
                <image
                    :src="getSrc(item)"
                    :mode="urls.length === 1 ? (imageHeight > 0 ? singleMode : 'widthFix') : multipleMode"
                    :style="[
                        {
                            width: imageWidth,
                            height: imageHeight,
                        },
                    ]"
                />
                <view
                    v-if="
                        showMore &&
                        urls.length > rowCount * showUrls.length &&
                        index === showUrls.length - 1 &&
                        index1 === showUrls[showUrls.length - 1].length - 1
                    "
                    class="ai-album__row__wrapper__text"
                >
                    <ai-text
                        :text="`+${urls.length - maxCount}`"
                        color="#fff"
                        :size="$util.deleteUnit(multipleSize) * 0.3"
                        align="center"
                        custom-style="justify-content: center"
                    />
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
// #ifdef APP-NVUE
// NVUE不支持百分比单位，这里需要通过dom查询组件的宽度
const dom = uni.requireNativePlugin('dom');
// #endif
export default {
    name: 'AiAlbum',
    mixins: [mixins],
    props: {
        // 图片地址
        urls: {
            type: Array,
            default: () => [],
        },
        // 指定从数组的对象元素中读取哪个属性作为图片地址
        keyName: {
            type: String,
            default: '',
        },
        // 单图时，图片长边的长度
        singleSize: {
            type: [String, Number],
            default: '360rpx',
        },
        // 多图时，图片边长
        multipleSize: {
            type: [String, Number],
            default: '140rpx',
        },
        // 多图时，图片水平和垂直之间的间隔
        space: {
            type: [String, Number],
            default: '12rpx',
        },
        // 单图时，图片缩放裁剪的模式
        singleMode: {
            type: String,
            default: 'scaleToFill',
        },
        // 多图时，图片缩放裁剪的模式
        multipleMode: {
            type: String,
            default: 'aspectFill',
        },
        // 最多展示的图片数量，超出时最后一个位置将会显示剩余图片数量
        maxCount: {
            type: [String, Number],
            default: 9,
        },
        // 是否可以预览图片
        previewFullImage: {
            type: Boolean,
            default: true,
        },
        // 每行展示图片数量，如设置，singleSize和multipleSize将会无效
        rowCount: {
            type: [String, Number],
            default: 3,
        },
        // 超出maxCount时是否显示查看更多的提示
        showMore: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            singleWidth: 0, // 单图的宽度
            singleHeight: 0, // 单图的高度
            singlePercent: 0.6, // 单图时，如果无法获取图片的尺寸信息，让图片宽度默认为容器的一定百分比
        };
    },
    computed: {
        imageStyle() {
            return (index1, index2) => {
                const { space, rowCount } = this,
                    { addUnit } = uni.$util,
                    rowLen = this.showUrls.length;
                const style = {
                    marginRight: addUnit(space),
                    marginBottom: addUnit(space),
                };
                // 如果为最后一行，则每个图片都无需下边框
                if (index1 === rowLen) style.marginBottom = 0;
                // 每行的最右边一张和总长度的最后一张无需右边框
                if (index2 === rowCount || (index1 === rowLen && index2 === this.showUrls[index1 - 1].length))
                    style.marginRight = 0;
                return style;
            };
        },
        // 将数组划分为二维数组
        showUrls() {
            const arr = [];
            this.urls.map((item, index) => {
                // 限制最大展示数量
                if (index + 1 <= this.maxCount) {
                    // 计算该元素为第几个素组内
                    const itemIndex = Math.floor(index / this.rowCount);
                    // 判断对应的索引是否存在
                    if (!arr[itemIndex]) {
                        arr[itemIndex] = [];
                    }
                    arr[itemIndex].push(item);
                }
            });
            return arr;
        },
        imageWidth() {
            return uni.$util.addUnit(this.urls.length === 1 ? this.singleWidth : this.multipleSize);
        },
        imageHeight() {
            return uni.$util.addUnit(this.urls.length === 1 ? this.singleHeight : this.multipleSize);
        },
        // 此变量无实际用途，仅仅是为了利用computed特性，让其在urls长度等变化时，重新计算图片的宽度
        // 因为用户在某些特殊的情况下，需要让文字与相册的宽度相等，所以这里事件的形式对外发送
        albumWidth() {
            let width = 0;
            if (this.urls.length === 1) {
                width = this.singleWidth;
            } else {
                const multipleSize = uni.$util.deleteUnit(this.multipleSize);
                const space = uni.$util.deleteUnit(this.space);
                width = this.showUrls[0].length * multipleSize + space * (this.showUrls[0].length - 1);
            }
            this.$emit('albumWidth', width);
            return width;
        },
    },
    watch: {
        urls: {
            immediate: true,
            handler(newVal) {
                if (newVal.length === 1) {
                    this.getImageRect();
                }
            },
        },
    },
    methods: {
        // 预览图片
        onPreviewTap(url) {
            const urls = this.urls.map((item) => {
                return this.getSrc(item);
            });
            uni.previewImage({
                current: url,
                urls,
            });
        },
        // 获取图片的路径
        getSrc(item) {
            return uni.$util.test.object(item) ? (this.keyName && item[this.keyName]) || item.src : item;
        },
        // 单图时，获取图片的尺寸
        // 在小程序中，需要将网络图片的的域名添加到小程序的download域名才可能获取尺寸
        // 在没有添加的情况下，让单图宽度默认为盒子的一定宽度(singlePercent)
        getImageRect() {
            const src = this.getSrc(this.urls[0]);
            uni.getImageInfo({
                src,
                success: (res) => {
                    // 判断图片横向还是竖向展示方式
                    const isHorizotal = res.width >= res.height;
                    const singleSize = uni.$util.deleteUnit(this.singleSize);
                    this.singleWidth = isHorizotal ? singleSize : (res.width / res.height) * singleSize;
                    this.singleHeight = !isHorizotal ? singleSize : (res.height / res.width) * this.singleWidth;
                },
                fail: () => {
                    this.getComponentWidth();
                },
            });
        },
        // 获取组件的宽度
        async getComponentWidth() {
            // 延时一定时间，以获取dom尺寸
            await uni.$util.sleep(30);
            // #ifndef APP-NVUE
            this.getRect('.ai-album__row').then((size) => {
                this.singleWidth = size.width * this.singlePercent;
            });
            // #endif
            // #ifdef APP-NVUE
            // 这里ref="ai-album__row"所在的标签为通过for循环出来，导致this.$refs['ai-album__row']是一个数组
            const ref = this.$refs['ai-album__row'][0];
            if (ref) {
                dom.getComponentRect(ref, (res) => {
                    this.singleWidth = res.size.width * this.singlePercent;
                });
            }
            // #endif
        },
    },
};
</script>

<style lang="scss" scoped>
.ai-album {
    flex-direction: column;

    &__row {
        flex-direction: row;
        flex-wrap: wrap;

        &__wrapper {
            position: relative;

            &__text {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.3);
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>
