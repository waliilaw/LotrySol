import React from 'react';

interface LotteryCardProps {
    entryFee: number;
    totalPlayers: number;
    prizePool: number;
    status: string;
}

const LotteryCard: React.FC<LotteryCardProps> = ({ entryFee, totalPlayers, prizePool, status }) => {
    return (
        <div className="lottery-card">
            <h2>Lottery Details</h2>
            <p><strong>Entry Fee:</strong> {entryFee} SOL</p>
            <p><strong>Total Players:</strong> {totalPlayers}</p>
            <p><strong>Prize Pool:</strong> {prizePool} SOL</p>
            <p><strong>Status:</strong> {status}</p>
        </div>
    );
};

export default LotteryCard;