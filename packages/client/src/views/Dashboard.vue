<template>
    <section class="hero is-primary dashboard-bg">
        <div class="dashboard-amount">
            You've spent
            <p class="subtitle currency">
                {{defaultCurrency}}
            </p>
            <p class="title total-expense">
              {{totalExpense.toLocaleString()}}
            </p>
        </div>
        <div class="dashboard-expenses">
            <div class="expense-list">
                <expense-card 
                    v-for="expense in expenses" 
                    v-bind:key="expense.id"
                    v-bind:expense="expense"
                    class="box expense-card"
                >
                </expense-card>
            </div>
        </div>
    </section>
</template>

<style scoped>

.dashboard-bg {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.dashboard-amount {
  margin-top: 5rem;
  margin-left: 200px;
}

.total-expense {
  font-size: 5rem;;
}

.currency {
    font-size: 2rem;
}

.dashboard-expenses {
    margin-top: 2rem;
    margin-right: 250px;
    margin-bottom: 2rem;
    overflow: auto;
}

 /* Hide scrollbar for Chrome, Safari and Opera */
.dashboard-expenses::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.dashboard-expenses {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
} 


</style>

<script>
import ExpenseCard from '@/components/ExpenseCard.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'Dashboard',
	components: {
        ExpenseCard,
	},
	computed: {
		...mapGetters({
			expenses: 'expenses/latestFive'
		}),
        totalExpense() {
            return this.$store.state.expenses.totalExpense.amount;
        },
        defaultCurrency() {
            return this.$store.state.auth.user.default_currency;
        }
	},
	created() {
		if (this.$store.state.expenses.all.length === 0) {
			this.getExpenses(this.$store.state.auth.user.id);
		}
        if (this.$store.state.expenses.totalExpense.amount === null) {
            this.getTotalExpense(this.$store.state.auth.user.id)
        }
	},
	methods: {
		...mapActions('expenses', {
			getExpenses: 'fetchExpenses',
            getTotalExpense: 'fetchTotalExpense'
		})
	}
};
</script>