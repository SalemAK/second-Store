import { useLocation } from "react-router-dom";
import ProformaInvoice from "../../components/proforma-invoice/performaInvoce";

const PlaceOrder = () => {
    const { state } = useLocation();
    const order = state || {};

    return (
        <div>
            <ProformaInvoice order={order} />
        </div>
    );
};

export default PlaceOrder;
