<template>
    <b-field label="Select datetime">
        <b-datetimepicker 
            v-model="datetime" size="is-small"
            placeholder="Click to select..." 
            append-to-body
            :max-datetime="maxDate"
        >
            <template #left>
                <b-button
                    label="Now"
                    type="is-primary"
                    icon-left="clock"
                    @click="datetime = new Date()" />
            </template>

            <template #right>
                <b-button
                    label="Clear"
                    type="is-danger"
                    icon-left="close"
                    outlined
                    @click="datetime = null" />
            </template>
        </b-datetimepicker>
    </b-field>
</template>

<script>
    export default {
        name: 'DateTimePicker',
        props: ['date'],
        data() {
            const max = new Date();
            max.getMinutes(max.getMinutes() + 1);
            return {
                datetime: this.date,
                maxDate: max
            }
        },
        watch: {
            datetime: function(newTime) {
                this.$emit('timeChanged', newTime);
            }
        }
    }
</script>