import { forEach } from "lodash";

let fieldComponents: any = {};

let coreFields = import.meta.glob('../fields/core/*.vue');

for (let key in coreFields) {
	let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
	fieldComponents[compName] = coreFields[key];
}

let optionalFields = import.meta.glob('../fields/optional/*.vue');

for (let key in coreFields) {
	let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
	fieldComponents[compName] = optionalFields[key];
}

export default fieldComponents;
