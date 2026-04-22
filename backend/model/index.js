const Groupe = require("./Groupe");
const GroupeJoueur = require("./GroupeJoueur");
const User = require("./User");

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
    as:"joueurgGroupe"
});
GroupeJoueur.belongsTo(Groupe,{
    foreignKey:"groupe_id",
    as:"groupeJoueur"
})


module.exports = {User,Groupe,GroupeJoueur}