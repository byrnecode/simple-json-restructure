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
const groupedDate = groupBy(json,'date')
const groupedStock = {}
for(d in groupedDate)
    groupedStock[d] = groupBy(groupedDate[d],'stock')

const filtered = {}
for(d in groupedStock){
    filtered[d] = {}
    for (s in groupedStock[d]) {
        filtered[d][s] = {
            price: groupedStock[d][s][0].price,
            volume: groupedStock[d][s][0].volume
        }
    }
}

const res = []
for(d in filtered)
    res.push({
        [d]: filtered[d]
    })


fs.writeFileSync(outFileName, JSON.stringify(res,null,2));