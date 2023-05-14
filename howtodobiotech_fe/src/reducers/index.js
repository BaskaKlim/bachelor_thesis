import { combineReducers } from "redux";
import innovations from "./innovations";
import startups from "./startups";
import skills from "./skills";
import experts from "./experts";
import auth from './auth';
import account from './account';

export default combineReducers({
    innovations,
    startups,
    skills,
    experts,
    auth,
    account
});