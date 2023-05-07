import { combineReducers } from "redux";
import innovations from "./innovations";
import startups from "./startups";

export default combineReducers({
    innovations,
    startups
});