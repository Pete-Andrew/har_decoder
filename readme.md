# HAR file converter  
# A Useful tool for batch downloading images   
# (e.g from desktop browser websites like instagram).     
# Runs from desktop using node.js    

This is a tool for converting .har files downloaded from the console into the component images the .har file contains.  
It acts like an unzip tool by converting the encoded images within the .har back into image files (e.g. jpg, png, etc.)  

This works well if you want to get a series of images from a website but don't want to do this image by image.  

To download a .har file:  
- Open the console (F12 in chrome)  
- Open the network tab  
- select the Img button  
- refresh the page (F5)  
- This will bring all the images on the page up in the left hand menu    
- Right click on eney entry and 'save all as HAR with content'  
- This will save the .har file to your PC  

 ![How to export a .har](/img/How_to_export_har.jpg)  

Once this is done:
- Place the .har file in the 'inputFiles' folder included with this code.  
- To run the tool open the terminal in vs code and enter 'node script.js'  
- This will then unpack the .har file, parse the contents into a JSON object   
- Then export the images into the 'outputFiles' folder.   

I have included a test .har file as an example.  

Have fun! 