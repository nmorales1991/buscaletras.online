import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios'
import Formulario from './components/Formulario'
import Cancion from './components/Cancion'
import Informacion from './components/Informacion'
import IconoCarga from './components/IconoCarga'

import Error from './components/Error'

function App() {

	const [stateArtista, agregarArtista] = useState('')
	const [busqueda, setbusqueda] = useState(false)
	const [letra, agregarLetra] = useState([])
	const [info, agregarInfo] = useState({})

	const [error, seterror] = useState(false)

	const [cargaLetra, setcargaLetra] = useState(false)
	const [cargaInfo, setcargaInfo] = useState(false)

	//api de letras
	const consultarAPILetra = async busqueda =>{
		setbusqueda(false)
		const {artista, cancion} = busqueda
		const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
		seterror(false)
		setcargaLetra(true)
		setcargaInfo(true)
		await axios.get(url).then(res=>{
			agregarArtista(artista)
		
			agregarLetra(res.data.lyrics)
			setbusqueda(true)
		}).catch(error=>{
			seterror(true)
			setbusqueda(false)
		})
		setcargaLetra(false)
	}

	//api de info
	const consultarAPIInfo = async ()=>{
		if(stateArtista){
			const url = `https://theaudiodb.com/api/v1/json/195003/search.php?s=${stateArtista}`
		
			await axios(url).then(res=>{
				agregarInfo(res.data.artists[0])
			})
			setcargaInfo(false)
	
		}
		
	}

	useEffect(() => {
		consultarAPIInfo()
	}, [busqueda])

    return (
		<Fragment>
			<Formulario
				consultarAPILetra={consultarAPILetra}
			/>
			<div className="container mt-5">
				{error?<Error/>:
				<div className="row">
					<div className="col-md-6">
						{cargaInfo?<IconoCarga/>:<Informacion info={info}/>}
					</div>
					<div className="col-md-6">
						{
							cargaLetra?<IconoCarga/>:<Cancion letra={letra} />
						}
						
					</div>
				</div>
				}
			</div>
		</Fragment>
	)
}

export default App;
