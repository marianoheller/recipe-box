

export const initState = {
    showingId: null,
    addingRecipe: false,
    nextID: "3",
    recipes: [
    {
        id: 1,
        name: "asd",
        ingredients: [
        "a",
        "b",
        "c",
        ]
    },
    {
        id: 2,
        name: "qwe",
        ingredients: [
        "q",
        "dº",
        "c",
        ]
    },
    ],

}


export const customStyle = {
    overlay: {
    position          : 'absolute',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(220, 220, 220, 0.5)'
    },
    content : {
    top                   : '30%',
    left                  : '50%',
    right                 : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
    }
}
