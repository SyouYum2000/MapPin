import Map, { FullscreenControl, Marker, Popup } from "react-map-gl";
import { useEffect, useState,useRef,useCallback } from "react";
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";


function App() {
  const myStorage = window.localStorage;
  const mapRef = useRef();
  const onMapLoad = useCallback(()=>{
    mapRef.current.on('move',()=>{
    })
  },[])

  const [viewState,setViewState] = useState({
    longitude:139.07669,
    latitude:35.10388,
    zoom:13
  })

  const [currentUser,setCurrentUser] = useState("")
  const [pins,setPins] = useState([])
  const [newPlace,setNewPlace] = useState(null)
  const [currentPlaceId,setCurrentPlaceId] = useState(null)
  const [showPopup,setShowPopup] = useState(false)
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [rating,setRating] = useState(5)
  const [showRegister,setShowRegister] = useState(false)
  const [showLogin,setShowLogin] = useState(false)

  const handleMarkerClick = (id,lat,long) =>{
    setCurrentPlaceId(id);
    setViewState({...viewState,latitude:lat,longitude:long})
  }

  const handleAddClick = (e) =>{
    setNewPlace({
      lat:e.lngLat.lat,
      long:e.lngLat.lng
    })
  }

  const handleLogout = () =>{
    myStorage.removeItem("user")
    setCurrentUser(null)
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const newPin ={
      user:currentUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      long:newPlace.long
    }
    try{
     const res = await axios.post("/pins",newPin);
     setPins([...pins,res.data])
     setNewPlace(null)
    } catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    const getPins = async() =>{
      try{
      const res = await axios.get("/pins")
      setPins(res.data)
     } catch(err){
      console.log(err)
     }
    };
    getPins();
  },[])

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX

  
  return (
    <div className="App">
      <Map
      {...viewState}
      onMove={e => setViewState(e.viewState)}
      style={{width:"100%",height:"100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      ref={mapRef}
      onLoad={onMapLoad}
      onDblClick = {currentUser && handleAddClick}
      transitionDuration = "100"
      >
       {pins.map((pin)=>(
        <div key={pin._id}>
        <Marker
          longitude={pin.long}
          latitude={pin.lat}
          anchor="bottom"
          offsetLeft={-viewState.zoom * 4}
          offsetTop={-viewState.zoom * 4}
         >
         <IconButton
          onClick={()=>{
            handleMarkerClick(pin._id,pin.lat,pin.long)
            setShowPopup((prevState)=>!prevState)
          }}
          style = {{cursor:"pointer"}}
         >
          <RoomIcon 
            style={{fontSize:viewState.zoom * 4 , 
            color:pin.username===currentUser ?"tomato":"slateblue",
            cursor:"pointer",
            }}
          />
         </IconButton>
        </Marker>

        {(showPopup && pin._id === currentPlaceId ) && (
         <Popup 
          longitude={pin.long} latitude={pin.lat}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
         >
          <div className="card">
            <label>Place</label>
             <h4 className="Place">{pin.title}</h4>
            <label>Review</label>
             <p className="desc">{pin.desc}</p>
            <label>Rating</label>
             <div className="stars">
              {Array(pin.rating).fill(
                <StarIcon className="star"/>
              )}
             </div>
          </div>
         </Popup>
        )} 
        </div>
       ))}


         {newPlace &&
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={()=>setNewPlace(null)}
          >
            <div>
              <form className="form" onSubmit={handleSubmit}>
                <label>Title</label>
                 <input type="text" placeholder="Enter a title" onChange={(e)=>setTitle(e.target.value)}/>
                <label>Review</label>
                 <textarea placeholder="この場所の魅力は？" onChange={(e)=>setDesc(e.target.value)}/>
                <label>Rating</label>
                 <select onChange={(e)=>setRating(e.target.value)}>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                 </select>
                 <button className="submitButton" type="submit">Add Pin</button>
              </form>
            </div>
          </Popup>       
         }

         {currentUser?(<button className="button logout" onClick={handleLogout}>Log out</button>)
          :(
            <div className="buttons">
             <button className="button login" onClick={()=>setShowLogin(true)}>Log in</button>
             <button className="button register" onClick={()=>setShowRegister(true)}>Register</button>
            </div>
          )}
         {showRegister && <Register setShowRegister={setShowRegister}/> }  
         {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/> }  
      </Map>
    </div>
  );
}

export default App;
