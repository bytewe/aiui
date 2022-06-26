<!--
 * @Author: airobot
 * @Date: 2022-01-28 23:51:00
 * @LastEditors: airobot
 * @LastEditTime: 2022-06-26 20:39:46
 * @Description: 色彩
-->

<template>
    <ai-page background="white">
        <ai-box title="主色">
            <ai-row gutter="10">
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-primary']">
                        <ai-text size="small" text="primary" color="white" />
                        <ai-text size="small" :text="$config['color-primary']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-primary-dark']">
                        <ai-text size="small" text="dark" color="white" />
                        <ai-text size="small" :text="$config['color-primary-dark']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-primary-gray']">
                        <ai-text size="small" text="gray" color="white" />
                        <ai-text size="small" :text="$config['color-primary-gray']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-primary-light']">
                        <ai-text size="small" text="light" />
                        <ai-text size="small" :text="$config['color-primary-light']" />
                    </ai-card>
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="成功">
            <ai-row gutter="10">
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-success']">
                        <ai-text size="small" text="success" color="white" />
                        <ai-text size="small" :text="$config['color-success']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-success-dark']">
                        <ai-text size="small" text="dark" color="white" />
                        <ai-text size="small" :text="$config['color-success-dark']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-success-gray']">
                        <ai-text size="small" text="gray" color="white" />
                        <ai-text size="small" :text="$config['color-success-gray']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-success-light']">
                        <ai-text size="small" text="light" />
                        <ai-text size="small" :text="$config['color-success-light']" />
                    </ai-card>
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="警告">
            <ai-row gutter="10">
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-warning']">
                        <ai-text size="small" text="warning" color="white" />
                        <ai-text size="small" :text="$config['color-warning']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-warning-dark']">
                        <ai-text size="small" text="dark" color="white" />
                        <ai-text size="small" :text="$config['color-warning-dark']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-warning-gray']">
                        <ai-text size="small" text="gray" color="white" />
                        <ai-text size="small" :text="$config['color-warning-gray']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-warning-light']">
                        <ai-text size="small" text="light" />
                        <ai-text size="small" :text="$config['color-warning-light']" />
                    </ai-card>
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="危险">
            <ai-row gutter="10">
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-danger']">
                        <ai-text size="small" text="danger" color="white" />
                        <ai-text size="small" :text="$config['color-danger']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-danger-dark']">
                        <ai-text size="small" text="dark" color="white" />
                        <ai-text size="small" :text="$config['color-danger-dark']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-danger-gray']">
                        <ai-text size="small" text="gray" color="white" />
                        <ai-text size="small" :text="$config['color-danger-gray']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-danger-light']">
                        <ai-text size="small" text="light" />
                        <ai-text size="small" :text="$config['color-danger-light']" />
                    </ai-card>
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="信息">
            <ai-row gutter="10">
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-info']">
                        <ai-text size="small" text="info" color="white" />
                        <ai-text size="small" :text="$config['color-info']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-info-dark']">
                        <ai-text size="small" text="dark" color="white" />
                        <ai-text size="small" :text="$config['color-info-dark']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-info-gray']">
                        <ai-text size="small" text="gray" color="white" />
                        <ai-text size="small" :text="$config['color-info-gray']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-info-light']">
                        <ai-text size="small" text="light" />
                        <ai-text size="small" :text="$config['color-info-light']" />
                    </ai-card>
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="文字">
            <ai-row gutter="10">
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-default']">
                        <ai-text size="small" text="default" color="white" />
                        <ai-text size="small" :text="$config['color-default']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-dark']">
                        <ai-text size="small" text="dark" color="white" />
                        <ai-text size="small" :text="$config['color-dark']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-gray']">
                        <ai-text size="small" text="gray" color="white" />
                        <ai-text size="small" :text="$config['color-gray']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['color-light']">
                        <ai-text size="small" text="light" />
                        <ai-text size="small" :text="$config['color-light']" />
                    </ai-card>
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="边框">
            <ai-row gutter="10">
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['border-color-default']">
                        <ai-text size="small" text="default" />
                        <ai-text size="small" :text="$config['border-color-default']" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['border-color-dark']">
                        <ai-text size="small" text="dark" color="white" />
                        <ai-text size="small" :text="$config['border-color-dark']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['border-color-gray']">
                        <ai-text size="small" text="gray" color="white" />
                        <ai-text size="small" :text="$config['border-color-gray']" color="white" />
                    </ai-card>
                </ai-col>
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['border-color-light']">
                        <ai-text size="small" text="light" />
                        <ai-text size="small" :text="$config['border-color-light']" />
                    </ai-card>
                </ai-col>
            </ai-row>
        </ai-box>

        <ai-box title="背景">
            <ai-row gutter="10">
                <ai-col span="3">
                    <ai-card size="mini" align="center" :background="$config['background-default']">
                        <ai-text size="small" text="default" />
                        <ai-text size="small" :text="$config['background-default']" />
                    </ai-card>
                </ai-col>
            </ai-row>
        </ai-box>
    </ai-page>
</template>

<script>
export default {
    computed: {
        $config() {
            return uni.$config;
        },
    },
};
</script>
