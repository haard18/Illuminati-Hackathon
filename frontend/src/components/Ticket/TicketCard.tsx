  import React from "react";
import logo from "../../assets/Images/logo1.png";
  interface TicketCardProps {
    eventName: string;
    eventDate: string;
    ticketCount: number;
    pricePerTicket: number;
    section: string;
    row: string;
    tax: number;
    totalAmount: number;
    imageUrl: string;
  }

  const TicketCard: React.FC<TicketCardProps> = ({
    eventName,
    eventDate,
    ticketCount,
    pricePerTicket,
    section,
    row,
    tax,
    totalAmount,
    imageUrl,
  }) => {
    return (
      <div className="relative w-[320px] bg-gray-200 py-6 px-8 h-[550px] rounded-[30px] shadow-lg">
        {/* Top Image Section */}
        <div className="relative">
          <img
            src={logo}
            alt="Event"
            className="w-full h-32 object-cover rounded-[30px]"
          />
        </div>

        {/* Horizontal SVG Line */}
        <div className="mt-2 flex justify-center">
          <svg width="371" height="11" viewBox="0 0 371 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.437744" y="0.626709" width="370.142" height="9.79733" fill="#666666" />
          </svg>
        </div>

        {/* Circular Cutouts for Ticket Shape */}
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-black w-20 h-20 rounded-full"></div>
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-black w-20 h-20 rounded-full"></div>

        {/* Ticket Details */}
        <div className="text-center mt-2 ">
          <h2 className="text-xl font-[Karantina-Bold] text-black">{eventName}</h2>
          <p className="text-[#FF4A2B] font-[Kanit-semibold]">{eventDate}</p>
          <div className="flex justify-between items-center w-full mt-4 px-6 relative mr-[20%]">
            <span className="text-lg font-[Kanit-semibold] ml-4">{ticketCount} Tickets</span>
            <div className="w-12 h-12 flex justify-center items-center rounded-lg ml-auto">
              <div className="w-10 h-10 bg-black">
                <img src={imageUrl} alt="Event" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Price Details */}
        <div className="mt-22.5 p-2 bg-[#BAB6B6] rounded-md">
          <p className="flex justify-between text-sm font-[Kanit-regular] text-[#2F2F2F]">
            <span>Tickets</span> <span>{ticketCount}</span>
          </p>
          <p className="flex justify-between text-sm font-[Kanit-regular] text-[#2F2F2F]">
            <span>Price Per Ticket</span> <span>${pricePerTicket.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-sm font-[Kanit-regular] text-[#2F2F2F]">
            <span>Section</span> <span>{section}</span>
          </p>
          <p className="flex justify-between text-sm font-[Kanit-regular] text-[#2F2F2F]">
            <span>Row</span> <span>{row}</span>
          </p>
          <p className="flex justify-between text-sm font-[Kanit-regular] text-[#2F2F2F]">
            <span>Tax</span> <span>${tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-[Kanit-semibold] text-[#2F2F2F]">
            <span>Total Amount</span> <span>${totalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>
    );
  };

  export default TicketCard;