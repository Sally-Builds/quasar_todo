<template>
    <q-banner dense inline-actions :class="`text-white text-center ${bgColor}`">
        <span class="text-bold text-subtitle1"> <slot></slot> </span>
    </q-banner>
</template>

<script>
export default {
    props: ['bgColor']
}
</script>

<style>

</style>