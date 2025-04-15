const LocationCard = ({ name, phone, location, mapLink, image }) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
            <div className="card mt-3 flex-grow-1">
                <img src={image} className="card-img-top img-fluid location-card" alt={name} />
                <div className="card-body text-center ">
                    <h5 className="card-title fs-3 mb-3 fw-bold">{location}</h5>
                    <p className=" card-text mb-2 fs-6">
                        Phone:{" "}
                        <a href={`tel:${phone}`} className="text-decoration-none">
                            {phone}
                        </a>
                    </p>
                    <p className="card-text fs-6 ">Address: {location}</p>
                    <div className="d-flex flex-column align-items-center">
                        <a href={`tel:${phone}`} className="btn btn-success mb-2">
                            Call
                        </a>
                        <a href={mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Open in Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationCard;
