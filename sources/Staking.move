module SkillVerification::Staking { 

    use std::signer;
    //use std::address;
    use std::table;
    use aptos_std::coin;
    use aptos_std::aptos_coin::AptosCoin;

    struct StakeStore has key {
        stakes: table::Table<address, u64>,
    }

    public entry fun init_account(signer: &signer) {
        let owner = signer::address_of(signer);
        move_to(signer, StakeStore {
            stakes: table::new<address, u64>(),
        });
    }

   public entry fun stake_to_user(signer: &signer, target: address, amount: u64)
    acquires StakeStore {
        let sender = signer::address_of(signer);
        coin::transfer<AptosCoin>(signer, target, amount);

        let store = borrow_global_mut<StakeStore>(target);
        let old = table::borrow_mut(&mut store.stakes, sender);
        *old = *old + amount;
    }

    public fun get_stake(target: address, staker: address): u64
    acquires StakeStore {
        let store = borrow_global<StakeStore>(target);
        *table::borrow(&store.stakes, staker)
    }

}
