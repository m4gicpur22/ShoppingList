import { combineReducers } from 'redux';
import itemReducer from "./itemReducer";
import errorreducer from "./errorReducer";
import authreducer from "./Authreducer";

export default combineReducers({
    item: itemReducer,
    error: errorreducer,
    auth: authreducer
});