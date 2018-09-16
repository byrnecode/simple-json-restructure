# simple-json-restructure

A simple task runner in NodeJS to restructure a json file and output to a new file.

For example I have a long list of one-level json data that look like this:
**_raw.json_**

```
[
{"stock": "abc", "volume": "45434", "price": "31", "date": "10/12/12"},
{"stock": "abc", "volume": "45435", "price": "30", "date": "10/13/12"},
{"stock": "xyz", "volume": "34465", "price": "14", "date": "10/12/12"},
{"stock": "xyz", "volume": "34434", "price": "14", "date": "10/13/12"},
{"stock": "zzz", "volume": "76755", "price": "65", "date": "10/12/12"},
{"stock": "zzz", "volume": "85646", "price": "67", "date": "10/13/12"}
]
```

And convert that to this:
**_grouped-by-stock.json_**

```
[
{ 
   "abc": {
      "10/12/12": { "volume": "45434", "price": "31" },
      "10/13/12": { "volume": "45435", "price": "30" }
   },
   "xyz": {
      "10/12/12": { "volume": "34465", "price": "14" },
      "10/13/12": { "volume": "34434", "price": "14" }
   },
   "zzz": {
      "10/12/12": { "volume": "76755", "price": "65" },
      "10/13/12": { "volume": "85646", "price": "67" }
   }
}
]
```

Files to restructure should be inside the **raw** folder, and it also accepts subfolders (only accepts .json files).

### Run in terminal

example - group by stock:
```
node group-by-stock.js result/grouped-by-stock.json
```

example - group by date:
```
node group-by-date.js result/grouped-by-date.json
```

Requirements:
- Node.js
- [node-dir](https://www.npmjs.com/package/node-dir)