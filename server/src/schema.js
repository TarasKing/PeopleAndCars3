import { gql } from 'apollo-server-express';
import { find, remove } from 'lodash'

const people_data = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  { 
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const cars_data = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]

const typeDefs = gql`
  type Person {
    id: String!
    firstName: String
    lastName: String
}
  
    type Car {
        id: String!
        year: String
        make: String
        model: String
        price: String
        personId: String
    }
    type Query {
        person(id: String!): Person
        car(id: String!): Car
        people: [Person]
        cars: [Car]
    } 
    type Mutation {
        addPerson(id: String!, firstName: String!, lastName: String!): Person
        addCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
        updatePerson(id: String!, firstName: String, lastName: String): Person,
        updateCar(id: String!, year: String, make: String, model: String, price: String, personId: String): Car,
        removePerson(id: String!): Person,
        removeCar(id: String!): Car
    }     
    `
const resolvers = {
    Query: {
        people: () => people_data,
        person: (parent, args, context, info)=> { 
            return find(people_data, {id: args.id })
        },
        cars: () => cars_data,
        car: (parent, args, context, info)=> { 
            return find(cars_data, {id: args.id })
        },
        
    },
    Mutation: {
        addPerson: (parent, args, context, info) => {
            const newPerson = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
            }
            people_data.push(newPerson)
            return newPerson
        },
        addCar: (parent, args, context, info) => {
            const newCar = {
                id: args.id,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId: args.personId
            }
            cars_data.push(newCar)
            return newCar
        },
        updatePerson: (root, args) => {
            const editPerson = find(people_data, { id: args.id })
            if (!editPerson) { 
                throw new Error(`Couldn't find person with id ${args.id}`)
            }
            editPerson.firstName = args.firstName
            editPerson.lastName = args.lastName
            return editPerson
        },
        updateCar: (root, args) => {
            const editCar = find(cars_data, { id: args.id })
            if (!editCar) { 
                throw new Error(`Couldn't find car with id ${args.id}`)
            }
            editCar.year = args.year
            editCar.make = args.make
            editCar.model = args.model
            editCar.price = args.price
            editCar.personId = args.personId
            return editCar
        },
        removePerson: (root, args) => {
            const personToRemove = find(people_data, { id: args.id })
            if (!personToRemove) {
                throw new Error(`Couldn't find person with id ${args.id}`)
            }
            remove(people_data, c => {
              return  c.id === personToRemove.id
            })
            return personToRemove
      },
      removeCar: (root, args) => {
        const carToRemove = find(cars_data, { id: args.id })
        if (!carToRemove) {
            throw new Error(`Couldn't find car with id ${args.id}`)
        }
        remove(cars_data, c => {
          return  c.id === carToRemove.id
        })
        return carToRemove
  }

    },
        
}

export { typeDefs, resolvers }
