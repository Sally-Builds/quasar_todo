<template>
        <q-input       
          outlined       
          dense       
          :v-model="name"       
          @input="$emit('update:name', $event)"       
          @clear="$emit('update:name', '')"       
          label="Task Name"       
          class="col"       
          autofocus       
          clear-icon="close"   
          reactive-rules    
          :rules="[val => !!val || 'Field is required']"     
          />
</template>

<script>
export default {
    props: [ 'name '],
    data() {
        return {
            rules: [name => !!name || 'Field is required']
        }
    }
}
</script>