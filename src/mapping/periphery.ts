import { ipfs, json, log } from "@graphprotocol/graph-ts"
import { ProfileMetadataSet, periphery } from "../../generated/periphery/periphery"
import { Attribute, Profile } from "../../generated/schema"


export function handleProfileMetadataSet(event: ProfileMetadataSet): void {
	let profile = Profile.load(event.params.profileId.toHexString())
	if (profile !== null) {
		let hash = event.params.metadata.slice(28)
		let data = ipfs.cat(hash)
		if (data !== null) {
			let value = json.fromBytes(data)
			let obj = value.toObject()
			if (obj !== null) {
				let name = obj.get('name')
				if (name !== null) {
					profile.name = name.toString()
				}
				let bio = obj.get('bio')
				if (bio !== null) {
					profile.bio = bio.toString()
				}
				let attributes = obj.get('attributes')
				if (attributes !== null) {
					let i = 0
					let array = attributes.toArray()
					for (let i = 0; i < array.length; i++) {
						let attr = new Attribute(event.transaction.hash.toHexString() + i.toString())
						attr.profile = event.params.profileId.toHexString()

						if (array[i].toObject().get('traitType') !== null) attr.traitType = array[i].toObject().get('traitType')!.toString()

						if (array[i].toObject().get('key') !== null) attr.key = array[i].toObject().get('key')!.toString()

						if (array[i].toObject().get('value') !== null) attr.value = array[i].toObject().get('value')!.toString()

						attr.save()
					}
				}	
			}					
		}

		profile.metadata = "ipfs://" + event.params.metadata.slice(28)
		profile.save()
	}
	
}