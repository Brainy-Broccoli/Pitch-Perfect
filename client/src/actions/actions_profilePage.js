import { LOAD_PROFILE } from './actionTypes';

export const loadProfile = (profileState) => ({
    type: LOAD_PROFILE,
    profileState,
});
