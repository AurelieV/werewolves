import { Role, Status, StatusValue } from "./model";

export const statusValues: StatusValue[] = [
    {
        id: 0,
        name: "Amoureux",
        actionName: "Rendre amoureux",
        icon: "favorite",
        class: "red",
        statusId: 0
    },
    {
        id: 1,
        name: null,
        actionName: "Ne plus être amoureux",
        statusId: 0
    },
    {
        id: 2,
        name: "Potion noire non utilisée",
        actionName: "Annuler utilisation potion noire",
        icon: "thumb_down",
        class: "black",
        statusId: 1,
    },
    {
        id: 3,
        name: "Potion noire utilisée",
        actionName: "Utiliser potion noire",
        icon: "thumb_down",
        class: "inactive",
        statusId: 1
    },
    {
        id: 4,
        name: "Potion blanche non utilisée",
        actionName: "Annuler utilisation potion blanche",
        icon: "thumb_up",
        class: "green",
        statusId: 2
    },
    {
        id: 5,
        name: "Potion blanche utilisée",
        actionName: "Utiliser potion blanche",
        icon: "thumb_up",
        class: "inactive",
        statusId: 2
    }
]
export const statuses: Status[] = [
    {
        id: 0,
        name: "Amoureux",
        valueIds: [0, 1]
    },
    {
        id: 1,
        name: "Potion noire",
        valueIds: [2, 3]
    },
    {
        id: 2,
        name: "Potion blanche",
        valueIds: [4, 5]
    }
]

export const roles: Role[] = [
    {
        "id": 0,
        "name": "Abominable Sectaire",
        "image": "assets/cards/abominable_sectaire.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 1,
        "name": "Ancien",
        "image": "assets/cards/ancien.png",
        "ownStatusIds": [],
        "othersStatusIds": []
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
        "ownStatusIds": [],
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
        "ownStatusIds": [],
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
        "othersStatusIds": []
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
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 13,
        "name": "Garde champètre",
        "image": "assets/cards/garde_champetre.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 14,
        "name": "Grand méchant loup",
        "image": "assets/cards/grand_mechant_loup.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 15,
        "name": "Idiot du village",
        "image": "assets/cards/idiot_village.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 16,
        "name": "Infame père des loups",
        "image": "assets/cards/infame_pere_loups.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 17,
        "name": "Joueur de flûte",
        "image": "assets/cards/joueur_flute.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 18,
        "name": "Juge bègue",
        "image": "assets/cards/juge_begue.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 19,
        "name": "Loup garou blanc",
        "image": "assets/cards/loup_garou_blanc.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 20,
        "name": "Loup garou",
        "image": "assets/cards/loup_garou.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 21,
        "name": "Montreur d'ours",
        "image": "assets/cards/montreur_ours.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 22,
        "name": "Petite fille",
        "image": "assets/cards/petite_fille.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 23,
        "name": "Pyromane",
        "image": "assets/cards/pyromane.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 24,
        "name": "Renard",
        "image": "assets/cards/renard.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 25,
        "name": "Salvateur",
        "image": "assets/cards/salvateur.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 26,
        "name": "Servante",
        "image": "assets/cards/servante.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 27,
        "name": "Simple Villageois",
        "image": "assets/cards/simple_villageois.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 28,
        "name": "Sorcière",
        "image": "assets/cards/sorciere.png",
        "ownStatusIds": [ 1, 2 ],
        "othersStatusIds": []
    },
    {
        "id": 29,
        "name": "Trois frères",
        "image": "assets/cards/trois_freres.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 30,
        "name": "Voleur",
        "image": "assets/cards/voleur.png",
        "ownStatusIds": [],
        "othersStatusIds": []
    },
    {
        "id": 31,
        "name": "Voyante",
        "image": "assets/cards/voyante.jpg",
        "ownStatusIds": [],
        "othersStatusIds": []
    }
];