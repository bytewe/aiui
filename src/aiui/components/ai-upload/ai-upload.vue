<!--
 * @Author: airobot
 * @Date: 2022-01-24 22:45:16
 * @LastEditors: airobot
 * @LastEditTime: 2022-04-11 21:26:53
 * @Description: 上传
-->

<template>
    <view class="ai-upload" :style="[$util.addStyle(customStyle)]">
        <view v-if="previewImage" class="ai-upload__wrap">
            <view v-for="(item, index) in lists" :key="index" class="ai-upload__wrap__preview">
                <image
                    v-if="item.isImage || (item.type && item.type === 'image')"
                    :src="item.thumb || item.url"
                    :mode="imageMode"
                    class="ai-upload__wrap__preview__image"
                    :style="[
                        {
                            width: $util.addUnit(width),
                            height: $util.addUnit(height),
                        },
                    ]"
                    @click="onPreviewImage(item)"
                />
                <view v-else class="ai-upload__wrap__preview__other">
                    <ai-icon
                        color="#80CBF9"
                        size="26"
                        :name="item.isVideo || (item.type && item.type === 'video') ? 'movie' : 'folder'"
                    />
                    <text class="ai-upload__wrap__preview__other__text">{{
                        item.isVideo || (item.type && item.type === 'video') ? '视频' : '文件'
                    }}</text>
                </view>
                <view v-if="item.status === 'uploading' || item.status === 'failed'" class="ai-upload__status">
                    <view class="ai-upload__status__icon">
                        <ai-icon v-if="item.status === 'failed'" name="close-circle" color="#ffffff" size="25" />
                        <ai-loading-icon v-else size="22" mode="circle" color="#ffffff" />
                    </view>
                    <text v-if="item.message" class="ai-upload__status__message">{{ item.message }}</text>
                </view>
                <view
                    v-if="item.status !== 'uploading' && (deletable || item.deletable)"
                    class="ai-upload__deletable"
                    @click.stop="deleteItem(index)"
                >
                    <view class="ai-upload__deletable__icon">
                        <ai-icon name="close" color="#ffffff" size="10" />
                    </view>
                </view>
                <view v-if="item.status === 'success'" class="ai-upload__success">
                    <!-- #ifdef APP-NVUE -->
                    <image :src="successIcon" class="ai-upload__success__icon" />
                    <!-- #endif -->
                    <!-- #ifndef APP-NVUE -->
                    <view class="ai-upload__success__icon">
                        <ai-icon name="check" color="#ffffff" size="12" />
                    </view>
                    <!-- #endif -->
                </view>
            </view>
            <template v-if="isInCount">
                <view v-if="$slots.default || $slots.$default" @click="chooseFile">
                    <slot />
                </view>
                <view
                    v-else
                    class="ai-upload__button"
                    :hover-class="!disabled ? 'ai-upload__button--hover' : ''"
                    hover-stay-time="150"
                    :class="[disabled && 'ai-upload__button--disabled']"
                    :style="[
                        {
                            width: $util.addUnit(width),
                            height: $util.addUnit(height),
                        },
                    ]"
                    @click="chooseFile"
                >
                    <ai-icon :name="uploadIcon" size="26" :color="uploadIconColor" />
                    <text v-if="uploadText" class="ai-upload__button__text">{{ uploadText }}</text>
                </view>
            </template>
        </view>
    </view>
</template>

<script>
import mixins from '@/aiui/mixins/mixins';
import { chooseFile } from './utils';
import mixin from './mixin.js';

