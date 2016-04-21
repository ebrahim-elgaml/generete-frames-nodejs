module.exports = {
    // FFmpeg transcoding timeout
    timeout: 30000,
    // Path to the movies directory where the MP4s are
    paths: {
        source: '/home/zoobe/nas/movies'
    },
    // FFmpeg command switches
    ffmpeg: {
        crf: 5,
        qmax: 25
    },
    // Server config
    server: {
        port: 8880
    },
    // Logger config (see Winston https://github.com/flatiron/winston)
    logger: [
        {
            // Name of the transport protocol
            name: 'File',
            enabled: false,
            // Transport options
            options: {
                filename: "",
                level: "debug"
            }
        },
        {
            name: 'Console',
            enabled: true,
            options: {
                level: "debug"
            }
        }
    ]
}
