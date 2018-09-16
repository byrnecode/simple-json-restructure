const fs = require('fs')

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

const inFileName = process.argv[2]
const outFileName = process.argv[3]

const json = JSON.parse(fs.readFileSync(inFileName, 'utf8'));
const groupedStock = groupBy(json,'stock')
const groupedDate = {}
for(s in groupedStock)
    groupedDate[s] = groupBy(groupedStock[s],'date')

const filtered = {}
for(s in groupedDate){
    filtered[s] = {}
    for (d in groupedDate[s]) {
        filtered[s][d] = {
            price: groupedDate[s][d][0].price,
            volume: groupedDate[s][d][0].volume
        }
    }
}

const res = []
for(s in filtered)
    res.push({
        [s]: filtered[s]
    })


fs.writeFileSync(outFileName, JSON.stringify(res,null,2));