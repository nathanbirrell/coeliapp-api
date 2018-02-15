# restful-ocr
A NodeJS project which will allow a client to post an image to the api and return the text from the image.

restful-ocr currently supports two modes of recognizing text in images. It makes use of tesseractjs or and installed copy of the tesseract program. The reason for supporting two forms of tesseract is if performance isnt a concern and you do not have the desire or ability to install the tesseract-ocr application tesseractjs is a usable alternative.

## Installation
### Prerequisites
* nodejs (>= 6.9.0) installed on your server
* npm installed on your server
* homebrew installed and functional (only if you intend to follow the steps below to install tesseract-ocr). (_note if you dont use a mac you will need to substitute for the appropriate package manager commands here_)

### restful-ocr
1. Download and unzip Source from github
2. CD into download directory
3. % npm install
4. Edit config/default.json (set images path, enable or disable tesseract-ocr... this is the C installed tesseract rather than the native JS)


### tesseract-ocr (_optional_)
1. `brew install leptonica --with-libtiff; brew install imagemagick; brew install tesseract`

## Configuration
Open the config/default.json file. Changing tesseract-ocr.enabled true|false enables or disables the tesseract-ocr application. When false restful-ocr will make use of the tesseractjs library. When true it will attempt to make use of the installed tesseract application.

## Operation
Start the application like you would any other node application by using the command _npm start_ from the application home directory. Alternatively you may use any [process manager](http://expressjs.com/en/advanced/pm.html)
__Note: I have been unable to get this working with PM2, there is a conflict with node-config__
I recommend using strongloop as I had no problems running the application under it, but thats just personal pref.

## Testing
Testing the webservice...
1. Use a simple image containing text you want to ocr (eng_bw.jpg from tesseractjs website is my goto)
2. Start the restful-ocr server
3. Using curl post the image: `curl -F filedata=@/path/to/image/eng_bw.png "http://localhost:3000/api/upload"`

If everything is working properly you should see your text returned. Note that especially when using tesseractjs this may take some time.


## Performance
When choosing between tesseract-ocr and tesseractjs performance is really where its at. On my laptop using the same eng_bw.jpg image it takes between 31 and 47 seconds when using tesseractjs. When using tesseract-ocr it takes between 1.2 and 1.7 seconds.

## Packaging and Deployment
If you wish to package the application for easy deployment to a server, this can be done easily using gulp.

1. % npm install (This should already be done, but saying it again to be sure)
2. % gulp dist

Thats it, there should now be a zip file located in the dist directory. You can unzip this on any server with nodejs installed and follow the Operation steps to run the webservice.
