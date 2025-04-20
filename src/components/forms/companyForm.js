import { useTranslation } from "react-i18next";
import locations from "../../data/ourData/Location.json";
import { useParams } from "react-router-dom";

const CompanyForm = ({ info, setInfo }) => {
    const { t } = useTranslation();
    const { lang } = useParams();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <div className="row">
                <div className="input-container-checkout">
                    <input type="text" name="firstName" required onChange={handleChange} value={info.firstName} />
                    <label htmlFor="firstName" className="rounded">
                        {t("billing_address.first_name")}
                    </label>
                </div>

                <div className="input-container-checkout">
                    <input type="text" name="lastName" required onChange={handleChange} value={info.lastName} />
                    <label htmlFor="lastName" className="rounded">
                        {t("billing_address.last_name")}
                    </label>
                </div>

                <div className="input-container-checkout">
                    <input type="text" name="companyName" required onChange={handleChange} value={info.companyName} />
                    <label htmlFor="companyName" className="rounded">
                        {t("billing_address.company_name")}
                    </label>
                </div>

                <div className="input-container-checkout">
                    <input type="text" name="vat" required onChange={handleChange} value={info.vat} />
                    <label htmlFor="vat" className="rounded">
                        {t("billing_address.vat_number")}
                    </label>
                </div>

                <div className="input-container-checkout">
                    <input type="text" name="address" required onChange={handleChange} value={info.address} />
                    <label htmlFor="address" className="rounded">
                        {t("billing_address.address")}
                    </label>
                </div>

                <div className="input-container-checkout">
                    <input type="text" name="street" required onChange={handleChange} value={info.street} />
                    <label htmlFor="street" className="rounded">
                        {t("billing_address.street")}
                    </label>
                </div>

                <div className="input-container-checkout">
                    <input type="text" name="building" required onChange={handleChange} value={info.building} />
                    <label htmlFor="building" className="rounded">
                        {t("billing_address.building")}
                    </label>
                </div>

                <div className="input-container-checkout">
                    <input type="text" name="postcode" required onChange={handleChange} value={info.postcode} />
                    <label htmlFor="postcode" className="rounded">
                        {t("billing_address.postcode")}
                    </label>
                </div>

                <hr />

                <div className="input-container-checkout">
                    <div className="billing-select">
                        <label htmlFor="idType">{t("billing_address.id_type")}</label>
                        <select name="idType" value={info.idType} onChange={handleChange} required>
                            <option value="" disabled>
                                {t("billing_address.select_id_type")}
                            </option>

                            <option>{t("billing_address.700_number")}</option>
                            <option>{t("billing_address.commercial_registration_number")}</option>
                            <option>{t("billing_address.gcc_id")}</option>
                            <option>{t("billing_address.iqama_number")}</option>
                            <option>{t("billing_address.mhrsd_license")}</option>
                            <option>{t("billing_address.national_id")}</option>
                            <option>{t("billing_address.passport_id")}</option>
                            <option>{t("billing_address.misa_license")}</option>
                            <option>{t("billing_address.tax_identification_number")}</option>
                        </select>
                    </div>
                </div>

                <div className="input-container-checkout">
                    <input type="text" name="idNumber" required onChange={handleChange} value={info.idNumber} />
                    <label htmlFor="idNumber" className="rounded">
                        {t("billing_address.id_number")}
                    </label>
                </div>

                <div className="input-container-checkout">
                    <div className="billing-select">
                        <label htmlFor="Branch">{t("billing_address.pick_up_branch")}</label>
                        <select name="Branch" value={info.Branch} onChange={handleChange} required>
                            <option value="" disabled>
                                {t("billing_address.pick_branch")}
                            </option>
                            {locations.map((location) => {
                                const BranchName = location[`name-${lang}`] || location[`name-en`];
                                return <option>{BranchName}</option>;
                            })}
                        </select>
                    </div>
                </div>

                <div className="input-container-checkout">
                    <div className="billing-info">
                        <div className="input-group mr-sm-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text py-2">+966</div>
                            </div>
                            <input type="text" name="phone" className="form-control" placeholder={t("billing_address.phone_number")} value={info.phone} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                <div className="input-container-checkout">
                    <input type="email" name="email" id="email" required onChange={handleChange} value={info.email} />
                    <label htmlFor="email" className="rounded">
                        {t("billing_address.email")}
                    </label>
                </div>
            </div>

            <hr />
            <div className="additional-info-wrap">
                <h4>{t("checkout.additional_information")}</h4>
                <div className="additional-info">
                    <label>{t("checkout.order_notes")}</label>
                    <textarea placeholder={t("checkout.order_notes_placeholder")} name="message" defaultValue={""} />
                </div>
            </div>
        </>
    );
};

export default CompanyForm;
