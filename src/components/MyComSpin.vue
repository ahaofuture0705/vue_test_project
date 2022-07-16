<template>
    <a-spin :tip="spinText.text" />
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
interface FaterSpinText {
    text: String
}
export default defineComponent({
    setup() {
        const spinText = reactive<FaterSpinText>({
            text: ""
        })
        return {
            spinText
        }
    }
})
</script>