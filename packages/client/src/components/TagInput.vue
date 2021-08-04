<template>
    <section>
        <b-field>
            <b-taginput
                v-model="selectedCategories"
                :data="categories"
                size="is-small"
                autocomplete
                open-on-focus
                field="name"
                icon="label"
                placeholder="Click here to select"
                @typing="getFilteredTags">
            </b-taginput>
        </b-field>
    </section>
</template>

<script>
export default {
    name: 'tag-input',
    data() {
        return {
            filteredCategories: this.categories,
            isSelectOnly: false,
            selectedCategories: [],
            allowNew: false,
            openOnFocus: false
        }
    },
    computed: {
        categories() {
            return this.$store.state.expenses.categories;
        }
    },
    methods: {
        getFilteredTags(text) {
            this.filteredCategories = this.categories.filter((option) => {
                return option.name
                    .toString()
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            });
        }
    },
    watch: {
        selectedCategories: function(value) {
            // console.log(value)
            this.$emit('categories-selected', value)
        }
    }
}
</script>
