import { useNavigate } from "react-router-dom";

export default function BillDetails({ train, ticketType }) {
  const navigate = useNavigate();

  const getBasePrice = () => {
    if (!train) return 95;
    return ticketType === "business"
      ? Number.parseInt(220) - 25
      : Number.parseInt(120) - 25;
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
      ? Number.parseInt(220)
      : Number.parseInt(120);
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

      <div className={"actionItem"}>
        <button className={"cancel-button"} type="button" onClick={() => navigate("/home")}>
          Cancel
        </button>
      </div>
    </div>
  );
}
