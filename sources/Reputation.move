module SkillVerification::Reputation {

    use std::signer;
    use std::table;

    struct ReputationStore has key {
        score: u64,
        verified_count: u64,
        challenged_survived: u64,
    }

    public entry fun init(signer: &signer) {
        let user = signer::address_of(signer);
        move_to(signer, ReputationStore {
            score: 0,
            verified_count: 0,
            challenged_survived: 0,
        });
    }

    public entry fun increase_score(signer: &signer, delta: u64) acquires ReputationStore {
        let rep = borrow_global_mut<ReputationStore>(signer::address_of(signer));
        rep.score = rep.score + delta;
    }

    public fun get_score(user: address): u64 acquires ReputationStore {
        let rep = borrow_global<ReputationStore>(user);
        rep.score
    }
}
