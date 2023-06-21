function TitleScreen(){
    //name of the visualisation
	this.name = "TitleScreen";
    //to offset the text while the music is playing
    var offset;

    this.draw = function()
    {
        image(backgroundImg,0, 0, width, height);
        //get the amplitude level
        var level = amplitude.getLevel();
        //map the leve from 0 to 1 to -20 to 20
        offset = map(level, 0 , 1 , -20 , 20);

        //fill the text white
        fill(255);
        //text size 32
        textSize(32);
        //text font set to Georgia
        textFont('Georgia');
        //print text to the screen
        text("Press Space to Close or View options to select visual and Player",windowWidth/4.5 + offset , windowHeight/2 - 50 + offset);
        text("Double Click anywhere on the Screen to Enter/Exit Fullscreen",windowWidth/4.5 + offset ,windowHeight/2 + 30 + offset)
        text("Use Left and Right Arrow Keys to change the song while the music is Playing",windowWidth/4.5 + offset ,windowHeight/2 + 100 + offset)
    }	

}