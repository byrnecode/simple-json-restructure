const fs = require('fs');
const dir = require('node-dir');

const groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }), 
    {},
);

const dirRawFiles = 'raw';
const combinedRaw = '_combined-raw.json';
let tempArr = [];

dir.readFiles(dirRawFiles,{
    match: /.json$/, // match only filenames with a .json extension
    exclude: /^\./ // exclude filenames that starts with a '.' (dot)
    },
    function(err, content, next) {
        if (err) throw err;
        tempArr = tempArr.concat(JSON.parse(content));
        next();
    },
    function(err, files){
        if (err) throw err;
        fs.writeFileSync(combinedRaw, JSON.stringify(tempArr,null,2));

        const groupedStock = groupBy(tempArr,'stock')
        const groupedDate = {}
        for (s in groupedStock)
            groupedDate[s] = groupBy(groupedStock[s],'date')

        const filtered = {}
        for (s in groupedDate){
            filtered[s] = {}
            for (d in groupedDate[s]) {
                filtered[s][d] = {
                    price: groupedDate[s][d][0].price,
                    volume: groupedDate[s][d][0].volume
                }
            }
        }
        // const res = []
        // for (s in filtered)
        //     res.push({
        //         [s]: filtered[s]
        //     })
        const res = [filtered];
        const outFileName = process.argv[2];

        fs.writeFileSync(outFileName, JSON.stringify(res,null,2));
    });
