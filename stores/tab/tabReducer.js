import * as tabActions from './tabAction';

const initialState = {
    selectedTab: ""
};

export default function tabReducer(state = initialState, action) {
    switch (action.type) {
        case tabActions.SET_SELECTED_TAB:
            return {
                ...state,
                selectedTab: action.payload.selectedTab
            }
        default:
            return state;
    }
}