//Inspiration from: https://www.youtube.com/watch?v=uk96O7N1Yo0
function Ring(){
    //name of the visualisation
	this.name = "Ring";
    //wave of the ring
    var wave;
    //amplitude to detect beat
    var amp;
    var level;
    //angle to rotate the inner circle
    var angle = Math.PI;

    var vect=createVector(0,0);

    var particles = [];

    this.draw = function()
    {
        //Draw Image background
        image(backgroundImg,0, 0, windowWidth, windowHeight);

        //Saves the state of the rings so they don't affect other extensions
        push();

        stroke(255);
        strokeWeight(3);
        noFill();
        
        //Call drawshape function
        this.drawShape();

        /*particle construct,
        Position the particle with a random 2D vector and multiply by 250
        to give it an effect of coming out of the circle */
        var newParticle = new Particles(p5.Vector.random2D().mult(250));

        //push the particles from construct into the particles array
        particles.push(newParticle);
        
        level = amplitude.getLevel()
        amp = map(level,0,1,0,250)

        for (var i = 0; i < particles.length; i++)
        {
            // if delete particles method returns false then
            //draw and update the particles.
            if(!particles[i].deleteParticles()) 
            {
                particles[i].update(amp > 90);
                particles[i].draw();
            }
            else
            {
                //if the method returns true, remove any particles
                // that is off the screen
                particles.splice(i,1);
            }      
        }
        pop();

    }
    this.drawShape = function()
    {            
        //Store 1024 values of waveform in wave variable.
        wave = fourier.waveform();   

        //Saves the state so the rings don't affect other extensions
        push();
        // angle mode to degrees
        angleMode(DEGREES);
        translate(width/2, height/2);
        //begins shape
        beginShape();
        //Draw waveform line from left to right of the screen
        for (var i = 0; i < 360; i++)
        {
            //Maps the whole waveform to the minimum and maximum radius of the Circle
            var radius = map(wave[i],-1,1, 150, 350);

            // x coordinate becomes the radius that was mapped times sine
            var x = radius * sin(i);
            // y coordinate becomes the radius that was mapped times cosine
            var y = radius * cos(i);

            //plot the circle on the Canvas
        vertex(x , y);  
        }
        //ends shape
        endShape();

        //DRAW SECOND SMALL ROTATING CIRCLE INSIDE LARGE CIRCLE
        //begins shape
        beginShape();
        //Draw waveform line from left to right of the screen
        for (var i = 0; i<= 360; i++)
        {
            //Maps the whole waveform to the minimum and maximum radius of the Circle
            var radius = map(wave[i],0,3, 100, 200);

            // x coordinate becomes the radius that was mapped times sine
            var x = radius * sin(i);
            // y coordinate becomes the radius that was mapped times cosine
            var y = radius * cos(i);

            //Add x and y to the vector and multiply by .5
            vect.add(x,y).mult(.5);

            strokeWeight(2);
            //rotate the inner circle and increment by 2.5
            //to change the size and rotation of the circle
            vect.rotate(angle * Math.PI / 360) ;  
            angle+=Math.random(PI);
            //plot the circle on the Canvas
            vertex(vect.x, vect.y);      
        }
         //ends shape
         endShape();
        pop();
    }
}


//Particle construct
function Particles(position)
{
    //Position of the particles, to be set on the circle so it looks
    //like they are coming out of the circle.
    var position = position;
    //velocity which would be updated
    this.velocity = createVector(0,0);
    //acceleration for how fast the particles move
    //Also copy the random 2D vector and move each particle
    //by 0.0003.
    this.acceleration = position.copy().mult(0.0003);

    //Draw Particles
    this.draw = function()
    {
        fill(255);
        noStroke();
        //Save the state for the particles only
        push();
        translate(width/2, height/2);
        //Draw an ellipse of the positions.
        ellipse(position.x, position.y, 5);
        pop();
        
    }
    //Updates Particles
    this.update = function(amp)
    {
        //Adds speed to the velocity of the vector
        this.velocity.add(this.acceleration);
    
        //Adds the constantly updated velocity to the x and y positions
        //Of the particles
        position.add(this.velocity);

        // if the condition for amp is true
        if(amp)
        {
            //adds more velocity to the x and y positions
            // which would speed the particles when the condition is met
            position.add(this.velocity);
            position.add(this.velocity);
            position.add(this.velocity);
        }
    }
    //Deletes the particles after they exit the screen
    //to prevent lag.
    this.deleteParticles = function()
    {
        //If the particles are off of the screen then return true
        //If not return false
        if(position.x > width || position.x < -width ||
            position.y > height || position.y < -height)
            {
                return true;
            }
            else
            {
                return false;
            }
    }
}
