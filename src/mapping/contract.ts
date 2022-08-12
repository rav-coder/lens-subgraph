import { BigInt, ipfs, json, store } from "@graphprotocol/graph-ts"
import { Approval, ApprovalForAll, BaseInitialized, Collected, CollectModuleWhitelisted, CollectNFTDeployed, CollectNFTInitialized, CommentCreated, DefaultProfileSet, DispatcherSet, EmergencyAdminSet, FeeModuleBaseConstructed, Followed, FollowModuleSet, FollowModuleWhitelisted, FollowNFTDelegatedPowerChanged, FollowNFTDeployed, FollowNFTInitialized, FollowNFTTransferred, FollowNFTURISet, FollowsApproved, GovernanceSet, MirrorCall, MirrorCreated, ModuleBaseConstructed, ModuleGlobalsCurrencyWhitelisted, ModuleGlobalsGovernanceSet, ModuleGlobalsTreasuryFeeSet, ModuleGlobalsTreasurySet, PostCreated, ProfileCreated, ProfileCreatorWhitelisted, ProfileImageURISet, ReferenceModuleWhitelisted, StateSet, Transfer } from "../../generated/Contract/Contract"
import { Profile, Post, Creator, ProfileStats, EnabledModuleCurrencies, Treasury, FollowNftTransferred, SocialGraph, FollowApproved, HandleGovernanceSet, Mirror, HandleModuleBaseConstructed, HandleModuleGlobalsCurrencyWhitelisted, HandleModuleGlobalsGovernanceSet } from "../../generated/schema"
import { collects, publications, stats } from "../modules/profilesS"
export function handleApproval(event: Approval): void {
	// let entity = new Approval(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  // let entity = approvals.getOrCreateApproval(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  // entity.owner = event.params.owner
  // entity.approved = event.params.approved
  // entity.tokenId = event.params.tokenId
  // entity.save()
}

export function handleApprovalForAll(event: ApprovalForAll): void {
	
  // let entity = approvalforalls.getOrCreateApproval(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  // entity.owner = event.params.owner
  // entity.operator = event.params.operator
  // entity.approved = event.params.approved
  // entity.save()
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
	let collect = collects.getOrCreateCollect(
    event.params.collector
    .toHexString()
    .concat('-')
    .concat(event.transaction.hash.toHex()),
  )

  collect.profileId = event.params.profileId
  collect.pubId = event.params.pubId
  collect.rootProfileId = event.params.rootProfileId
  collect.rootPubId = event.params.rootPubId
  collect.timestamp = event.params.timestamp

  collect.save()
}

export function handleCommentCreated(event: CommentCreated): void {
	let comment = publications.getOrCreateComment(event.params.profileId, event.params.pubId)
  comment.fromProfile = event.params.profileId.toString()
  comment.pubId = event.params.pubId
  comment.referenceModule = event.params.referenceModule
  comment.referenceModuleReturnData = event.params.referenceModuleReturnData
  comment.timestamp = event.params.timestamp
  comment.contentURI = event.params.contentURI
  comment.profileIdPointed = event.params.profileIdPointed
  comment.pubIdPointed = event.params.pubIdPointed
  comment.collectModule = event.params.collectModule
  comment.collectModuleReturnData = event.params.collectModuleReturnData

  let stat = stats.getOrCreateLensInfo()
  stat.lastCommentCreatedAt = event.params.timestamp
  stat.save()

  comment.save()
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


  let nft = FollowNftTransferred.load(event.params.profileId.toHexString())
  if (nft == null) {
    nft = new FollowNftTransferred(event.params.profileId.toHexString())
    nft.from = event.params.from.toHexString()
    nft.to = event.params.to.toHexString()
    nft.timestamp = event.params.timestamp
    nft.followNFTID = event.params.followNFTId
    nft.profileId = event.params.profileId
    nft.save()
  } else {
    nft.from = event.params.from.toHexString()
    nft.to = event.params.to.toHexString()
    nft.timestamp = event.params.timestamp
    nft.followNFTID = event.params.followNFTId
    nft.profileId = event.params.profileId
    nft.save()
  }
  
}

