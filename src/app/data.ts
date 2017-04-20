import { Role, Status } from "./model";

export const statuses: Status[] = [
    {
        id: 0,
        actionName: "Rendre amoureux",
        deleteActionName: "Ne plus être amoureux",
        icon: "favorite",
        class: "red",
        noCompatibleWith: [],
        name: "Amoureux"
    },
    {
        id: 1,
        actionName: "Donner potion noire",
        deleteActionName: null,
        icon: "thumb_down",
        class: "black",
        noCompatibleWith: [ 2 ],
        name: "Potion noire non utilisée"
    },
    {
        id: 2,
        actionName: "Utiliser potion noire",
        deleteActionName: null,
        icon: "thumb_down",
        class: "inactive",
        noCompatibleWith: [ 1 ],
        name: "Potion noire utilisée"
    },
    {
        id: 3,
        actionName: "Donner potion blanche",
        deleteActionName: null,
        icon: "thumb_up",
        class: "green",
        noCompatibleWith: [ 4 ],
        name: "Potion blanche non utilisée"
    },
    {
        id: 4,
        actionName: "Utiliser potion blanche",
        deleteActionName: null,
        icon: "thumb_up",
        class: "inactive",
        noCompatibleWith: [ 3 ],
        name: "Potion blanche utilisée"
    },
    {
        id: 5,
        actionName: "Tuer à moitié",
        deleteActionName: "Ne plus être à moitié mort",
        icon: "star_half",
        class: "",
        noCompatibleWith: [],
        name: "A moitié mort"
    },
    {
        id: 6,
        actionName: "Plus de pouvoir",
        deleteActionName: "Ne plus priver de pouvoirs",
        icon: "highlight_off",
        class: "",
        noCompatibleWith: [],
        name: "Plus de pouvoir"
    },
    {
        id: 7,
        actionName: "Transformer en LG",
        deleteActionName: "Ne plus être un LG",
        icon: "battery_alert",
        class: "red",
        noCompatibleWith: [],
        name: "Transformé en LG"
    },
    {
        id: 8,
        actionName: "Rajouter au groupe 1",
        deleteActionName: "Retirer du groupe 1",
        icon: "swap_horiz",
        class: "",
        noCompatibleWith: [ 9 ],
        name: "Groupe 1"
    },
    {
        id: 9,
        actionName: "Rajouter au groupe 2",
        deleteActionName: "Retirer du groupe 2",
        icon: "swap_vert",
        class: "",
        noCompatibleWith: [ 8 ],
        name: "Groupe 2"
    },
    {
        id: 10,
        actionName: "Désigné par le corbeau",
        deleteActionName: "Ne plus être désigné par le corbeau",
        icon: "email",
        class: "",
        noCompatibleWith: [],
        name: "Désigné par le corbeau"
    },
    {
        id: 11,
        actionName: "Désigner comme mentor",
        deleteActionName: "Ne plus être mentor",
        icon: "group",
        class: "",
        noCompatibleWith: [],
        name: "Mentor"
    },
    {
        id: 12,
        actionName: "Tué par le village",
        deleteActionName: "Ne plus être tué par le village",
        icon: "alarm_off",
        class: "",
        noCompatibleWith: [],
        name: "Tué par le village"
    },
    {
        id: 13,
        actionName: "Envouter",
        deleteActionName: "Ne plus être envouté",
        icon: "pan_tool",
        class: "",
        noCompatibleWith: [],
        name: "Envouté"
    }
]

