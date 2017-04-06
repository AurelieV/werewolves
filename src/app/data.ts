import { Role, Status } from "./model";

export const statuses: Status[] = [
    {
        id: 0,
        actionName: "Rendre amoureux",
        deleteActionName: "Ne plus être amoureux",
        icon: "favorite",
        class: "red",
        noCompatibleWith: []
    },
    {
        id: 1,
        actionName: "Donner potion noire",
        deleteActionName: null,
        icon: "thumb_down",
        class: "black",
        noCompatibleWith: [ 2 ]
    },
    {
        id: 2,
        actionName: "Utiliser potion noire",
        deleteActionName: null,
        icon: "thumb_down",
        class: "inactive",
        noCompatibleWith: [ 1 ]
    },
    {
        id: 3,
        actionName: "Donner potion blanche",
        deleteActionName: null,
        icon: "thumb_up",
        class: "green",
        noCompatibleWith: [ 4 ]
    },
    {
        id: 4,
        actionName: "Utiliser potion blanche",
        deleteActionName: null,
        icon: "thumb_up",
        class: "inactive",
        noCompatibleWith: [ 3 ]
    },
    {
        id: 5,
        actionName: "Tuer à moitié",
        deleteActionName: "Ne plus être à moitié mort",
        icon: "star_half",
        class: "",
        noCompatibleWith: []
    },
    {
        id: 6,
        actionName: "Plus de pouvoir",
        deleteActionName: "Ne plus priver de pouvoirs",
        icon: "highlight_off",
        class: "",
        noCompatibleWith: []
    },
    {
        id: 7,
        actionName: "Transformer en LG",
        deleteActionName: "Ne plus être un LG",
        icon: "battery_alert",
        class: "red",
        noCompatibleWith: []
    },
    {
        id: 8,
        actionName: "Rajouter au groupe 1",
        deleteActionName: "Retirer du groupe 1",
        icon: "swap_horiz",
        class: "",
        noCompatibleWith: [ 9 ]
    },
    {
        id: 9,
        actionName: "Rajouter au groupe 2",
        deleteActionName: "Retirer du groupe 2",
        icon: "swap_vert",
        class: "",
        noCompatibleWith: [ 8 ]
    },
    {
        id: 10,
        actionName: "Désigné par le corbeau",
        deleteActionName: "Ne plus être désigné par le corbeau",
        icon: "email",
        class: "",
        noCompatibleWith: []
    },
    {
        id: 11,
        actionName: "Désigner comme mentor",
        deleteActionName: "Ne plus être mentor",
        icon: "group",
        class: "",
        noCompatibleWith: []
    },
    {
        id: 12,
        actionName: "Tué par le village",
        deleteActionName: "Ne plus être tué par le village",
        icon: "alarm_off",
        class: "",
        noCompatibleWith: []
    },
    {
        id: 13,
        actionName: "Envouter",
        deleteActionName: "Ne plus être envouté",
        icon: "pan_tool",
        class: "",
        noCompatibleWith: []
    }
]

export const roles: Role[] = [
    {
        "id": 0,
        "name": "Abominable Sectaire",
        "image": "assets/cards/abominable_sectaire.png",
        "ownStatusIds": [],
        "othersStatusIds": [ 8, 9 ]
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
        "othersStatusIds": []
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
        "othersStatusIds": []
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
        "othersStatusIds": [ 10 ]
    },
    {
        "id": 10,
        "name": "Cupidon",
        "image": "assets/cards/cupidon.png",
        "ownStatusIds": [],
        "othersStatusIds": [ 0 ],
    },
    {
        "id": 11,
        "name": "Deux soeurs",
        "image": "assets/cards/deux_soeurs.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 12,
        "name": "Enfant sauvage",
        "image": "assets/cards/enfant_sauvage.png",
        "ownStatusIds": [ 7 ],
        "othersStatusIds": [ 11 ]
    },
    {
        "id": 13,
        "name": "Grand méchant loup",
        "image": "assets/cards/grand_mechant_loup.png",
        "ownStatusIds": [ 6 ],
        "othersStatusIds": []
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
        "othersStatusIds": [ 7 ]
    },
    {
        "id": 16,
        "name": "Joueur de flûte",
        "image": "assets/cards/joueur_flute.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 17,
        "name": "Juge bègue",
        "image": "assets/cards/juge_begue.png",
        "ownStatusIds": [ 6 ],
        "othersStatusIds": []
    },
    {
        "id": 18,
        "name": "Loup garou blanc",
        "image": "assets/cards/loup_garou_blanc.png",
        "ownStatusIds": [],
        "othersStatusIds": []
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
        "othersStatusIds": []
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
        "othersStatusIds": []
    },
    {
        "id": 24,
        "name": "Salvateur",
        "image": "assets/cards/salvateur.png",
        "ownStatusIds": [],
        "othersStatusIds": []
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
        "initialStatusIds": [ 2, 4 ]
    },
    {
        "id": 28,
        "name": "Trois frères",
        "image": "assets/cards/trois_freres.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 29,
        "name": "Voleur",
        "image": "assets/cards/voleur.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 30,
        "name": "Voyante",
        "image": "assets/cards/voyante.jpg",
        "ownStatusIds": [],
        "othersStatusIds": []
    }
];