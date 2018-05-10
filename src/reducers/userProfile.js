import {LOGOUT} from './auth';
import _ from 'lodash';

export const SAVE_USER = 'SAVE_USER';
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const SENDER_DETAILS_NOTIFICATION = 'SENDER_DETAILS_NOTIFICATION';
export const CHANGE_REVIEW = 'CHANGE_REVIEW';

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
            debugger;
            let index = _.findIndex(state.notifications.allNotifications, {'_id': action.payload});
            state.notifications.allNotifications[index].read=true;

            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    allNotifications: [..._.cloneDeep(state.notifications.allNotifications)]
                }
            };
        case REMOVE_NOTIFICATION:
            state.notifications.allNotifications.splice(_.findIndex(state.notifications.allNotifications, {'_id': action.payload}), 1);
            return {
                ...state,
                notifications: {...state.notifications, allNotifications: [...state.notifications.allNotifications]}
            };
        case SENDER_DETAILS_NOTIFICATION:
            return {...state, notifications: {...state.notifications, notificationSender: action.payload}};
        case CHANGE_REVIEW:
            return {
                ...state, notifications:
                    {
                        ...state.notifications, notificationSender:
                        {
                            ...state.notifications.notificationSender,
                            avg: action.payload.avg,
                            review: {
                                _id: action.payload._id, rating: action.payload.rating
                            }
                        }
                    }
            };
        default:
            return state;
    }
};

export default userProfile;