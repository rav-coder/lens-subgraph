import { BigInt } from "@graphprotocol/graph-ts";
import { Profile } from '../../generated/schema'

export namespace profiles {
	export function getOrCreateProfile(profileId: BigInt): Profile {
		let profile = new Profile(profileId.toString())
		profile.profileId = profileId

		return profile as Profile
	}
}