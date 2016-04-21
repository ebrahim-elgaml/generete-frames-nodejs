module.exports = {
    movies_route: /^\/(movies\/)?(.*)\.webm$/,
    timeout: 30000,
    paths: {
        source: '/home/zoobe/nas/movies'
    },
    ffmpeg: {
        //threads : 2,
        crf: 5,
        qmax: 25
    },
    server: {
        port: 8880,
    },
    logger: [
        {
            name: 'File',
            enabled: false,
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
