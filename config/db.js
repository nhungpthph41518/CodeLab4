const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const local = "mongodb://localhost:27017/MyDataBase";
const atlas =
  'mongodb+srv://nhungpth:nhungpthph41518@atlascluster.wgpzrhs.mongodb.net/lab3"';

const connect = async () => {
  try {
    await mongoose.connect(local);
    console.log("connect success");
  } catch (error) {
    console.log(error);
    console.log("connect fail");
  }
};

module.exports = { connect };
