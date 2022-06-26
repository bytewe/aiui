<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-26 18:11:35
 * @Description: 组件
-->

<template>
    <ai-page>
        <ai-cell-group v-for="(group, key) in list" :key="key" :title="group.name" title-background="white">
            <ai-cell
                v-for="(item, index) in group.list"
                :key="index"
                :icon="`${$config.static}components/${item.icon}.png`"
                :title="item.name"
                :url="item.path"
                border-length="full"
                hover
                arrow
                :border="index !== group.list.length - 1"
            />
        </ai-cell-group>
    </ai-page>
</template>

<script>
export default {
    data() {
        return {
            list: [
                // 基础组件
                {
                    name: '基础组件',
                    nameEn: 'Basic components',
                    list: [
                        {
                            path: '/pages/color/color',
                            icon: 'color',
                            name: 'Color 色彩',
                            nameEn: 'Color',
                        },
                        {
                            path: '/pages/icon/icon',
                            icon: 'icon',
                            name: 'Icon 图标',
                            nameEn: 'Icon',
                        },
                        {
                            path: '/pages/image/image',
                            icon: 'image',
                            name: 'Image 图片',
                            nameEn: 'Image',
                        },
                        {
                            path: '/pages/button/button',
                            icon: 'button',
                            name: 'Button 按钮',
                            nameEn: 'Button',
                        },
                        {
                            path: '/pages/text/text',
                            icon: 'text',
                            name: 'Text 文本',
                            nameEn: 'Text',
                        },
                        {
                            path: '/pages/layout/layout',
                            icon: 'layout',
                            name: 'Layout 布局',
                            nameEn: 'Layout',
                        },
                        {
                            path: '/pages/cell/cell',
                            icon: 'cell',
                            name: 'Cell 单元格',
                            nameEn: 'Cell',
                        },
                        {
                            path: '/pages/badge/badge',
                            icon: 'badge',
                            name: 'Badge 徽标数',
                            nameEn: 'Badge',
                        },
                        {
                            path: '/pages/tag/tag',
                            icon: 'tag',
                            name: 'Tag 标签',
                            nameEn: 'Tag',
                        },
                        {
                            path: '/pages/loading-icon/loading-icon',
                            icon: 'loading',
                            name: 'Loading 加载动画',
                            nameEn: 'loading Icon',
                        },
                        {
                            path: '/pages/loading-page/loading-page',
                            icon: 'loading-page',
                            name: 'Loading page 加载页',
                            nameEn: 'Loading Page',
                        },
                    ],
                },
                // 表单组件
                {
                    name: '表单组件',
                    nameEn: 'Form components',
                    list: [
                        {
                            path: '/pages/form/form',
                            icon: 'form',
                            name: 'Form 表单',
                            nameEn: 'Form',
                        },
                        {
                            path: '/pages/calendar/calendar',
                            icon: 'calendar',
                            name: 'Calendar 日历',
                            nameEn: 'Calendar',
                        },
                        {
                            path: '/pages/keyboard/keyboard',
                            icon: 'keyboard',
                            name: 'Keyboard 键盘',
                            nameEn: 'Keyboard',
                        },
                        {
                            path: '/pages/picker/picker',
                            icon: 'picker',
                            name: 'Picker 选择器',
                            nameEn: 'Picker',
                        },
                        {
                            path: '/pages/datetimePicker/datetimePicker',
                            icon: 'datetimePicker',
                            name: 'DatetimePicker 时间选择器',
                            nameEn: 'Picker',
                        },
                        {
                            path: '/pages/rate/rate',
                            icon: 'rate',
                            name: 'Rate 评分',
                            nameEn: 'Rate',
                        },
                        {
                            path: '/pages/search/search',
                            icon: 'search',
                            name: 'Search 搜索',
                            nameEn: 'Search',
                        },
                        {
                            path: '/pages/numberBox/numberBox',
                            icon: 'numberBox',
                            name: 'NumberBox 步进器',
                            nameEn: 'NumberBox',
                        },
                        {
                            path: '/pages/upload/upload',
                            icon: 'upload',
                            name: 'Upload 上传',
                            nameEn: 'Upload',
                        },
                        {
                            path: '/pages/code/code',
                            icon: 'code',
                            name: 'Code 验证码倒计时',
                            nameEn: 'VerificationCode',
                        },
                        {
                            path: '/pages/input/input',
                            icon: 'field',
                            name: 'Input 输入框',
                            nameEn: 'Input',
                        },
                        {
                            path: '/pages/textarea/textarea',
                            icon: 'textarea',
                            name: 'Textarea 文本域',
                            nameEn: 'Textarea',
                        },
                        {
                            path: '/pages/checkbox/checkbox',
                            icon: 'checkbox',
                            name: 'Checkbox 复选框',
                            nameEn: 'Checkbox',
                        },
                        {
                            path: '/pages/radio/radio',
                            icon: 'radio',
                            name: 'Radio 单选框',
                            nameEn: 'Radio',
                        },
                        {
                            path: '/pages/switch/switch',
                            icon: 'switch',
                            name: 'Switch 开关选择器',
                            nameEn: 'Switch',
                        },
                        {
                            path: '/pages/slider/slider',
                            icon: 'slider',
                            name: 'Slider 滑动选择器',
                            nameEn: 'Slider',
                        },
                        {
                            path: '/pages/album/album',
                            icon: 'album',
                            name: 'Album 相册',
                            nameEn: 'Album',
                        },
                    ],
                },
                // 数据组件
                {
                    name: '数据组件',
                    nameEn: 'Data components',
                    list: [
                        {
                            path: '/pages/list/list',
                            icon: 'list',
                            name: 'List 列表',
                            nameEn: 'List',
                        },
                        {
                            path: '/pages/progress/progress',
                            icon: 'progress',
                            name: 'Progress 进度条',
                            nameEn: 'Progress',
                        },
                        {
                            path: '/pages/countDown/countDown',
                            icon: 'countDown',
                            name: 'CountDown 倒计时',
                            nameEn: 'CountDown',
                        },
                        {
                            path: '/pages/countTo/countTo',
                            icon: 'countTo',
                            name: 'CountTo 数字滚动',
                            nameEn: 'CountTo',
                        },
                    ],
                },
                // 反馈组件
                {
                    name: '反馈组件',
                    nameEn: 'Feedback components',
                    list: [
                        {
                            path: '/pages/tooltip/tooltip',
                            icon: 'tooltip',
                            name: 'Tooltip 长按提示',
                            nameEn: 'ActionSheet',
                        },
                        {
                            path: '/pages/actionSheet/actionSheet',
                            icon: 'actionSheet',
                            name: 'ActionSheet 上拉菜单',
                            nameEn: 'ActionSheet',
                        },
                        {
                            path: '/pages/alert/alert',
                            icon: 'alert',
                            name: 'Alert 警告提示',
                            nameEn: 'Alert',
                        },
                        {
                            path: '/pages/toast/toast',
                            icon: 'toast',
                            name: 'Toast 消息提示',
                            nameEn: 'Toast',
                        },
                        {
                            path: '/pages/noticeBar/noticeBar',
                            icon: 'noticeBar',
                            name: 'NoticeBar 滚动通知',
                            nameEn: 'NoticeBar',
                        },
                        {
                            path: '/pages/notify/notify',
                            icon: 'notify',
                            name: 'Notify 消息提示',
                            nameEn: 'Notify',
                        },
                        {
                            path: '/pages/swipeAction/swipeAction',
                            icon: 'swipeAction',
                            name: 'SwipeAction 滑动单元格',
                            nameEn: 'SwipeAction',
                        },
                        {
                            path: '/pages/collapse/collapse',
                            icon: 'collapse',
                            name: 'Collapse 折叠面板',
                            nameEn: 'Collapse',
                        },
                        {
                            path: '/pages/popup/popup',
                            icon: 'popup',
                            name: 'Popup 弹出层',
                            nameEn: 'Popup',
                        },
                        {
                            path: '/pages/modal/modal',
                            icon: 'modal',
                            name: 'Modal 模态框',
                            nameEn: 'Modal',
                        },
                    ],
                },
                // 布局组件
                {
                    name: '布局组件',
                    nameEn: 'Layout components',
                    list: [
                        {
                            path: '/pages/scrollList/scrollList',
                            icon: 'scrollList',
                            name: 'ScrollList 横向滚动列表',
                            nameEn: 'ScrollList',
                        },
                        {
                            path: '/pages/line/line',
                            icon: 'line',
                            name: 'Line 线条',
                            nameEn: 'Line',
                        },
                        {
                            path: '/pages/overlay/overlay',
                            icon: 'mask',
                            name: 'Overlay 遮罩层',
                            nameEn: 'Overlay',
                        },
                        // #ifndef MP-TOUTIAO
                        {
                            path: '/pages/noNetwork/noNetwork',
                            icon: 'noNetwork',
                            name: 'NoNetwork 无网络提示',
                            nameEn: 'NoNetwork',
                        },
                        // #endif
                        {
                            path: '/pages/grid/grid',
                            icon: 'grid',
                            name: 'Grid 宫格布局',
                            nameEn: 'Grid',
                        },
                        {
                            path: '/pages/swiper/swiper',
                            icon: 'swiper',
                            name: 'Swiper 轮播图',
                            nameEn: 'Swiper',
                        },
                        {
                            path: '/pages/skeleton/skeleton',
                            icon: 'skeleton',
                            name: 'Skeleton 骨架屏',
                            nameEn: 'Skeleton',
                        },
                        {
                            path: '/pages/sticky/sticky',
                            icon: 'sticky',
                            name: 'Sticky 吸顶',
                            nameEn: 'Sticky',
                        },
                        {
                            path: '/pages/divider/divider',
                            icon: 'divider',
                            name: 'Divider 分割线',
                            nameEn: 'Divider',
                        },
                    ],
                },
                // 导航组件
                {
                    name: '导航组件',
                    nameEn: 'Navigation components',
                    list: [
                        {
                            path: '/pages/tabbar/tabbar',
                            icon: 'tabbar',
                            name: 'Tabbar 底部导航栏',
                            nameEn: 'Tabbar',
                        },
                        {
                            path: '/pages/backtop/backtop',
                            icon: 'backTop',
                            name: 'BackTop 返回顶部',
                            nameEn: 'BackTop',
                        },
                        {
                            path: '/pages/navbar/navbar',
                            icon: 'navbar',
                            name: 'Navbar 导航栏',
                            nameEn: 'Navbar',
                        },
                        {
                            path: '/pages/tabs/tabs',
                            icon: 'tabs',
                            name: 'Tabs 标签',
                            nameEn: 'Tabs',
                        },
                        {
                            path: '/pages/subsection/subsection',
                            icon: 'subsection',
                            name: 'Subsection 分段器',
                            nameEn: 'Subsection',
                        },
                        {
                            path: '/pages/indexList/indexList',
                            icon: 'indexList',
                            name: 'IndexList 索引列表',
                            nameEn: 'IndexList',
                        },
                        {
                            path: '/pages/steps/steps',
                            icon: 'steps',
                            name: 'Steps 步骤条',
                            nameEn: 'Steps',
                        },
                        {
                            path: '/pages/empty/empty',
                            icon: 'empty',
                            name: 'Empty 内容为空',
                            nameEn: 'Empty',
                        },
                    ],
                },
                // 其他组件
                {
                    name: '其他组件',
                    nameEn: 'Other components',
                    list: [
                        {
                            path: '/pages/parse/parse',
                            icon: 'parse',
                            name: 'Parse 富文本解析器',
                            nameEn: 'Parse',
                        },
                        {
                            path: '/pages/codeInput/codeInput',
                            icon: 'messageInput',
                            name: 'CodeInput 验证码输入',
                            nameEn: 'CodeInput',
                        },
                        {
                            path: '/pages/loadmore/loadmore',
                            icon: 'loadmore',
                            name: 'Loadmore 加载更多',
                            nameEn: 'Loadmore',
                        },
                        {
                            path: '/pages/readMore/readMore',
                            icon: 'readMore',
                            name: 'ReadMore 展开阅读更多',
                            nameEn: 'ReadMore',
                        },
                        {
                            path: '/pages/gap/gap',
                            icon: 'gap',
                            name: 'Gap 间隔槽',
                            nameEn: 'Gap',
                        },
                        {
                            path: '/pages/avatar/avatar',
                            icon: 'avatar',
                            name: 'Avatar 头像',
                            nameEn: 'Avatar',
                        },
                        {
                            path: '/pages/link/link',
                            icon: 'link',
                            name: 'Link 超链接',
                            nameEn: 'Link',
                        },
                        {
                            path: '/pages/transition/transition',
                            icon: 'transition',
                            name: 'transition 动画',
                            nameEn: '动画',
                        },
                    ],
                },
            ],
        };
    },
};
</script>
