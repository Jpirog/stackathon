import axios from 'axios';

//ACTION TYPES
 
const GET_USERS = 'GET_USERS';
const GET_USER = 'GET_USER';
 
//ACTION CREATORS

const _getUser = (user) => {
    return {
        type: GET_USER, 
        user
    };
};

const _getUsers = (users) => {
    return {
        type: GET_USERS, 
        users
    };
};


//THUNK CREATORS

export const getUser = (email) => {
    return async (dispatch) => {
      const { data: user } = await axios.get(`/api/users/${email}`);
      dispatch(_getUser(user));
    };
};

export const getUsers = () => {
    return async (dispatch) => {
        const { data: users } = await axios.get('/api/users');
        dispatch(_getUsers(users));
    };
};

//REDUCER

export const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER:
            return {...state, user: action.user};
        case GET_USERS:
            return {...state, users: action.users};
        default:
            return state
    };
};
