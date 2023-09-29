const whiteList = ['https://www.mysite.com', 'http://localhost:4000', 'http://127.0.0.1:5500', 'http://172.20.10.3:3000',  'http://localhost:3000']

const options = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else {
            callback( new Error('you do not have permission to access this page'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = options