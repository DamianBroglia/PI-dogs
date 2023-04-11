
import {
    FILTER_BY_LIFE_SPAN, FILTER_BY_HEIGHT, FILTER_BY_WEIGHT, FILTER_BY_NAME, GET_ALL_BREED,
    POST_BREED, FILTER_BY_BREEDGROUP, POST_USER, GET_USER, ORDER_BY_HEIGHT, ORDER_BY_WEIGHT,
    ORDER_BY_LIFE_SPAN, ORDER_BY_HEIGHT_REV, ORDER_BY_WEIGHT_REV, ORDER_BY_LIFE_SPAN_REV,
    PUT_USER, GET_FAV, GET_CREATED, FILTER_BY_TEMPERAMENTS
} from "./action_type";


const initialState = {
    breedDogs: [],
    filterBreed: [],
    orderBreed: [],
    fav: [],
    created: [],
    user: {}

}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_BREED:
            return {
                ...state,
                breedDogs: payload
            }

        case POST_BREED:
            return {
                ...state,
                breedDogs: [...state.breedDogs, payload]
            }

        case POST_USER:
            return {
                ...state,
                user: payload
            }
        case GET_USER:
            return {
                ...state,
                user: payload
            }
        case PUT_USER:
            return {
                ...state,
                user: { ...state.user, favorites: payload }
            }
        case FILTER_BY_NAME:
            return {
                ...state,
                filterBreed: payload
            }
        case FILTER_BY_BREEDGROUP:
            const allBreedGroup = [...state.breedDogs]
            const breedGroup = allBreedGroup.filter(e => e.breedGroup === payload)
            return {
                ...state,
                filterBreed: breedGroup
            }
        case FILTER_BY_HEIGHT:
            const allBreedHeight = [...state.breedDogs]
            const breedHeightMin = allBreedHeight.filter(e => Number(e.height.split("-")[0]) > Number(payload.min))
            const breedHeight = breedHeightMin.filter(e => Number(e.height.split("-")[1]) < payload.max)
            return {
                ...state,
                filterBreed: breedHeight
            }
        case FILTER_BY_WEIGHT:
            const allBreedWeight = [...state.breedDogs]
            const breedWeightMin = allBreedWeight.filter(e => Number(e.weight.split("-")[0]) > Number(payload.min))
            const breedWeight = breedWeightMin.filter(e => Number(e.weight.split("-")[1]) < payload.max)

            return {
                ...state,
                filterBreed: breedWeight
            }
        case FILTER_BY_LIFE_SPAN:
            const allBreedLife = [...state.breedDogs]
            const breedLifeMin = allBreedLife.filter(e => Number(e.lifeSpan.split("-")[0]) > Number(payload.min))
            const breedLife = breedLifeMin.filter(e => Number(e.lifeSpan.split("-")[1][0].split(" ")[0]) < payload.max)

            return {
                ...state,
                filterBreed: breedLife
            }
        case ORDER_BY_HEIGHT:
            const desBreedHeight = [...state.breedDogs]
            if (desBreedHeight.length > 0) {
                let cambio = true
                while (cambio) {
                    cambio = false
                    for (let i = 0; i < desBreedHeight.length - 1; i++) {
                        if (desBreedHeight[i].height > desBreedHeight[i + 1].height) {
                            let aux = desBreedHeight[i + 1]
                            desBreedHeight[i + 1] = desBreedHeight[i]
                            desBreedHeight[i] = aux
                            cambio = true
                        }

                    }
                }
            }
            return {
                ...state,
                orderBreed: desBreedHeight
            }
        case ORDER_BY_WEIGHT:
            const orderBreeds = [...state.breedDogs]
            if (orderBreeds.length > 0) {
                let cambio = true
                while (cambio) {
                    cambio = false
                    for (let i = 0; i < orderBreeds.length - 1; i++) {
                        if (orderBreeds[i].weight > orderBreeds[i + 1].weight) {
                            let aux = orderBreeds[i + 1]
                            orderBreeds[i + 1] = orderBreeds[i]
                            orderBreeds[i] = aux
                            cambio = true
                        }

                    }
                }
            }
            return {
                ...state,
                orderBreed: orderBreeds
            }
        case ORDER_BY_LIFE_SPAN:
            const orderBreedsLife = [...state.breedDogs]
            if (orderBreedsLife.length > 0) {
                let cambio = true
                while (cambio) {
                    cambio = false
                    for (let i = 0; i < orderBreedsLife.length - 1; i++) {
                        if (orderBreedsLife[i].lifeSpan > orderBreedsLife[i + 1].lifeSpan) {
                            let aux = orderBreedsLife[i + 1]
                            orderBreedsLife[i + 1] = orderBreedsLife[i]
                            orderBreedsLife[i] = aux
                            cambio = true
                        }

                    }
                }
            }
            return {
                ...state,
                orderBreed: orderBreedsLife
            }
        case ORDER_BY_HEIGHT_REV:
            const orderByHeightRev = [...state.orderBreed]
            const orderHeight = orderByHeightRev.reverse()
            return {
                ...state,
                orderBreed: orderHeight
            }
        case ORDER_BY_WEIGHT_REV:
            const orderByWeightRev = [...state.orderBreed]
            const orderWeight = orderByWeightRev.reverse()
            return {
                ...state,
                orderBreed: orderWeight
            }
        case ORDER_BY_LIFE_SPAN_REV:
            const orderBySpanRev = [...state.orderBreed]
            const orderSpan = orderBySpanRev.reverse()
            return {
                ...state,
                orderBreed: orderSpan
            }
        case GET_FAV:
            const allDogs = [...state.breedDogs]
            const favor = [...state.user.favorites]
            if (favor.length) {
                const toFav = []
                favor.forEach((el) => {
                    const isFav = allDogs.filter(e => e.id === Number(el))
                    toFav.push(isFav[0])
                })

                return {
                    ...state,
                    fav: toFav
                }
            }
        case GET_CREATED:
            const Dogs = [...state.breedDogs]
            const creat = [...state.user.created]
            if (creat.length) {
                const creados = []
                creat.forEach((el) => {
                    const isCreated = Dogs.filter(e => e.id === Number(el))
                    creados.push(isCreated[0])
                })

                return {
                    ...state,
                    created: creados
                }
            }
        case FILTER_BY_TEMPERAMENTS:
            const dogsDB = [...state.breedDogs]
            let array = []
            dogsDB.forEach((el) => {
                if (Array.isArray(el.temperaments)) {
                    const fil = el.temperaments.filter(elem => elem === payload)
                    if (fil.length > 0) {
                        array = [...array, el]
                    }
                }
                if(el.temperament){
                    const tempeArray = el.temperament.split(",")
                    const filtro = tempeArray.filter(elem => elem === payload)
                    if (filtro.length > 0) {
                        array = [...array, el]
                    }
                }

            })
            return {
                ...state,
                filterBreed: array
            }

        default:
            return state
    }
}
