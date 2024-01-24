import React, { Component } from "react";
import "./App.css";
import planitLogo from "./images/planitLogo.png";

import Map from "./Map";

import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
// searchBox
const { compose, withProps, lifecycle } = require("recompose");
const {
  StandaloneSearchBox,
} = require("react-google-maps/lib/components/places/StandaloneSearchBox");
const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={8} center={props.center}></GoogleMap>
  ))
);

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" +
      process.env.REACT_APP_API_KEY +
      "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      window.scrollTo(0, 0);
      const refs = {};
      this.showPosition = (position) => {
        const places = [];
        const firstPlace = {};
        const firstPlaceLat = position.coords.latitude;
        const firstPlaceLng = position.coords.longitude;

        this.setState({
          places,
          firstPlace,
          firstPlaceLat,
          firstPlaceLng,
        });
      };
      this.getCurrentLocation = function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          console.warn(
            "getCurrentLocation: Geolocation is not supported by this browser."
          );
        }
      };

      this.setState({
        places: [],
        firstPlace: {},
        firstPlaceLat: 39.74,
        firstPlaceLng: -104.991531,
        zoon: 10,
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
          this.getCurrentLocation();
        },

        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const firstPlace = places[0];
          const firstPlaceLat = firstPlace.geometry.location.lat();
          const firstPlaceLng = firstPlace.geometry.location.lng();
          this.setState({
            places,
            firstPlace,
            firstPlaceLat,
            firstPlaceLng,
          });
        },
      });
    },
  }),
  withScriptjs
)((props) => (
  <div
    data-standalone-searchbox=""
    style={{
      textAlign: `center`,
    }}
  >
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Find your destination"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `100%`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          margin: `2em 0 2em`,
        }}
      />
    </StandaloneSearchBox>
    <MyMapComponent
      googleMapURL={
        "https://maps.googleapis.com/maps/api/js?key=" +
        process.env.REACT_APP_API_KEY +
        "&libraries=places"
      }
      containerElement={<div style={{ height: `400px`, width: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      loadingElement={<div style={{ height: `100%` }} />}
      center={{ lat: props.firstPlaceLat, lng: props.firstPlaceLng }}
    />
  </div>
));

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <div className="container-fluid planit-container">
        <div className="planit-banner">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-1">
                  <img src={planitLogo} class="planit-logo" alt="Planit Logo" />
                </div>
                <div className="col-xs-12 col-lg-6">
                  <h2>PlanIt - The best way to plan your next adventure.</h2>
                  <p>
                    Plan a trip from a, b, c and decide how long you want to
                    spend in each spot to generate an itinerary.
                  </p>
                  <p>
                    Planit will show you transportation, lodging and possible
                    points of interest in the areas of travel including an
                    estimated price breakdown.
                  </p>
                  <p>
                    Select the desired options, finalize your itinerary and
                    start packing your bags!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <PlacesWithStandaloneSearchBox />
          </div>
        </div>
      </div>
    );
  }
}

export default MapContainer;
