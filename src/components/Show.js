import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)


const Show = () => {
    //1_configuramos los hooks
    const [users, setUsers] = useState( [] )
    // 2_ referenciamos a la DB firestore
    const usersCollection= collection(db, "products")
    //3_ Funcion para mostrar todos los docs
    const getUsers = async () => {
        const data =await getDocs(usersCollection)
        //console.log(data.docs)
        setUsers(
            data.docs.map( (doc) => ( {...doc.data(), id:doc.id}))
            )
        console.log(users)
    }
    //4_ Funcion para eliminar un doc
    const deleteUser = async (id) => {
        const userDoc = doc(db, "products", id)
        await deleteDoc(userDoc)
        getUsers()

    }

    //5_ Funcion de confirmacion para un Sweet alert2
    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Desea eliminar al usuario?',
            text: "No podrás revertir esto.!",
            icon: 'advertencia',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
          }).then((result) => {
            if (result.isConfirmed) {
                //lamamos a la funcion para eliminar
                deleteUser(id)
                Swal.fire(
                    'Eliminado!',
                    'Su archivo ha sido eliminado.',
                    'éxito'
                )
            }
          })
    }
   

    //6_ usamos useEffect
    useEffect( () => {
        getUsers()
    
    }, []) 
        
    
    //7_ devolvemos vista de nuestro componente



  return (
    <>
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='d-grip gap-2'>
                    <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                </div>
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Domicilio</th>
                            <th>Telefono</th>
                            <th>email</th>
                            <th>Editar</th>



                        </tr>
                    </thead>
                    <tbody>
                        { users.map( (user) => (
                            <tr key={user.id}>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.domicilio}</td>
                                <td>{user.telefono}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/edit/${user.id}`} className="btn btn-light"> <i className='fa-solid fa-user-pen'></i></Link>
                                    <button onClick={ () => {confirmDelete(user.id)} } className="btn btn-danger"><i className="fa-solid fa-user-minus"></i></button>
                                </td>


                            </tr>
                        )) }


                    </tbody>


                </table>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Show