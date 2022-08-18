//select dom element
let counterCountainer = document.getElementById("counter-container");
const addBtn = document.getElementById("add");
const resetBtn = document.getElementById("reset");
const inputValue = document.getElementById("input-field");


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
const RESET = "reset";


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
        // add counter div after clicking addBtn
        const newCounter = {
            id: id + 1,
            value: 0,
        }
        id++;
        return [...state, newCounter];


    }
    else if (action.type === RESET) {
        // reset all counter values
        const updatedState = state.map((item) => {
            return {
                ...item,
                value: 0,
            };
        })



        return updatedState;
    }
    else if (action.type === INCREMENT) {

        const updatedState = [...state];
        console.log(action.payload.id);
        const index = updatedState.findIndex(
            (item) => item.id === action.payload.id
        );

        updatedState[index].value = action.payload.value + updatedState[index].value;
        return updatedState;

    } else if (action.type === DECREMENT) {
        const updatedState = [...state];
        const index = updatedState.findIndex(
            (item) => item.id === action.payload.id
        );
        updatedState[index].value -= action.payload.value;
        return updatedState;
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
resetBtn.addEventListener("click", function () {
    store.dispatch({
        type: RESET,
    });
});


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
        const incrementInput = document.createElement("input");
        incrementInput.setAttribute("type", "number");
        incrementInput.setAttribute("placeholder", "Enter value");
        incrementInput.classList = "w-50 border border-gray-300 rounded-lg";
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
        btnContainer.appendChild(incrementInput);
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