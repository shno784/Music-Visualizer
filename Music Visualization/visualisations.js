//container function for the visualisations
function Visualisations(){
	//array to store visualisations
	this.visuals = [];
	//currently selected vis. set to null until vis loaded in
	this.selectedVisual = null;

	//this.audio = new AudioFile()

	//add a new visualisation to the array
	//@param vis: a visualisation object
	this.add = function(vis){
		this.visuals.push(vis);
		//if selectedVisual is null set the new visual as the 
		//current visualiation
		if(this.selectedVisual == null){
			this.selectVisual(vis.name);
		}
	};

	//select a visualisation using it name property
	//@param visName: name property of the visualisation
	this.selectVisual = function(visName){
		//if the selected visual has a method called destroy then execute it
		if (this.selectedVisual != null
			&& this.selectedVisual.hasOwnProperty('destroy')) {
			this.selectedVisual.destroy();
		}
		for(var i = 0; i < this.visuals.length; i++){
			if(visName == this.visuals[i].name){
				this.selectedVisual = this.visuals[i];
			}
		}
		//if the selected visual has a method called setup then execute it
		if (this.selectedVisual != null
			&& this.selectedVisual.hasOwnProperty('setup')) {
			this.selectedVisual.setup();
		}
		
	};
}
