import gql from 'graphql-tag';

export const deleteExpense = gql`
    mutation deleteExpense(
        $id: UUID!
    ) {
        deleteExpense(
            id: $id
        ) {
            success
            message
        }
    }
`


export const createExpense = gql`
    mutation createExpense(
        $userId: UUID!
        $amount: Decimal!
        $currency: Currency!
        $incurredAt: DateTime!
        $categoryId: UUID!
        $description: String
    ) {
        createExpense(
            userId: $userId
            amount: $amount
            currency: $currency
            incurredAt: $incurredAt
            categoryId: $categoryId
            description: $description
        ){
            success
            message
            expense {
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
    }
`

export const updateExpense = gql`
    mutation updateExpense(
        $id: UUID!
        $amount: Decimal!
        $currency: Currency!
        $incurredAt: DateTime!
        $categoryId: UUID!
        $description: String
    ) {
        updateExpense(
            id: $id
            amount: $amount
            currency: $currency
            incurredAt: $incurredAt
            categoryId: $categoryId
            description: $description
        ){
            success
            message
            expense {
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
    }
`