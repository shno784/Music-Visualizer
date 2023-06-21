//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
//variable for p5 amplitude
var amplitude;
//global for the TitleScreen 
var title = null;
//variable to load font
var font;
//index of the songs so they are able to change
var index = 0;
//global variable for player construct
var player;

function preload(){

	//background image of all visualizations 
	backgroundImg = loadImage('assets/background.jpg');
	audioImg = loadImage('assets/WhatsappImage.jpg')

	soundFormats('mp3','wav');
	//array of the loaded songs and their names to be used in the player
	arrSongs=
	[
		{  
			song:loadSound('assets/boom_drill.wav'),
			name:'BOOM',

		},
		{
			song:loadSound('assets/chancetherapper_type_beat.wav'),
			name:'HAPPY',
		},
		{   
			song:loadSound('assets/secrets.wav'),
			name:'SECRETS',
		},
		{
			song:loadSound('assets/smooth_pop.wav'),
			name:'SMOOTH POP',
		},
		{
			song:loadSound('assets/tell_me_drill.wav'),
			name:'TELL ME'
		}
	]
}

function setup(){
	createCanvas(windowWidth, windowHeight);

	title = new TitleScreen();
	controls = new ControlsAndInput();

	//instantiate the fft object
	fourier = new p5.FFT();
	//insantiate the amplitude object
	amplitude = new p5.Amplitude();
	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new TitleScreen());
	vis.add(new Spectrum());
	vis.add(new Emitter());
	vis.add(new Ring());
	vis.add(new FrequencyRings());
	vis.add(new AudioFile());

	//Event listener, if the mouse is double clicked it will go into fullscreen
	document.addEventListener("dblclick", () =>{
	toggleFullscreen();
    });
	//player is assigned the player construct
	player = new Player;

	//Selects the current song that is playing and displays its name
	song = document.querySelector('#song-name');

}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function keyPressed(){
	player.keyPressed(keyCode);
	controls.keyPressed(keyCode)
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}

//function that returns the fullscreen for chrome,firefox, explorer, safari. Depending on which browser you are using.
function fullScreen()
{
   return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || document.msFullscreenElement;  
   
}
//toggles the fullscreen off or on when the mouse is doubleclicked
function toggleFullscreen()
{
    if(fullScreen())
    {
        document.exitFullscreen()
    }
    else
    {
        document.documentElement.requestFullscreen()
    }
}