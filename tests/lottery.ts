use anchor_lang::prelude::*;


// Imports the core Anchor framework utilities and types
// Imports serialization traits (note: there's a typo, should be Serialize, Deserialize)

// #[program] macro marks this as an Anchor program module

// Defines the main program module named "lottery"

// Brings all items from outer scope

// Initialize function - called when creating a new lottery
// ctx: Context holds all account information
// entry_fee: Amount in lamports (1 SOL = 1 billion lamports) required to enter

// Get mutable reference to lottery account

// Set manager's public key (address) from the signer

// Set entry fee amount

// Set lottery as active

// Initialize empty vector to store player addresses

// Set winner as None (no winner yet)

// Return success

// Define account validation structure for Initialize instruction
// Account validation rules (incomplete in your code)
// init: Create new account
// payer: Who pays for account creation