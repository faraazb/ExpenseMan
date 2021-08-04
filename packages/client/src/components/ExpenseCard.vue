<template>
    <div v-if="isActive" class="expense-card">
        <b-modal
            v-model="isAddExpenseModalActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal>
            <template #default="props">
                <add-expense-modal v-on:update="onUpdate"  v-bind="updateModal" @close="props.close">
                </add-expense-modal>
            </template>
        </b-modal>
        <div class="card-info">
            <div class="description">
                    {{updateModal.description}}
                </div>
            <div class="currency">{{expense.currency}}</div>
            <div class="amount">
                <span>{{ expense.currency_symbol }}</span>
                <span>{{ updateModal.amount }}</span>
            </div>
            <div class="incurred-on">
                {{date}}
            </div>
        </div>
        <div class="card-info-more">
            <div class="action-buttons">
                <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                    <template #trigger>
                        <b-icon icon="chevron-down"></b-icon>
                    </template>
                    <b-dropdown-item
                        @click="handleUpdateExpense()"
                        aria-role="listitem"
                    >
                        Update
                    </b-dropdown-item>
                    <b-dropdown-item 
                        @click="handleDeleteExpense(expense.id)" 
                        aria-role="listitem"
                    >
                        Delete
                    </b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="more-info">
                <div class="category-container">
                    <div class="category">
                        {{updateModal.categoryName}}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import AddExpenseModal from '../components/AddExpenseModal.vue';

export default {
    name: 'ExpenseCard',
    props: ['expense'],
    components: {
        AddExpenseModal,
    },
    data: function() {
        const date = new Date(this.expense.incurredAt)
        const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric'}
        const formattedDate = date.toLocaleString('en-US', options)
        var b = this.expense.incurredAt.split(/\D+/);
        return {
            date: formattedDate,
            isActive: true,
            isAddExpenseModalActive: false,
            updateModal: {
                expenseId: this.expense.id,
                modalTitle: "Update Expense",
                amount: this.expense.amount,
                categoryId: this.expense.category.id,
                categoryName: this.expense.category.name,
                incurredAt: new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])),
                description: this.expense.description,
                action: 'update'
            },
        }
    },
    methods: {
        handleDeleteExpense(expenseId) {
            this.$buefy.dialog.confirm({
                message: 'Are you sure?',
                type: 'is-danger',
                onConfirm: () => {
                    this.$store.dispatch('expenses/removeExpense', expenseId);
                    this.isActive = false;
                    this.$buefy.snackbar.open({
                        message: 'Expense deleted!',
                        type: 'is-info',
                        position: 'is-bottom'
                    });
                }
            })
        },
        handleUpdateExpense() {
            // console.log(this.expense.category.id)
            this.isAddExpenseModalActive = true;
        },
        onUpdate(expense) {
            // console.log(expense);
            const date = new Date(expense.incurredAt)
            const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric'}
            const formattedDate = date.toLocaleString('en-US', options)
            this.updateModal.amount = expense.amount;
            this.date = formattedDate;
            this.updateModal.categoryName = expense.category;
            this.updateModal.categoryId = expense.categoryId
            this.updateModal.description = expense.description;
        }
    }
}
</script>

<style scoped>

.expense-card {
    display: flex;
    flex-direction: row;
}

.card-info {
    display: flex;
    flex-direction: column;
}

.card-info-more {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    /* align-self: flex-end; */
}

.action-buttons {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    margin-left: 50px;
}

.more-info {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    flex-grow: 1;
}
.category-container {
    display: flex;
    flex-direction: row-reverse;
    flex-grow: 1;

}

.category {
    display: flex;
    flex-direction: column-reverse;
}

.description {
    font-size: 1.2rem;
    font-family: 'Roboto';
}

.currency {
    font-size: 0.7rem;
}

.amount {
    font-size: 2rem;
}

.incurred-on {
    font-size: 0.8rem;
}

</style>
