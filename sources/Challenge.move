module SkillVerification::Challenge {

    use std::signer;
    use std::string;
    use std::option;
    use aptos_std::coin;
    use aptos_std::aptos_coin::AptosCoin;

    struct ChallengeState has key {
        target: address,
        status: string::String, // "Pending", "Verified", "Rejected"
        challenger: address,
        stake: u64
    }

    public entry fun raise_challenge(signer: &signer, target: address, stake: u64) {
        let challenger = signer::address_of(signer);
        coin::transfer<AptosCoin>(signer, target, stake);

        move_to(signer, ChallengeState {
            target,
            status: string::utf8(b"Pending"),
            challenger,
            stake
        });
    }

    public entry fun resolve_challenge(signer: &signer, passed: bool) acquires ChallengeState {
        let addr = signer::address_of(signer);
        let challenge = borrow_global_mut<ChallengeState>(addr);

        if (passed) {
            challenge.status = string::utf8(b"Verified");
        } else {
            challenge.status = string::utf8(b"Rejected");
            // implement: burn NFT or slash staker
        }
    }


    public fun get_status(address: address): string::String acquires ChallengeState {
        let c = borrow_global<ChallengeState>(address);
        c.status
    }
}
