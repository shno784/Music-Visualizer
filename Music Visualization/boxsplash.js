function BoxSplash(x,y,width,height,speedX,speedY)
{
    //initialize values for each box
    this.x =x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    //analyze for fourier.analyze()
    var analyze;
    //stores the level of the bass of the song that's being played
    this.level;

    //Values for the Margins when the window is resized and to set box boundaries
    //Use a constant number so the bottom Margin does not change position when window is resized
    this.onResize = function()
    {   
        this.topMargin = 265;
        this.bottomMargin = 750;
        
    }
    this.onResize();
 
    this.draw = function()
    {   
        //fourier.analyze() function
        analyze = fourier.analyze();
        //get the level of the bass from the song being played
        var level1 = fourier.getEnergy("bass");
        //map the bass value from 0 to 255 to 0 to 2
        this.level= map(level1, 0, 255, 0, 2);
        
        push();
        //fill with rectangles to aqua
        //Also save the state of the strokeWeight to not affect other extensions
        fill("aqua");
        stroke(255);
        strokeWeight(3);
        //draw the shape
        rect(this.x,this.y,this.width,this.height);
        pop();
    
    }
    //function to detect if boxes have collided
    this.bump = function(others)
    {
        /*if the front or back of the box collides with the front or back of another box
        then change the speed of the boxes to negative so they rebound off each other */
        if(this.x + this.width + this.speedX > others.x 
            && this.x + this.speedX < others.x + others.width 
            && this.y + this.height > others.y 
            && this.y < others.y + others.height)
        {
            this.speedX = -this.speedX;
        }

        /*if the top or bottom of the box collides with the front or back of another box
        then change the speed of the boxes to negative so they rebound off each other */
        if(this.x + this.width > others.x 
            && this.x < others.x + others.width 
            && this.y + this.height + this.speedY > others.y 
            && this.y + this.speedY < others.y + others.height)
        {
            this.speedY = -this.speedY;
        }
    }
    //function to move the boxes
    this.move = function()
    { 
        //add the speed times the level of the bass to give each bos a kick-off effect
        this.x += this.speedX * this.level;
        this.y += this.speedY * this.level;

        /*if the right-most side of the box is more than or equal to the width of the screen
        then the box's speed will change and it will bounce backwards */
        if(this.x + this.width >= windowWidth - 10)
        {
            
            this.speedX  = -this.speedX;
          
        }
        /*if the left-most side of the box is less than or equal to 0 no the x axis then
        the box's speed will change and it will bounce backwards */
        if( this.x + this.speedX <= 0)
        {
            this.speedX  = -this.speedX;
        }
        /*if the bottom of the box is more than or equal to the height of the screen
        then the box's speed will change and it will bounce backwards */
        if(this.y + this.height >= this.bottomMargin - this.speedY)
        {
            this.speedY = -this.speedY;

        }  
        /*if the top of the box is less than or equal to the boundary on the screen
        then the box's speed will change and it will bounce backwards */
        if( this.y - this.height <= this.topMargin)
        {
            this.speedY = -this.speedY;
        }
    }
}

function Emitter()
{   
    //name of the extension
    this.name = "Box Splash";

    //array to store BoxSPlash construct
    var box = [];

    //Change the value of where the box starts when the window is resized
    //Use a constant number so the Bottom Margin does not change position when window is resized
    this.onResize = function()
    {   
        this.topMargin = 263;
        this.bottomMargin = 750;
        
    }
    this.onResize();
    
    //loop the draw and setup method with pushing the boxes so they only happen 10 times
    for (i = 0; i < 10; i++)
    {   
        //initialize values for the box object
        var x = random(0,windowWidth - 50);
        var y = this.bottomMargin - 50;
        var speedX = random(1,3);
        var speedY = random(1,3);
        var width = 50;
        var height = 50;

        //If statement to target every other box but the current box
        if (i != 0)
        {
            for (var j = 0; j < box.length; j++)       
            {
                //calculate the distance for the current box at index i to the rest of the boxes at index j
                var d = dist(x , y, box[j].x, box[j].y);
                //if the distance of the box is close to any other box, redraw the x and y coordinates so they don't overlap from the start
                if (d < width + 10)
                {
                    var x = random(0,windowWidth - 50);
                    var y = this.bottomMargin -50;
                    //set j to -1 so the loop can start back from 0
                    j = -1;
                }
            }     
        }
        //push box object into box array
        box.push(new BoxSplash( x, y, width, height, speedX, speedY)); 


        this.draw = function()
        {
            //Background Image
		    image(backgroundImg,0, 0, windowWidth, windowHeight);

            stroke(255);
            //draw 2 white lines to show top and bottom borders
            line(0,this.topMargin,windowWidth,this.topMargin);
            line(0,this.bottomMargin,windowWidth, this.bottomMargin);

            for(var i = 0; i < 10; i++)
            {   //Draw the boxes that were pushed into the box array
                box[i].draw();
                
                //if the sound is playing then the boxes will move
                if(arrSongs[index].song.isPlaying())
                {
                    box[i].move();
                }
                        
                for(var j = 0; j < box.length; j++)
                {  //box at index j will be assigned the otherBoxes variable
                    var otherBoxes = box[j];

                    /*call the bump function if the box at index i is not equal to the box at index j
                    i.e, the boxes are not the same box */
                    if (box[i] != otherBoxes)
                    {
                        box[i].bump(otherBoxes);//functions for boxes to bounce off each other
                    }
                }
    
            }
            
        }
    
    }
}