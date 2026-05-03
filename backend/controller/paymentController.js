const { body } = require("express-validator");
const { User, ParentChild } = require("../model");
const Payment = require("../model/Payment");
const PricingCategories = require("../model/PricingCategories");
const { Op, fn, col } = require("sequelize");
const Subscriptions = require("../model/Subscriptions");

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

exports.paymentVerify = async (req, res) => {
 try {
    const userId = req.userId

    const unpaidSubs = await Subscriptions.findAll({
      where: {
        user_id: userId,
        status: "unpaid"
      }
    })

    const totalDebt = unpaidSubs.reduce((sum, sub) => {
      return sum + sub.amount
    }, 0)

    return res.status(200).json({
      paid: totalDebt === 0,
      totalDebt: Math.round(totalDebt * 100) / 100,
      unpaidMonths: unpaidSubs.map(sub => ({
        month: sub.month,
        amount: sub.amount
      }))
    })} catch (err) {
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
    // ✅ correct local month (NO UTC BUG)
    const now = new Date();

    const currentMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

    // 🟢 get all players
    const users = await User.findAll({
      where: { role: "joueur" },
    });

    const result = await Promise.all(
      users.map(async (user) => {

        // 🔹 current month subscription
        const currentSub = await Subscriptions.findOne({
          where: {
            user_id: user.id,
            month: currentMonth,
          },
        });

        // 🔹 total unpaid debt
        const debt = await Subscriptions.findOne({
          where: {
            user_id: user.id,
            status: "unpaid",
          },
          attributes: [[fn("SUM", col("amount")), "totalDebt"]],
          raw: true,
        });

        const totalDebt = parseFloat(debt?.totalDebt) || 0;

        return {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,

          paidThisMonth: currentSub?.status === "paid",
          totalDebt: Math.round(totalDebt * 100) / 100,
        };
      })
    );

    return res.json({
      currentMonth,
      total: result.length,
      users: result,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};

exports.paymentParent = async (req, res) => {
  try {
    const parentId = req.userId;

    // 🟢 check parent exists
    const parent = await User.findByPk(parentId);
    if (!parent) {
      return res.status(404).json({ message: "user not found" });
    }

    // 🟢 get children (players)
    const children = await ParentChild.findAll({
      where: { parent_id: parentId },
    });

    const childrenIds = children.map((c) => c.joueur_id);

    const unpaidSubs = await Subscriptions.findAll({
      where: {
        user_id: {
          [Op.in]: childrenIds,
        },
        status: "unpaid",
      },
    });

    const totalDebt = unpaidSubs.reduce((sum, sub) => {
      return sum + Number(sub.amount);
    }, 0);

    const grouped = await Promise.all(
  childrenIds.map(async (id) => {
    const user = await User.findByPk(id);

    const subs = unpaidSubs.filter((s) => s.user_id === id);

    return {
      childId: id,
      nom: user?.nom,
      prenom: user?.prenom,

      unpaidMonths: subs.map((s) => ({
        month: s.month,
        amount: s.amount,
      })),

      childDebt: subs.reduce(
        (sum, s) => sum + Number(s.amount),
        0
      ),
    };
  })
);

    return res.status(200).json({
      parentId,
      paid: totalDebt === 0,
      totalDebt: Math.round(totalDebt * 100) / 100,
      children: grouped,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};