import React, { useState } from 'react';

type SeatId = string;

const SeatMap: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<SeatId[]>([]);
  const totalRows = 10;
  const seatsPerRow = 8;

  const handleSeatClick = (row: number, seat: number): void => {
    const seatId: SeatId = `${row}-${seat}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const renderSeats = (): JSX.Element[] => {
    const seatRows: JSX.Element[] = [];
    for (let row = 1; row <= totalRows; row++) {
      const seats: JSX.Element[] = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId: SeatId = `${row}-${seat}`;
        const isSelected = selectedSeats.includes(seatId);
        seats.push(
          <div
            key={seatId}
            className={`seat ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSeatClick(row, seat)}
          >
            {seat}
          </div>
        );
      }
      seatRows.push(
        <div className='row' key={row}>
          {seats}
        </div>
      );
    }
    return seatRows;
  };

  return (
    <div className='seat-selection'>
      <h2>Select your seats</h2>
      <div className='screen'>Screen</div>
      <div className='seats-grid'>{renderSeats()}</div>
      <p>Selected Seats: {selectedSeats.join(', ')}</p>
    </div>
  );
};

export default SeatMap;
