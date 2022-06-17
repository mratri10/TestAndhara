
const initState: Object = {
    body: { "name": "Atri" },
    title: "Gilang",
    id: 0
}

export default (state: Object = initState, action: ReduxAction) => {
    switch (action.type) {
        case "Data":
            return {
                body: { "name": "Atri" },
                title: "susan",
                id: 0
            }
        default:
            return state
    }
}
