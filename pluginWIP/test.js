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
        dmListUpdatePatch();
        memberListPatch();
        memberListUpdatePatch();
        friendsListPatch();
        friendsListUpdatePatch();
        chatAvatarPatch()
    }
    stop() {
        BdApi.Patcher.unpatchAll("DMListPatch");
        BdApi.Patcher.unpatchAll("DMListUpdatePatch");
        BdApi.Patcher.unpatchAll("MemberListAvatarPatch");
        BdApi.Patcher.unpatchAll("MemberListUpdateAvatarPatch");
        BdApi.Patcher.unpatchAll("FriendsListAvatarPatch");
        BdApi.Patcher.unpatchAll("FriendsListUpdateAvatarPatch");
    }

    observer(changes) { }
}
/*function apfpDiv(userId) {
    let newDiv = document.createElement("div");
    newDiv.className = "APFP";
    newDiv.style = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; pointer-events: none;"
    newDiv.dataset.apfpId = userId;
    return newDiv
}*/
const DMListAvatar = BdApi.findModuleByDisplayName("PrivateChannel");
const dmListPatch = () => BdApi.Patcher.after("DMListPatch", DMListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    const [props] = args;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.dataset.apfpId = instance.props.user.id;
    }
    catch (error) { console.log(error) }
    return value;
});
const dmListUpdatePatch = () => BdApi.Patcher.after("DMListUpdatePatch", DMListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if(!avatarStackNode.dataset.apfpId) { avatarStackNode.dataset.apfpId = instance.props.user.id; }
    }
    catch (error) { console.log(error) }
    return value;
});
const MemberListAvatar = BdApi.findModuleByDisplayName("MemberListItem");
const memberListPatch = () => BdApi.Patcher.after("MemberListAvatarPatch", MemberListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    const [props] = args;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.dataset.apfpId = instance.props.user.id;
    }
    catch (error) { console.log(error) }
    return value;
});
const memberListUpdatePatch = () => BdApi.Patcher.after("MemberListUpdateAvatarPatch", MemberListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    const [props] = args;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if(!avatarStackNode.dataset.apfpId) { avatarStackNode.dataset.apfpId = instance.props.user.id; }
    }
    catch (error) { console.log(error) }
    return value;
});
const FriendsListAvatar = BdApi.findModuleByDisplayName("PeopleListItem");
const friendsListPatch = () => BdApi.Patcher.after("FriendsListAvatarPatch", FriendsListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    const [props] = args;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.dataset.apfpId = instance.props.user.id;
    }
    catch (error) { console.log(error) }
    return value;
});
const friendsListUpdatePatch = () => BdApi.Patcher.after("FriendsListUpdateAvatarPatch", FriendsListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    const [props] = args;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if(!avatarStackNode.dataset.apfpId) { avatarStackNode.dataset.apfpId = instance.props.user.id; }
    }
    catch (error) { console.log(error) }
    return value;
});