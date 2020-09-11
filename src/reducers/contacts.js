import ActionTypes from "../constants/actionTypes";

const initialState = {
    loading: false,
    total: null,
    contacts: [],
    contacts_ids: []
};

export default function contacts(state = initialState, action) {
    const  { payload } = action;

    switch (action.type) {
        case ActionTypes.GET_CONTACTS.REQUEST:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.GET_CONTACTS.SUCCESS:
            return {
                ...state,
                total: payload.total,
                contacts: [...state.contacts, ...Object.values(payload.contacts)],
                contacts_ids: payload.contacts_ids,
                loading: false
            };
        case ActionTypes.GET_CONTACTS.FAILURE:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};