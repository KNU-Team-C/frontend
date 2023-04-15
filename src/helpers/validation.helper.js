export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,300}$/;
export const nameRegex = /^[a-zA-Z]+$/;

export const validate = (text, regex, toLowerCase) => {
	let t = text;
	if (toLowerCase) {
		t = t.toLowerCase();
	}
	return String(t).match(regex);
};
