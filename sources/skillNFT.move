module SkillVerification::SkillNFT {

    use std::signer;
    use std::string;
    use aptos_framework::timestamp;

    struct Skill has key, store {
        name: string::String,
        level: string::String, // "Beginner", "Intermediate", "Advanced"
        timestamp: u64
    }

    public entry fun mint_skill(signer: &signer, name: string::String, level: string::String) {
        let skill = Skill {
            name,
            level,
            timestamp: timestamp::now_seconds(),
        };

        move_to(signer, skill);
    }

    public fun log_skill_info(address: address) acquires Skill {
        let _skill_ref = borrow_global<Skill>(address);
    }

}