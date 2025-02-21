import React from "react";
import TicketCard from "./TicketCard";

const CustomSVGIcon = () => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M44.7525 13.365L44.5724 1.485C44.5665 1.09115 44.4043 0.71581 44.1216 0.44154C43.8389 0.167271 43.4588 0.016542 43.0649 0.0225118L31.185 0.202587C30.8909 0.206519 30.6046 0.297687 30.3623 0.464533C30.1201 0.63138 29.9329 0.866391 29.8244 1.13977C29.7159 1.41315 29.691 1.7126 29.7529 2.00014C29.8148 2.28767 29.9607 2.55036 30.172 2.7549L35.1377 7.56936L1.07051 42.6822L3.20513 44.7531L37.2693 9.63731L42.2321 14.4548C42.4429 14.6599 42.7099 14.7977 42.9992 14.8508C43.2885 14.904 43.587 14.8701 43.857 14.7533C44.127 14.6366 44.3562 14.4423 44.5156 14.1952C44.675 13.948 44.7575 13.659 44.7525 13.365Z" fill="white"/>
  </svg>
);

const TicketComponent: React.FC = () => {
  const ticketData = {
    eventName: "D.Y. PATIL STADIUM",
    eventDate: "Saturday, 25 January 6:00 pm",
    ticketCount: 4,
    pricePerTicket: 30.0,
    section: "D-10",
    row: "30-34",
    tax: 5.46,
    totalAmount: 125.46,
    imageUrl: "src/assets/images/allevent/ticketimage.jpeg",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      {/* Left Static Content */}
      <div className="w-1/2 p-40">
        <div className="text-left">
          <div className="flex items-center">
            <svg
              width="150"
              height="150"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="98" stroke="white" strokeWidth="4" />
              <path
                d="M138.389 52.2695L89.3611 116.908L60.375 87.9432L47 101.318L91.5764 145.895L154 65.6445L138.389 52.2695Z"
                fill="#3A9440"
              />
            </svg>
          </div>
          <h1 className="text-8xl font-bold font-[Karantina-bold] mt-4">SUCCESSFUL !</h1>
          <p className="text-2xl font-[Kanit-regular] mt-2">
            Your ticket has been booked successfully!
            <br />
            You will receive a confirmation shortly.
          </p>
          <p className="text-2xl font-[Kanit-light] mt-4">
            Keep checking your mails in case you missed anything!
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button className="px-8 py-2 bg-[#A14BFD] text-white text-2xl font-[Karantina-bold] rounded-[13px]">
              RETURN
            </button>
            <CustomSVGIcon />
          </div>
        </div>
      </div>

      {/* Right Side - Ticket Card Component */}
      <div className="w-1/2 flex justify-center">
        <TicketCard {...ticketData} />
      </div>
    </div>
  );
};

export default TicketComponent;