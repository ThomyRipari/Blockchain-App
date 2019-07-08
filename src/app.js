App {
	load: async () => {
		console.log("LOADING APP...");
	}
}

$(() => { 
	$(window).load(() => {
		App.load();
	})
})