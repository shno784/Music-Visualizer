function Player()
{
   this.playerShow = false;
   //set the display for the Player to block so it is showed by default
   this.player = null;

   //Show the player to the Screen
   this.draw = function()
    {
        background(192)

        /*If playerShow is true then the display would be set to none
        So the player would not be shown, if it is set to false then the player would show*/

    }

    //check if spacebar is pressed to show the player
    this.keyPressed = function()
    {   
		if(keyCode == 32)
        {
			this.playerShow = !this.playerShow;
		}

        if(!this.playerShow)
        {
            this.player = document.querySelector('.Player').style.display = 'block';
        }
        else
        {
            this.player = document.querySelector('.Player').style.display = 'none';
        }
        //Plays previous song when left arrow is pressed and the song is playing
        if(keyCode == 37 && arrSongs[index].song.isPlaying()) 
        {
            this.previousSong()
        }
        //Plays the next song when the right arrow is pressed and the song is playing
        if(keyCode == 39 && arrSongs[index].song.isPlaying()) 
        {
            this.nextSong()
        }
    }

    //Play and Pause the song when the play button is pressed
    this.playSong = function()
    {   
         //pause the song and changes the play button to pause and vice versa        
         if (!arrSongs[index].song.isPlaying()) 
         {
             arrSongs[index].song.play();
             play.innerHTML = '<span class="material-icons-outlined" style="font-size: 50px;">pause_circle</span>'  
             song.innerHTML=  arrSongs[index].name                  
         } 
         else if(arrSongs[index].song.isPlaying())
         {
             arrSongs[index].song.pause();
             play.innerHTML = '<span class="material-icons-outlined" style="font-size: 50px;">play_arrow</span>' 
 
         }
              
    }
    //Play the next song when the Next button is clicked
    this.nextSong = function()  
    {   //stops the previous song that is playing then increment the index and plays the next song
        arrSongs[index].song.stop();

        index ++;  
        if(index > arrSongs.length -1)
        {
            index = 0;
        } 
        //pause the song and changes the play button to pause and vice versa
        if (arrSongs[index].song.isPlaying())
        {
            arrSongs[index].song.pause()
            play.innerHTML = '<span class="material-icons-outlined" style="font-size: 50px;">play_arrow</span>'  
        }
        else{
            arrSongs[index].song.loop()
            play.innerHTML = '<span class="material-icons-outlined" style="font-size: 50px;">pause_circle</span>'   
            song.innerHTML=  arrSongs[index].name; 
        }
    }

    //Play the previous song when the Previous button is clicked
    this.previousSong = function()
    {   //stops the previous song that is playing then decrement the index and plays the next song
        arrSongs[index].song.stop()

        index --;

        if(index < 0)
        {
            index = arrSongs.length -1;
        }
        //pause the song and changes the play button to pause and vice versa
        if (arrSongs[index].song.isPlaying())
        {
            arrSongs[index].song.pause()
            play.innerHTML = '<span class="material-icons-outlined" style="font-size: 50px;">play_arrow</span>'  
            
        }
        else
        {
            arrSongs[index].song.loop()
            play.innerHTML = '<span class="material-icons-outlined" style="font-size: 50px;">pause_circle</span>'   
            song.innerHTML=  arrSongs[index].name;
        }
    }
    
}
