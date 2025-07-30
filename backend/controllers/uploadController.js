const {google} = require("googleapis");
const path = require("path");
const fs = require("fs");

const KEYFILEPATH = path.join(__dirname, "../../hospitalstaffdb-414ad6789d92.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const drive = google.drive({version: "v3", auth});

const uploadToDrive = async (file) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ["YOUR_FOLDER_ID"],
  };

  const media = {
    mimeType: file.mimetype,  // fix here
    body: Buffer.from(file.path), // fix here
  };

  const res = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id",
  });

  await drive.permissions.create({
    fileId: res.data.id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  const publicUrl = `https://drive.google.com/uc?id=${res.data.id}`;
  return publicUrl;
};


module.exports= { uploadToDrive};