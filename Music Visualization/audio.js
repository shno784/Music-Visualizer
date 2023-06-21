//Motivation from Ridge Plots extension on Coursera
function AudioFile()
{
  //name of extension
  this.name = "Voice Recorder"
  //empty array to store nodes
  this.nodes = [];
  //boolean for if the mic is on or off
  var listening = false;
  //initialize the speed of the nodes
  var speed = 0;
  //initialize the level to show on the canvas
  var level;
  //p5 mic function
  var mic;
  //p5 soundRecorder function
  var recorder;
  //p5 Soundfile function
  var soundFile;
  //initilaize button
  var button;

//The end of the border from left to right
//Resize the plots when fullscreen is enabled.
this.onResize = function() 
{
  this.startBorder = (windowWidth/9) * 7;
  this.endBorder = windowWidth/9 + 5;
  this.topBorder = windowHeight/10;
  this.bottomBorder = windowHeight - this.topBorder * 2;

  this.micX =windowWidth/2.15;
  this.micY = this.bottomBorder + 50;

}
//call onResize to set initial values when the object is created
this.onResize();

this.setup = function()
{
  //initialize p5 mic, recorder and soundfile functions
  mic = new p5.AudioIn();
  recorder = new p5.SoundRecorder();
  soundFile = new p5.SoundFile();
  
  //start the mic from AudioIn
  mic.start();
  //set input method of the recorder to the mic
  recorder.setInput(mic);

  //The button now looks like a microphone using google icons
  button = createButton('<span class="material-icons-outlined" style = "font-size:50px">mic</span>');

  //call stylebutton function to style the button
  this.styleButton()

  //if the button is pressed then this.recording function is performed
  button.mousePressed(this.recording)
}
  //Draw Border, nodes and show Audio
  this.draw = function()
  {
    //background Image
    image(backgroundImg,0, 0, windowWidth, windowHeight);  

    //adds Image in border
    image(audioImg, this.endBorder, this.topBorder  ,this.startBorder, this.bottomBorder);
          
    //when this extension is selected, stop the song and change the pause button to the play button
    arrSongs[index].song.stop();
    play.innerHTML = '<span class="material-icons-outlined" style="font-size: 50px;">play_arrow</span>';

    //Initialize setup drawborder and drawnode in draw
    push();
    this.drawBorder();
    this.drawNode();
    pop();

    //if listening is false then level is assigned mic.getlevel()
    //else if listening is true level is assigned 0 to reset the nodes back
    //to 0 when the user stops recording
    if(listening)
    {
      level = mic.getLevel();
    }
    else
    {
      level = 0;
    }

  }

  this.drawNode = function()
  {
    //addNode() function is called every 5 frames
    if(frameCount % 5 == 0)
    {
      this.addNode()
    }

    //Keeps pushing each node in the array from left to right
    push()
    for(var i = 0; i < this.nodes.length; i++)
    { 
      var node = this.nodes[i]
      //if listening is true, the speed will be constant but if it is false
      //this means that the user has stopped recording so the nodes will go across quickly
      if(listening)
      {
        speed = 2;
      }
      else
      {
        speed = 10;
      }
      for(var j = 0; j < node.length; j++)
      {
        fill(255);
        //decrease the x position of each node so it goes from left to right
        node[j].x -= speed;
        //draw each node
        ellipse(node[j].x,node[j].y,node[j].width,node[j].height)
      }
      // if the first node's x position is less than endBorder then it is deleted from the array.
      if(node[0].x < this.endBorder + 5)
      {
        this.nodes.splice(i,1);
      }
    }
    pop()
  }

  //Draw the border for the nodes to be in
  this.drawBorder = function()
  { 
    //set border stoke to gray and strokeweight of 10
    stroke("gray");
    strokeWeight(10);
    noFill();

    //draws border
    rect(this.endBorder,this.topBorder ,this.startBorder,this.bottomBorder);
    noStroke()
  }

  //Push each node into the nodes array.
  this.addNode = function()
  {
    // if listening is true the nodes will push so that nothing will draw
    //when the user hasn't pressed "Start Recording" as yet
    if(listening)
    {
      this.nodes.push(
        [{x: ((windowWidth/9) * 8) - 10,
          y: windowHeight/2,
          width: 5,
          height: 3 * (level * 100)
      }]);
    }
  }
  this.destroy = function()
  {
    button.remove(); //remove button when the extension is switched out
    mic.stop();//Stops the mic when the extension is switched out
  }

  //function for recording audio
  this.recording = function()
  { 
    //set this so the mic starts again if the user wants to record another voicenote
    mic.start();

    /*if listening is false and the mic is enabled then the button shows the mic off icon.
    the recorder starts to record and the mic starts playing.
    Also listening boolean is set to true */
    if (listening == false && mic.enabled) 
    {
      recorder.record(soundFile);

      button.html('<span class="material-icons-outlined" style = "font-size:50px">mic_off</span>');
      //starts mic by setting the audio context to resume
      getAudioContext().resume();

      listening = true;
    }
    /* if Listening is true then the mic stops, the button shows the mic on icon
    The recorder also stops, the Audio is saved and listening is set back to false */
    else if(listening == true)
    {
      button.html('<span class="material-icons-outlined" style = "font-size:50px">mic</span>')
      mic.stop()
      recorder.stop();
      save(soundFile,"Audio.wav");
      listening = false;
    }
  }
  this.styleButton = function()
  { 
    //style the button using p5 DOM
    button.position(this.micX,this.topBorder + 20)
    button.style('font-size', '30px');
    button.style('font-size', '30px');
    button.style('color','white');
    button.style('background-color','inherit');
    button.style('cursor','pointer');
    button.style("border","5px");
    button.style("user-select","none");
  }
}
