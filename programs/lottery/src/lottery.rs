use anchor_lang::prelude::*;

declare_id!("YourProgramIDHere");

#[program]
pub mod lottery {
    use super::*;

    pub fn create_lottery(ctx: Context<CreateLottery>, entry_fee: u64) -> ProgramResult {
        let lottery = &mut ctx.accounts.lottery;
        lottery.manager = *ctx.accounts.owner.key;
        lottery.entry_fee = entry_fee;
        lottery.players = Vec::new();
        lottery.is_active = true;
        Ok(())
    }

    pub fn enter_lottery(ctx: Context<EnterLottery>) -> ProgramResult {
        let lottery = &mut ctx.accounts.lottery;
        let player = &ctx.accounts.player;

        require!(lottery.is_active, LotteryError::LotteryNotActive);
        require!(player.lamports() >= lottery.entry_fee, LotteryError::InsufficientFunds);

        lottery.players.push(*player.key);
        Ok(())
    }

    pub fn pick_winner(ctx: Context<PickWinner>) -> ProgramResult {
        let lottery = &mut ctx.accounts.lottery;
        require!(lottery.is_active, LotteryError::LotteryNotActive);
        require!(lottery.players.len() > 0, LotteryError::NoPlayers);

        let winner_index = rand::random::<usize>() % lottery.players.len();
        let winner = lottery.players[winner_index];

        // Transfer prize to winner (implement prize logic)
        lottery.is_active = false; // End lottery
        Ok(())
    }

    pub fn claim_prize(ctx: Context<ClaimPrize>) -> ProgramResult {
        // Logic for claiming prize
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateLottery<'info> {
    #[account(init)]
    pub lottery: ProgramAccount<'info, Lottery>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct EnterLottery<'info> {
    #[account(mut)]
    pub lottery: ProgramAccount<'info, Lottery>,
    pub player: Signer<'info>,
}

#[derive(Accounts)]
pub struct PickWinner<'info> {
    #[account(mut)]
    pub lottery: ProgramAccount<'info, Lottery>,
}

#[derive(Accounts)]
pub struct ClaimPrize<'info> {
    #[account(mut)]
    pub lottery: ProgramAccount<'info, Lottery>,
    pub winner: Signer<'info>,
}

#[account]
pub struct Lottery {
    pub manager: Pubkey,
    pub entry_fee: u64,
    pub players: Vec<Pubkey>,
    pub is_active: bool,
}

#[error]
pub enum LotteryError {
    #[msg("The lottery is not active.")]
    LotteryNotActive,
    #[msg("Insufficient funds to enter the lottery.")]
    InsufficientFunds,
    #[msg("No players in the lottery.")]
    NoPlayers,
}