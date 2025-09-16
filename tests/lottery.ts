// This file contains the test cases for the lottery smart contract, ensuring that all functionalities work as expected.

import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Lottery", function () {
    let lottery: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    const entryFee = ethers.parseEther("0.1"); // ethers v6

    beforeEach(async function () {
        // get accounts
        [owner, addr1, addr2] = await ethers.getSigners();

        // deploy contract
        const Lottery = await ethers.getContractFactory("Lottery");
        lottery = await Lottery.deploy();
        await lottery.waitForDeployment(); // ethers v6
    });

    describe("Deployment", function () {
        it("Should set the right manager", async function () {
            expect(await lottery.manager()).to.equal(owner.address);
        });

        it("Should set correct entry fee", async function () {
            expect(await lottery.entryFee()).to.equal(entryFee);
        });
    });

    describe("Entering lottery", function () {
        it("Should allow players to enter with correct fee", async function () {
            await lottery.connect(addr1).enter({ value: entryFee });
            const players = await lottery.viewPlayers();
            expect(players[0]).to.equal(addr1.address);
        });

        it("Should reject entries with incorrect fee", async function () {
            await expect(
                lottery.connect(addr1).enter({ 
                    value: ethers.parseEther("0.05") 
                })
            ).to.be.revertedWith("Entry Fee is 0.1 ETH");
        });
    });
});