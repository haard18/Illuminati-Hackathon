
import EventCard from './EventCard';

interface EventSectionProps {
  title: string;
}

const EventSection = ({ title }: EventSectionProps) => {
  console.log(title); 
  // Music Note SVG Icon
  const MusicNoteIcon = () => (
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="99" height="99" stroke="black"/>
      <path d="M39.5834 87.5C49.9387 87.5 58.3334 79.1053 58.3334 68.75C58.3334 58.3947 49.9387 50 39.5834 50C29.228 50 20.8334 58.3947 20.8334 68.75C20.8334 79.1053 29.228 87.5 39.5834 87.5Z" fill="#FF4A2B"/>
      <path d="M50.0001 12.5V68.75H58.3334V29.1667L81.2501 35.4167V20.8333L50.0001 12.5Z" fill="#FF4A2B"/>
    </svg>
  );

  // New Custom SVG Icon
  const CustomSVGIcon = () => (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44.7525 13.365L44.5724 1.485C44.5665 1.09115 44.4043 0.71581 44.1216 0.44154C43.8389 0.167271 43.4588 0.016542 43.0649 0.0225118L31.185 0.202587C30.8909 0.206519 30.6046 0.297687 30.3623 0.464533C30.1201 0.63138 29.9329 0.866391 29.8244 1.13977C29.7159 1.41315 29.691 1.7126 29.7529 2.00014C29.8148 2.28767 29.9607 2.55036 30.172 2.7549L35.1377 7.56936L1.07051 42.6822L3.20513 44.7531L37.2693 9.63731L42.2321 14.4548C42.4429 14.6599 42.7099 14.7977 42.9992 14.8508C43.2885 14.904 43.587 14.8701 43.857 14.7533C44.127 14.6366 44.3562 14.4423 44.5156 14.1952C44.675 13.948 44.7575 13.659 44.7525 13.365Z" fill="white"/>
    </svg>
  );

  const events = [
    {
      date: '25th February, 2025',
      artist: 'Mohit Chauhan',
      imageUrl: 'src/assets/Images/allevent/eventcardimage.jpeg'
    },
    {
      date: '30th February, 2025',
      artist: 'Arijit Singh',
      imageUrl: 'src/assets/Images/allevent/cardimage2.jpeg'
    }
  ];

  return (
    <section className="px-10 py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-6xl font-['Karantina-bold'] text-white uppercase flex items-center">
            <span>Musical&nbsp;</span>
            <span style={{ color: '#FC75AB' }}>Events</span>
          </h2>
          <MusicNoteIcon /> {/* Using Music Note SVG */}
        </div>
        <button className="flex items-center gap-2 text-white font-['Karantina-Regular'] text-4xl">
          <span>See All</span>
          < CustomSVGIcon/>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
        {events.map((event) => (
          <EventCard
            key={event.artist}
            date={event.date}
            artist={event.artist}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default EventSection;
