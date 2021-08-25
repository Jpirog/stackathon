import axios from 'axios';

//ACTION TYPES
 
const GET_USERS = 'GET_USERS';
const GET_USER = 'GET_USER';
 
//ACTION CREATORS

const _getUser = (users) => {
    return {
        type: GET_USER, 
        users
    };
};

const _getUsers = (users) => {
    return {
        type: GET_USERS, 
        users
    };
};


//THUNK CREATORS

export const getUser = (id) => {
    return async (dispatch) => {
        const { data: users } = await axios.get(`/api/users/${id}`);
        dispatch(_getUser(users));
    };
};

export const getUsers = () => {
    return async (dispatch) => {
        const { data: users } = await axios.get('/api/users');
        dispatch(_getUsers(users));
        /*history.push('/users') Wherever we want to redirect!*/
    };
};
//REDUCER

export const usersReducer = (state = [], action) => {
    switch (action.type) {
        case GET_USER:
            return action.users;
        case GET_USERS:
            return action.users;
        default:
            return state
    };
};