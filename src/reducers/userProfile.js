import {LOGOUT} from './auth';
import _ from 'lodash';

export const SAVE_USER = 'SAVE_USER';
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const SENDER_DETAILS_NOTIFICATION = 'SENDER_DETAILS_NOTIFICATION';

const initialState = {
    user: null,
    notifications: {
        allNotifications: [],
        notificationSender: {}
    }

};

const userProfile = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: null
            };
        case GET_NOTIFICATION:
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    allNotifications: action.payload
                }
            };
        case READ_NOTIFICATION:
            let index = _.findIndex(state.notifications.allNotifications, {'_id': action.payload});
            let notification = state.notifications.allNotifications[index];
            console.log('notification', notification);
            notification = {...notification, read: true};
            console.log('notification', notification);
            state.notifications.allNotifications.splice(index, 1);
            return {
                ...state,
                notifications: {...state.notifications,allNotifications:[...state.notifications.allNotifications, notification]}
            };
        case REMOVE_NOTIFICATION:
            state.notifications.allNotifications.splice(_.findIndex(state.notifications.allNotifications, {'_id': action.payload}), 1);
            return {
                ...state,
                notifications:{...state.notifications,allNotifications: [...state.notifications.allNotifications]}
            };
        case SENDER_DETAILS_NOTIFICATION:
            return {...state,notifications:{...state.notifications,notificationSender:action.payload}};
        default:
            return state;
    }
};

export default userProfile;