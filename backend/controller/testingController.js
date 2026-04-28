const { body, validationResult } = require("express-validator");
const { User } = require("../model");
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

exports.getTestEntraineur = async(req,res) => {
    try{
        const userId = req.userId
        const test = await TestJoueur.findAll({entraineur_id:userId})
        return res.json({message:"testing",test});

    }catch{
        return res.status(500).json({message:"server error"});
    }
}

exports.updateTestJoueur = [
    body("level").notEmpty().withMessage("level is required"),
    body("status").notEmpty().withMessage("status is required"),
    async(req,res) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
        try{
        const {level,status} = req.body;
        const {id} = req.params
        const userId = req.userId
        const test = await TestJoueur.findByPk(id)
        test.update({status});
        await User.update({level,
            while:{id:test.joueur_id}
        })
        return res.json({message:"testing is updated"});

    }catch{
        return res.status(500).json({message:"server error"});
    }
}
]