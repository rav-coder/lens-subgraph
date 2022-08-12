import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Profile, Comment, Stat, Approval, ApprovalForAll, Collect, FeeCollectModuleSettings, RevertCollectModuleSettings } from '../../generated/schema'
import { bytes, integer } from '@protofire/subgraph-toolkit'
import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
// id for lensInfo entity
export const LENS_ID = ADDRESS_ZERO

// export namespace profiles {
// 	export function getOrCreateProfile(profileId: BigInt): Profile {
// 		let profile = new Profile(profileId.toString())
// 		profile.profileId = profileId

// 		return profile as Profile
// 	}
// }

// export namespace approvals {
// 	export function getOrCreateApproval(approvalId: string): Approval {
//         let approval = Approval.load(approvalId)

//         if(approval == null){
//             let approval = new Approval(approvalId)
//             approval.id= approvalId
//         }

// 		return approval as Approval
// 	}
// }

// export namespace approvalforalls {
// 	export function getOrCreateApproval(approvalId: string): ApprovalForAll {
//         let approval = ApprovalForAll.load(approvalId)

//         if(approval == null){
//             let approval = new ApprovalForAll(approvalId)
//             approval.id= approvalId
//         }

// 		return approval as ApprovalForAll
// 	}
// }

export namespace stats {
    export function getOrCreateLensInfo(): Stat {
      let statInfo = Stat.load(LENS_ID)
      if (statInfo == null) {
        statInfo = new Stat(LENS_ID)
        statInfo.totalAccounts = integer.ZERO
        statInfo.totalProfiles = integer.ZERO
        statInfo.totalPosts = integer.ZERO
        statInfo.totalMirror = integer.ZERO
        statInfo.totalAccounts = integer.ZERO
        statInfo.totalPublications = integer.ZERO
        statInfo.totalComments = integer.ZERO
  
        statInfo.save()
      }
      return statInfo as Stat
    }
  }

  export namespace collectmodules{
    export namespace helpers {
      export function getNewPublicactionId(profileId: BigInt, pubId: BigInt): string {
        return profileId
          .toString()
          .concat('-')
          .concat(pubId.toString())
      }
    }
  
    export function getOrCreateRevertCollectModuleSettings(profileId: BigInt, pubId: BigInt): RevertCollectModuleSettings {
      let publicationId = helpers.getNewPublicactionId(profileId, pubId)
      let revert = RevertCollectModuleSettings.load(publicationId)

      if (revert == null) {
        revert = new RevertCollectModuleSettings(publicationId)

        revert.contractAddress = new Bytes (0);
  
        revert.save()
      }
      return revert as RevertCollectModuleSettings
    }
  
  }

export namespace publications {
    export namespace helpers {
      export function getNewPublicactionId(profileId: BigInt, pubId: BigInt): string {
        return profileId
          .toString()
          .concat('-')
          .concat(pubId.toString())
      }
    }
  
    export function getOrCreateComment(profileId: BigInt, pubId: BigInt): Comment {
      let publicationId = helpers.getNewPublicactionId(profileId, pubId)
      let comment = Comment.load(publicationId)
      if (comment == null) {
        comment = new Comment(publicationId)
  
        // +1 amount of Comments
        let lensInfo = stats.getOrCreateLensInfo()
        lensInfo.totalComments = lensInfo.totalComments.plus(integer.ONE)
        lensInfo.totalPublications = lensInfo.totalPublications.plus(integer.ONE)
  
        lensInfo.save()
      }
      return comment as Comment
    }
  }

  export namespace collects {
    export function getOrCreateCollect(collectId: string): Collect {
      let collect = Collect.load(collectId)

      if(collect == null){
        let collect = new Collect(collectId)
        collect.id= collectId
        collect.collector = new Bytes (0);
        collect.profileId = integer.ZERO
        collect.pubId = integer.ZERO
        collect.rootProfileId = integer.ZERO
        collect.rootPubId = integer.ZERO
        collect.timestamp = integer.ZERO

        collect.save()
      }
      return collect as Collect
    }
  }