const { User, Groupe, GroupeJoueur, ParentChild } = require("../model");
const Emploi = require("../model/Emploi");

exports.addEmploi = [
    async (req,res) => {
        try{
        const {emploi} = req.body;
        const {id} = req.params;
        for(const e of emploi){
            const start = new Date(e.start)
            const end = new Date(e.end)
            const jour = start.getDay() 
            const heure_debut = start.toTimeString().slice(0,5)
            const heure_fin = end.toTimeString().slice(0,5)
            await Emploi.create({titre:e.title,jour,heure_debut,heure_fin,groupe_id:id})
    }
        return res.status(200).json({ message: "emploi created"});
    }catch{
        return res.status(500).json({message:"error server"});
    }

}
]

exports.getJoueurEmploi =  async (req,res) => {
        try{
        const userId = req.userId;
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({ message: "user not found"});
        }
        const emploi = await Groupe.findAll({
            include:[
                {
                    model:GroupeJoueur,
                    as:"joueurGroupe",
                    where:{joueur_id:userId},
                },
                {
                    model:Emploi,
                    as:"emploi"
                    
                },
                {
                    model:User,
                    as:"entraineur",
                    attributes:["nom","prenom"]
                }
            ]
        });
        if(emploi.length === 0){
            return res.status(404).json({ message: "you don't have group"});
        }
        return res.status(200).json({ message: "emploi",emploi});
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error server"});
    }

}

exports.getEntraineurEmploi =  async (req,res) => {
        try{
        const userId = req.userId;
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({ message: "user not found"});
        }
        const emploi = await Groupe.findAll({
            where: {entraineur_id:userId},
            include:[
                {
                    model:User,
                    as:"entraineur",
                    attributes:["nom","prenom"]
                },
                {
                    model:Emploi,
                    as:"emploi"
                    
                }
            ]
        });
        if(emploi.length === 0){
            return res.status(404).json({ message: "you don't have group"});
        }
        return res.status(200).json({ message: "emploi",emploi});
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error server"});
    }

}

exports.getChildEmploi =  async (req,res) => {
        try{
        const userId = req.userId;
        const {id} = req.params;
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({ message: "user not found"});
        }
        const childParent = await ParentChild.findOne({
            where:{
                parent_id:userId,
                joueur_id:id
            }
        })
        if(!childParent){
            return res.status(403).json({ message: "Forbidden"});
        }
        const emploi = await Groupe.findAll({
            where: {entraineur_id:userId},
            include:[
                {
                    model:User,
                    as:"entraineur",
                    attributes:["nom","prenom"]
                },
                {
                    model:Emploi,
                    as:"emploi"
                    
                }
            ]
        });
        if(emploi.length === 0){
            return res.status(404).json({ message: "you don't have group"});
        }
        return res.status(200).json({ message: "emploi",emploi});
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error server"});
    }

}
