const express = require("express");

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server dang chay cong ${port}`);
});

const uri =
  "mongodb+srv://nhungpth:nhungpthph41518@atlascluster.wgpzrhs.mongodb.net/md18309";

const spModel = require("./sanphamModel");
const mongoose = require("mongoose");

app.get("/", async (req, res) => {
  await mongoose.connect(uri);

  let sanphams = await spModel.find();

  console.log(sanphams);

  res.send(sanphams);
});

app.get("/add_sp", async (req, res) => {
  await mongoose.connect(uri);

  let sanpham = {
    ten: "Sanpham 4",
    gia: 500,
    soluong: 10,
    tonkho: false,
  };

  let kq = await spModel.create(sanpham);

  console.log(kq);

  let sanphams = await spModel.find();

  res.send(sanphams);
});

app.get('/xoa/:id', async (req, res) => {
  await mongoose.connect(uri);

  let id = req.params.id;
  let kq = await mongoose.deleteOne
   ({_id: id});

   console.log(kq);
   res

  
})







