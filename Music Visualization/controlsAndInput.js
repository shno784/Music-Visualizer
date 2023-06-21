//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = true;
	

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){

			text("Select a visualisation:", 30, 40);
			this.menu();
		}	
		pop();

	};

	this.menu = function(){
		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i ++)
		{
			var numbers = ["1: ","2: ","3: ","4: ","5: ","6: ","7: "]
			text(numbers[i]+ vis.visuals[i].name ,30,50 * i + 90)
		}
	};
}


