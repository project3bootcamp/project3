//if error occurs then this reducer will fill the state with errors 
import { GET_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        default: 
            return state;
    }
}