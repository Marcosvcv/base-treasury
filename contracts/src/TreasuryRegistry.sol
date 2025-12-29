// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TreasuryRegistry
 * @author BaseTreasury
 * @notice Public registry for treasury addresses and metadata on Base
 * @dev Enables discoverability and composability of treasury data
 */
contract TreasuryRegistry {
    /// @notice Treasury information structure
    struct Treasury {
        address treasury;      // Treasury wallet address
        string name;           // Human-readable name
        string category;       // DAO, Grant, Protocol, etc.
        bool verified;         // Whether treasury is verified
        address registrant;    // Who registered this treasury
        uint256 registeredAt; // Timestamp of registration
    }

    /// @notice Mapping from treasury address to Treasury struct
    mapping(address => Treasury) public treasuries;

    /// @notice Array of all registered treasury addresses
    address[] public treasuryList;

    /// @notice Mapping to check if address is already registered
    mapping(address => bool) public isRegistered;

    /// @notice Owner of the registry (can verify treasuries)
    address public owner;

    /// @notice Events
    event TreasuryRegistered(
        address indexed treasury,
        string name,
        string category,
        address indexed registrant
    );

    event TreasuryVerified(address indexed treasury, bool verified);
    event TreasuryUpdated(
        address indexed treasury,
        string name,
        string category
    );

    /// @notice Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "TreasuryRegistry: not owner");
        _;
    }

    modifier onlyRegistrant(address treasury) {
        require(
            treasuries[treasury].registrant == msg.sender,
            "TreasuryRegistry: not registrant"
        );
        _;
    }

    /// @notice Constructor
    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Register a new treasury
     * @param treasury Address of the treasury wallet
     * @param name Human-readable name
     * @param category Category (DAO, Grant, Protocol, etc.)
     */
    function registerTreasury(
        address treasury,
        string memory name,
        string memory category
    ) external {
        require(treasury != address(0), "TreasuryRegistry: zero address");
        require(!isRegistered[treasury], "TreasuryRegistry: already registered");
        require(bytes(name).length > 0, "TreasuryRegistry: empty name");

        treasuries[treasury] = Treasury({
            treasury: treasury,
            name: name,
            category: category,
            verified: false,
            registrant: msg.sender,
            registeredAt: block.timestamp
        });

        treasuryList.push(treasury);
        isRegistered[treasury] = true;

        emit TreasuryRegistered(treasury, name, category, msg.sender);
    }

    /**
     * @notice Update treasury metadata (only by registrant)
     * @param treasury Address of the treasury
     * @param name New name
     * @param category New category
     */
    function updateTreasury(
        address treasury,
        string memory name,
        string memory category
    ) external onlyRegistrant(treasury) {
        require(isRegistered[treasury], "TreasuryRegistry: not registered");
        require(bytes(name).length > 0, "TreasuryRegistry: empty name");

        treasuries[treasury].name = name;
        treasuries[treasury].category = category;

        emit TreasuryUpdated(treasury, name, category);
    }

    /**
     * @notice Verify a treasury (only owner)
     * @param treasury Address of the treasury
     * @param verified Verification status
     */
    function verifyTreasury(address treasury, bool verified)
        external
        onlyOwner
    {
        require(isRegistered[treasury], "TreasuryRegistry: not registered");
        treasuries[treasury].verified = verified;
        emit TreasuryVerified(treasury, verified);
    }

    /**
     * @notice Get treasury information
     * @param treasury Address of the treasury
     * @return Treasury struct
     */
    function getTreasury(address treasury)
        external
        view
        returns (Treasury memory)
    {
        require(isRegistered[treasury], "TreasuryRegistry: not registered");
        return treasuries[treasury];
    }

    /**
     * @notice Get total number of registered treasuries
     * @return count Number of treasuries
     */
    function getTreasuryCount() external view returns (uint256) {
        return treasuryList.length;
    }

    /**
     * @notice Get all treasury addresses
     * @return Array of treasury addresses
     */
    function getAllTreasuries() external view returns (address[] memory) {
        return treasuryList;
    }

    /**
     * @notice Get multiple treasury details
     * @param startIndex Starting index
     * @param count Number of treasuries to fetch
     * @return Array of Treasury structs
     */
    function getTreasuries(uint256 startIndex, uint256 count)
        external
        view
        returns (Treasury[] memory)
    {
        require(
            startIndex < treasuryList.length,
            "TreasuryRegistry: invalid start index"
        );

        uint256 endIndex = startIndex + count;
        if (endIndex > treasuryList.length) {
            endIndex = treasuryList.length;
        }

        uint256 resultCount = endIndex - startIndex;
        Treasury[] memory result = new Treasury[](resultCount);

        for (uint256 i = 0; i < resultCount; i++) {
            result[i] = treasuries[treasuryList[startIndex + i]];
        }

        return result;
    }
}

