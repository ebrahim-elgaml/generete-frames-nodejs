Install
=======

 1. Install python-software-properties if not already installed
 sudo apt-get install python-software-properties

 2. Install a new apt repository for ffmpeg
 sudo add-apt-repository ppa:jon-severinsson/ffmpeg
 sudo apt-get update

 3. Upgarde ffmpeg to the latest stable version
 sudo apt-get install ffmpeg

 4. Install libvpx needed for webm transcoding
 sudo apt-get install libvpx-dev

 5. Test it with this command
 ffmpeg -i source.mp4 -f webm -vcodec libvpx -acodec libvorbis -threads 2 -qmax 25 -y output.webm