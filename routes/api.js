var express = require("express");
var router = express.Router();

//
const Distributors = require("../models/distributors");
const Fruits = require("../models/fruits");

//api thêm distributor
// router.post("/add-distributor", async (req, res) => {
//   try {
//     const data = req.body;
//     const newDistributors = new Distributors({
//       name: data.name,
//     });
//     const result = await newDistributors.save();
//     if (result) {
//       res.json({
//         status: 200,
//         messenger: "Thêm thành công",
//         data: result,
//       });
//     } else {
//       res.json({
//         status: 400,
//         messenger: "Lỗi, thêm không thành công",
//         data: [],
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

//api thêm fruit

// router.post("/add-fruit", async (req, res) => {
//   try {
//     const data = req.body;
//     const newfruit = new Fruits({
//       name: data.name,
//       quantity: data.quantity,
//       price: data.price,
//       status: data.status,
//       image: data.image,
//       description: data.description,
//       id_distributor: data.id_distributor,
//     });
//     const result = await newfruit.save();
//     if (result) {
//       res.json({
//         status: 200,
//         messenger: "Thêm thành công",
//         data: result,
//       });
//     } else {
//       res.json({
//         status: 400,
//         messenger: "Lỗi, thêm không thành công",
//         data: [],
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });


//get danh sách fruit
router.get("/get-list-fruit", async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  let payload;
  JWT.verify(token, SECRETKEY, (err, _payload) => {
    if (err instanceof JWT.TokenExpiredError) return res.sendStatus(401);
    if (err) return res.sendStatus(403);
    payload = _payload;
  });
  console.log(payload);
  console.log("hihi");
  try {
    const data = await Fruits.find().populate("id_distributor");
    res.json({
      status: 200,
      messenger: "Danh sách fruit",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

//*Get chi tiết Fruits (truyền param id)

// router.get("/get-fruit-by-id/:id", async (req, res) => {
//   //id param
//   try {
//     const { id } = req.params;
//     const data = await Fruits.findById(id).populate("id_distributor");
//     res.json({
//       status: 200,
//       messenger: "Danh sách fruit",
//       data: data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// *Get danh sách Fruits (danh sách trả về gồm: name, quantity, price, id_ditributor)
// nằm trong khoảng giá (query giá cao nhất, giá thấp nhất) và sắp xếp theo
// quantity (giảm dần)
// router.get("/get-list-fruit-in-price", async (req, res) => {
//   try {
//     const { price_start, price_end } = req.query;
//     const query = { price: { $gte: price_start, $lte: price_end } };
//     const data = await Fruits.find(query, "name quantity price id_distributor")
//       .populate("id_distributor")
//       .sort({ quantity: -1 })
//       .skip(0)
//       .limit(2);

//     res.json({
//       status: 200,
//       message: "Danh sách fruit",
//       data: data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// *Get danh sách Fruits (danh sách trả về gồm: name, quantity, price, id_ditributor)
// có chữ cái bắt đầu tên là A hoặc X

// router.get("/get-list-fruit-have-name-a-or-x", async (req, res) => {
//   try {
//     const query = {
//       $or: [{ name: { $regex: "T" } }, { name: { $regex: "X" } }],
//     };
//     const data = await Fruits.find(
//       query,
//       "name quantity price id_distributor"
//     ).populate("id_distributor");

//     res.json({
//       status: 200,
//       message: "Danh sách fruit",
//       data: data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

//cap nhat fruit

// router.put("/update-fruit-by-id/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = req.body;
//     const updateFruit = await Fruits.findById(id);
//     let result = null;
//     if (updateFruit) {
//       updateFruit.name = data.name ?? updateFruit.name;
//       updateFruit.quantity = data.quantity ?? updateFruit.quantity;
//       updateFruit.price = data.price ?? updateFruit.price;
//       updateFruit.status = data.status ?? updateFruit.status;
//       updateFruit.image = data.image ?? updateFruit.image;
//       updateFruit.description = data.description ?? updateFruit.description;
//       updateFruit.id_distributor =
//         data.id_distributor ?? updateFruit.id_distributor;
//       result = await updateFruit.save();
//     }
//     if (result) {
//       res.json({
//         status: 200,
//         message: "Cập nhật thành công",
//         data: result,
//       });
//     } else {
//       res.json({
//         status: 400,
//         message: "Lỗi khi cập nhật trái cây",
//         data: [],
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

//xóa
router.delete("/delete-fruit-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Fruits.findByIdAndDelete(id);

    if (result) {
      res.json({
        status: 200,
        message: "Xóa thành công",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "Lỗi, Xóa trái cây thất bại",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//img
const Upload = require("../config/common/upload");

router.post(
  "/add-fruit-with-file-image",
  Upload.array("image", 5),
  async (req, res) => {
    try {
      const data = req.body;
      const { files } = req;
      const urlsImage = files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );

      //url hình ảnh sẽ được lưu dưới dạng: http://localhost:3000/upload/filename
      const newfruit = new Fruits({
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        status: data.status,
        image: urlsImage /* Thêm url hình */,
        description: data.description,
        id_distributor: data.id_distributor,
      }); //Tạo một đối tượng mới
      const result = await newfruit.save(); //Thêm vào database
      if (result) {
        // Nếu thêm thành công result !null trả về dữ liệu
        res.json({
          status: 200,
          messenger: "Thêm thành công",
          data: result,
        });
      } else {
        // Nếu thêm không thành công result null, thông báo không thành công
        res.json({
          status: 400,
          messenger: "Lỗi, thêm không thành công",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//email

const Users = require("../models/users");
const Transporter = require("../config/common/mail");
router.post(
  "/register-send-email",
  Upload.single("avatar"),
  async (req, res) => {
    try {
      const data = req.body;
      const { file } = req;
      const newUser = Users({
        username: data.username,
        password: data.password,
        email: data.email,
        name: data.name,
        avatar: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        //url avatar http://localhost:3000/uploads/filename
      });
      const result = await newUser.save();
      if (result) {
        //Gửi mail
        const mailOptions = {
          from: "nhungpthph41518@fpt.edu.vn", //email gửi đi
          to: result.email, // email nhận
          subject: "Đăng ký thành công", //subject
          text: "Cảm ơn bạn đã đăng ký", // nội dung mail
        };
        // Nếu thêm thành công result !null trả về dữ liệu
        await Transporter.sendMail(mailOptions); // gửi mail
        res.json({
          status: 200,
          messenger: "Thêm thành công",
          data: result,
        });
      } else {
        // Nếu thêm không thành công result null, thông báo không thành công
        res.json({
          status: 400,
          messenger: "Lỗi, thêm không thành công",
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//api login

const JWT = require("jsonwebtoken");
const SECRETKEY = "FPTPOLYTECHNIC";
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username, password });
    if (user) {
      //Token người dùng sẽ sử dụng gửi lên trên header mỗi lần muốn gọi api
      const token = JWT.sign({ id: user._id }, SECRETKEY, { expiresIn: "1h" });
      //Khi token hết hạn, người dùng sẽ call 1 api khác để lấy token mới
      //Lúc này người dùng sẽ truyền refreshToken lên để nhận về 1 cặp token,refreshToken mới
      //Nếu cả 2 token đều hết hạn người dùng sẽ phải thoát app và đăng nhập lại
      const refreshToken = JWT.sign({ id: user._id }, SECRETKEY, {
        expiresIn: "1d",
      });
      //expiresIn thời gian token
      res.json({
        status: 200,
        messenger: "Đăng nhâp thành công",
        data: user,
        token: token,
        refreshToken: refreshToken,
      });
    } else {
      // Nếu thêm không thành công result null, thông báo không thành công
      res.json({
        status: 400,
        messenger: "Lỗi, đăng nhập không thành công",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
