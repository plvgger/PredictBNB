// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract PredictionMarket is ReentrancyGuard, Ownable, Pausable {
    struct Market {
        uint256 id;
        string question;
        string[] outcomes;
        uint256 endTime;
        bool resolved;
        uint256 winningOutcome;
        uint256 totalLiquidity;
        mapping(uint256 => uint256) outcomeLiquidity;
        mapping(address => mapping(uint256 => uint256)) userShares;
        mapping(address => mapping(uint256 => uint256)) userLiquidity;
        address creator;
        uint256 creationTime;
    }

    struct MarketView {
        uint256 id;
        string question;
        string[] outcomes;
        uint256 endTime;
        bool resolved;
        uint256 winningOutcome;
        uint256 totalLiquidity;
        uint256[] outcomeLiquidity;
        address creator;
        uint256 creationTime;
    }

    uint256 public nextMarketId = 1;
    mapping(uint256 => Market) public markets;
    mapping(address => uint256[]) public userMarkets;
    
    uint256 public constant FEE_PERCENTAGE = 2; // 2% fee
    uint256 public constant MINIMUM_LIQUIDITY = 0.01 ether; // Minimum 0.01 BNB
    
    event MarketCreated(uint256 indexed marketId, address indexed creator, string question);
    event SharesBought(uint256 indexed marketId, address indexed buyer, uint256 outcome, uint256 amount, uint256 shares);
    event MarketResolved(uint256 indexed marketId, uint256 winningOutcome);
    event LiquidityAdded(uint256 indexed marketId, address indexed provider, uint256 amount);
    event SharesRedeemed(uint256 indexed marketId, address indexed user, uint256 outcome, uint256 shares, uint256 payout);

    constructor() {}

    function createMarket(
        string memory _question,
        string[] memory _outcomes,
        uint256 _endTime
    ) external whenNotPaused returns (uint256) {
        require(_outcomes.length >= 2, "Must have at least 2 outcomes");
        require(_endTime > block.timestamp, "End time must be in the future");
        require(bytes(_question).length > 0, "Question cannot be empty");

        uint256 marketId = nextMarketId++;
        Market storage market = markets[marketId];
        
        market.id = marketId;
        market.question = _question;
        market.endTime = _endTime;
        market.creator = msg.sender;
        market.creationTime = block.timestamp;
        
        for (uint256 i = 0; i < _outcomes.length; i++) {
            market.outcomes.push(_outcomes[i]);
        }
        
        userMarkets[msg.sender].push(marketId);
        
        emit MarketCreated(marketId, msg.sender, _question);
        return marketId;
    }

    function addLiquidity(uint256 _marketId) external payable whenNotPaused nonReentrant {
        require(msg.value >= MINIMUM_LIQUIDITY, "Insufficient liquidity amount");
        require(_marketId < nextMarketId, "Market does not exist");
        
        Market storage market = markets[_marketId];
        require(!market.resolved, "Market already resolved");
        require(block.timestamp < market.endTime, "Market has ended");
        
        market.totalLiquidity += msg.value;
        market.userLiquidity[msg.sender][_marketId] += msg.value;
        
        emit LiquidityAdded(_marketId, msg.sender, msg.value);
    }

    function buyShares(
        uint256 _marketId,
        uint256 _outcome,
        uint256 _amount
    ) external payable whenNotPaused nonReentrant {
        require(_marketId < nextMarketId, "Market does not exist");
        require(msg.value == _amount, "Amount mismatch");
        require(_amount > 0, "Amount must be positive");
        
        Market storage market = markets[_marketId];
        require(!market.resolved, "Market already resolved");
        require(block.timestamp < market.endTime, "Market has ended");
        require(_outcome < market.outcomes.length, "Invalid outcome");
        
        // Calculate shares using constant product formula (simplified)
        uint256 shares = calculateShares(_marketId, _outcome, _amount);
        require(shares > 0, "Insufficient shares");
        
        market.outcomeLiquidity[_outcome] += _amount;
        market.totalLiquidity += _amount;
        market.userShares[msg.sender][_outcome] += shares;
        market.userLiquidity[msg.sender][_marketId] += _amount;
        
        emit SharesBought(_marketId, msg.sender, _outcome, _amount, shares);
    }

    function calculateShares(
        uint256 _marketId,
        uint256 _outcome,
        uint256 _amount
    ) public view returns (uint256) {
        Market storage market = markets[_marketId];
        uint256 currentLiquidity = market.outcomeLiquidity[_outcome];
        
        if (currentLiquidity == 0) {
            // If no liquidity, 1:1 ratio
            return _amount;
        }
        
        // Simplified constant product formula
        uint256 totalLiquidity = market.totalLiquidity;
        uint256 newLiquidity = currentLiquidity + _amount;
        uint256 newTotalLiquidity = totalLiquidity + _amount;
        
        // Calculate shares based on liquidity ratio
        return (_amount * currentLiquidity) / newLiquidity;
    }

    function resolveMarket(uint256 _marketId, uint256 _winningOutcome) external onlyOwner {
        require(_marketId < nextMarketId, "Market does not exist");
        
        Market storage market = markets[_marketId];
        require(!market.resolved, "Market already resolved");
        require(block.timestamp >= market.endTime, "Market has not ended");
        require(_winningOutcome < market.outcomes.length, "Invalid winning outcome");
        
        market.resolved = true;
        market.winningOutcome = _winningOutcome;
        
        emit MarketResolved(_marketId, _winningOutcome);
    }

    function redeemShares(uint256 _marketId, uint256 _outcome) external nonReentrant {
        require(_marketId < nextMarketId, "Market does not exist");
        
        Market storage market = markets[_marketId];
        require(market.resolved, "Market not resolved");
        require(_outcome < market.outcomes.length, "Invalid outcome");
        
        uint256 shares = market.userShares[msg.sender][_outcome];
        require(shares > 0, "No shares to redeem");
        
        uint256 payout = 0;
        if (_outcome == market.winningOutcome) {
            // Calculate payout for winning outcome
            uint256 totalWinningShares = market.outcomeLiquidity[_outcome];
            uint256 totalLiquidity = market.totalLiquidity;
            payout = (shares * totalLiquidity) / totalWinningShares;
            
            // Apply fee
            uint256 fee = (payout * FEE_PERCENTAGE) / 100;
            payout -= fee;
        }
        
        // Clear user shares
        market.userShares[msg.sender][_outcome] = 0;
        
        if (payout > 0) {
            payable(msg.sender).transfer(payout);
        }
        
        emit SharesRedeemed(_marketId, msg.sender, _outcome, shares, payout);
    }

    function getUserShares(uint256 _marketId, address _user, uint256 _outcome) external view returns (uint256) {
        return markets[_marketId].userShares[_user][_outcome];
    }

    function getUserLiquidity(uint256 _marketId, address _user) external view returns (uint256) {
        return markets[_marketId].userLiquidity[_user][_marketId];
    }

    function getMarket(uint256 _marketId) external view returns (MarketView memory) {
        require(_marketId < nextMarketId, "Market does not exist");
        
        Market storage market = markets[_marketId];
        uint256[] memory outcomeLiquidity = new uint256[](market.outcomes.length);
        
        for (uint256 i = 0; i < market.outcomes.length; i++) {
            outcomeLiquidity[i] = market.outcomeLiquidity[i];
        }
        
        return MarketView({
            id: market.id,
            question: market.question,
            outcomes: market.outcomes,
            endTime: market.endTime,
            resolved: market.resolved,
            winningOutcome: market.winningOutcome,
            totalLiquidity: market.totalLiquidity,
            outcomeLiquidity: outcomeLiquidity,
            creator: market.creator,
            creationTime: market.creationTime
        });
    }

    function getUserMarkets(address _user) external view returns (uint256[] memory) {
        return userMarkets[_user];
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        payable(owner()).transfer(balance);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    receive() external payable {
        // Allow contract to receive BNB
    }
}
