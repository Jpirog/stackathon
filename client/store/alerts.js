import axios from 'axios';

//ACTION TYPES
 
const GET_ALERTS = 'GET_ALERTS';
const GET_ALERT = 'GET_ALERT';
const ADD_ALERT = 'ADD_ALERT';
 
//ACTION CREATORS

const _getAlert = (alert) => {
    return {
        type: GET_ALERT, 
        alert
    };
};

const _getAlerts = (alerts, count) => {
    return {
        type: GET_ALERTS, 
        alerts, count
    };
};

const _addAlert = (alert) => {
    return {
        type: ADD_ALERT, 
        alert
    };
};


//THUNK CREATORS

export const addAlert = (alert) => {
    return async (dispatch) => {
        const { data: newAlert } = await axios.post('/api/alerts', alert);
        dispatch(_addAlert(newAlert)); // was get
    };
};

export const getAlert = (id) => {
    return async (dispatch) => {
        const { data: alert } = await axios.get(`/api/users/${id}`);
        dispatch(_getAlert(alert));
    };
};

export const getAlerts = (parms) => {
    return async (dispatch) => {
        const { data } = await axios.get('/api/alerts', {params: parms});
        const { alerts } = data;
        const { count } = data;
        dispatch(_getAlerts({alerts, count})); // was alerts
        /*history.push('/users') Wherever we want to redirect!*/
    };
};
//REDUCER

export const alertsReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ALERT:
            return action.alert;
        case GET_ALERT:
            return action.alert;
        case GET_ALERTS:
            return {...state, alerts: action.alerts.alerts, count: action.alerts.count };
        default:
            return state
    };
};
