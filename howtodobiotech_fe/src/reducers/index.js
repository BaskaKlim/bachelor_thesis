import { combineReducers } from "redux";
import innovations from "./innovations";
import startups from "./startups";
import skills from "./skills";

export default combineReducers({
    innovations,
    startups,
    skills
});