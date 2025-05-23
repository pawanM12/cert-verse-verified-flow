
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {
    struct Certificate {
        address issuer;
        string recipient;
        string issuerName;
        uint256 issueDate;
        uint256 expiryDate;
        bool isValid;
    }

    mapping(bytes32 => Certificate) public certificates;
    
    event CertificateIssued(
        bytes32 indexed certificateHash,
        address indexed issuer,
        string recipient,
        uint256 timestamp
    );
    
    event CertificateRevoked(
        bytes32 indexed certificateHash,
        address indexed revoker,
        uint256 timestamp
    );
    
    constructor() {}
    
    function issueCertificate(
        bytes32 _certificateHash,
        string memory _recipient,
        string memory _issuerName,
        uint256 _issueDate,
        uint256 _expiryDate
    ) public {
        require(certificates[_certificateHash].issuer == address(0), "Certificate already exists");
        
        certificates[_certificateHash] = Certificate({
            issuer: msg.sender,
            recipient: _recipient,
            issuerName: _issuerName,
            issueDate: _issueDate == 0 ? block.timestamp : _issueDate,
            expiryDate: _expiryDate,
            isValid: true
        });
        
        emit CertificateIssued(_certificateHash, msg.sender, _recipient, block.timestamp);
    }
    
    function revokeCertificate(bytes32 _certificateHash) public {
        require(certificates[_certificateHash].issuer == msg.sender, "Only issuer can revoke");
        require(certificates[_certificateHash].isValid, "Certificate already revoked");
        
        certificates[_certificateHash].isValid = false;
        
        emit CertificateRevoked(_certificateHash, msg.sender, block.timestamp);
    }
    
    function verifyCertificate(bytes32 _certificateHash) public view returns (Certificate memory) {
        Certificate memory cert = certificates[_certificateHash];
        
        // Check if certificate exists
        require(cert.issuer != address(0), "Certificate does not exist");
        
        // Check if certificate is not expired
        if (cert.expiryDate > 0) {
            cert.isValid = cert.isValid && (block.timestamp <= cert.expiryDate);
        }
        
        return cert;
    }
}
