<template>
  <div id="reports">
      <div class="chart-container">
        <div v-if="chartExpenses" class="category-pie">
            Expenses by Category ({{new Date().toLocaleString('default', { month: 'long' })}})
            <category-pie :chartData="chartData" :options="chartOptions"></category-pie>
        </div>
        <div class="week-container">
            <span class="week-title">
                Expenses by Week ({{new Date().toLocaleString('default', { month: 'long' })}})
            </span>
            <div class="weeks">
                <div class="week one notification is-success">
                    <span>Week 1</span>
                    <strong>{{defaultCurrency + ' ' + expensesByWeek[0]}}</strong>
                </div>
                <div class="week two notification is-success">
                    <span>Week 2</span>
                    <strong>{{defaultCurrency + ' ' + expensesByWeek[1]}}</strong>
                </div>
            </div>
            <div class="weeks bottom">
                <div class="week three notification is-success">
                    <span>Week 3</span>
                    <strong>{{defaultCurrency + ' ' + expensesByWeek[2]}}</strong>
                </div>
                <div class="week four notification is-success">
                    <span>Week 4</span>
                    <strong>{{defaultCurrency + ' ' + expensesByWeek[3]}}</strong>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import CategoryPie from "@/components/CategoryPie.vue";
import { mapGetters, mapState } from 'vuex';
export default {
    name: 'Reports',
    components: {
    CategoryPie
    },
    data() {
        return {
            chartOptions: {
                hoverBorderWidth: 20,
                tooltips:{
                    enabled: true,
                    callbacks: {
                        label: ((item, data) => {
                            let amount = Number(
                                data.datasets[item.datasetIndex].data[item.index]
                                ).toLocaleString();
                            return this.defaultCurrency + ' ' + amount
                        })
                    }
                }
            }
        };
    },
    computed: {
        defaultCurrency: function() {
            return this.$store.state.auth.user.default_currency
        },
        expensesByWeek: function() {
            const expenses = this.$store.state.expenses.totalExpense.byWeek;
            return expenses.map(e => {
                if (e === null) return 0; else return e;
            })
        },
        chartExpenses: function() {
            const pieData = this.$store.state.expenses.totalExpense.byCategory
            return {
                labels: pieData.map(c => c.category.name),
                data: pieData.map(c => c.amount)
            }
        },
        chartData: function() {
            return {
                hoverBackgroundColor: "red",
                hoverBorderWidth: 10,
                labels: this.chartExpenses.labels,
                datasets: [
                    {
                        label: "Expenses By Category",
                        backgroundColor: ["#DD7373", "#3B3561", "#EAD94C", "#D1D1D1", "#51A3A3"],
                        data: this.chartExpenses.data
                    }
                ]
            }
        }
    },
    created() {
        const userId = this.$store.state.auth.user.id;
        this.$store.dispatch('expenses/fetchTotalExpenseByCategory', userId);
        this.$store.dispatch('expenses/fetchTotalExpenseByWeek', userId);
    }
};
</script>

<style>
#reports {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* margin-top: 50px; */
    width: 100%;
    height: 100%;
}

.chart-container {
    margin-top: 45px;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    width: 100%;
    justify-content: center;
}

.category-pie {
    font-family: 'Roboto';
    text-align: center;
    height: 400px;
    max-width: 500px;
    margin-right: 100px;
}

.week-container {
    font-family: 'Roboto';
    text-align: center;
    height: 400px;
    max-width: 500px;
    display: flex;
    flex-direction: column;
}

.weeks {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.week {
    height: 100%;
    width: 50%;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.week-title {
    margin-bottom: 10px;
}

.bottom {
    margin-top: 15px;
}

.one {
    margin-bottom: 10px;
}

.two {
    margin-left: 10px;
    margin-bottom: 10px;
}

.four {
    margin-left: 10px;
}

</style>

