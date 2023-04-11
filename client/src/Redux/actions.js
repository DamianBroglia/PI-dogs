
import axios from 'axios';
import {
    FILTER_BY_NAME, GET_ALL_BREED, POST_BREED, FILTER_BY_BREEDGROUP,
    POST_USER, GET_USER, FILTER_BY_HEIGHT, FILTER_BY_LIFE_SPAN, FILTER_BY_ORIGIN,
    FILTER_BY_WEIGHT, ORDER_BY_HEIGHT, ORDER_BY_WEIGHT, ORDER_BY_LIFE_SPAN, ORDER_BY_HEIGHT_REV,
    ORDER_BY_WEIGHT_REV, ORDER_BY_LIFE_SPAN_REV, PUT_USER, GET_FAV, GET_CREATED, FILTER_BY_TEMPERAMENTS
} from './action_type';

export function getAllBreed() {
    return async function (dispatch) {
        try {
            const arrayBreed = await axios(`http://localhost:3001/dogs`)
            const breeds = arrayBreed.data
            dispatch({
                type: GET_ALL_BREED,
                payload: breeds
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function postBreed(createDog) {
    return async function (dispatch) {
        try {
            const allDogs = await axios(`http://localhost:3001/dogs`)
            const exists = allDogs.data.find(e => e.name === createDog.name)
            if(!exists){
                const breed = await axios.post(`http://localhost:3001/dog`, createDog)
                dispatch({
                    type: POST_BREED,
                    payload: breed.data
                })
            }else{
                alert(`Ya existe una raza de nombre ${createDog.name}`)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterByName(name) {
    return async function (dispatch) {
        try {
            if(name.length > 0){
                const filtrado = await axios(`http://localhost:3001/dogs/name?name=${name}`)
                const filter = await axios(`http://localhost:3001/dogs/${filtrado.data.id}`)
                let array = []
                array.push(filter.data)
                if(array.length > 0){
                    dispatch({
                        type: FILTER_BY_NAME,
                        payload: array
                    })
                }else{
                    const obj = {
                        key:0,
                        id:0,
                        image:"https://c8.alamy.com/compes/2ce2cr8/signo-de-interrogacion-perro-2ce2cr8.jpg",
                        name:"No hay raza con este nombre",
                        height:"???",
                        weight:"???",
                        lifeSpan:"???",
                        origin:"???",
                        breedGroup:"???"
                    }
                    array.push(obj)
                    dispatch({
                        type: FILTER_BY_NAME,
                        payload: array
                    })
                }
            }else{
                alert("Debes colocar el nombre de la raza")
            }
        } catch (error) {
            console.log(error);
        }
    };
}


export function filterByBreedGroup(BreedName) {
    return {
        type: FILTER_BY_BREEDGROUP,
        payload: BreedName
    }
}

export function filterByHeight(BreedHeight) {
    return {
        type: FILTER_BY_HEIGHT,
        payload: BreedHeight
    }
}

export function filterByWeight(Breedweight) {
    return {
        type: FILTER_BY_WEIGHT,
        payload: Breedweight
    }
}

export function filterByOrigin(BreedOrigin) {
    return {
        type: FILTER_BY_ORIGIN,
        payload: BreedOrigin
    }
}

export function filterByLifeSpan(BreedLife) {
    return {
        type: FILTER_BY_LIFE_SPAN,
        payload: BreedLife
    }
}

export function filterByTemperament(tempName) {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload: tempName
    }
}

export function orderByHeight() {
    return {
        type: ORDER_BY_HEIGHT,

    }
}
export function orderByWeight() {
    return {
        type: ORDER_BY_WEIGHT,

    }
}
export function orderByLifeSpan() {
    return {
        type: ORDER_BY_LIFE_SPAN,

    }
}
export function orderByHeightRev() {
    return {
        type: ORDER_BY_HEIGHT_REV,

    }
}
export function orderByWeightRev() {
    return {
        type: ORDER_BY_WEIGHT_REV,

    }
}
export function orderByLifeSpanRev() {
    return {
        type: ORDER_BY_LIFE_SPAN_REV,

    }
}


export function getFav() {
    return {
        type: GET_FAV,
    }

}

export function getCreated() {
    return {
        type: GET_CREATED,
    }

}


export function putUser(UserId, favId, addOrDel) {
    return async function (dispatch) {
        try {
            const user = await axios.put(`http://localhost:3001/user/${UserId}/${favId}/${addOrDel}`)
            dispatch({
                type: PUT_USER,
                payload: user.data.favorites
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function postUser(user) {
    return async function (dispatch) {
        try {
            if (user.username && user.password && user.email) {
                await axios.post("http://localhost:3001/user", user)
                const usersData = await axios("http://localhost:3001/user")
                const userDB = usersData.data.find(e => e.username === user.username && e.password === user.password &&
                    e.email === user.email
                )
                dispatch({
                    type: POST_USER,
                    payload: userDB
                })
                return
            } else {
                if (!user.username) alert("Debes tener un nombre de ususario para registrarte")
                if (!user.password) alert("Escribe una contraseña para registrarte")
                if (!user.email) alert("Debes tener un email para registrarte")
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export function getUser(user) {
    return async function (dispatch) {
        try {
            if (user.username && user.password) {
                const usersData = await axios("http://localhost:3001/user")
                const users = usersData.data
                for (let i = 0; i < users.length; i++) {
                    if (user.password === users[i].password &&
                        user.username === users[i].username) {
                        dispatch({
                            type: GET_USER,
                            payload: users[i]
                        })
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}





