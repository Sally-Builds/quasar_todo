export default {
    methods: {
        submitForm() {
            if(!this.taskToSubmit.dueDate) this.taskToSubmit.dueTime = ''
            this.updateTask({ id: this.id, updates: this.taskToSubmit})
            this.$emit('close')
        }
    }
}