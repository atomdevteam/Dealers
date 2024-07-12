import React, { useState, useRef, useEffect } from "react"
import Navbar from "../NavBar/NavBar"
import Hero from '../../Components/Hero/Hero'
import Recomendado from "../../Components/Recomendado/Recomendado"
// import Testimonio from '../../Components/Testimono/Testimonio'
import Contacto from '../../Components/Contacto/Contacto'
import { useContextCar } from "../../Context/Context"
// import Testimonio from "../../Components/Testimono/Testimonio"
import CarDetails from "../../Components/CarDetails/CarDetails"
import EngineDetails from "../../Components/EngineDetails/EngineDetails"
import Dimension from "../../Components/Dimension/Dimension"
import Feature from "../../Components/Feature/Feature"
import UpImagine from "../../Components/UpImagine/UpImagine"
import Price from "../../Components/Price/Price"
import { validateCarSaleDatos } from "../../Context/Validations"

const CarSaleDatos = {
    Sale: {
        IdCarSale: "",
        DetalleCoche: {
            Titulo: "",
            Condicion: "",
            TipoCuerpo: "",
            Marca: "",
            Modelo: "",
            Year: "",
            Capacidad: "",
            Color: "",
            Descripcion: ""
        },
        DetalleMotor: {
            TipoCombustimble: "",
            Kilometraje: "",
            Transmision: "",
            DriverTrain: "",
            CapacidadMotor: "",
            Power: "",
        },
        Dimension: {
            Longitud: "",
            Ancho: "",
            Altura: "",
            VolumenCarga: ""
        },

        Features: {
            Features: [],
            Otros: "No"
        },
        Precio: {
            Precio: 0
        },

        Multimedia: {
            Imagen: []
        },
    }
}

const MainScreen = () => {

    const { user, WhichRole, AutosVisible, setAutosVisible, AutosInVisible, setAutosInVisible,
        ContactoVisibles, setContactoVisibles, SaveCarSale, CarEdit } = useContextCar()

    const AutosRef = useRef(null);
    const ContactoRef = useRef(null);



    useEffect(() => {
        if (AutosVisible === true && AutosRef.current) {
            AutosRef.current.scrollIntoView({ behavior: 'smooth' });
            setAutosVisible(false)
        }
    }, [AutosVisible]);

    useEffect(() => {
        if (ContactoVisibles === true && ContactoRef.current) {
            console.log("Scroll automatico")
            ContactoRef.current.scrollIntoView({ behavior: 'smooth' });
            setContactoVisibles(false)
        }
    }, [ContactoVisibles]);

 


    
    const [newFeature, setNewFeature] = useState('');



    useEffect(() => {
        if (CarEdit !== null) {
            CarSaleDatos.Sale.DetalleCoche = CarEdit.Sale.DetalleCoche
            console.log("Editar autos")
            console.log(CarSaleDatos)
        }
    }, [CarEdit])

 

    const updateCarDetails = (updatedDetails) => {
        console.log(updatedDetails)
        CarSaleDatos.Sale.DetalleCoche = updatedDetails;
        console.log(CarSaleDatos)

    }

    const updateEngineDetails = (updatedDetails) => {
        CarSaleDatos.Sale.DetalleMotor = updatedDetails;

    }

    const updateDimension = (updatedDetails) => {
        CarSaleDatos.Sale.Dimension = updatedDetails

    }


    const handleSale = (e) => {
        e.preventDefault();

        // Imprime la acción del evento
        console.log('Evento preventDefault ejecutado');

        // Imprime el estado actual de CarSaleDatos.Sale
        console.log('Datos de la venta del coche:', CarSaleDatos.Sale);

        // Verifica si los datos son válidos
        if (validateCarSaleDatos(CarSaleDatos.Sale)) {
            // Imprime un mensaje indicando que los datos son válidos
            console.log('Datos validados correctamente');

            // Guarda la venta del coche y muestra un mensaje de confirmación
            SaveCarSale(CarSaleDatos, user.uid);
            console.log('Datos guardados con éxito');

            alert("Guardado");
        } else {
            // Imprime un mensaje indicando que los datos no son válidos
            console.log('Datos incompletos o inválidos');

            alert('Por favor completa todos los campos.');
        }
    };


    const handleEdit = (e) => {


        e.preventDefault();

        // Imprime la acción del evento
        console.log('Evento preventDefault ejecutado');

        // Imprime el estado actual de CarSaleDatos.Sale
        console.log('Datos de la venta del coche:', CarSaleDatos.Sale);

        // Verifica si los datos son válidos
        if (validateCarSaleDatos(CarSaleDatos.Sale)) {
            // Imprime un mensaje indicando que los datos son válidos
            console.log('Datos validados correctamente');
            console.log(CarSaleDatos);
            // Guarda la venta del coche y muestra un mensaje de confirmación
            // EditCarSale(CarSaleDatos, CarEdit.IdCarSale);
            console.log('Datos guardados con éxito');

            alert("Guardado");
        } else {
            // Imprime un mensaje indicando que los datos no son válidos
            console.log('Datos incompletos o inválidos');

            alert('Por favor completa todos los campos.');
        }




    }


    return (
        <>
            {/* Modales */}
            {/* <CarDetails />
            <EngineDetails />
            <Dimension />
            <Feature />
            <UpImagine />
            <Price /> */}

            < CarDetails updateCarDetails={updateCarDetails} />
            <EngineDetails updateEngineDetails={updateEngineDetails} />
            <Dimension updateDimension={updateDimension} />
            <Feature FeatureDatos={CarSaleDatos.Sale.Features} newFeature={newFeature} setNewFeature={setNewFeature} />
            <UpImagine AudiovisualDatos={CarSaleDatos.Sale.Multimedia} />
            <Price PriceDatos={CarSaleDatos.Sale.Precio} handleSale={handleSale}/>




            <div className="bg-black">
                <Navbar background={'dark:bg-[#12232E]'} />
                <Hero />

                <div ref={AutosRef} >
                    <Recomendado />
                </div>

                <div ref={ContactoRef}>
                    <Contacto />
                </div>


            </div>
        </>
    )
}

export default MainScreen