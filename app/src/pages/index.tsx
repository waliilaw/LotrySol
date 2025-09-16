import React from 'react';
import ConnectWallet from '../components/ConnectWallet';
import LotteryCard from '../components/LotteryCard';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to LotrySol</h1>
            <ConnectWallet />
            <LotteryCard />
        </div>
    );
};

export default Home;