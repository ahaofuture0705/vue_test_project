<template>
    <a-form class="Container" :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
        autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" @keydown.enter="onFinish">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formState.password" @keydown.enter="onFinish">
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">登 录</a-button>
        </a-form-item>
    </a-form>
    <spin />
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
interface FormState {
    username: string;
    password: string;
    remember: boolean;
}
export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
    },
    setup() {
        const { proxy }: any = getCurrentInstance()
        const r = proxy.$request
        const formState = reactive<FormState>({
            username: '',
            password: '',
            remember: true,
        });
        const onFinish = (values: an
        y) => {
            r({
                url: '/test/login',
                method: "post",
                data: values
            }).then((response: any) => {
                console.log(response);

            })
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        return {
            formState,
            onFinish,
            onFinishFailed,
        };
    },
});
</script>
<style scoped>
.Container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    width: 500px;
}
</style>