export function handleFollowNFTURISet(event: FollowNFTURISet): void {

  let entity = Profile.load(event.params.profileId.toString());

  if (!entity) {
    let entity = new Profile(event.params.profileId.toString());
    entity.followNFTURI = event.params.followNFTURI;
    entity.save();
  } else {

    entity.followNFTURI = event.params.followNFTURI;
    entity.save();
  }

};

export function handleFollowed(event: Followed): void {
  let entity = SocialGraph.load(event.params.follower.toHexString());

  if (!entity) {
    let entity = new SocialGraph(event.params.follower.toHexString());
    let newFollowingList: string[] = [];
    for (let index = 0; index < event.params.profileIds.length; index++) {
      const profileId = event.params.profileIds[index].toString();
      newFollowingList.push(profileId);
    }

    entity.following = newFollowingList;
    entity.save();
  }
  else {
    let newFollowingList: string[] = entity.following;
    for (let index = 0; index < event.params.profileIds.length; index++) {
      const profileId = event.params.profileIds[index].toString();
      newFollowingList.push(profileId);
    }
    entity.following = newFollowingList;
    entity.save();
  };
}


export function handleFollowsApproved(event: FollowsApproved): void {
  let profile = FollowApproved.load(event.params.profileId.toString());
  if (!profile) {
    let profile = new FollowApproved(event.params.profileId.toString());
    let newFollowingList: string[] = [];
    for (let index = 0; index < event.params.addresses.length; index++) {
      const profileId = event.params.addresses[index].toString();
      if (event.params.approved[index]) {
        newFollowingList.push(profileId);
      }

    }
    profile.addresses = newFollowingList;
    profile.save();
  } else {
    let newFollowingList: string[] = profile.addresses;
    for (let index = 0; index < event.params.addresses.length; index++) {
      const profileId = event.params.addresses[index].toString();
      if (event.params.approved[index]) {
        newFollowingList.push(profileId);
      }
    }
    profile.addresses = newFollowingList;
    profile.save();
  }




}

export function handleGovernanceSet(event: GovernanceSet): void {
  let entity = HandleGovernanceSet.load(event.params.caller.toString())

  if (!entity) {
    entity = new HandleGovernanceSet(event.params.caller.toString())
    entity.prevGovernance = event.params.prevGovernance.toString();
    entity.newGovernance = event.params.newGovernance.toString();
    entity.timestamp = event.params.timestamp;
    entity.save();
  } else {

    entity.prevGovernance = event.params.prevGovernance.toString();
    entity.newGovernance = event.params.newGovernance.toString();
    entity.timestamp = event.params.timestamp;
    entity.save();
  }
}

export function handleMirrorCreated(event: MirrorCreated): void {

  let entity = Mirror.load(event.transaction.hash.toString());

  if (!entity) {
    entity = new Mirror(event.transaction.hash.toString());
    entity.profileId = event.params.profileId;
    entity.pubId = event.params.pubId;
    entity.profileIdPointed = event.params.profileIdPointed;
    entity.pubIdPointed = event.params.pubIdPointed;
    entity.referenceModule = event.params.referenceModule;
    entity.referenceModuleReturnData = event.params.referenceModuleReturnData;
    entity.timestamp = event.params.timestamp;
    entity.save();

  }

  

};


export function handleModuleBaseConstructed(event: ModuleBaseConstructed): void {
  let entity = HandleModuleBaseConstructed.load(event.params.hub.toString());
  if (!entity) {
    entity = new HandleModuleBaseConstructed(event.params.hub.toString());
    entity.hub = event.params.hub;
    entity.timestamp = event.params.timestamp;
    entity.save();
  } else {
    entity.hub = event.params.hub;
    entity.timestamp = event.params.timestamp;
    entity.save();
  }

  


}

export function handleModuleGlobalsCurrencyWhitelisted(event: ModuleGlobalsCurrencyWhitelisted): void {
  let entity = HandleModuleGlobalsCurrencyWhitelisted.load(event.params.currency.toString());
  if (!entity) {
    entity = new HandleModuleGlobalsCurrencyWhitelisted(event.params.currency.toString());
    entity.currency = event.params.currency.toString();
    entity.prevWhitelisted = event.params.prevWhitelisted;
    entity.whitelisted = event.params.whitelisted;
    entity.save();
  } else {
    entity.currency = event.params.currency.toString();
    entity.prevWhitelisted = event.params.prevWhitelisted;
    entity.whitelisted = event.params.whitelisted;
    entity.save();
  }

  
}

