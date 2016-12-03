# restful-ocr
A NodeJS project which will allow a client to post an image to the api and return the text from the image. 

restful-ocr currently supports two modes of recognizing text in images. It makes use of tesseractjs or tesseract installed. The reason for supporting two forms of tesseract is if performance isnt a concern and you do not have the desire or ability to install the tesseract-ocr application tesseractjs is a usable alternative.

## Installation 
### Prerequisites
* nodejs (>= 6.9.0) installed on your server
* npm installed on your server
* homebrew installed and functional. (_note if you dont use a mac you will need to substitute for the appropriate package manager commands here_)

### restful-ocr
1. Download and unzip Source from github
2. CD into download directory
3. % npm install

### tesseract-ocr (_optional_)
1. % brew install leptonica --with-libtiff
2. % brew install imagemagick
3. % brew install tesseract --with-all-languages

## Configuration
Open the config/default.json file. Changing ocr.tesseract true|false enables or disables the tesseract-ocr application. When false restful-ocr will make use of the tesseractjs library. When true it will attempt to make use of the installed tesseract application.

## Operation
Start the application like you would any other node application by using the command _npm start_ from the application home directory. Alternatively you may use any [process manager](http://expressjs.com/en/advanced/pm.html)

## Testing
Testing the webservice... 
1. Use a simple image containing text you want to ocr (eng_bw.jpg from tesseractjs website is my goto)
2. Start the restful-ocr server
3. Using curl post the image: `curl -F filedata=@/path/to/image/eng_bw.png "http://localhost:3000/api/upload"`

If everything is working properly you should see your text returned. Note that especially when using tesseractjs this may take some time.


## Performance
When choosing between tesseract-ocr and tesseractjs performance is really where its at. On my laptop using the same eng_bw.jpg image it takes between 31 and 47 seconds when using tesseractjs. When using tesseract-ocr it takes between 1.2 and 1.7 seconds. 

