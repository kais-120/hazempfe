const { body } = require("express-validator");
const { User } = require("../model");
const Payment = require("../model/Payment");
const PricingCategories = require("../model/PricingCategories");
const { Op } = require("sequelize");

exports.createPayment = [
body("amount").notEmpty().withMessage("amount is required")
    ,async (req,res) => {

}
]

const getAge = (dateNaissance) => {
  const today = new Date();
  const birth = new Date(dateNaissance);

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

exports.DatePaymentVerify = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const today = new Date();

    // 🧠 age + category
    const age = getAge(user.dateNaissance);

    const category = await PricingCategories.findOne({
      where: {
        min_age: { [Op.lte]: age },
        max_age: { [Op.gte]: age },
      },
    });

    if (!category) {
      return res.status(404).json({ message: "no category found" });
    }

    const fullPrice = category.price;

    // 📅 check payment this month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const payment = await Payment.findOne({
      where: {
        joueur_id: userId,
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        status: "paid",
      },
    });

    // 🔥 IF already paid
    if (payment) {
      return res.json({
        libelle: category.libelle,
        fullPrice,
        priceThisMonth: 0,
        alreadyPaid: true,
        age,
      });
    }

    // 💰 IF not paid → calculate pro-rata
    const daysInMonth = endOfMonth.getDate();
    const remainingDays = daysInMonth - today.getDate() + 1;

    const dailyPrice = fullPrice / daysInMonth;
    const priceThisMonth = Number((dailyPrice * remainingDays).toFixed(2));

    return res.json({
      libelle: category.libelle,
      fullPrice,
      priceThisMonth,
      remainingDays,
      alreadyPaid: false,
      age,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};

exports.paymentHistory = async (req,res) => {
  try{
    const userId = req.userId
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

   const payment = await Payment.findAll({where:{joueur_id:userId,
    status:{
        [Op.not]:null
    }
   }})

    return res.json({
      payment
    });
}
    catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
}

exports.getPlayersPaymentStatus = async (req, res) => {
  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );

    // 🟢 فقط joueurs
    const users = await User.findAll({
      where: {
        role: "joueur",
      },
    });

    const result = await Promise.all(
      users.map(async (user) => {

        const payment = await Payment.findOne({
          where: {
            joueur_id: user.id,
            date: {
              [Op.between]: [startOfMonth, endOfMonth],
            },
            status: "paid",
          },
        });

        return {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          paid: payment ? true : false,
          paymentDate: payment?.payment_date || null,
        };
      })
    );

    return res.json({
      total: result.length,
      users: result,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};

