# TTT Data
TTT Data is a simple webapp for counting the frequency of words present in a text file.

Check it out - https://mysterious-basin-79505.herokuapp.com/

node.js is used for the backend and ejs for the frontend.


# How it works  
When the submit button is clicked, a post request is sent to the '/table' route, which checks if the number requested is greater than 0 and then calls the getData function.

getData is an async function that fetches the data from the url provided and converts it into text. A regex match is done to find the words in the text received and is stored in matchedWords array. For each word in matchedWords, we add that word to an object called wordList.

As our keys are strings, an object will work just as good as Map.

The object is then converted to an array and sorted is ascending order based on the frequency of the words.

There is a check to see if words requested were greater than the number of unique words in the file, if yes then only the available words are sent.
The array is then sliced and the number of words requested are returned.

'/reset' route just empties the list.


EJS is used for front end, it allows us to use javascript to generate HTML markup.
There is a simple for loop used to add elements to the table.


# Packages used  
ExpressJS  
EJS  
node-fetch  

# Screenshots
Tested on Firefox, Chrome and Safari

Main Page
![Main Page](https://i.imgur.com/vkEE8zI.png)
  
Words Requested  
![10 words requested](https://i.imgur.com/79bN5qg.png)
  
Resizing   
![Resizing GIF](https://i.imgur.com/yzo47cM.gifv)


