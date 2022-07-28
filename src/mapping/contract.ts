import { BigInt } from "@graphprotocol/graph-ts"
import { Approval, ApprovalForAll, BaseInitialized, Collected, CollectModuleWhitelisted, CollectNFTDeployed, CollectNFTInitialized, CommentCreated, DefaultProfileSet, DispatcherSet, EmergencyAdminSet, FeeModuleBaseConstructed, Followed, FollowModuleSet, FollowModuleWhitelisted, FollowNFTDelegatedPowerChanged, FollowNFTDeployed, FollowNFTInitialized, FollowNFTTransferred, FollowNFTURISet, FollowsApproved, GovernanceSet, MirrorCall, MirrorCreated, ModuleBaseConstructed, ModuleGlobalsCurrencyWhitelisted, ModuleGlobalsGovernanceSet, ModuleGlobalsTreasuryFeeSet, ModuleGlobalsTreasurySet, PostCreated, ProfileCreated, ProfileCreatorWhitelisted, ProfileImageURISet, ReferenceModuleWhitelisted, StateSet, Transfer } from "../../generated/Contract/Contract"
import { Profile } from "../../generated/schema"
export function handleApproval(event: Approval): void {
	
}

export function handleApprovalForAll(event: ApprovalForAll): void {
	
}

export function handleBaseInitialized(event: BaseInitialized): void {
	
}

export function handleCollectModuleWhitelisted(event: CollectModuleWhitelisted): void {
	
}

export function handleCollectNFTDeployed(event: CollectNFTDeployed): void {
	
}

export function handleCollectNFTInitialized(event: CollectNFTInitialized): void {
	
}

export function handleCollectNFTTransferred(event: CollectNFTInitialized): void {
	
}

export function handleCollected(event: Collected): void {
	
}

export function handleCommentCreated(event: CommentCreated): void {
	
}

export function handleDefaultProfileSet(event: DefaultProfileSet): void {
	
}

export function handleDispatcherSet(event: DispatcherSet): void {
	
}

export function handleEmergencyAdminSet(event: EmergencyAdminSet): void {
	
}

export function handleFeeModuleBaseConstructed(event: FeeModuleBaseConstructed): void {
	
}

export function handleFollowModuleSet(event: FollowModuleSet): void {
	
}

export function handleFollowModuleWhitelisted(event: FollowModuleWhitelisted): void {
	
}

export function handleFollowNFTDelegatedPowerChanged(event: FollowNFTDelegatedPowerChanged): void {
	
}

export function handleFollowNFTDeployed(event: FollowNFTDeployed): void {
	
}

export function handleFollowNFTInitialized(event: FollowNFTInitialized): void {
	
}

export function handleNFTTransferred(event: FollowNFTTransferred): void {
	
}

export function handleFollowNFTURISet(event: FollowNFTURISet): void {
	
}

export function handleFollowed(event: Followed): void {
	
}

export function handleFollowsApproved(event: FollowsApproved): void {
	
}

export function handleGovernanceSet(event: GovernanceSet): void {
	
}

export function handleMirrorCreated(event: MirrorCreated): void {
	
}

export function handleModuleBaseConstructed(event: ModuleBaseConstructed): void {
	
}

export function handleModuleGlobalsCurrencyWhitelisted(event: ModuleGlobalsCurrencyWhitelisted): void {
	
}

export function handleModuleGlobalsGovernanceSet(event: ModuleGlobalsGovernanceSet): void {
	
}

export function handleModuleGlobalsTreasuryFeeSet(event: ModuleGlobalsTreasuryFeeSet): void {
	
}

export function handleModuleGlobalsTreasurySet(event: ModuleGlobalsTreasurySet): void {
	
}

export function handlePostCreated(event: PostCreated): void {
	
}

export function handleProfileCreated(event: ProfileCreated): void {
  let profile = new Profile(event.params.profileId.toString())
  profile.profileId = event.params.profileId
  profile.creator = event.params.to
  profile.save()
}

export function handleProfileCreatorWhitelisted(event: ProfileCreatorWhitelisted): void {
	
}

export function handleProfileImageURISet(event: ProfileImageURISet): void {
	
}

export function handleReferenceModuleWhitelisted(event: ReferenceModuleWhitelisted): void {
	
}

export function handleStateSet(event: StateSet): void {
	
}

export function handleTransfer(event: Transfer): void {

}
