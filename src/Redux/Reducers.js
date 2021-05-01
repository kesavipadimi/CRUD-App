import {combineReducers} from 'redux';
import profileReducer from '../Redux/Profiles/profileReducer';

const rootreducer = combineReducers({
    profile:profileReducer,
})

export default rootreducer;