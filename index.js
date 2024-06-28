import { createWriteStream } from "fs";
import { Readable } from "stream";
// import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const pb = new PocketBase('https://upload.tmplnk.com');

// // you can also fetch all records at once via getFullList
// const records = await pb.collection('files').getFullList({
//     sort: '-created',
// });


let list_of_files
await fetch('https://upload.tmplnk.com/api/files/list', {method: "GET", headers:{"apikey":"A6D4aqbgcwWxMbjEHG8ubBtmNxr8fQ"}})
.then(data => (data.json()))
.then(data => list_of_files=data)
console.log(list_of_files)

process.chdir("./files");


list_of_files.forEach(async record => {
    // const file = fs.createWriteStream("./files/" + record.file);
    const request = await fetch(`https://upload.williams3dprints.com/downloadFile?id=${record.Id}`,{method: "GET", headers:{"apikey":"A6D4aqbgcwWxMbjEHG8ubBtmNxr8fQ"}})
    // const resp = await fetch(url);
    if (request.ok && request.body) {
      console.log("Writing to file:", record.Name);
      let writer = createWriteStream(record.Name);
      Readable.fromWeb(request.body).pipe(writer);
    }
    //    response.pipe(file);
    
       // after download completed close filestream
})

