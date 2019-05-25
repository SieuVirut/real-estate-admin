import React, { Component } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { Select, Input } from 'antd'
import { connect } from  'dva'

const Option = Select.Option

@connect(({ maps }) => {
  maps
})
class LocationSearchInput extends Component {

  state = {
    data: [],
    value: undefined,
  }

  componentWillUnmount = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'maps/clearLocation'
    })
  }

  handleSearch = (value) => {
    fetch(value, data => this.setState({ data }))
  }

  handleChange = (value) => {
    const { dispatch } = this.props
    this.setState({ value })
    geocodeByAddress(value)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        dispatch({
          type: 'maps/saveLocation',
          data: { 
            place: value,
            center: latLng
          }
        })
      })
      .catch(error => console.error('Error', error))
  }

  render() {

    const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
      return (
      <div className="autocomplete-root">
        <Input {...getInputProps()} />
        <div className="autocomplete-dropdown-container"
          style={{
            position: 'absolute',
            zIndex: 100
          }}
        >
          {loading && <div>Loading...</div>}
          {suggestions.map(suggestion => (
            <div {...getSuggestionItemProps(suggestion)}>
              <span 
                style={{
                  whiteSpace: 'nowrap'
                }}
              >{suggestion.description}</span>
            </div>
          ))}
        </div>
      </div>
    )}
    return (
      <PlacesAutocomplete value={this.state.value} onChange={this.handleChange}>
        {renderFunc}
      </PlacesAutocomplete>
    )
  }
}

export default LocationSearchInput