export default {
    name: 'AiUpload',
    mixins: [mixins, mixin],
    props: {
        // 接受的文件类型, 可选值为all media image file video
        accept: {
            type: String,
            default: 'image',
        },
        //   图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头
        capture: {
            type: [String, Array],
            default: () => ['album', 'camera'],
        },
        // 当accept为video时生效，是否压缩视频，默认为true
        compressed: {
            type: Boolean,
            default: true,
        },
        // 当accept为video时生效，可选值为back或front
        camera: {
            type: String,
            default: 'back',
        },
        // 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
        maxDuration: {
            type: Number,
            default: 60,
        },
        // 上传区域的图标，只能内置图标
        uploadIcon: {
            type: String,
            default: 'photo--fill',
        },
        // 上传区域的图标的颜色，默认
        uploadIconColor: {
            type: String,
            default: '#D3D4D6',
        },
        // 是否开启文件读取前事件
        useBeforeRead: {
            type: Boolean,
            default: false,
        },
        // 读取后的处理函数
        afterRead: {
            type: Function,
            default: null,
        },
        // 读取前的处理函数
        beforeRead: {
            type: Function,
            default: null,
        },
        // 是否显示组件自带的图片预览功能
        previewFullImage: {
            type: Boolean,
            default: true,
        },
        // 最大上传数量
        maxCount: {
            type: [String, Number],
            default: 52,
        },
        // 是否启用
        disabled: {
            type: Boolean,
            default: false,
        },
        // 预览上传的图片时的裁剪模式，和image组件mode属性一致
        imageMode: {
            type: String,
            default: 'aspectFill',
        },
        // 标识符，可以在回调函数的第二项参数中获取
        name: {
            type: String,
            default: '',
        },
        // 所选的图片的尺寸, 可选值为original compressed
        sizeType: {
            type: Array,
            default: () => ['original', 'compressed'],
        },
        // 是否开启图片多选，部分安卓机型不支持
        multiple: {
            type: Boolean,
            default: false,
        },
        // 是否展示删除按钮
        deletable: {
            type: Boolean,
            default: true,
        },
        // 文件大小限制，单位为byte
        maxSize: {
            type: [String, Number],
            default: Number.MAX_VALUE,
        },
        // 显示已上传的文件列表
        fileList: {
            type: Array,
            default: () => [],
        },
        // 上传区域的提示文字
        uploadText: {
            type: String,
            default: '',
        },
        // 内部预览图片区域和选择图片按钮的区域宽度
        width: {
            type: [String, Number],
            default: 80,
        },
        // 内部预览图片区域和选择图片按钮的区域高度
        height: {
            type: [String, Number],
            default: 80,
        },
        // 是否在上传完成后展示预览图
        previewImage: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            // #ifdef APP-NVUE
            successIcon:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAACP0lEQVRYCc3YXygsURwH8K/dpcWyG3LF5u/6/+dKVylSypuUl6uUPMifKMWL8oKEB1EUT1KeUPdR3uTNUsSLxb2udG/cbvInNuvf2rVnazZ/ZndmZ87snjM1Z+Z3zpzfp9+Z5mEAhlvjRtZgCKs+gnPAOcAkkMOR4jEHfItjDvgRxxSQD8cM0BuOCaAvXNCBQrigAsXgggYUiwsK0B9cwIH+4gIKlIILGFAqLiBAOTjFgXJxigJp4BQD0sIpAqSJow6kjSNAFTnRaHJwLenD6Mud52VQAcrBfTd2oyq+HtGaGGWAcnAVcXWoM3bCZrdi+ncPfaAcXE5UKVpdW/vitGPqqAtn98d0gXJwX7Qp6MmegUYVhvmTIezdmHlxJCjpHRTCFerLkRRu4k0aqdajN3sWOo0BK//msHa+xDuPC/oNFMKRhTtM4xjIX0SCNpXL4+7VIaHuyiWEp2L7ahWLf8fejfPdqPmC3mJicORZUp1CQzm+GiphvljGk+PBvWRbxii+xVTj5M6CiZ/tsDufvaXyxEUDxeLIyvu3m0iOyEFWVAkydcVYdyFrE9tQk9iMq6f/GNlvwt3LjQfh60LUrw9/cFyyMJUW/XkLSNMV4Mi6C5ML+ui4x5ClAX9sB9w0wV6wglJwJCv5fOxcr6EstgbGiEw4XcfUry4cWrcEUW8n+ARKxXEJHhw2WG43UKSvwI/TSZgvl7kh0b3XLZaLEy0QmMgLZAVH7J+ALOE+AVnDvQOyiPMAWcW5gSzjCPAV+78S5WE0GrQAAAAASUVORK5CYII=',
            // #endif
            lists: [],
            isInCount: true,
        };
    },
    watch: {
        // 监听文件列表的变化，重新整理内部数据
        fileList: {
            immediate: true,
            handler() {
                this.formatFileList();
            },
        },
    },
    methods: {
        formatFileList() {
            const { fileList = [], maxCount } = this;
            const lists = fileList.map((item) =>
                Object.assign(Object.assign({}, item), {
                    // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
                    isImage: this.accept === 'image' || uni.$util.test.image(item.url || item.thumb),
                    isVideo: this.accept === 'video' || uni.$util.test.video(item.url || item.thumb),
                    deletable: typeof item.deletable === 'boolean' ? item.deletable : this.deletable,
                })
            );
            this.lists = lists;
            this.isInCount = lists.length < maxCount;
        },
        chooseFile() {
            const { maxCount, multiple, lists, disabled } = this;
            if (disabled) return;
            chooseFile(
                Object.assign(
                    {
                        accept: this.accept,
                        multiple: this.multiple,
                        capture: this.capture,
                        compressed: this.compressed,
                        maxDuration: this.maxDuration,
                        sizeType: this.sizeType,
                        camera: this.camera,
                    },
                    {
                        maxCount: maxCount - lists.length,
                    }
                )
            )
                .then((res) => {
                    this.onBeforeRead(multiple ? res : res[0]);
                })
                .catch((error) => {
                    this.$emit('error', error);
                });
        },
        // 文件读取之前
        onBeforeRead(file) {
            const { beforeRead, useBeforeRead } = this;
            let res = true;
            // beforeRead是否为一个方法
            if (uni.$util.test.func(beforeRead)) {
                // 如果用户定义了此方法，则去执行此方法，并传入读取的文件回调
                res = beforeRead(file, this.getDetail());
            }
            if (useBeforeRead) {
                res = new Promise((resolve, reject) => {
                    this.$emit(
                        'beforeRead',
                        Object.assign(
                            Object.assign(
                                {
                                    file,
                                },
                                this.getDetail()
                            ),
                            {
                                callback: (ok) => {
                                    ok ? resolve() : reject();
                                },
                            }
                        )
                    );
                });
            }
            if (!res) {
                return;
            }
            if (uni.$util.test.promise(res)) {
                res.then((data) => this.onAfterRead(data || file));
            } else {
                this.onAfterRead(file);
            }
        },
        getDetail(index) {
            return {
                name: this.name,
                index: index == null ? this.fileList.length : index,
            };
        },
        onAfterRead(file) {
            const { maxSize, afterRead } = this;
            const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize) : file.size > maxSize;
            if (oversize) {
                this.$emit(
                    'oversize',
                    Object.assign(
                        {
                            file,
                        },
                        this.getDetail()
                    )
                );
                return;
            }
            if (typeof afterRead === 'function') {
                afterRead(file, this.getDetail());
            }
            this.$emit(
                'afterRead',
                Object.assign(
                    {
                        file,
                    },
                    this.getDetail()
                )
            );
        },
        deleteItem(index) {
            this.$emit(
                'delete',
                Object.assign(Object.assign({}, this.getDetail(index)), {
                    file: this.fileList[index],
                })
            );
        },
        // 预览图片
        onPreviewImage(item) {
            if (!item.isImage || !this.previewFullImage) return;
            uni.previewImage({
                // 先filter找出为图片的item，再返回filter结果中的图片url
                urls: this.lists
                    .filter((item) => this.accept === 'image' || uni.$util.test.image(item.url || item.thumb))
                    .map((item) => item.url || item.thumb),
                current: item.url || item.thumb,
                fail() {
                    uni.$util.toast('预览图片失败');
                },
            });
        },
        onPreviewVideo(event) {
            if (!this.data.previewFullImage) return;
            const { index } = event.currentTarget.dataset;
            const { lists } = this.data;
            wx.previewMedia({
                sources: lists.map((item) =>
                    Object.assign(Object.assign({}, item), {
                        type: 'video',
                    })
                ),
                current: index,
                fail() {
                    uni.$util.toast('预览视频失败');
                },
            });
        },
        onClickPreview(event) {
            const { index } = event.currentTarget.dataset;
            const item = this.data.lists[index];
            this.$emit('clickPreview', Object.assign(Object.assign({}, item), this.getDetail(index)));
        },
    },
};
</script>

