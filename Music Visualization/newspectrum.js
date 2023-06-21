function Spectrum()
{
	//name of the visualisation
	this.name = "New Spectrum";

	//variable for the magin
	var margin;

	this.onResize = function()
	{    //Margin object
		margin = 
		{
			left:(windowWidth * .15),
			right:(windowWidth * .90),
			top:(windowHeight * .10),
			bottom:(windowHeight * .90),
			padding:(windowWidth / 32) * 1.5,
		}

		//Calculates the top of the margin to limit how far each point can go.
		this.plotTopMargin = function()
		{
			return margin.top + margin.padding +5;		
		}
	 }
	//call onResize to set initial values when the object is created
	this.onResize();
	
	this.draw = function() 
	{
		//save the state so this extension doesn't affect other extensions
		push();
		//Background Image
		image(backgroundImg,0, 0, windowWidth, windowHeight);

		//translate the rectangles to the left margin and to the bottom margin
		translate(margin.left, -(windowHeight * .10));

		//Analyzes the spectrum
		var spectrum = fourier.analyze();

		noStroke();
		//Draws the spectrum
		beginShape();
	    for (var i = 0; i < spectrum.length; i++)
		{	
			//map the spectrum values to the height of the border
			var specHeight = floor(map(spectrum[i], 0, 255 , margin.bottom, this.plotTopMargin()));  

			//maps i from the spectrum length to the length of the left margin to the right margin
			var plotAcross = map(i,0,spectrum.length , 0 , margin.right - margin.left);

			//maps specheight to smaller values to scale the colour
			var colourScale = floor(map(specHeight, 20 , 710 , 0 , 180));

			/*Scale the colour of each point based on the spectrum values.
			A lower value means that the spectrum would be red because the red value would be high while the green value would be low.
			As the value of the spectrum gets higher,the red value would also be low which means the green value would be higher.*/		
			stroke(255 - colourScale ,colourScale , 0);

			noFill();
			strokeWeight(7);

			//plot the points to the screen
			point(plotAcross,specHeight + margin.padding)
			
  		}
		endShape();
		pop(); 
	}
}