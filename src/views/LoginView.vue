<template>
    <div class="container">

        <a-form class="container_form" :model="formState" name="basic" :label-col="{ span: 4 }"
            :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
                <a-input v-model:value="formState.username" @keydown.enter="onFinish">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
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
        <a-spin class="mark" v-if="loading" />
    </div>

</template>
<script lang="ts">
import { ref, defineComponent, reactive, getCurrentInstance } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from "vue-router"
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
        const router = useRouter()
        const loading = ref(false)
        const { proxy }: any = getCurrentInstance()
        const r = proxy.$request
        const formState = reactive<FormState>({
            username: '',
            password: '',
            remember: true,
        });
        const onFinish = (values: any) => {
            loading.value = true
            r({
                url: '/api/user/login',
                method: "post",
                params: values
            }).then((response: any) => {
                if (response.code == 200) {
                    router.push({ path: '/home' })
                    loading.value = false;
                } else {
                    setTimeout(() => {
                        loading.value = false;
                    }, 800)

                }

            }).catch((error: any) => {
                console.log(error);
                loading.value = false;

            })
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        return {
            loading,
            formState,
            onFinish,
            onFinishFailed,
        };
    },
});
</script>
<style scoped>
.container {
    width: 100vw;
    height: calc(100vh - 0px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.container_form {
    width: 500px;
    height: 250px;
    background: #f4f4f4;
    box-sizing: border-box;
    padding: 30px;
    border: solid 1px #f2f2f2;
}

.mark {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .5);
}
</style>