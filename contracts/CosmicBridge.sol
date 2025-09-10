// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CosmicBridge is SepoliaConfig {
    using FHE for *;
    
    struct BridgeTransaction {
        euint32 transactionId;
        euint32 amount;
        euint8 fromChainId;
        euint8 toChainId;
        euint8 tokenId;
        address user;
        bool isCompleted;
        bool isEncrypted;
        uint256 timestamp;
        string txHash;
    }
    
    struct ChainInfo {
        string name;
        string symbol;
        bool isActive;
        uint256 chainId;
    }
    
    struct TokenInfo {
        string symbol;
        string name;
        bool isSupported;
        uint8 decimals;
    }
    
    mapping(uint256 => BridgeTransaction) public transactions;
    mapping(uint8 => ChainInfo) public supportedChains;
    mapping(uint8 => TokenInfo) public supportedTokens;
    mapping(address => euint32) public userBalances;
    mapping(address => euint32) public userReputation;
    
    uint256 public transactionCounter;
    address public owner;
    address public verifier;
    
    // Chain IDs
    uint8 constant ETHEREUM = 1;
    uint8 constant POLYGON = 137;
    uint8 constant BSC = 56;
    uint8 constant AVALANCHE = 43114;
    
    // Token IDs
    uint8 constant ETH = 1;
    uint8 constant USDC = 2;
    uint8 constant USDT = 3;
    uint8 constant WBTC = 4;
    
    event TransactionInitiated(
        uint256 indexed transactionId,
        address indexed user,
        uint8 fromChainId,
        uint8 toChainId,
        uint8 tokenId
    );
    
    event TransactionCompleted(
        uint256 indexed transactionId,
        address indexed user,
        string txHash
    );
    
    event ChainAdded(uint8 indexed chainId, string name, string symbol);
    event TokenAdded(uint8 indexed tokenId, string symbol, string name);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        
        // Initialize supported chains
        _initializeChains();
        
        // Initialize supported tokens
        _initializeTokens();
    }
    
    function _initializeChains() private {
        supportedChains[ETHEREUM] = ChainInfo({
            name: "Ethereum",
            symbol: "ETH",
            isActive: true,
            chainId: 1
        });
        
        supportedChains[POLYGON] = ChainInfo({
            name: "Polygon",
            symbol: "MATIC",
            isActive: true,
            chainId: 137
        });
        
        supportedChains[BSC] = ChainInfo({
            name: "BSC",
            symbol: "BNB",
            isActive: true,
            chainId: 56
        });
        
        supportedChains[AVALANCHE] = ChainInfo({
            name: "Avalanche",
            symbol: "AVAX",
            isActive: true,
            chainId: 43114
        });
    }
    
    function _initializeTokens() private {
        supportedTokens[ETH] = TokenInfo({
            symbol: "ETH",
            name: "Ethereum",
            isSupported: true,
            decimals: 18
        });
        
        supportedTokens[USDC] = TokenInfo({
            symbol: "USDC",
            name: "USD Coin",
            isSupported: true,
            decimals: 6
        });
        
        supportedTokens[USDT] = TokenInfo({
            symbol: "USDT",
            name: "Tether",
            isSupported: true,
            decimals: 6
        });
        
        supportedTokens[WBTC] = TokenInfo({
            symbol: "WBTC",
            name: "Wrapped Bitcoin",
            isSupported: true,
            decimals: 8
        });
    }
    
    function initiateBridge(
        externalEuint32 amount,
        euint8 fromChainId,
        euint8 toChainId,
        euint8 tokenId,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(supportedChains[FHE.decrypt(fromChainId)].isActive, "Source chain not supported");
        require(supportedChains[FHE.decrypt(toChainId)].isActive, "Destination chain not supported");
        require(supportedTokens[FHE.decrypt(tokenId)].isSupported, "Token not supported");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        transactions[transactionId] = BridgeTransaction({
            transactionId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            fromChainId: fromChainId,
            toChainId: toChainId,
            tokenId: tokenId,
            user: msg.sender,
            isCompleted: false,
            isEncrypted: true,
            timestamp: block.timestamp,
            txHash: ""
        });
        
        // Update user balance (encrypted)
        userBalances[msg.sender] = FHE.add(userBalances[msg.sender], internalAmount);
        
        emit TransactionInitiated(
            transactionId,
            msg.sender,
            FHE.decrypt(fromChainId),
            FHE.decrypt(toChainId),
            FHE.decrypt(tokenId)
        );
        
        return transactionId;
    }
    
    function completeBridge(
        uint256 transactionId,
        string memory txHash
    ) public {
        require(msg.sender == verifier, "Only verifier can complete transactions");
        require(transactions[transactionId].user != address(0), "Transaction does not exist");
        require(!transactions[transactionId].isCompleted, "Transaction already completed");
        
        transactions[transactionId].isCompleted = true;
        transactions[transactionId].txHash = txHash;
        
        emit TransactionCompleted(
            transactionId,
            transactions[transactionId].user,
            txHash
        );
    }
    
    function addSupportedChain(
        uint8 chainId,
        string memory name,
        string memory symbol
    ) public {
        require(msg.sender == owner, "Only owner can add chains");
        require(!supportedChains[chainId].isActive, "Chain already exists");
        
        supportedChains[chainId] = ChainInfo({
            name: name,
            symbol: symbol,
            isActive: true,
            chainId: chainId
        });
        
        emit ChainAdded(chainId, name, symbol);
    }
    
    function addSupportedToken(
        uint8 tokenId,
        string memory symbol,
        string memory name,
        uint8 decimals
    ) public {
        require(msg.sender == owner, "Only owner can add tokens");
        require(!supportedTokens[tokenId].isSupported, "Token already exists");
        
        supportedTokens[tokenId] = TokenInfo({
            symbol: symbol,
            name: name,
            isSupported: true,
            decimals: decimals
        });
        
        emit TokenAdded(tokenId, symbol, name);
    }
    
    function updateUserReputation(
        address user,
        euint32 reputation
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getTransactionInfo(uint256 transactionId) public view returns (
        uint8 amount,
        uint8 fromChainId,
        uint8 toChainId,
        uint8 tokenId,
        address user,
        bool isCompleted,
        bool isEncrypted,
        uint256 timestamp,
        string memory txHash
    ) {
        BridgeTransaction storage tx = transactions[transactionId];
        return (
            0, // FHE.decrypt(tx.amount) - will be decrypted off-chain
            FHE.decrypt(tx.fromChainId),
            FHE.decrypt(tx.toChainId),
            FHE.decrypt(tx.tokenId),
            tx.user,
            tx.isCompleted,
            tx.isEncrypted,
            tx.timestamp,
            tx.txHash
        );
    }
    
    function getUserBalance(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userBalances[user]) - will be decrypted off-chain
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getChainInfo(uint8 chainId) public view returns (
        string memory name,
        string memory symbol,
        bool isActive,
        uint256 chainIdValue
    ) {
        ChainInfo storage chain = supportedChains[chainId];
        return (
            chain.name,
            chain.symbol,
            chain.isActive,
            chain.chainId
        );
    }
    
    function getTokenInfo(uint8 tokenId) public view returns (
        string memory symbol,
        string memory name,
        bool isSupported,
        uint8 decimals
    ) {
        TokenInfo storage token = supportedTokens[tokenId];
        return (
            token.symbol,
            token.name,
            token.isSupported,
            token.decimals
        );
    }
    
    function withdrawFunds(uint256 transactionId) public {
        require(transactions[transactionId].user == msg.sender, "Only transaction owner can withdraw");
        require(transactions[transactionId].isCompleted, "Transaction must be completed");
        
        // Transfer funds to user
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        transactions[transactionId].isCompleted = true;
        
        // For now, we'll transfer a placeholder amount
        // payable(msg.sender).transfer(amount);
    }
}
