import React from "react";

const ResponsiveBanner = () => {
    return (
        <div class="banner">
            <div class="container " style={{ backgroundColor: "#d5efff" }}>
                <div class="row">
                    <div class="col-sm-5 text-center p-5">
                        <h1 className="fs-1">Irrigation World</h1>
                        <p className="pt-3">
                            IWACO Irrigation World Agri. Co. شركة عالم الرّي
                            الزراعية A pioneer in HDPE network , we are
                            specialized in supplying all kind of fittings for
                            all kind of network in HDPE. Welding Machines,
                            Tools, Accessories.. etc HDPE PIPE SDR11,SDR17,SDR26
                            electrofusion fittings but welding fittings socket
                            fusion fittings compression fittings drainage
                            fitting pvc fitting.
                        </p>
                        <button class="btn btn-success mt-4">Learn More</button>
                    </div>
                    <div class="col-sm-7">
                        <img
                            class="img-fluid rounded"
                            src="/assets/img/warhouse.jpeg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ResponsiveBanner;
