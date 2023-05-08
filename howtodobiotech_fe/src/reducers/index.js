import { combineReducers } from "redux";
import innovations from "./innovations";
import startups from "./startups";
import skills from "./skills";
import experts from "./experts";

export default combineReducers({
    innovations,
    startups,
    skills,
    experts
});