/**
* @name         testasdf
* @description  test
* @source       asdf
* @author       rmkx
* @invite       HnGWVQbQBv
* @version      0
*/


module.exports = class test {
    load() { }

    start() {
        dmListPatch();
        dmListUpdatePatch();
        memberListPatch();
        memberListUpdatePatch();
        friendsListPatch();
        friendsListUpdatePatch();
        nowPlayingAvatarPatch();
        patchUserSection();
        newDm();
    }
    stop() {
        BdApi.Patcher.unpatchAll("DMListPatch");
        BdApi.Patcher.unpatchAll("DMListUpdatePatch");
        BdApi.Patcher.unpatchAll("MemberListAvatarPatch");
        BdApi.Patcher.unpatchAll("MemberListUpdateAvatarPatch");
        BdApi.Patcher.unpatchAll("FriendsListAvatarPatch");
        BdApi.Patcher.unpatchAll("FriendsListUpdateAvatarPatch");
        BdApi.Patcher.unpatchAll("ActivityPanelPatch");
        BdApi.Patcher.unpatchAll("NowPlayingAvatarPatch");
        BdApi.Patcher.unpatchAll("UserInfoAvatarPatch");
        BdApi.Patcher.unpatchAll("NewDMPatch");
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
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id);
    }
    catch (error) { console.log(error) }
    return value;
});
const dmListUpdatePatch = () => BdApi.Patcher.after("DMListUpdatePatch", DMListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id); }
    }
    catch (error) { console.log(error) }
    return value;
});
const MemberListAvatar = BdApi.findModuleByDisplayName("MemberListItem");
const memberListPatch = () => BdApi.Patcher.after("MemberListAvatarPatch", MemberListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id);
    }
    catch (error) { console.log(error) }
    return value;
});
const memberListUpdatePatch = () => BdApi.Patcher.after("MemberListUpdateAvatarPatch", MemberListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id); }
    }
    catch (error) { console.log(error) }
    return value;
});
const FriendsListAvatar = BdApi.findModuleByDisplayName("PeopleListItem");
const friendsListPatch = () => BdApi.Patcher.after("FriendsListAvatarPatch", FriendsListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id);
    }
    catch (error) { console.log(error) }
    return value;
});
const friendsListUpdatePatch = () => BdApi.Patcher.after("FriendsListUpdateAvatarPatch", FriendsListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id); }
    }
    catch (error) { console.log(error) }
    return value;
});
const NowPlayingAvatar = BdApi.findModuleByProps("AnimatedAvatar", "Sizes");
const nowPlayingAvatarPatch = () => BdApi.Patcher.after("NowPlayingAvatarPatch", NowPlayingAvatar, "default", (that, args, value) => {
    const [props] = args;
    try {
        const { [4]: userId } = props.src.split("/");
        if (value.type === "div") {
            if (value.ref !== null) { const originalRef = () => value.ref; originalRef() }
            value.ref = (e) => {
                if (!e) return e;
                const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
                if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                return e;
            };
        }
        else if (value.type.displayName === "Clickable") {
            if (value.props.children.ref !== null) { const originalRef = () => value.props.children.ref; originalRef() }
            value.props.children.ref = (e) => {
                if (!e) return e;
                const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
                if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                return e;
            };
        }
    }
    catch (error) { console.log(error) }
    return value;
});
const NewDirectMessage = BdApi.findModuleByDisplayName("DirectMessage");
const newDm = () => BdApi.Patcher.after("NewDirectMessagePatcher", NewDirectMessage.prototype, "render", (that, args, value) => {
    const instance = that;
    try {
        const userId = instance.props.channel.rawRecipients[0].id;
        if (value.ref !== null) { const originalRef = () => value.ref; originalRef() }
        value.ref = (e) => {
            if (!e) return e;
            const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
            if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
            return e;
        };
    }
    catch(error) { console.log(error) }
    return value;
});
function patchUserSection() {
    const UserInfoAvatar = document.querySelector(".container-3baos1").__reactInternalInstance$.return.type;
    const userInfoAvatarPatch = () => BdApi.Patcher.after("UserInfoAvatarPatch", UserInfoAvatar.prototype, "render", (that, args, value) => {
        const instance = that;
        try {
            const userId = instance.props.currentUser.id;
            if (value.ref !== null) {
                const originalRef = () => value.ref;
                originalRef();
            }
            value.ref = (e) => {
                if (!e) return e;
                const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
                if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                return e;
            };
        }
        catch (error) { console.log(error) }
        return value;
    });
    userInfoAvatarPatch();
    document.querySelector(".container-3baos1").__reactInternalInstance$.return.stateNode.forceUpdate();
}