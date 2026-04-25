const { body, validationResult } = require("express-validator")
const User = require("../model/User");
const Attendance = require("../model/Presence");

exports.createPresence = async (req,res) => {
    try{
        const { playerListAbsence,playerListPresence,groupe } = req.body;
        const today = new Date()
        console.log(playerListAbsence,playerListPresence)
        if(playerListAbsence.length > 0){
            for(const player of playerListAbsence){
                await Attendance.create({jour:today,joueur_id:player,status:"absent",groupe_id:groupe})
            }
        }
        if(playerListPresence.length > 0){
            for(const player of playerListPresence){
                await Attendance.create({jour:today,joueur_id:player,groupe_id:groupe})
            }
        }
        return res.status(201).json({message:"the presence send"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"server error"})
    }
}

exports.verifyPresence = async (req,res) => {
    try{
        const { id } = req.params;
        const today = new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({
      where: {
        groupe_id: id,
        jour: today,
      },
    });

    if (existing) {
      return res.status(200).json({
        canAdd: false,
        message: "you already did presence today",
      });
    }
        
        return res.json({canAdd: true,message:"you can change "})
    }catch{
        return res.status(500).json({message:"server error"})
    }
}

exports.getPresence = async (req,res) => {
    try{
        const { id } = req.params;
        const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findAll({
      where: {
        groupe_id: id,
        jour: today,
      },
    });
            const absentIds = attendance
        .filter(a => a.status === "absent")
        .map(a => a.joueur_id);

        const presentIds = attendance
        .filter(a => a.status === "present")
        .map(a => a.joueur_id);

        return res.json({
        absent_ids: absentIds,
        present_ids: presentIds,
        });
        
    }catch{
        return res.status(500).json({message:"server error"})
    }
}