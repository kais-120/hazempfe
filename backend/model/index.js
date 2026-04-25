const ParentChild = require("./ParentChild");
const Emploi = require("./Emploi");
const Groupe = require("./Groupe");
const GroupeJoueur = require("./GroupeJoueur");
const User = require("./User");
const Absences = require("./Presence");

User.hasMany(Groupe,{
    foreignKey:"entraineur_id",
    as:"groupe"
});
Groupe.belongsTo(User,{
    foreignKey:"entraineur_id",
    as:"entraineur"
})

User.hasMany(GroupeJoueur,{
    foreignKey:"joueur_id",
    as:"groupeJoueur"
});
GroupeJoueur.belongsTo(User,{
    foreignKey:"joueur_id",
    as:"joueurs"
})

Groupe.hasMany(GroupeJoueur,{
    foreignKey:"groupe_id",
    as:"joueurGroupe"
});
GroupeJoueur.belongsTo(Groupe,{
    foreignKey:"groupe_id",
    as:"groupeJoueur"
})

Groupe.hasMany(Emploi,{
    foreignKey:"groupe_id",
    as:"emploi"
});
Emploi.belongsTo(Groupe,{
    foreignKey:"groupe_id",
    as:"groupeEmploi"
})




User.hasMany(ParentChild,{
    foreignKey:"parent_id",
    as:"parent"
});
ParentChild.belongsTo(User,{
    foreignKey:"parent_id",
    as:"parentUser"
})

User.hasMany(ParentChild,{
    foreignKey:"joueur_id",
    as:"parentJoueur"
});
ParentChild.belongsTo(User,{
    foreignKey:"joueur_id",
    as:"joueurParent"
})

User.hasMany(Absences,{
    foreignKey:"joueur_id",
    as:"absences"
});
Absences.belongsTo(User,{
    foreignKey:"joueur_id",
    as:"joueurAbsences"
})

Groupe.hasMany(Absences,{
    foreignKey:"groupe_id",
    as:"absencesGroupe"
});
Absences.belongsTo(User,{
    foreignKey:"joueur_id",
    as:"groupeAbsences"
})



module.exports = {User,Groupe,GroupeJoueur,Emploi,ParentChild,Absences}