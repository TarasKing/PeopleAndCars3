import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
{
    people {
        id
        firstName
        lastName
    }
}`

export const GET_CARS = gql`
{
    cars {
        id
        make
        model
        year
        price
        personId
    }
}
`

export const ADD_PERSON = gql`
mutation addPerson(
    $id: String!, 
    $firstName: String!, 
    $lastName: String!) 
    {
        addPerson(
            id: $id,
            firstName: $firstName,
            lastName: $lastName)
            {
                id
                firstName
                lastName
            }
    }
`
export const ADD_CAR = gql`
mutation addCar(
    $id: String!,
    $make: String!,
    $model: String!,
    $year: Int!,
    $price: Int!,
    $personId: String!
    ) {
        addCar(
            id: $id,
            make: $make,
            model: $model,
            year: $year,
            price: $price,
            personId: $personId
        ) {
            id
            make
            model
            year
            price
            personId
        }
    }
`

export const REMOVE_PERSON = gql`
mutation removePerson($id: String!) {
    removePerson(id: $id) {
        id
        firstName
        lastName
    }
}
`

export const REMOVE_CAR = gql`
mutation removeCar($id: String!) {
    removeCar(id: $id) {
        id
        make
        model
        year
        price
        personId
    }
}
`

export const UPDATE_PERSON = gql`
mutation updatePerson(
    $id: String!,
    $firstName: String,
    $lastName: String) {
        updatePerson(
            id: $id,
            firstName: $firstName,
            lastName: $lastName) {
                id
                firstName
                lastName
            }
    }
`

export const UPDATE_CAR = gql`
mutation updateCar(
    $id: String!,
    $make: String,
    $model: String,
    $year: Int,
    $price: Int,
    $personId: String) {
        updateCar(
            id: $id,
            make: $make,
            model: $model,
            year: $year,
            price: $price,
            personId: $personId) {
                id
                make
                model
                year
                price
                personId
            }
    }
`