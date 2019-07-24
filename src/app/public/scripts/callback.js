let uri = window.location.href;
const params = new URLSearchParams(uri.split('?').slice(1).join('?'));

loadJSON('/profile?state=' + params.get('state'), (buffer) => {
	let json = JSON.parse(buffer);
	let element = document.getElementById('profile_data');
	let str = '';
	for (let [k, v] of Object.entries(json)) {
		str += (k === 'id' ? 'ID' : toProperCase(k)) + ': ' + (typeof v === 'object' ? JSON.stringify(v, null, 4) : v) + '\n';
	}
	element.innerHTML = JSON.stringify(json, null, 4); //str;
});

function loadJSON(file, callback) {
	var xobj = new XMLHttpRequest();
	xobj.open('GET', file, true);
	xobj.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == '200') callback(this.responseText);
	};
	xobj.send();
}

function toProperCase (string) {
	let words = string.split(/ +/g);
	let newArray = [];
	for (let i = 0; i < words.length; i++) {
		newArray[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length).toLowerCase();
	}
	let newString = newArray.join(' ');
	return newString;
}