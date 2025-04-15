const PersonalForm = ({ info, setInfo }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="row">
            <div className="input-container-checkout">
                <input type="text" name="firstName" required onChange={handleChange} value={info.firstName} />
                <label htmlFor="firstName" className="rounded">
                    First Name
                </label>
            </div>

            <div className="input-container-checkout">
                <input type="text" name="lastName" required onChange={handleChange} value={info.lastName} />
                <label htmlFor="lastName" className="rounded">
                    Last Name
                </label>
            </div>

            <div className="input-container-checkout">
                <input type="text" name="address" required onChange={handleChange} value={info.address} />
                <label htmlFor="address" className="rounded">
                    Address
                </label>
            </div>

            <div className="input-container-checkout">
                <input type="text" name="street" required onChange={handleChange} value={info.street} />
                <label htmlFor="street" className="rounded">
                    Street Name
                </label>
            </div>

            <div className="input-container-checkout">
                <input type="text" name="building" required onChange={handleChange} value={info.building} />
                <label htmlFor="building" className="rounded">
                    Building No.
                </label>
            </div>

            <div className="input-container-checkout">
                <input type="text" name="postcode" required onChange={handleChange} value={info.postcode} />
                <label htmlFor="postcode" className="rounded">
                    Postcode / ZIP
                </label>
            </div>

            <hr />

            <div className="input-container-checkout">
                <div className="billing-select">
                    <label htmlFor="idType">ID Type</label>
                    <select name="idType" value={info.idType} onChange={handleChange} required>
                        <option value="">Select a ID Type</option>
                        <option>700 Number</option>
                        <option>Commercial registration number</option>
                        <option>GCC ID</option>
                        <option>Iqama Number</option>
                        <option>MHRSD license</option>
                        <option>National ID</option>
                        <option>Passpord ID</option>
                        <option>MISA license</option>
                        <option>Tax identification Number</option>
                        <option>Other ID</option>
                    </select>
                </div>
            </div>

            <div className="input-container-checkout">
                <input type="text" name="idNumber" required onChange={handleChange} value={info.idNumber} />
                <label htmlFor="idNumber" className="rounded">
                    ID Number
                </label>
            </div>

            <div className="input-container-checkout">
                <div className="billing-select">
                    <label htmlFor="Branch">Pick Up Branch</label>
                    <select name="Branch" value={info.Branch} onChange={handleChange} required>
                        <option value="">Select a Branch</option>
                        <option>Riyadh - Salmanya</option>
                        <option>Riyadh - Malaz</option>
                        <option>Riyadh - Salam</option>
                        <option>Jaddeh</option>
                        <option>Dammam</option>
                    </select>
                </div>
            </div>

            <div className="input-container-checkout">
                <div className="billing-info">
                    <div className="input-group mr-sm-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text py-2">+966</div>
                        </div>
                        <input type="text" name="phone" className="form-control" placeholder="Phone Number" value={info.phone} onChange={handleChange} required />
                    </div>
                </div>
            </div>

            <div className="input-container-checkout">
                <input type="email" name="email" required onChange={handleChange} value={info.email} />
                <label htmlFor="email" className="rounded">
                    Email Address
                </label>
            </div>
        </div>
    );
};

export default PersonalForm;
