import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const LocationCard = (loc) => {
    const { lang } = useParams();
    console.log(lang);

    const { phone, location, mapLink, image } = loc;
    const locationName = loc[`name-${lang}`];
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
            <div className="card mt-3 flex-grow-1">
                <img src={image} className="card-img-top img-fluid location-card" alt={locationName} />
                <div className="card-body text-center ">
                    <h5 className="card-title fs-3 mb-3 fw-bold">{locationName}</h5>
                    <p className=" card-text mb-2 fs-6">
                        {t("our_branches.phone")}
                        {" :"}
                        <a href={`tel:${phone}`} className="text-decoration-none" dir="ltr">
                            {phone}
                        </a>
                    </p>
                    <p className="card-text fs-6 ">
                        {t("our_branches.address")} {" :"} {location}
                    </p>
                    <div className="d-flex flex-column align-items-center">
                        <a href={`tel:${phone}`} className="btn btn-success mb-2">
                            {t("our_branches.call")}
                        </a>
                        <a href={mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            {t("our_branches.open_google_map")}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationCard;
