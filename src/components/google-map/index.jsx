// import PropTypes from "prop-types";
// import GoogleMapReact from "google-map-react";

// const GoogleMap = ({ lat1, lng1, lat2, lng2, zoom, options }) => {
//     return (
//         <div style={{ height: "100%", width: "100%" }}>
//             <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyB2D8wrWMY3XZnuHO6C31uq90JiuaFzGws" }} defaultCenter={{ lat1, lng1 }} defaultZoom={zoom}>
//                 <Marker lat={lat1} lng={lng1} text="My Marker" />
//                 <Marker lat={lat2} lng={lng2} text="My Marker" />
//             </GoogleMapReact>
//         </div>
//     );
// };

// GoogleMap.propTypes = {
//     lat1: PropTypes.number.isRequired,
//     lng1: PropTypes.number.isRequired,
//     zoom: PropTypes.number,
//     options: PropTypes.shape({}),
// };

// GoogleMap.defaultProps = {
//     lat1: -3.745,
//     lng1: -38.523,
//     zoom: 12,
// };

// export default GoogleMap;

// const Marker = ({ text }) => (
//     <div className="map-marker">
//         <img src={`${process.env.PUBLIC_URL + "/assets/img/icon-img/2.png"}`} alt={text} />
//     </div>
// );
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

const GoogleMap = ({ lat1, lng1, lat2, lng2, zoom }) => {
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <GoogleMapReact bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }} defaultCenter={{ lat: lat1, lng: lng1 }} defaultZoom={zoom}>
                <Marker lat={lat1} lng={lng1} text="Marker 1" />
                {lat2 && lng2 && <Marker lat={lat2} lng={lng2} text="Marker 2" />}
            </GoogleMapReact>
        </div>
    );
};

GoogleMap.propTypes = {
    lat1: PropTypes.number.isRequired,
    lng1: PropTypes.number.isRequired,
    lat2: PropTypes.number,
    lng2: PropTypes.number,
    zoom: PropTypes.number,
};

GoogleMap.defaultProps = {
    lat1: -3.745,
    lng1: -38.523,
    zoom: 12,
};

export default GoogleMap;

const Marker = ({ text }) => (
    <div className="map-marker">
        <img src={`${process.env.PUBLIC_URL}/assets/img/icon-img/2.png`} alt={text} />
    </div>
);

Marker.propTypes = {
    text: PropTypes.string.isRequired,
};
