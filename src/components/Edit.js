import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { async } from "@firebase/util"
import Swal from 'sweetalert2'


const Edit = () => {
    const [nombre, setName ] = useState('')
    const [apellido, setsurName ] = useState('')
    const [domicilio, setDomicilio ] = useState('')
    const [telefono, setTelefono ] = useState('')
    const [email, setEmail ] = useState('')

    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) =>{
        e.preventDefault()
        const user = doc(db, "products", id)
        const data = {nombre : nombre, apellido: apellido, domicilio: domicilio, telefono : telefono, email: email}
        await updateDoc(user, data)
        navigate('/')
    }


    const getUserByid = async (id) => {
        const user = await getDoc(doc(db, "products", id))
        if (user.exists()){
            setName(user.data().nombre)
            setsurName(user.data().apellido)
            setDomicilio(user.data().domicilio)
            setTelefono(user.data().telefono)
            setEmail(user.data().email)
        
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario no existe!',
                
              })
        }
    }

    useEffect(() => {
        getUserByid(id)
    }, [])
  return (
    <div className='container'>
    <div className='row'>
        <div className='col'>
            <h1>Editar usuario</h1>

            <form onSubmit={update}>
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
                <button type="submit" className="btn btn-primary"> Update </button>




            </form>

        </div>
    </div>
</div>
  )
}

export default Edit