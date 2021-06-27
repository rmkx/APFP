/**
* @name         testasdf
* @description  test
* @source       asdf
* @author       rmkx
* @invite       HnGWVQbQBv
* @version      0
*/


module.exports = class SpotifyBackground {
    load() { }

    start() {
        dmListPatch();
        memberListPatch();
        friendsListPatch();
    }
    stop() {
        BdApi.Patcher.unpatchAll("DMListPatch");
        BdApi.Patcher.unpatchAll("MemberListAvatarPatch");
        BdApi.Patcher.unpatchAll("FriendsListAvatarPatch");
    }

    observer(changes) { }
}
function apfpDiv(userId) {
    let newDiv = document.createElement("div");
    newDiv.className = "APFP";
    newDiv.style = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; pointer-events: none;"
    newDiv.dataset.apfpId = userId;
    return newDiv
}
const DMListAvatar = BdApi.findModuleByDisplayName("PrivateChannel");
const dmListPatch = () => BdApi.Patcher.after("DMListPatch", DMListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const avatarStackPath = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = avatarStackPath.length > 3 ? avatarStackPath[1].childNodes[0] : avatarStackPath[0].childNodes[0];
        console.log("test: ", avatarStackNode);
        let APFP = apfpDiv(instance.props.user.id);
        avatarStackNode.append(APFP);
    }
    catch (error) { console.log(error) }
    return value;
});
const MemberListAvatar = BdApi.findModuleByDisplayName("MemberListItem");
const memberListPatch = () => BdApi.Patcher.after("MemberListAvatarPatch", MemberListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const avatarStackNode = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.child.child.stateNode;
        let APFP = apfpDiv(instance.props.user.id);
        avatarStackNode.append(APFP);
    }
    catch (error) { console.log(error) }
    return value;
});
const FriendsListAvatar = BdApi.findModuleByDisplayName("PeopleListItem");
const friendsListPatch = () => BdApi.Patcher.after("FriendsListAvatarPatch", FriendsListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const avatarStackNode = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.child.child.child.stateNode;
        let APFP = apfpDiv(instance.props.user.id);
        avatarStackNode.append(APFP);
    }
    catch (error) { console.log(error) }
    return value;
});