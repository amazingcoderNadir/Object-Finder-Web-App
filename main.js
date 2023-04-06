status = "";
objects = [];
function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    name = document.getElementById("Object_name").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;

}

function gotResult(error, result)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = (results)
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length; 
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(object[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15, objects[i].width, objects[i].height);
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(objects[i].label == name)
{
    video.stop();
    objectDetector.detect(gotResult);
    document.getElementById("Object_status").innerHTML = name + "found";
    synth = window.speechSynthesis;
    a = new SpeechSynthesisUtterance(name + "found");
    synth.speech(a);
}

else
{
    document.getElementById("object_status").innerHTML = name + "not found";
}



        }
    }
}