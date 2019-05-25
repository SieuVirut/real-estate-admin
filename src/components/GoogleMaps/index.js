import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { keyApiGoogleMaps } from '@/defaultSettings'
import { Icon } from 'antd'
import { connect } from 'dva'

const googleMapsClient = require('@google/maps').createClient({
  key: keyApiGoogleMaps
})

@connect(({ maps }) => {
  maps
})
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 21.029817053256664,
      lng: 105.83550921486432
    },
    zoom: 13
  }

  componentWillMount = () => {
    console.log('11111111111111111', this.props)
  }

  // componentDidUpdate = () => {
  //   console.log('GoogleMaps', this.props)
  // }

  onChange = e => {
    console.log('this.onCHange', e, googleMapsClient)
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })
  }

  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%', maxHeight: '250px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: keyApiGoogleMaps }}
          center={this.props.center}
          defaultZoom={this.props.zoom}
          onChange={this.onChange}
        // onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        // yesIWantToUseGoogleMapApiInternals
        // onClick={this.onClick}
        // onDrag={this.onClick}
        >
          <Icon type="environment" style={{ fontSize: '32px', color: 'red' }} />
        </GoogleMapReact>
      </div>
    )
  }
}

export default SimpleMap