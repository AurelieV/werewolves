import { Role } from "./model";

export const roles: Role[] = [
    {
        "id": 0,
        "name": "Abominable Sectaire",
        "image": "assets/cards/abominable_sectaire.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 1,
        "name": "Ancien",
        "image": "assets/cards/ancien.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 2,
        "name": "Ange",
        "image": "assets/cards/ange.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 3,
        "name": "Bouc émissaire",
        "image": "assets/cards/bouc_emissaire.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 4,
        "name": "Chamane",
        "image": "assets/cards/chamane.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 5,
        "name": "Chasseur",
        "image": "assets/cards/chasseur.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 6,
        "name": "Chevalier",
        "image": "assets/cards/chevalier.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 7,
        "name": "Chien-Loup",
        "image": "assets/cards/chien_loup.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 8,
        "name": "Comédien",
        "image": "assets/cards/comedien.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 9,
        "name": "Corbeau",
        "image": "assets/cards/corbeau.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 10,
        "name": "Cupidon",
        "image": "assets/cards/cupidon.png",
        "ownStatus": [],
        "othersStatus": [
            {
                "name": "Amoureux",
                "values": [
                    {
                        "name": "Amoureux",
                        "actionName": "Rendre amoureux",
                        "iconValue": {
                            "icon": "favorite",
                            "class": "red"
                        }
                    },
                    {
                        "name": null,
                        "actionName": "Ne plus être amoureux",
                        "iconValue": null
                    }
                ]
            }
        ],
    },
    {
        "id": 11,
        "name": "Deux soeurs",
        "image": "assets/cards/deux_soeurs.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 12,
        "name": "Enfant sauvage",
        "image": "assets/cards/enfant_sauvage.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 13,
        "name": "Garde champètre",
        "image": "assets/cards/garde_champetre.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 14,
        "name": "Grand méchant loup",
        "image": "assets/cards/grand_mechant_loup.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 15,
        "name": "Idiot du village",
        "image": "assets/cards/idiot_village.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 16,
        "name": "Infame père des loups",
        "image": "assets/cards/infame_pere_loups.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 17,
        "name": "Joueur de flûte",
        "image": "assets/cards/joueur_flute.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 18,
        "name": "Juge bègue",
        "image": "assets/cards/juge_begue.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 19,
        "name": "Loup garou blanc",
        "image": "assets/cards/loup_garou_blanc.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 20,
        "name": "Loup garou",
        "image": "assets/cards/loup_garou.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 21,
        "name": "Montreur d'ours",
        "image": "assets/cards/montreur_ours.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 22,
        "name": "Petite fille",
        "image": "assets/cards/petite_fille.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 23,
        "name": "Pyromane",
        "image": "assets/cards/pyromane.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 24,
        "name": "Renard",
        "image": "assets/cards/renard.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 25,
        "name": "Salvateur",
        "image": "assets/cards/salvateur.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 26,
        "name": "Servante",
        "image": "assets/cards/servante.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 27,
        "name": "Simple Villageois",
        "image": "assets/cards/simple_villageois.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 28,
        "name": "Sorcière",
        "image": "assets/cards/sorciere.png",
        "ownStatus": [
            {
                "name": "Potion noire",
                "values": [
                    {
                        "name": "Potion noire non utilisée",
                        "actionName": "Annuler utilisation potion noire",
                        "iconValue": {
                            "icon": "thumb_down",
                            "class": "black",
                        }
                    },
                    {
                        "name": "Potion noire utilisée",
                        "actionName": "Utiliser potion noire",
                        "iconValue": {
                            "icon": "thumb_down",
                            "class": "inactive"
                        }
                    }
                ]
            },
            {
                "name": "Potion blanche",
                "values": [
                    {
                        "name": "Potion blanche non utilisée",
                        "actionName": "Annuler utilisation potion blanche",
                        "iconValue": {
                            "icon": "thumb_up",
                            "class": "green"
                        }
                    },
                    {
                        "name": "Potion blanche utilisée",
                        "actionName": "Utiliser potion blanche",
                        "iconValue": {
                            "icon": "thumb_up",
                            "class": "inactive"
                        }
                    }
                ]
            }
        ],
        "othersStatus": []
    },
    {
        "id": 29,
        "name": "Trois frères",
        "image": "assets/cards/trois_freres.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 30,
        "name": "Voleur",
        "image": "assets/cards/voleur.png",
        "ownStatus": [],
        "othersStatus": []
    },
    {
        "id": 31,
        "name": "Voyante",
        "image": "assets/cards/voyante.jpg",
        "ownStatus": [],
        "othersStatus": []
    }
];