import React from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  StreetViewPanorama,
} from '@react-google-maps/api'

const MovieMap = props => (
  <LoadScript
    id="script-loader"
    googleMapsApiKey="AIzaSyABvTY8JdjI-UKYsJ-if4LJTkmjJr-mPSU"
  >
    <GoogleMap
      id="Moviemap"
      mapContainerStyle={{
        height: '100%',
        width: '100%',
      }}
      zoom={18}
      center={{
        lat: Number(props.lat),
        lng: Number(props.lng),
      }}
    >
      <Marker
        onLoad={marker => {
          console.log('marker: ', marker)
        }}
        position={{
          lat: Number(props.lat),
          lng: Number(props.lng),
        }}
      />
      {props.streetView ? (
        <StreetViewPanorama
          position={{
            lat: Number(props.lat),
            lng: Number(props.lng),
          }}
          visible={true}
        />
      ) : (
        ''
      )}
    </GoogleMap>
  </LoadScript>
)

export default MovieMap
