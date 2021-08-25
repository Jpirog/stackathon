import axios from 'axios';

//ACTION TYPES
 
const GET_ALERTS = 'GET_ALERTS';
const GET_ALERT = 'GET_ALERT';
 
//ACTION CREATORS

const _getAlert = (alert) => {
    return {
        type: GET_ALERT, 
        alert
    };
};

const _getAlerts = (alerts) => {
    return {
        type: GET_ALERTS, 
        alerts
    };
};


//THUNK CREATORS

export const getAlert = (id) => {
    return async (dispatch) => {
        const { data: alert } = await axios.get(`/api/users/${id}`);
        dispatch(_getAlert(alert));
    };
};

export const getAlerts = () => {
    return async (dispatch) => {
        const { data: alerts } = await axios.get('/api/users');
        dispatch(_getAlerts(alerts));
        /*history.push('/users') Wherever we want to redirect!*/
    };
};
//REDUCER

export const alertsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ALERT:
            return action.alert;
        case GET_ALERTS:
            return action.alerts;
        default:
            return state
    };
};
