import gql from 'graphql-tag';

export const getExpenses = gql`
    query getExpensesByUserId($userId: UUID!) {
        getExpensesByUserId(userId: $userId) {
            id
            amount
            currency
            currency_symbol
            description
            category {
                id
                name
            }
            incurredAt
        }
    }
`

export const getTotalExpense = gql`
    query getTotalExpense($userId: UUID!) {
        getTotalExpense(userId: $userId)
    }
`

export const getTotalExpenseByCategory = gql`
    query getTotalExpenseByCategory($userId: UUID!) {
        getTotalExpenseByCategory(userId: $userId) {
            category {
                id
                name
            }
            amount
        }
    }
`

export const getTotalExpenseByWeek = gql`
    query getTotalExpenseByWeek($userId: UUID!) {
        getTotalExpenseByWeek(userId: $userId)
    }
`



export const getCategories = gql`
    query getCategories {
        getCategories {
            id
            name
        }
    }
`