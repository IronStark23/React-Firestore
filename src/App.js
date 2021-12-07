import React, { useState } from 'react';
import { firebase } from './firebase';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [fecha, setFecha] = useState('');
  const [stock, setStock] = useState('');
  const [id, setId] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  React.useEffect(() => {

    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection('products').get();
        const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
        setProducts(arrayData);
      } catch (error) {
        console.log(error);
      }
    }

    obtenerDatos();

  }, [])

  const agregar = async (e) => {
    e.preventDefault()
    if(!product.trim() || !fecha.trim() || !stock.trim()){
      console.log("Falta un Campo");
      return
    }

    try {
      const db = firebase.firestore();
      const newProduct = {
        name: product,
        stock: stock,
        date: fecha
      }

      const data = await db.collection('products').add(newProduct);

      setProducts([
        ...products,
        {...newProduct, id: data.id}
      ])      

      setProduct('');
      setStock('');
      setFecha('');

    } catch (error) {
      console.log(error);
    }

  }

  const eliminar = async (id) => {
    try {
      console.log(id);
      const db = firebase.firestore();
      await db.collection('products').doc(id).delete();

      const arrayFilter = products.filter(item => item.id !== id);
      
      setProducts(arrayFilter);

    } catch (error) {
      console.log(error);
    }
  }

  const activarEdicion = (item) =>{
    setModoEdicion(true);
    setProduct(item.name);
    setStock(item.stock);
    setFecha(item.date);
    setId(item.id);
  }

  const editar = async (e) => {
    e.preventDefault();
    if(!product.trim() || !fecha.trim() || !stock.trim()){
      console.log("Falta un Campo");
      return
    }

    try {
      const db = firebase.firestore()
      const editProduct = {
        name: product,
        stock: stock,
        date: fecha
      }

      await db.collection('products').doc(id).update(editProduct);

      const arrayEditado = products.map(item => (
        item.id === id ? editProduct : item
      ))

      setProducts(arrayEditado);

      setProduct('');
      setFecha('');
      setStock('');
      setId('');
      setModoEdicion(false);

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="container">
      <h1 className="text-center">Papelería &#128209; &#128394;</h1>
      <div className="row">
        <div className="col-md-6">
            <h3>Productos por Comprar</h3>         
            {
                products.map(item => (
                  <div className="card border-success mb-3 size" key={item.id}>
                    <div className="card-header bg-transparent border-success" ><h5>Pendiente &#128221;</h5></div>
                      <div className="card-body text-success">
                        <h5 className="card-title">Producto: {item.name}</h5>
                        <p className="card-title">Cantidad: {item.stock}</p>
                        <p className="card-text">Fecha: {item.date}</p>
                      </div>
                    <div className="card-footer bg-transparent border-success text-center d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="button" className="btn btn-outline-danger" onClick={() => eliminar(item.id)}>Eliminar</button>
                        <button type="button" className="btn btn-outline-dark" onClick={() => activarEdicion(item)}>Editar</button>
                    </div>
                  </div>
                ))
            }
        </div>
        
        <div className="col-md-6">
            <h3>{
                modoEdicion ? 'Editar Producto' : 'Enlistar Producto'
              }</h3>
            <form onSubmit={
              modoEdicion ? editar : agregar
              }>
              <input type="text" className="form-control mb-2" placeholder='Ingrese el producto' value={product} onChange={e => setProduct(e.target.value)} />
              <input type="number" className="form-control mb-2" placeholder='Ingrese la cantidad que requiere' min='1' value={stock} onChange={e => setStock(e.target.value)} />
              <input type="datetime-local" className="form-control mb-2" value={fecha} onChange={e => setFecha(e.target.value)} />
              <button
                type='submit'
                className={
                  modoEdicion ? "btn btn-outline-success btn-block btn-sm" : "btn btn-dark btn-block btn-sm"
                }
              >{
                modoEdicion ? 'Actualizar' : 'Guardar'
              }</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default App;