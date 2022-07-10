<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-07-10 21:17:50
 * @Description: 上传
-->

<template>
    <ai-page background="white">
        <ai-box title="基础用法">
            <ai-upload
                :file-list="fileList1"
                name="1"
                multiple
                :max-count="10"
                @afterRead="afterRead"
                @delete="deletePic"
            />
        </ai-box>

        <ai-box title="上传视频">
            <ai-upload
                :file-list="fileList2"
                name="2"
                multiple
                :max-count="10"
                accept="video"
                @afterRead="afterRead"
                @delete="deletePic"
            />
        </ai-box>

        <ai-box title="文件预览">
            <ai-upload
                :file-list="fileList3"
                name="3"
                multiple
                :max-count="10"
                :preview-full-image="true"
                @afterRead="afterRead"
                @delete="deletePic"
            />
        </ai-box>

        <ai-box title="隐藏上传按钮">
            <ai-upload
                :file-list="fileList4"
                name="4"
                multiple
                :max-count="2"
                @afterRead="afterRead"
                @delete="deletePic"
            />
        </ai-box>

        <ai-box title="限制上传数量">
            <ai-upload
                :file-list="fileList5"
                name="5"
                multiple
                :max-count="3"
                @afterRead="afterRead"
                @delete="deletePic"
            />
        </ai-box>

        <ai-box title="自定义上传样式">
            <ai-upload
                :file-list="fileList6"
                name="6"
                multiple
                :max-count="1"
                width="250"
                height="150"
                @afterRead="afterRead"
                @delete="deletePic"
            >
                <image
                    :src="`${$config.static}upload/positive.png`"
                    mode="widthFix"
                    width="320px"
                    height="192px"
                />
            </ai-upload>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            fileList1: [],
            fileList2: [],
            fileList3: [
                {
                    url: `${uni.$config.static}swiper/1.jpg`,
                },
            ],
            fileList4: [
                {
                    url: `${uni.$config.static}swiper/1.jpg`,
                },
                {
                    url: `${uni.$config.static}swiper/1.jpg`,
                },
            ],
            fileList5: [],
            fileList6: [],
            fileList7: [],
        };
    },
    computed: {
        $config() {
            return uni.$config;
        },
    },
    methods: {
        // 删除图片
        deletePic(event) {
            this[`fileList${event.name}`].splice(event.index, 1);
        },
        // 新增图片
        async afterRead(event) {
            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            let lists = [].concat(event.file);
            let fileListLen = this[`fileList${event.name}`].length;
            lists.map((item) => {
                this[`fileList${event.name}`].push({
                    ...item,
                    status: 'uploading',
                    message: '上传中',
                });
            });
            for (let i = 0; i < lists.length; i++) {
                const result = await this.uploadFilePromise(lists[i].url);
                let item = this[`fileList${event.name}`][fileListLen];
                this[`fileList${event.name}`].splice(
                    fileListLen,
                    1,
                    Object.assign(item, {
                        status: 'success',
                        message: '',
                        url: result,
                    })
                );
                fileListLen++;
            }
        },
        uploadFilePromise(url) {
            return new Promise((resolve) => {
                uni.uploadFile({
                    url: '', // 仅为示例，非真实的接口地址
                    filePath: url,
                    name: 'file',
                    formData: {
                        user: 'test',
                    },
                    success: (res) => {
                        setTimeout(() => {
                            resolve(res.data.data);
                        }, 1000);
                    },
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped></style>
