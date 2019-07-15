
function popStateHandler(event) {
	
}

document.addEventListener('popstate', popStateHandler);


var el = document.getElementById('b1');


el.addEventListener('click', function(e) {
	window.history.pushState(null, "dd", "");
});

setTimeout(function() {
	window.history.pushState(null, "dd", "");
}, 10000);