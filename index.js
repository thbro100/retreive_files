import PocketBase from 'pocketbase';
import https from 'https'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pb = new PocketBase('https://api.despain.casa');

// you can also fetch all records at once via getFullList
const records = await pb.collection('files').getFullList({
    sort: '-created',
});


records.forEach(record => {
    const file = fs.createWriteStream("./files/" + record.file);
    const request = https.get(`https://api.despain.casa/api/files/files/${record.id}/${record.file}`, function(response) {
       response.pipe(file);
    
       // after download completed close filestream
       file.on("finish", () => {
           file.close();
           console.log("Download of " + record.file + " Completed");
       });
    });
});

