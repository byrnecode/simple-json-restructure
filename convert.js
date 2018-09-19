const fs = require('fs');
const dir = require('node-dir');

const dirRawFiles = 'raw';
const combinedRaw = 'result/_combined-raw.json';
let tempArr = [];

dir.readFiles(dirRawFiles,{
    match: /.json$/, // match only filenames with a .json extension
    exclude: /^\./ // exclude filenames that starts with a '.' (dot)
    },
    function(err, content, next) { // read per instance/file
        if (err) throw err;
        tempArr = tempArr.concat(JSON.parse(content));
        next();
    },
    function(err, files){ // on finish reading all
        if (err) throw err;
        fs.writeFileSync(combinedRaw, JSON.stringify(tempArr,null,2));

        const final = tempArr.reduce((ret, o) => {
            const {stock, date, ...props} = o

            const items = ret[stock] || {}
            items[date] = props
            ret[stock] = items

            return ret
        }, {});

        const outFileName = process.argv[2];
        const finalArr = [final];

        fs.writeFileSync(outFileName, JSON.stringify(finalArr,null,2));
    });