export function handleModuleGlobalsGovernanceSet(event: ModuleGlobalsGovernanceSet): void {
  let entity = HandleModuleGlobalsGovernanceSet.load(event.transaction.hash.toString());
  if (!entity) {
    entity = new HandleModuleGlobalsGovernanceSet(event.transaction.hash.toString());
    entity.prevGovernance = event.params.prevGovernance.toString();
    entity.newGovernance = event.params.newGovernance.toString();
    entity.save();
  } else {
    entity.prevGovernance = event.params.prevGovernance.toString();
    entity.newGovernance = event.params.newGovernance.toString();
    entity.save();
  }
}

export function handleModuleGlobalsTreasuryFeeSet(event: ModuleGlobalsTreasuryFeeSet): void {
	let treasury = Treasury.load('1')
  if (treasury == null) {
    treasury = new Treasury('1')
    treasury.fee = event.params.newTreasuryFee
    treasury.save()
  } else {
    treasury.fee = event.params.newTreasuryFee
    treasury.save()
  }
  
}

export function handleModuleGlobalsTreasurySet(event: ModuleGlobalsTreasurySet): void {
	let treasury = new Treasury('1') 
  treasury.address = event.params.newTreasury
  treasury.save()
}

export function handlePostCreated(event: PostCreated): void {
	let post = new Post(event.params._event.transaction.hash.toHexString())
  post.profile = event.params.profileId.toHexString()
  post.collectModule = event.params.collectModule
  post.collectModuleReturnData = event.params.collectModuleReturnData
  post.onChainContentURI = event.params.contentURI
  post.pubId = event.params.pubId
  post.referenceModule = event.params.referenceModule
  post.referenceModuleReturnData = event.params.referenceModuleReturnData
  post.createdAt = event.params.timestamp

  let profStats = ProfileStats.load(event.params.profileId.toHexString())
  if (profStats != null) {
    profStats.totalPosts += 1
    profStats.totalPublications += 1
    profStats.save()
  }
  
  post.save()
}

export function handleProfileCreated(event: ProfileCreated): void {
  let profile = new Profile(event.params.profileId.toHexString())

  profile.profileId = event.params.profileId
  profile.ownedBy = event.params.to
  profile.handle = event.params.handle
  profile.imageURI = event.params.imageURI
  profile.followModule = event.params.followModule
  profile.followModuleReturnData = event.params.followModuleReturnData
  profile.followNFTURI = event.params.followNFTURI
  profile.imageURI = event.params.imageURI
  profile.lastUpdated = event.params.timestamp

  let profStats = new ProfileStats(event.params.profileId.toHexString())
  profStats.totalFollowers = 0
  profStats.totalFollowing = 0
  profStats.totalPosts = 0
  profStats.totalComments = 0
  profStats.totalMirrors = 0
  profStats.totalPublications = 0
  profStats.totalCollects = 0

  profile.stats = event.params.profileId.toHexString()
  profStats.save()
  profile.save()
}

export function handleProfileCreatorWhitelisted(event: ProfileCreatorWhitelisted): void {
	let creator = Creator.load(event.params.profileCreator.toHexString())
  if (creator == null) {
    creator = new Creator(event.params.profileCreator.toHexString())
    creator.address = event.params.profileCreator
    creator.isWhitelisted = event.params.whitelisted
    creator.lastUpdated = event.params.timestamp
    creator.save()
  }
}

export function handleProfileImageURISet(event: ProfileImageURISet): void {
	let profile = Profile.load(event.params.profileId.toHexString())
  if (profile !== null) {
    profile.imageURI = event.params.imageURI

    profile.save()
  }
}

export function handleReferenceModuleWhitelisted(event: ReferenceModuleWhitelisted): void {
	
}

// not needed
export function handleStateSet(event: StateSet): void {
	
}

// not needed
export function handleTransfer(event: Transfer): void {

}