export const roles: Role[] = [
    {
        "id": 0,
        "name": "Abominable Sectaire",
        "image": "assets/cards/abominable_sectaire.png",
        "ownStatusIds": [],
        "othersStatusIds": [ 8, 9 ],
        "getInstructions": (i: number) => {
            if (i === 1) {
                return { priority: 10, instructions: [
                    "Voici comment le sectaire divise le village"
                ]};
            }
            return { priority: 0, instructions: [] };
        }
    },
    {
        "id": 1,
        "name": "Ancien",
        "image": "assets/cards/ancien.png",
        "ownStatusIds": [ 5 ],
        "othersStatusIds": [ 6 ]
    },
    {
        "id": 2,
        "name": "Ange",
        "image": "assets/cards/ange.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 3,
        "name": "Bouc émissaire",
        "image": "assets/cards/bouc_emissaire.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 4,
        "name": "Chamane",
        "image": "assets/cards/chamane.png",
        "ownStatusIds": [ 6 ],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            return {
                priority: 210,
                instructions: [
                    "Le chamane se réveille",
                    "Souhaites tu faire une séance. Si oui, désigne moi ta cible et une carte",
                    "Le chamane se rendort"
                ]
            }
        }
    },
    {
        "id": 5,
        "name": "Chasseur",
        "image": "assets/cards/chasseur.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 6,
        "name": "Chevalier",
        "image": "assets/cards/chevalier.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 7,
        "name": "Chien-Loup",
        "image": "assets/cards/chien_loup.png",
        "ownStatusIds": [ 7 ],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            if (i === 1) {
                return {
                    priority: 30,
                    instructions: [
                        "Le chien loup se réveille",
                        "Le chien loup choisit son camp",
                        "Le chien loup se rendort"
                    ]
                }
            }

            return { priority: 0, instructions: [] };
        }
    },
    {
        "id": 8,
        "name": "Comédien",
        "image": "assets/cards/comedien.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 9,
        "name": "Corbeau",
        "image": "assets/cards/corbeau.png",
        "ownStatusIds": [],
        "othersStatusIds": [ 10 ],
        "getInstructions": (i: number) => {
            return {
                priority: 200,
                instructions: [
                    "Le corbeau se réveille",
                    "Désigne moi une cible",
                    "Le corbeau se rendort"
                ]
            }
        }
    },
    {
        "id": 10,
        "name": "Cupidon",
        "image": "assets/cards/cupidon.png",
        "ownStatusIds": [],
        "othersStatusIds": [ 0 ],
        "getInstructions": (i: number) => {
            if (i === 1) {
                return {
                    priority: 50,
                    instructions: [
                        "Cupidon se réveille",
                        "Cupidon choisit les amoureux",
                        "Il faut taper sur les épaules des amoureux",
                        "Cupidon se rendort",
                        "Les amoureux se réveillent",
                        "Les amoureux se rendorment"
                    ]
                };
            }

            return { priority: 0, instructions: [] };
        }
    },
    {
        "id": 11,
        "name": "Deux soeurs",
        "image": "assets/cards/deux_soeurs.png",
        "ownStatusIds": [],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            return {
                priority: 90,
                instructions: [
                    "Les deux soeurs se réveillent",
                    "Les deux soeurs se rendorment"
                ]
            }
        }
    },
    {
        "id": 12,
        "name": "Enfant sauvage",
        "image": "assets/cards/enfant_sauvage.png",
        "ownStatusIds": [ 7 ],
        "othersStatusIds": [ 11 ],
        "getInstructions": (i: number) => {
            if (i === 1) {
                return {
                    priority: 40,
                    instructions: [
                        "L'enfant sauvage se réveille",
                        "L'enfant sauvage choisit son mentor",
                        "L'enfant sauvage se rendort"
                    ]
                }
            }

            return { priority: 0, instructions: [] };
        }
    },
    {
        "id": 13,
        "name": "Grand méchant loup",
        "image": "assets/cards/grand_mechant_loup.png",
        "ownStatusIds": [ 6 ],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            return {
                priority: 160,
                instructions: [
                    "Grand méchant loup se réveille",
                    "Grand méchant loup, désigne une cible 2",
                    "Grand méchant loup se rendort"
                ]
            }
        }
    },
    {
        "id": 14,
        "name": "Idiot du village",
        "image": "assets/cards/idiot_village.png",
        "ownStatusIds": [ 12 ],
        "othersStatusIds": []
    },
    {
        "id": 15,
        "name": "Infame père des loups",
        "image": "assets/cards/infame_pere_loups.png",
        "ownStatusIds": [ 6 ],
        "othersStatusIds": [ 7 ],
        "getInstructions": (i: number) => {
            return {
                priority: 150,
                instructions: [
                    "Le père des loups se réveille",
                    "Veux tu convertir la cible du jour?",
                    "Je vais toucher l'épaule de la personne converti",
                    "La personne se réveille"
                ]
            }
        }
    },
    {
        "id": 16,
        "name": "Joueur de flûte",
        "image": "assets/cards/joueur_flute.png",
        "ownStatusIds": [],
        "othersStatusIds": [ 13 ],
        "getInstructions": (i: number) => {
            return {
                priority: 190,
                instructions: [
                    "Le joueur de flute se réveille",
                    "Choisi 1 ou 2 personnes",
                    "Taper sur l'épaule des personnes",
                    "Le joueur de flute se rendort",
                    "Les envoutés se réveillent",
                    "Les envoutés se rendorment"
                ]
            }
        }
        
    },
    {
        "id": 17,
        "name": "Juge bègue",
        "image": "assets/cards/juge_begue.png",
        "ownStatusIds": [ 6 ],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            if (i === 1) {
                return { 
                priority: 25, 
                instructions: [
                    "Le juge bègue se réveille",
                    "Le juge bègue donne son signe",
                    "Le juge bègue se rendort"
                ]
            };
            }
            
        }
    },
    {
        "id": 18,
        "name": "Loup garou blanc",
        "image": "assets/cards/loup_garou_blanc.png",
        "ownStatusIds": [],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            if (i % 2 === 0) {
                return {
                    priority: 170,
                    instructions: [
                        "Le loup garou blanc se réveille",
                        "Veux tu tuer un de tes compères? Lequel?",
                        "Le loup garou blanc se rendort"
                    ]
                }
            } else {
                return { priority: 0, instructions: [] };
            }
        }
    },
    {
        "id": 19,
        "name": "Loup garou",
        "image": "assets/cards/loup_garou.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 20,
        "name": "Montreur d'ours",
        "image": "assets/cards/montreur_ours.png",
        "ownStatusIds": [],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            return {
                priority: 70,
                instructions: [
                    "Vérifier sur l'ours grogne"
                ]
            }
        }
    },
    {
        "id": 21,
        "name": "Petite fille",
        "image": "assets/cards/petite_fille.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 22,
        "name": "Pyromane",
        "image": "assets/cards/pyromane.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 23,
        "name": "Renard",
        "image": "assets/cards/renard.png",
        "ownStatusIds": [ 6 ],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            return {
                priority: 110,
                instructions: [
                    "Le renard se réveille",
                    "Le renard désigne trois personnes",
                    "Le renard se rendort"
                ]
            }
        }
    },
    {
        "id": 24,
        "name": "Salvateur",
        "image": "assets/cards/salvateur.png",
        "ownStatusIds": [],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            return {
                priority: 120,
                instructions: [
                    "Le salvateur se réveille",
                    "Salvateur désigne moi la personne que tu veux protéger",
                    "Le salvateur se rendort"
                ]
            }
        }
    },
    {
        "id": 25,
        "name": "Servante",
        "image": "assets/cards/servante.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 26,
        "name": "Simple Villageois",
        "image": "assets/cards/simple_villageois.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 27,
        "name": "Sorcière",
        "image": "assets/cards/sorciere.png",
        "ownStatusIds": [ 1, 2, 3, 4 ],
        "othersStatusIds": [],
        "initialStatusIds": [ 1, 3 ],
        "getInstructions": (i: number) => {
            return { 
                priority: 180, 
                instructions: [
                    "La sorcière se réveille",
                    "Sorcière voici la cible des loups-garoux (ne pas montrer si potion blanche déjà utilisé ou si salv ou si ancien)",
                    "Souhaites-tu utiliser ta potion de vie?",
                    "Souhaites-tu utiliser ta potion de mort?",
                    "Qui souhaites-tu tuer?",
                    "Sorcière rendort toi"
                ]
            };
        }
    },
    {
        "id": 28,
        "name": "Trois frères",
        "image": "assets/cards/trois_freres.png",
        "ownStatusIds": [],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            return {
                priority: 100,
                instructions: [
                    "Les trois frères se réveillent",
                    "Les trois frères se rendorment"
                ]
            }
        }
    },
    {
        "id": 29,
        "name": "Voleur",
        "image": "assets/cards/voleur.png",
        "ownStatusIds": [],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            if (i === 1) {
                return { priority: 20, instructions: [
                    "Le voleur se réveille",
                    "Voleur choisit une carte",
                    "Le voleur se rendort"
                ]};
            }
            return { priority: 0, instructions: [] };
        }
    },
    {
        "id": 30,
        "name": "Voyante",
        "image": "assets/cards/voyante.jpg",
        "ownStatusIds": [],
        "othersStatusIds": [],
        "getInstructions": (i: number) => {
            return {
                priority: 130,
                instructions: [
                    "La voyante se réveille",
                    "Voyante montre moi la personne que tu veux connaitre",
                    "La voyante se rendort"
                ]
            }
        }
    }
];