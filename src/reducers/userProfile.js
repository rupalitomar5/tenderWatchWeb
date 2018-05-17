import {LOGOUT} from './auth';
import _ from 'lodash';
import {INTERESTED_TENDER,ADD_FAVORITE_TENDER,DELETE_FAVORITE_TENDER} from './tenders';

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
            return initialState;
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
            state.notifications.allNotifications[index].read=true;
            return _.cloneDeep(state);
        case REMOVE_NOTIFICATION:
            state.notifications.allNotifications.splice(_.findIndex(state.notifications.allNotifications, {'_id': action.payload}), 1);
            return {
                ...state,
                notifications: {...state.notifications, allNotifications: [...state.notifications.allNotifications]}
            };
        case SENDER_DETAILS_NOTIFICATION:
            return {...state, notifications: {...state.notifications, notificationSender: action.payload}};
        case INTERESTED_TENDER:
            debugger;
            const notificationIndex=_.findIndex(state.notifications.allNotifications,{tender:{_id:action.payload.tenderId}});
            state.notifications.allNotifications[notificationIndex].tender.interested.push(action.payload.userId);
            return _.cloneDeep(state);
        case ADD_FAVORITE_TENDER:
            const IndexNotification=_.findIndex(state.notifications.allNotifications,{tender:{_id:action.payload._id}});
            IndexNotification>-1 && state.notifications.allNotifications[IndexNotification].tender.favorite.push(action.payload.clientId);
            return _.cloneDeep(state);
        case DELETE_FAVORITE_TENDER:
            const deleteIndexNotification=_.findIndex(state.notifications.allNotifications,{tender:{_id:action.payload.tenderId}});
            deleteIndexNotification>-1 && _.pull(state.notifications.allNotifications[deleteIndexNotification].tender.favorite,action.payload.userId);
            return _.cloneDeep(state);
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