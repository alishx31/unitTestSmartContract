const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Faucet", () => {

    deployContractAndSetVariables = async () => {
        const Faucet = await ethers.getContractFactory('Faucet')
        const faucet = await Faucet.deploy();
        console.log('contract addess:', faucet.address);
        const [owner] = await ethers.getSigners();
        console.log('contact owner:', owner.address);
        let withdrawAmount = ethers.parseEther('1');

        return { faucet, owner, withdrawAmount, };

    }

    it('should deploy and set the owner correctly', async () => {
        const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
        expect(await faucet.owner()).to.equal(owner.address);
    })

    it('should not allow withdraw above .1 ether', async () => {
        const { faucet, withdrawAmount } = await loadFixture(
            deployContractAndSetVariables
        );
        await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
    });
})