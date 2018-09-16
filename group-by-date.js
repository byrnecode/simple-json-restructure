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

        const groupedDate = groupBy(tempArr,'date')
        const groupedStock = {}
        for (d in groupedDate)
            groupedStock[d] = groupBy(groupedDate[d],'stock')

        const filtered = {}
        for (d in groupedStock){
            filtered[d] = {}
            for (s in groupedStock[d]) {
                filtered[d][s] = {
                    price: groupedStock[d][s][0].price,
                    volume: groupedStock[d][s][0].volume
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
