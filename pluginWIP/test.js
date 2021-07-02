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
        voiceChannelAvatar();
        userProfilePatch();
        userCardPatch();
    }
    stop() {
        unpatchAll();
    }

    observer(changes) { }
}
const getElementByComponentName = componentName => new Promise(resolve => {
    const getElement = () => {
        const element = document.querySelector(componentName);
        if (element) {
            resolve(element);
        } else {
            requestAnimationFrame(getElement);
        }
    };
    getElement();
});
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
            const originalRef = typeof value.ref === "function" ? value.ref : null;
            value.ref = (e) => {
                if (!e) return originalRef ? originalRef(e) : e;
                const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
                if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                return originalRef ? originalRef(e) : e;
            };
        }
        else if (value.type.displayName === "Clickable") {
            const originalRef = typeof value.props.children.ref === "function" ? value.props.children.ref : null;
            value.props.children.ref = (e) => {
                if (!e) return originalRef ? originalRef(e) : e;
                const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
                if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                return originalRef ? originalRef(e) : e;
            };
        };
    }
    catch (error) { console.log(error) }
    return value;
});
const NewDirectMessage = BdApi.findModuleByDisplayName("DirectMessage");
const newDm = () => BdApi.Patcher.after("NewDirectMessagePatcher", NewDirectMessage.prototype, "render", (that, args, value) => {
    const instance = that;
    try {
        const userId = instance.props.channel.rawRecipients[0].id;
        const originalRef = typeof value.ref === "function" ? value.ref : null;
        value.ref = (e) => {
            if (!e) return originalRef ? originalRef(e) : e;
            const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
            if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
            return originalRef ? originalRef(e) : e;
        };
    }
    catch (error) { console.log(error) }
    return value;
});
function patchUserSection() {
    const UserInfoAvatar = document.querySelector(".container-3baos1").__reactInternalInstance$.return.type;
    const userInfoAvatarPatch = () => BdApi.Patcher.after("UserInfoAvatarPatch", UserInfoAvatar.prototype, "render", (that, args, value) => {
        const instance = that;
        try {
            const userId = instance.props.currentUser.id;
            const originalRef = typeof value.ref === "function" ? value.ref : null;
            value.ref = (e) => {
                if (!e) return originalRef ? originalRef(e) : e;
                const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
                if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                return originalRef ? originalRef(e) : e;
            };
        }
        catch (error) { console.log(error) }
        return value;
    });
    userInfoAvatarPatch();
    document.querySelector(".container-3baos1").__reactInternalInstance$.return.stateNode.forceUpdate();
}
const VoiceChannelUsers = BdApi.findModuleByDisplayName("VoiceUser");
const voiceChannelAvatar = () => BdApi.Patcher.after("VoiceChannelAvatarPatch", VoiceChannelUsers.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    const [props] = args;
    const avatarNode = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.stateNode;
    avatarNode.setAttribute("apfp-user-id", instance.props.user.id);
    return value;
})
async function userCardPatch() {
    const UserCard = await getElementByComponentName(".layer-v9HyYc");
    const UserCardFunc = UserCard.__reactInternalInstance$.return.type;
    const userCardAvatar = () => BdApi.Patcher.after("UserCardPatch", UserCardFunc.prototype, "componentDidMount", (that, args, value) => {
        try {
            const instance = that;
            const avatarStackNode = instance.elementRef.current.querySelector("foreignObject").childNodes[0];
            const { [4]: userId } = avatarStackNode.childNodes[0].src.split("/");
            avatarStackNode.setAttribute("apfp-user-id", userId);
        }
        catch (error) { console.log(error) }
        return value;
    });
    userCardAvatar();
}
const UserProfile = BdApi.findModule((m) => m?.default?.displayName === "UserProfileModal");
const userProfilePatch = () => BdApi.Patcher.after("UserProfilePatch", UserProfile, "default", (that, args, value) => {
    const [props] = args;
    try {
        const userId = props.user.id;
        const originalRef = typeof value.props.children.ref === "function" ? value.props.children.ref : null;
        value.props.children.props.children[0].ref = (e) => {
            if (!e) return originalRef ? originalRef(e) : e;
            const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
            avatarStackNode.setAttribute("apfp-user-id", userId);
            return originalRef ? originalRef(e) : e;
        }
        value.props.children.ref(e);
    }
    catch (error) { console.log(error) }
    return value;
});
function unpatchAll() {
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
    BdApi.Patcher.unpatchAll("VoiceChannelAvatarPatch");
    BdApi.Patcher.unpatchAll("PopupLayerPatch");
    BdApi.Patcher.unpatchAll("UserProfilePatch");
    BdApi.Patcher.unpatchAll("UserCardPatch");
}