import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Functions
import { SaveCarSale, SaveMedia, SaveArchivo, ListCarSale } from "../Functions/Sales/Sales";
import { SignInAuth, LognInAuth, logout, ListUser, ListAllUsers, updateUserRole } from "../Functions/Authentication/Authentication"



const Context = createContext();

export const useContextCar = () => {
    const context = useContext(Context);
    if (!context) throw new Error('There is no Context provider');
    return context;
};




export function ProviderContext({ children }) {
    const [CarAvailable, setAvailable] = useState(null);
    const [WhichRole, setWhichRole] = useState(null)
    const [user, setUser] = useState(null)

    const [LisCarNew, setLisCarNew] = useState([])
    const [LisCarUsed, setLisCarUsed] = useState([])
    const [ListCar, setListCar] = useState([])
    const [ListAllUser, setListAllUser] = useState([])

    const [locationR, setlocationR] = useState('')

    const [AutosVisible, setAutosVisible] = useState(false)
    const [AutosInVisible, setAutosInVisible] = useState(false)
    const [ContactoVisibles, setContactoVisibles] = useState(false)

    const [CarDatos, setCarDatos] = useState([])


    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

        });
        return () => unsubuscribe();
    }, [user]);

    useEffect(() => {
        if (user) {
            ListUser(user.uid, setWhichRole)
            ListCarSale(setLisCarNew, setLisCarUsed, setListCar)
            // GetHero(setTituloHero, setDescripcionHero, setSliderImg)
            ListAllUsers(setListAllUser)
        }
    }, [user])




    useEffect(() => {
        if (user) {
            ListCarSale(setLisCarNew, setLisCarUsed, setListCar)

        }

    }, [])


    const handleRemove = (dato) => {
        const nuevaLista = CarDatos.filter(item => item !== dato);
        setCarDatos(nuevaLista)

    }


    return (
        <Context.Provider
            value={{
                user,
                CarAvailable,
                setAvailable,
                SaveCarSale,
                SaveMedia,
                SaveArchivo,
                WhichRole,
                setWhichRole,
                SignInAuth,
                LognInAuth,
                logout,
                ListUser,
                ListAllUsers,
                updateUserRole,
                setLisCarNew,
                setLisCarUsed,
                setListCar,
                setListAllUser,
                locationR,
                setlocationR,
                AutosInVisible,
                setAutosInVisible,
                AutosVisible,
                setAutosVisible,
                ContactoVisibles,
                setContactoVisibles,
                CarDatos,
                setCarDatos,
                handleRemove

            }}
        >
            {children}
        </Context.Provider>
    );
}
