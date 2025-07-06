module SkillVerification::Staking { 

    use std::signer;
    use std::table;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    struct StakeStore has key {
        stakes: table::Table<address, u64>,
    }

    public entry fun init_account(signer: &signer) {
        move_to(signer, StakeStore {
            stakes: table::new<address, u64>(),
        });
    }

   public entry fun stake_to_user(signer: &signer, target: address, amount: u64)
    acquires StakeStore {
        coin::transfer<AptosCoin>(signer, target, amount);

        if (!exists<StakeStore>(target)) {
            return
        };

        let store = borrow_global_mut<StakeStore>(target);
        if (table::contains(&store.stakes, signer::address_of(signer))) {
            let old = table::borrow_mut(&mut store.stakes, signer::address_of(signer));
            *old = *old + amount;
        } else {
            table::add(&mut store.stakes, signer::address_of(signer), amount);
        }
    }

    public fun get_stake(target: address, staker: address): u64
    acquires StakeStore {
        if (!exists<StakeStore>(target)) {
            return 0
        };
        let store = borrow_global<StakeStore>(target);
        if (table::contains(&store.stakes, staker)) {
            *table::borrow(&store.stakes, staker)
        } else {
            0
        }
    }

}