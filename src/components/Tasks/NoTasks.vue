<template>
    <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
    >
        <q-banner class="bg-grey-3">
            <template v-slot:avatar>
                <q-icon name="check" color="primary" />
            </template>
                Hello there No tasks today o!!!
            <template v-slot:action>
                <q-btn flat color="primary" label="Add task" @click="$root.$emit('show-add-task')" />
            </template>
        </q-banner>
    </transition>
</template>

<script>
export default {

}
</script>

<style>

</style>