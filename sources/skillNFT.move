module SkillVerification::SkillNFT {

    use std::signer;
    use std::string;
    use std::vector;
    // use aptos_framework::token;
    // use aptos_framework::token::Token;

    struct Skill has key, store {
        name: string::String,
        level: string::String, // "Beginner", "Intermediate", "Advanced"
        timestamp: u64
    }

    public entry fun mint_skill(signer: &signer, name: string::String, level: string::String) {
        let owner = signer::address_of(signer);
        let skill = Skill {
            name,
            level,
            timestamp: std::timestamp::now_seconds(),
        };

        move_to(signer, skill);
    }

    public fun log_skill_info(address: address) acquires Skill {
        let skill_ref = borrow_global<Skill>(address);
    }

}
