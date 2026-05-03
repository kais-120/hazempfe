const ParentChild = require("./ParentChild");
const Emploi = require("./Emploi");
const Groupe = require("./Groupe");
const GroupeJoueur = require("./GroupeJoueur");
const User = require("./User");
const Absences = require("./Presence");
const PricingCategories = require("./PricingCategories");
const TestJoueur = require("./TestJoueur");
const Message = require("./Message");

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

PricingCategories.hasOne(Groupe,{
    foreignKey:"age_id",
    as:"groupePricing"
});
Groupe.belongsTo(PricingCategories,{
    foreignKey:"age_id",
    as:"pricing"
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

User.hasMany(TestJoueur,{
    foreignKey:"entraineur_id",
    as:"testerEntraineur"
});
TestJoueur.belongsTo(User,{
    foreignKey:"entraineur_id",
        as:"entraineurTester"
})

User.hasMany(TestJoueur,{
    foreignKey:"joueur_id",
    as:"testerJoueur"
});
TestJoueur.belongsTo(User,{
    foreignKey:"joueur_id",
    as:"joueurTester"
})

User.hasMany(Message,{
    foreignKey:"user_id",
    as:"message"
});
Message.belongsTo(User,{
    foreignKey:"user_id",
    as:"userMessage"
})



module.exports = {User,Groupe,GroupeJoueur,Emploi,ParentChild,Absences,PricingCategories,TestJoueur,Message}