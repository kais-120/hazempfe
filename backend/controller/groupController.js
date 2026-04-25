const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { Groupe, Emploi, GroupeJoueur } = require("../model");
const { Op, where } = require("sequelize");

exports.addGroup = [
    body("libelle").notEmpty().withMessage("libelle is required"),
    body("entraineur_id").notEmpty().withMessage("entraineur id is required"),
    body("type").notEmpty().withMessage("type is required"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
        try {
            const { libelle, entraineur_id,type } = req.body;
            const existliblle = await Groupe.findOne({ where: { libelle } });
            if (existliblle) {
                return res.status(422).json({ message: "libelle is already used" });
            }
            await Groupe.create({ libelle, entraineur_id,type })
            return res.status(201).json({ message: "group created" });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "server error" });
        }
    }
]

exports.getGroups = async (req, res) => {
    try {
        const groups = await Groupe.findAll({
            include: [
                {
                    model: User,
                    as: "entraineur",
                    attributes: ["nom", "prenom", "num_tel"]
                },
                {
                    model: Emploi,
                    as: "emploi"
                },
                {
                    model: GroupeJoueur,
                    as: "joueurGroupe"
                }
            ]
        });
        if (groups.length === 0) {
            return res.status(404).json({ message: "groups is empty" })
        }
        return res.json({ message: "groups found", groups })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err });
    }
}

exports.addJoueurGroupManual = [
    body("players").notEmpty().withMessage("players id is required"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }
        try {
            const { players } = req.body;
            const { id } = req.params;
            for (const player of players) {
                await GroupeJoueur.create({ joueur_id: player, groupe_id: id })
            }
            return res.status(201).json({ message: "player add in group" });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "server error" });
        }
    }
]

exports.addJoueurGroupAuto = [
    body("count").notEmpty().withMessage("count is required"),
    body("type").notEmpty().withMessage("type is required"),

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array().map(e => e.msg),
            })
        }

        try {
            const { count, type } = req.body
            const { id: groupe_id } = req.params

            const today = new Date()

            // 🔥 AGE MAP (clean)
            const ageMap = {
                U4: [4, 7],
                U8: [8, 11],
                U12: [12, 15],
                U16: [16, 99],
            }

            const [min, max] = ageMap[type]

            const minDate = new Date(
                today.getFullYear() - max,
                today.getMonth(),
                today.getDate()
            )

            const maxDate = new Date(
                today.getFullYear() - min,
                today.getMonth(),
                today.getDate()
            )

            // 🔥 GET PLAYERS
            let players = await User.findAll({
                where: {
                    role: "joueur",
                    dateNaissance: {
                        [Op.between]: [minDate, maxDate],
                    },
                },
                include: [
                    {
                        model: GroupeJoueur,
                        as: "groupeJoueur",
                        required: false,
                    },
                ],
            })

            players = players.filter(p => p.groupeJoueur.length === 0)

            if (players.length < count) {
                return res.status(400).json({
                    message: "Not enough available players",
                })
            }

            const selected = players.slice(0, Number(count))

            for (const p of selected) {
                await GroupeJoueur.create({
                    joueur_id: p.id,
                    groupe_id,
                })
            }

            return res.status(201).json({
                message: "Players assigned successfully",
                added: selected.length,
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "server error" })
        }
    },
]

exports.listJoueursGroup = async (req, res) => {
    try {
        const {id} = req.params;
        const list = await Groupe.findAll({where:{id},
            include:[
                {
                    model:GroupeJoueur,
                    as:"joueurGroupe",
                    include:[
                        {
                            model:User,
                            as:"joueurs",
                            attributes:["nom","prenom","createdAt"]
                        }
                    ]
                }
            ]
        })
        return res.json({
            message: "Players assigned successfully",
            list
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "server error" })
    }
}

exports.entraineurListGroup = async (req, res) => {
    try {
        const userId = req.userId;
        const groups = await Groupe.findAll({where:{entraineur_id:userId}})
        return res.json({
            message: "Players assigned successfully",
            groups
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "server error" })
    }
}

exports.entraineurListJoueursGroup = async (req, res) => {
    try {
        const {id} = req.params;
        const list = await Groupe.findAll({where:{id},
            include:[
                {
                    model:GroupeJoueur,
                    as:"joueurGroupe",
                    include:[
                        {
                            model:User,
                            as:"joueurs",
                            attributes:["nom","prenom","createdAt"]
                        }
                    ]
                }
            ]
        })
        return res.json({
            message: "Players assigned successfully",
            list
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "server error" })
    }
}

exports.EditJoueurGroup = async (req, res) => {
  try {
    const { deleteJoueur = [], ajouteJoueur = [],groupe_id} = req.body;

    // DELETE
    if (deleteJoueur.length > 0) {
      await GroupeJoueur.destroy({
        where: { id: deleteJoueur }
      });
    }

    // ADD
    if (ajouteJoueur.length > 0) {
      const data = ajouteJoueur.map(joueur_id => ({
        groupe_id,
        joueur_id
      }));

      await GroupeJoueur.bulkCreate(data);
    }

    return res.json({
      message: "group joueur updated",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
}
}

