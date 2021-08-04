<template>
    <form action="">
        <div class="modal-card" style="width: 500px">
            <header class="modal-card-head">
                <p class="modal-card-title">{{modalTitle}}</p>
                <button
                    type="button"
                    class="delete"
                    @click="$emit('close')"/>
            </header>
            <section class="modal-card-body">
                <date-time-picker v-bind:date="incurredAtM" v-on:timeChanged="changeTime">
                </date-time-picker>
                <b-field label="Amount">
                    <b-select disabled placeholder="Currency" v-model="defaultCurrency">
                        <option>USD</option>
                        <option>AED</option>
                        <option>INR</option>
                    </b-select>
                    <b-input 
                        type="number" placeholder="0" 
                        v-model="amountM" required expanded
                    >
                    </b-input>
                </b-field>
                <b-field label="Category">
                    <b-select 
                        v-model="categoryM"
                        placeholder="Select a category"
                        required expanded
                    >
                        <option 
                            v-for="ctg in categories" 
                            v-bind:key="ctg.id"
                            :value="ctg.id"
                        >
                            {{ctg.name}}
                        </option>
                    </b-select>
                </b-field>
                <b-field label="Description">
                    <b-input
                        v-model="descriptionM"
                        placeholder="Went on a trip..."
                    >
                    </b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <b-button
                    label="Cancel"
                    @click="$emit('close')" 
                />
                <b-button
                    v-if="action == 'add'"
                    label="Add"
                    type="is-success"
                    @click.prevent="handleSubmitAdd"
                />
                <b-button
                    v-if="action == 'update'"
                    label="Update"
                    type="is-success"
                    @click.prevent="handleSubmitUpdate"
                />
            </footer>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex'
import DateTimePicker from './DateTimePicker.vue'

export default {
    components: { DateTimePicker },
    name: 'AddExpenseModal',
    props: ['modalTitle', 'amount', 'categoryId', 'incurredAt', 'description', 'action', 'expenseId'],
    data: function() { 
        return {
            categoryM: this.categoryId,
            amountM: this.amount || null,
            incurredAtM: this.incurredAt || new Date(),
            descriptionM: this.description,
        }
    },
    created() {
        if (this.$store.state.expenses.categories === null) {
            this.$store.dispatch('expenses/fetchCategories');
        }
    },
    computed: {
        ...mapState({
            categories: state => state.expenses.categories,
            defaultCurrency: state => state.auth.user.default_currency
        })
    },
    methods: {
        handleSubmitAdd() {
            this.$store.dispatch('expenses/addExpense', {
                userId: this.$store.state.auth.user.id,
                amount: this.amountM,
                currency: this.defaultCurrency,
                incurredAt: this.incurredAtM.toISOString(),
                categoryId: this.categoryM,
                description: this.descriptionM
            });
            this.$emit('close');
            this.categoryM = null;
            this.amountM = null;
            this.incurredAtM = null;
            this.descriptionM = null;
        },

        handleSubmitUpdate() {
            this.$store.dispatch('expenses/editExpense', {
                id: this.expenseId,
                amount: this.amountM,
                currency: this.defaultCurrency,
                incurredAt: this.incurredAtM.toISOString(),
                categoryId: this.categoryM,
                description: this.descriptionM
            })
            const categories = this.$store.state.expenses.categories
            const i = categories.map(ctg => ctg.id).indexOf(this.categoryM);
            const newCatgeory = categories[i].name;
            this.$emit('update', {
                id: this.expenseId,
                amount: this.amountM,
                incurredAt: this.incurredAtM,
                category: newCatgeory,
                categoryId: this.categoryM,
                description: this.descriptionM
            })
            this.$emit('close');
        },

        changeTime(newTime) {
            this.incurredAtM = newTime;
        }
    }
}
</script>