<style lang="scss" scoped>
$ai-upload-preview-border-radius: 4rpx !default;
$ai-upload-preview-margin: 0 16rpx 16rpx 0 !default;
$ai-upload-image-width: 160rpx !default;
$ai-upload-image-height: $ai-upload-image-width;
$ai-upload-other-background: rgb(242, 242, 242) !default;
$ai-upload-other-flex: 1 !default;
$ai-upload-text-font-size: 22rpx !default;
$ai-upload-text-color: $color-gray !default;
$ai-upload-text-margin-top: 4rpx !default;
$ai-upload-deletable-right: 0 !default;
$ai-upload-deletable-top: 0 !default;
$ai-upload-deletable-background: rgb(55, 55, 55) !default;
$ai-upload-deletable-height: 28rpx !default;
$ai-upload-deletable-width: $ai-upload-deletable-height;
$ai-upload-deletable-boder-bottom-left-radius: 200rpx !default;
$ai-upload-deletable-zIndex: 3 !default;
$ai-upload-success-bottom: 0 !default;
$ai-upload-success-right: 0 !default;
$ai-upload-success-border-top-color: transparent !default;
$ai-upload-success-border-left-color: transparent !default;
$ai-upload-success-border-bottom-color: $color-success !default;
$ai-upload-success-border-right-color: $ai-upload-success-border-bottom-color;
$ai-upload-success-border-width: 18rpx !default;
$ai-upload-icon-top: 0rpx !default;
$ai-upload-icon-right: 0rpx !default;
$ai-upload-icon-h5-top: 2rpx !default;
$ai-upload-icon-h5-right: 0 !default;
$ai-upload-icon-width: 32rpx !default;
$ai-upload-icon-height: $ai-upload-icon-width;
$ai-upload-success-icon-bottom: -20rpx !default;
$ai-upload-success-icon-right: -20rpx !default;
$ai-upload-status-right: 0 !default;
$ai-upload-status-left: 0 !default;
$ai-upload-status-bottom: 0 !default;
$ai-upload-status-top: 0 !default;
$ai-upload-status-background: rgba(0, 0, 0, 0.5) !default;
$ai-upload-status-icon-Zindex: 1 !default;
$ai-upload-message-font-size: 24rpx !default;
$ai-upload-message-color: #ffffff !default;
$ai-upload-message-margin-top: 10rpx !default;
$ai-upload-button-width: 160rpx !default;
$ai-upload-button-height: $ai-upload-button-width;
$ai-upload-button-background: rgb(244, 245, 247) !default;
$ai-upload-button-border-radius: 4rpx !default;
$ai-upload-botton-margin: 0 16rpx 16rpx 0 !default;
$ai-upload-text-font-size: 22rpx !default;
$ai-upload-text-color: $color-gray !default;
$ai-upload-text-margin-top: 4rpx !default;
$ai-upload-hover-background: rgb(230, 231, 233) !default;
$ai-upload-disabled-opacity: 0.5 !default;

