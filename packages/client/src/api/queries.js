import gql from 'graphql-tag';

export const getExpensesByUserId = gql`
    query ($userId: String!) {
        getExpensesByUserId {
            userId: $userId
        } {
            id
            amount
            currency
            currency_symbol
            description
            category {
                name
            }
            incurredAt
        }
    }
`