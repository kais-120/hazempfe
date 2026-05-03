const { body, validationResult } = require("express-validator");
const { User, ParentChild } = require("../model");
const TestJoueur = require("../model/TestJoueur");

exports.createTest = [
    body("entraineur_id").notEmpty().withMessage("entraineur id is required"),
    body("date_test").notEmpty().withMessage("date is required"),
    body("time_test").notEmpty().withMessage("time is required"),
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
        try{
        const {joueurs_id,entraineur_id,date_test,time_test} = req.body;
        
        const entraineur= await User.findByPk(entraineur_id);
        if(!entraineur){
            return res.status(404).json({message:"users not found"});
        }
        if(joueurs_id.length > 0){

            for(const id of joueurs_id){
                await TestJoueur.create({joueur_id:id,entraineur_id,date_test,time_test});
            }
        }
        return res.json({message:"test created"});

        
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"});
    }
}
]

exports.getTesting = async(req,res) => {
    try{
        const userId = req.userId
        const tests = await TestJoueur.findAll({
            include:[
                {
                    model:User,
                    as:"entraineurTester",
                    attributes:["nom","prenom"]
                },
                {
                    model:User,
                    as:"joueurTester",
                    attributes:["nom","prenom"]
                }
            ]
        })
        return res.json({message:"testing",tests});

    }catch{
        return res.status(500).json({message:"server error"});
    }
}

exports.getTestEntraineur = async (req, res) => {
  try {
    const userId = req.userId

    const tests = await TestJoueur.findAll({
      where: { entraineur_id: userId }
    })

    const grouped = {}

    tests.forEach(t => {
      const key = `${t.date_test}_${t.time_test}`

      if (!grouped[key]) {
        grouped[key] = {
          date_test: t.date_test,
          time_test: t.time_test,
          tests: []
        }
      }

      grouped[key].tests.push(t)
    })

    const result = Object.values(grouped)

    return res.json({
      message: "testing",
      test: result
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "server error" })
  }
}

exports.updateTestJoueur = [
  body("joueurs").isArray().withMessage("joueurs must be an array"),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array().map(err => err.msg)
      })
    }

    try {
      const { joueurs } = req.body

      for (const j of joueurs) {
        const test = await TestJoueur.findByPk(j.id)

        if (!test) continue

       const finalStatus = j.status === "absent" ? "absent" : "done"

            await test.update({ status: finalStatus })

            if (j.status !== "absent") {
                await User.update(
                { joueurLevel: j.status },
                { where: { id: test.joueur_id } }
                )
            }
            }

      return res.json({ message: "Tests updated successfully" })

    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "server error" })
    }
  }
]

exports.listJoueur = [
    body("date_test").notEmpty().withMessage("test time is required"),
    body("time_test").notEmpty().withMessage("test date is required"),
    async(req,res) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
        try{
        const {date_test,time_test} = req.body;
        const userId = req.userId
        const Joueurs = await TestJoueur.findAll({
            where :{
                entraineur_id:userId,
                date_test,
                time_test
            },
            include:[
                {
                    model:User,
                    as:"joueurTester",
                    attributes:["id","nom","prenom"]
                }
            ]
        })
       
        return res.json({message:"list joueurs",Joueurs});

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"});
    }
}
]

exports.joueurTesting = async (req, res) => {
  try {
    const userId = req.userId

    const test = await TestJoueur.findByPk(userId,{
        where : {status:"programmé"}
    })
    return res.json({
      message: "testing user",
      test: test
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "server error" })
  }
}

exports.parentTesting = async (req, res) => {
  try {
    const {id} = req.params;
    const userId = req.userId
    const test = await TestJoueur.findByPk(id,{
        where : {status:"programmé"}
    })
    const parent = await ParentChild.findOne({where :{
        parent_id:userId
    }})
    if(parent.joueur_id != id){
        return res.status(403).json({ message: "you don't have access to this child" })
    }   
    return res.json({
      message: "testing user",
      test: test
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "server error" })
  }
}
