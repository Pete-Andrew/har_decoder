//To get this running: 

//Install the following Required Packages - NOTE, as the Node packages are tiny I have left the node_modules with the code so you should be able to skip this step and go straight to 'TO RUN'

//fs: File system module to read/write files.
//path: Module to handle and transform file paths.
//To do this, open the terminal and add the following libraries (node.js needs to be installed on your PC if not already or you won't be able to add them)
//npm init -y
//npm install fs path

//TO RUN:
//type 'node script.js' into the terminal. 
//This will automatically unpack the .har file into the images/other bits it contains and save them in the output folder.

const fs = require('fs');
const path = require('path');

// harFilePath needs to point to the file in the directory where it is present, e.g. needs to match the file path. 
const harFilePath = 'inputFiles/example_test.har';
// outputDir is the file where the files will be sent
const outputDir = 'outputFiles';

// Function to parse HAR file and extract images
function extractImagesFromHar(harFilePath, outputDir) {
    // Read the HAR file, har files are always encoded in UTF-8 file format (UTF-8 is a variable-length character encoding standard used for electronic communication.)
    fs.readFile(harFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }

        // parses the data into a JSON object
        let har;
        try {
            har = JSON.parse(data);
        } catch (parseErr) {
            console.error(`Error parsing JSON: ${parseErr}`);
            return;
        }

//outputs the key value pairs found in the har JSON object
//The entries() method of Array instances returns a new array iterator object that contains the key/value pairs for each index in the array.
        const entries = har.log.entries;
        
        entries.forEach((entry, index) => {
            const response = entry.response;
            const content = response.content;
//A media type (also known as a Multipurpose Internet Mail Extensions or MIME type) indicates the nature and format of a document, file, or assortment of bytes.
// if the content is a media type && if the media type starts with 'image/' then split the.... 
//startsWith() method returns true if a string starts with a specified string.
            if (content.mimeType && content.mimeType.startsWith('image/')) {
                const base64Data = content.text;
                const extension = content.mimeType.split('/')[1]; // e.g., 'png', 'jpeg'

                // Decode the base64 data and write the file
                const buffer = Buffer.from(base64Data, 'base64');
                const outputFilePath = path.join(outputDir, `image_${index}.${extension}`);

                // writes the file to the output folder
                fs.writeFile(outputFilePath, buffer, (writeErr) => {
                    if (writeErr) {
                        console.error(`Error writing file: ${writeErr}`);
                    } else {
                        console.log(`Image saved to ${outputFilePath}`);
                    }
                });
            }
        });
    });
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// calls the first function
extractImagesFromHar(harFilePath, outputDir);
