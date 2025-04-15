const ProductTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center mt-3">No data available</p>;
    }
    console.log(data);

    const headers = Object.keys(data[0]);

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped">
                <thead className="table-primary">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="text-center">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td key={colIndex} className="text-center">
                                    {row[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ProductTable;
