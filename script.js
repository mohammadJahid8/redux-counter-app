//select dom element
let counterCountainer = document.getElementById("counter-container");
const addBtn = document.getElementById("add");

// create initial state
let initialState = [
    {
        id: 1,
        value: 0,
    },
];

// create variable fro unique id
let id = 1;

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD = "add";


// action creators
const increment = (id, value) => {
    return {
        type: INCREMENT,
        payload: {
            value: value,
            id: id,
        },
    };
};

const decrement = (id, value) => {
    return {
        type: DECREMENT,
        payload: {
            value: value,
            id: id,
        },
    };
};

// create reducer function
function counterReducer(state = initialState, action) {
    if (action.type === ADD) {

        const copyState = [
            ...state,
            {
                id: id + 1,
                value: 0,
            }
        ];
        console.log(copyState);

        return copyState;
    } else if (action.type === INCREMENT) {

        const copyState = [...state];
        console.log(action.payload.id);
        const index = copyState.findIndex(
            (item) => item.id === action.payload.id
        );

        copyState[index].value = action.payload.value + copyState[index].value;
        return copyState;
        s
    } else if (action.type === DECREMENT) {
        const copyState = [...state];
        const index = copyState.findIndex(
            (item) => item.id === action.payload.id
        );
        copyState[index].value -= action.payload.value;
        return copyState;
    } else {
        return state;
    }
}



// create store
const store = Redux.createStore(counterReducer);



// create new counter div when click add counter button
addBtn.addEventListener("click", function () {
    store.dispatch({
        type: ADD,
    });
});

// create render function for show updated state in ui
function render() {
    const state = store.getState();
    counterCountainer.innerHTML = "";
    state.forEach((item) => {
        const div = document.createElement("div");
        div.classList =
            "p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow counter";
        const counter = document.createElement("div");
        counter.classList = "text-2xl font-semibold";
        div.appendChild(counter);
        counter.innerText = item.value;
        const btnContainer = document.createElement("div");
        btnContainer.classList = "flex space-x-3";
        const incrementBtn = document.createElement("button");
        incrementBtn.classList =
            "bg-indigo-400 text-white px-3 py-2 rounded shadow";
        incrementBtn.innerText = "Increment";
        incrementBtn.onclick = function () {
            store.dispatch(increment(item.id, 5));
        };
        const decrementBtn = document.createElement("button");
        decrementBtn.classList =
            "bg-red-400 text-white px-3 py-2 rounded shadow";
        decrementBtn.innerText = "Decrement";
        decrementBtn.onclick = function () {
            store.dispatch(decrement(item.id, 5));
        };
        btnContainer.appendChild(incrementBtn);
        btnContainer.appendChild(decrementBtn);
        div.appendChild(btnContainer);
        // counterCountainer.innerHTML = "";
        counterCountainer.appendChild(div);
    });
}

// update ui initially
render();

// subscribe store
store.subscribe(render);