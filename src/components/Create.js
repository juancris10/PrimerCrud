import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
    const [nombre, setName ] = useState('')
    const [apellido, setsurName ] = useState('')
    const [domicilio, setDomicilio ] = useState('')
    const [telefono, setTelefono ] = useState('')
    const [email, setEmail ] = useState('')
    const navigate = useNavigate()

    const usersCollection = collection(db, "products")

    const data = async (e) => {
        e.preventDefault()
        await addDoc (usersCollection, {nombre : nombre, apellido: apellido, domicilio : domicilio, telefono: telefono, email: email})
        navigate('/')
    }






  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Crear </h1>

                <form onSubmit={data}>
                    <div className='mb-3'>
                        <label className='form-label'> Nombre</label>
                        <input
                            value= {nombre}
                            onChange= { (e) => setName(e.target.value)}
                            type="text"
                            className='form-control' 
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'> Apellido</label>
                        <input
                            value= {apellido}
                            onChange= { (e) => setsurName(e.target.value)}
                            type="text"
                            className='form-control' 
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'> Domicilio</label>
                        <input
                            value= {domicilio}
                            onChange= { (e) => setDomicilio(e.target.value)}
                            type="text"
                            className='form-control' 
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'> Telefono</label>
                        <input
                            value= {telefono}
                            onChange= { (e) => setTelefono(e.target.value)}
                            type="text"
                            className='form-control' 
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'> EMAIL</label>
                        <input
                            value= {email}
                            onChange= { (e) => setEmail(e.target.value)}
                            type="text"
                            className='form-control' 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" > Crear </button>




                </form>

            </div>
        </div>
    </div>
  )
}

export default Create