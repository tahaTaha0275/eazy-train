export default function BillDetails({ train, ticketType }) {
  const getBasePrice = () => {
    if (!train) return 95;
    return ticketType === "business"
      ? Number.parseInt(train.businessPrice) - 25
      : Number.parseInt(train.standardPrice) - 25;
  };

  const getTax = () => {
    return 5;
  };

  const getFee = () => {
    return 20;
  };

  const getTotal = () => {
    if (!train) return 120;
    return ticketType === "business"
      ? Number.parseInt(train.businessPrice)
      : Number.parseInt(train.standardPrice);
  };

  return (
    <div className={"bill-details-container"}>
      <h3 className={"title"}>Bill details</h3>

      <div className={"billItem"}>
        <div className={"billLabel"}>Base Ticket Price</div>
        <div className={"billValue"}>{getBasePrice()} SAR</div>
      </div>

      <div className={"billItem"}>
        <div className={"billLabel"}>Tax</div>
        <div className={"billValue"}>{getTax()} SAR</div>
      </div>

      <div className={"billItem"}>
        <div className={"billLabel"}>Fee</div>
        <div className={"billValue"}>{getFee()} SAR</div>
      </div>

      <div className={"totalItem"}>
        <div className={"totalLabel"}>Total Charge</div>
        <div className={"totalValue"}>{getTotal()} SAR</div>
      </div>

      {/* New red cancel button */}
      <div className={"actionItem"}>
        <button className={"cancel-button"} type="button">
          Cancel
        </button>
      </div>
    </div>
  );
}
