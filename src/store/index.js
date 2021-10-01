import {useState, createContext} from 'react';

const globalVariables = {
    name: '',
    email: '',
    photoUrl: ''
};

export const Context = createContext();

const Store = ({ children }) => {
    const [state, setState] = useState(globalVariables);
    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    )
};
export default Store;