.ai-upload {
    flex-direction: column;
    flex: 1;

    &__wrap {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex: 1;

        &__preview {
            border-radius: $ai-upload-preview-border-radius;
            margin: $ai-upload-preview-margin;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: row;

            &__image {
                width: $ai-upload-image-width;
                height: $ai-upload-image-height;
            }

            &__other {
                width: $ai-upload-image-width;
                height: $ai-upload-image-height;
                background-color: $ai-upload-other-background;
                flex: $ai-upload-other-flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                &__text {
                    font-size: $ai-upload-text-font-size;
                    color: $ai-upload-text-color;
                    margin-top: $ai-upload-text-margin-top;
                }
            }
        }
    }

    &__deletable {
        position: absolute;
        top: $ai-upload-deletable-top;
        right: $ai-upload-deletable-right;
        background-color: $ai-upload-deletable-background;
        height: $ai-upload-deletable-height;
        width: $ai-upload-deletable-width;
        display: flex;
        flex-direction: row;
        border-bottom-left-radius: $ai-upload-deletable-boder-bottom-left-radius;
        align-items: center;
        justify-content: center;
        z-index: $ai-upload-deletable-zIndex;

        &__icon {
            position: absolute;
            transform: scale(0.7);
            top: $ai-upload-icon-top;
            right: $ai-upload-icon-right;
            /* #ifdef H5 */
            top: $ai-upload-icon-h5-top;
            right: $ai-upload-icon-h5-right;
            /* #endif */
        }
    }

    &__success {
        position: absolute;
        bottom: $ai-upload-success-bottom;
        right: $ai-upload-success-right;
        display: flex;
        flex-direction: row;
        // 由于weex(nvue)为阿里巴巴的KPI(部门业绩考核)的laji产物，不支持css绘制三角形
        // 所以在nvue下使用图片，非nvue下使用css实现
        /* #ifndef APP-NVUE */
        border-top-color: $ai-upload-success-border-top-color;
        border-left-color: $ai-upload-success-border-left-color;
        border-bottom-color: $ai-upload-success-border-bottom-color;
        border-right-color: $ai-upload-success-border-right-color;
        border-width: $ai-upload-success-border-width;
        align-items: center;
        justify-content: center;
        /* #endif */

        &__icon {
            /* #ifndef APP-NVUE */
            position: absolute;
            transform: scale(0.7);
            bottom: $ai-upload-success-icon-bottom;
            right: $ai-upload-success-icon-right;
            /* #endif */
            /* #ifdef APP-NVUE */
            width: $ai-upload-icon-width;
            height: $ai-upload-icon-height;
            /* #endif */
        }
    }

    &__status {
        position: absolute;
        top: $ai-upload-status-top;
        bottom: $ai-upload-status-bottom;
        left: $ai-upload-status-left;
        right: $ai-upload-status-right;
        background-color: $ai-upload-status-background;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__icon {
            position: relative;
            z-index: $ai-upload-status-icon-Zindex;
        }

        &__message {
            font-size: $ai-upload-message-font-size;
            color: $ai-upload-message-color;
            margin-top: $ai-upload-message-margin-top;
        }
    }

    &__button {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: $ai-upload-button-width;
        height: $ai-upload-button-height;
        background-color: $ai-upload-button-background;
        border-radius: $ai-upload-button-border-radius;
        margin: $ai-upload-botton-margin;
        /* #ifndef APP-NVUE */
        box-sizing: border-box;
        /* #endif */

        &__text {
            font-size: $ai-upload-text-font-size;
            color: $ai-upload-text-color;
            margin-top: $ai-upload-text-margin-top;
        }

        &--hover {
            background-color: $ai-upload-hover-background;
        }

        &--disabled {
            opacity: $ai-upload-disabled-opacity;
        }
    }
}
</style>
