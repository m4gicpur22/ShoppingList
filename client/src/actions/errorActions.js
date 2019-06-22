import { GET_ERRORS, CLEAR_ERRORS } from './type';

export const returnErrors = (msg, status, id = null ) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id}
    };
};

export const ClearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};