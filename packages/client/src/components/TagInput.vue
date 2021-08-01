<template>
    <section>
        <b-field>
            <b-taginput
                v-model="tags"
                :data="filteredTags"
                size="is-small"
                autocomplete
                open-on-focus
                field="user.first_name"
                icon="label"
                placeholder="Click here to select"
                @typing="getFilteredTags">
            </b-taginput>
        </b-field>
        <!-- <pre style="max-height: 400px"><b>Tags:</b>{{ tags }}</pre> -->
    </section>
</template>

<script>
    const data = ['Faraaz', 'Sahil', 'Lohit', 'Rohit']

    export default {
        name: 'tag-input',
        data() {
            return {
                filteredTags: data,
                isSelectOnly: false,
                tags: [],
                allowNew: false,
                openOnFocus: false
            }
        },
        methods: {
            getFilteredTags(text) {
                this.filteredTags = data.filter((option) => {
                    return option.user.first_name
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                })
            }
        }
    }
</script>
