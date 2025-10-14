const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PredictionMarket", function () {
  let predictionMarket;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    const PredictionMarket = await ethers.getContractFactory("PredictionMarket");
    predictionMarket = await PredictionMarket.deploy();
    await predictionMarket.waitForDeployment();
  });

  describe("Market Creation", function () {
    it("Should create a new market", async function () {
      const question = "Will Bitcoin reach $100,000 by end of 2024?";
      const outcomes = ["Yes", "No"];
      const endTime = Math.floor(Date.now() / 1000) + 86400; // 1 day from now

      const tx = await predictionMarket.createMarket(question, outcomes, endTime);
      await tx.wait();

      const market = await predictionMarket.getMarket(1);
      expect(market.question).to.equal(question);
      expect(market.outcomes.length).to.equal(2);
      expect(market.outcomes[0]).to.equal("Yes");
      expect(market.outcomes[1]).to.equal("No");
      expect(market.creator).to.equal(owner.address);
    });

    it("Should not create market with less than 2 outcomes", async function () {
      const question = "Test question";
      const outcomes = ["Only outcome"];
      const endTime = Math.floor(Date.now() / 1000) + 86400;

      await expect(
        predictionMarket.createMarket(question, outcomes, endTime)
      ).to.be.revertedWith("Must have at least 2 outcomes");
    });

    it("Should not create market with past end time", async function () {
      const question = "Test question";
      const outcomes = ["Yes", "No"];
      const endTime = Math.floor(Date.now() / 1000) - 86400; // 1 day ago

      await expect(
        predictionMarket.createMarket(question, outcomes, endTime)
      ).to.be.revertedWith("End time must be in the future");
    });
  });

  describe("Adding Liquidity", function () {
    beforeEach(async function () {
      const question = "Test question";
      const outcomes = ["Yes", "No"];
      const endTime = Math.floor(Date.now() / 1000) + 86400;

      await predictionMarket.createMarket(question, outcomes, endTime);
    });

    it("Should add liquidity to market", async function () {
      const liquidityAmount = ethers.parseEther("1.0");

      const tx = await predictionMarket.addLiquidity(1, { value: liquidityAmount });
      await tx.wait();

      const market = await predictionMarket.getMarket(1);
      expect(market.totalLiquidity).to.equal(liquidityAmount);
    });

    it("Should not add liquidity below minimum", async function () {
      const liquidityAmount = ethers.parseEther("0.005"); // Below 0.01 BNB minimum

      await expect(
        predictionMarket.addLiquidity(1, { value: liquidityAmount })
      ).to.be.revertedWith("Insufficient liquidity amount");
    });
  });

  describe("Buying Shares", function () {
    beforeEach(async function () {
      const question = "Test question";
      const outcomes = ["Yes", "No"];
      const endTime = Math.floor(Date.now() / 1000) + 86400;

      await predictionMarket.createMarket(question, outcomes, endTime);
      await predictionMarket.addLiquidity(1, { value: ethers.parseEther("10.0") });
    });

    it("Should buy shares in an outcome", async function () {
      const betAmount = ethers.parseEther("1.0");
      const outcome = 0; // "Yes"

      const tx = await predictionMarket.buyShares(1, outcome, { value: betAmount });
      await tx.wait();

      const userShares = await predictionMarket.getUserShares(1, owner.address, outcome);
      expect(userShares).to.be.gt(0);
    });

    it("Should not buy shares in resolved market", async function () {
      // Resolve the market first
      await predictionMarket.resolveMarket(1, 0);

      const betAmount = ethers.parseEther("1.0");
      const outcome = 0;

      await expect(
        predictionMarket.buyShares(1, outcome, { value: betAmount })
      ).to.be.revertedWith("Market already resolved");
    });
  });

  describe("Market Resolution", function () {
    beforeEach(async function () {
      const question = "Test question";
      const outcomes = ["Yes", "No"];
      const endTime = Math.floor(Date.now() / 1000) + 86400;

      await predictionMarket.createMarket(question, outcomes, endTime);
    });

    it("Should resolve market", async function () {
      const winningOutcome = 0;

      const tx = await predictionMarket.resolveMarket(1, winningOutcome);
      await tx.wait();

      const market = await predictionMarket.getMarket(1);
      expect(market.resolved).to.be.true;
      expect(market.winningOutcome).to.equal(winningOutcome);
    });

    it("Should not resolve market before end time", async function () {
      const winningOutcome = 0;

      await expect(
        predictionMarket.resolveMarket(1, winningOutcome)
      ).to.be.revertedWith("Market has not ended");
    });

    it("Should not allow non-owner to resolve market", async function () {
      const winningOutcome = 0;

      await expect(
        predictionMarket.connect(user1).resolveMarket(1, winningOutcome)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
