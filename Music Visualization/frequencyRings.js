function FrequencyRings()
{
    this.name="Frequency Rings"
    //frequencies for getEnergy() to retrieve a value for each plot
    this.frequencies = ["bass", "lowMid", "highMid", "treble"];
    //set up ring object
    var rings;
    //resize canvas when in fullscreen and initiliaze rings object
    this.onResize = function() {

        rings = 
        {
            width:(windowWidth - (windowWidth / 10)) / 4,
            height:(windowHeight - (windowWidth / 10)) / 2,
            padding:windowWidth / 10,
        }
    };
    //call the function Immediately
    this.onResize();

    this.draw = function()
    {   
        //background Image
        image(backgroundImg,0, 0, windowWidth, windowHeight);    
        
        //iterator to get each frequency in getEnergy()
        var currentFrequency = 0;
        //nested loop to plot 2x2 circles on the canvas
        for (var i = 0; i < 2; i++) 
        {
			for (var j = 0; j < 2; j++)
            {   
                //get the energy from fourier.analyze() and use currentFrequency as the index
                //to select each frequency.
                var energy = fourier.getEnergy(this.frequencies[currentFrequency]);
                //increment currentFrequency to select the next frequency as the current Frequency
                currentFrequency++
                //push and pop the translation to prevent it from translating the current transformation matrix.
                push();
                //Use the translate function 4 times in a 2x2 grid.
                translate(rings.padding * 2 + rings.width * i * 2.5, rings.padding + rings.height * j * 1.3 );     
                //calls the drawshape function and accepts energy and the frequency as values.
                this.drawShape(energy, this.frequencies[ i + 2 * j]);
                pop();

            }
        }
    }
    //Draws the shapes
    this.drawShape = function(energy, freqLabel)
    {
        //Returns an array of amplitude values (between 0 and 255) across the frequency spectrum. 
        var spectrum = fourier.analyze();
        //map energy to specified value range
        var offset = map(energy,0,255,-20,20);
        
        //holds value for PI * 2
        var pie = (Math.PI * 2);
        //push and pop so that anglemode doesn't affect other visualizations
        push()
        //text colour white, align the text in the center and set text size to 15
        fill(255)
        textAlign(CENTER);
		textSize(15);
        //uses the plotHeight array to plot the words with each plots correctly
        // and offsets the words while the music is playing to give it a vibration glow
		text(freqLabel, 0 + offset, (rings.height/ 2) + offset);
        //Changes anglemode from radiants to degrees
        angleMode(DEGREES);
        pop();

        beginShape();
        for (var i = 0; i < 180; i++)
        {   
            /*getEnergy() is not an array and there weren't any ways (to my knowledge) to put each value at a different index in the array, 
            So the values of energy were added to the spectrum array so that each value could have an index to react with each plot correctly */
            var newSpectrum =spectrum[i]+=energy;

            //map the newspectrum to 90 to 150.
            var radius = map(newSpectrum,25,400.12843,90,150);
                   
            /*plots the x value which is the radius times the cosine of pie times radius.
            while the y value would be the radius times the sine of pie times radius. */
            var  x = radius * cos(pie * radius)

            var  y = radius * sin(pie* radius);
            /*plots the x1 value to 60 * cosine of radius
            and plots the y1 value to 60 * the sine of radius*/
            var x1 = 60 * cos(radius);

            var y1 = 60 * sin(radius);

            //sets initial stroke to green.
            stroke(0,255,0)
            if(radius > 100)
            {   
                // if the radius is more than 100 then the colour would scale
                // from green to red, the higher the radius the more red it becomes.
                stroke(radius,255 - radius,0);
                //call noFill so the vertex doesn't fill inside it.
                noFill()
            }
            /* plots a line from x and y to x1 and y1, x1 and y1 are points that are close to the center of the circle
               while x and y are points on the edge of the circle */
            line(x,y,x1,y1)
            /*draws a vertex in x and y which gives a vertex of the values along the edge of the circle which then 
            connects with the line. */
            vertex(x,y); 
            
        }
        endShape();
    }
    
}