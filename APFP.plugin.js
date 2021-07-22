/**
* @name         AnimatedProfilePicture
* @description  Adds nitro-like animated profile pictures
* @source       https://github.com/rmkx/APFP
* @author       rmkx, p0rtL
* @invite       HnGWVQbQBv
* @version      1.0.2 Beta
*/

module.exports = class APFP {
    getName() { return "Animated Profile Picture"; }
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
        chatAvatarPatch();
        rtcUserPatch();
        connectedCallAvatarPatch();
        //searchResultsPopoutPatch(); /*don't uncomment it crashes Discord*/
        resultMessagesPatch();
        pinnedMessagesPatch();
        cssInterval = setInterval(function () {
            if (document.querySelector("bd-styles #APFP")) {
                BdApi.clearCSS("APFP");
                BdApi.injectCSS("APFP", `@import url(https://rmkx.github.io/APFP/src/APFP.Import.css)`);
            }
            else { BdApi.injectCSS("APFP", `@import url(https://rmkx.github.io/APFP/src/APFP.Import.css)`); }
        }, 2700000);
        if (!document.querySelector("bd-styles #APFP")) { BdApi.injectCSS("APFP", `@import url(https://rmkx.github.io/APFP/src/APFP.Import.css)`); }
    }
    stop() {
        unpatchAll();
        clearInterval(cssInterval);
        if (document.querySelector("bd-styles #APFP")) { BdApi.clearCSS("APFP"); }
    }

    observer(changes) { }
}
let cssInterval;
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
    const [props] = args;
    try {
        console.log("1: ", instance, "\n2: ", props, "\n3: ", value);
        if (instance.props.channel.type === 1) {
            const svgChildrenNodes = instance._reactInternals.stateNode._reactInternals.child.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
            const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
            avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id);
        }
        else { return value; }
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const dmListUpdatePatch = () => BdApi.Patcher.after("DMListUpdatePatch", DMListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    try {
        if (instance.props.channel.type === 1) {
            const svgChildrenNodes = instance._reactInternals.stateNode._reactInternals.child.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
            const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
            if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id); }
        }
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const MemberListAvatar = BdApi.findModuleByDisplayName("MemberListItem");
const memberListPatch = () => BdApi.Patcher.after("MemberListAvatarPatch", MemberListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternals.stateNode._reactInternals.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id);
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const memberListUpdatePatch = () => BdApi.Patcher.after("MemberListUpdateAvatarPatch", MemberListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternals.stateNode._reactInternals.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id); }
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const FriendsListAvatar = BdApi.findModuleByDisplayName("PeopleListItem");
const friendsListPatch = () => BdApi.Patcher.after("FriendsListAvatarPatch", FriendsListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternals.stateNode._reactInternals.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id);
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const friendsListUpdatePatch = () => BdApi.Patcher.after("FriendsListUpdateAvatarPatch", FriendsListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternals.stateNode._reactInternals.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id); }
    }
    catch (error) { console.log(error); return value; }
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
    catch (error) { console.log(error); return value; }
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
    catch (error) { console.log(error); return value; }
    return value;
});
async function patchUserSection() {
    const UserInfo = await getElementByComponentName(".container-3baos1");
    const Fiber = UserInfo[Object.keys(UserInfo).find(k => k.startsWith("__reactInternalInstance") || k.startsWith("__reactFiber"))];
    const UserInfoAvatar = Fiber.return.type;
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
        catch (error) { console.log(error); return value; }
        return value;
    });
    userInfoAvatarPatch();
    Fiber.return.stateNode.forceUpdate();
}
const VoiceChannelUsers = BdApi.findModuleByDisplayName("VoiceUser");
const voiceChannelAvatar = () => BdApi.Patcher.after("VoiceChannelAvatarPatch", VoiceChannelUsers.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        if (instance.props.user) {
            const avatarStackNode = instance._reactInternals.stateNode._reactInternals.child.child.child.child.stateNode;
            let APFPDiv = document.createElement("div");
            APFPDiv.className = "APFP";
            APFPDiv.style = "position: absolute; top: inherit; left: inherit; width: 24px; height: 24px; border-radius: 50%; margin-left: 8px;";
            APFPDiv.setAttribute("apfp-user-id", instance.props.user.id);
            avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id);
            avatarStackNode.insertBefore(APFPDiv, avatarStackNode.childNodes[1]);
        }
    }
    catch (error) { console.log(error); return value; }
    return value;
});
async function userCardPatch() {
    const UserCard = await getElementByComponentName(".layer-v9HyYc");
    const UserCardFunc = UserCard.__reactInternalInstance$.return.type;
    const userCardAvatar = () => BdApi.Patcher.after("UserCardPatch", UserCardFunc.prototype, "componentDidMount", (that, args, value) => {
        try {
            const instance = that;
            const [props] = args;
            const currentRef = typeof instance.elementRef.current !== null ? instance.elementRef.current : null;
            if (currentRef) {
                if (currentRef.id !== null && currentRef.id !== "" && currentRef.querySelector("foreignObject") && !currentRef.querySelector(".tooltipContent-bqVLWK")) {
                    const avatarStackNode = currentRef.querySelector("foreignObject").childNodes[0];
                    const userId = currentRef.__reactInternalInstance$.stateNode.childNodes[0].childNodes[0].childNodes[0].__reactInternalInstance$.memoizedProps.children.props.user.id;
                    if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                }
                else if (currentRef.querySelector(".avatarContainer-3CQrif")) {
                    const lastAvatar = currentRef.querySelectorAll(".avatarContainer-3CQrif");
                    for (let i = 0; i < lastAvatar.length; i++) {
                        if (!lastAvatar[i].hasAttribute("apfp-user-id")) {
                            const lastAvatarID = lastAvatar[i].__reactInternalInstance$.key;
                            let APFPDiv = document.createElement("div");
                            APFPDiv.className = "APFP";
                            APFPDiv.style = "position: absolute; top: inherit; left: inherit; width: inherit; height: inherit; border-radius: 50%;";
                            APFPDiv.setAttribute("apfp-user-id", lastAvatarID);
                            lastAvatar[i].insertBefore(APFPDiv, lastAvatar[i].childNodes[0]);
                            lastAvatar[i].setAttribute("apfp-user-id", lastAvatarID);
                        }
                    }
                    if (currentRef.querySelector(".avatarContainerMasked-PIJ-3L")) {
                        const maskedAvatars = currentRef.querySelectorAll("foreignObject");
                        for (let i = 0; i < maskedAvatars.length; i++) {
                            if (!maskedAvatars[i].hasAttribute("apfp-user-id")) {
                                const avatarUserID = maskedAvatars[i].__reactInternalInstance$.child.key;
                                let APFPDiv = document.createElement("div");
                                APFPDiv.className = "APFP";
                                APFPDiv.style = "position: absolute; top: inherit; left: inherit; width: inherit; height: inherit; border-radius: 50%;";
                                APFPDiv.setAttribute("apfp-user-id", avatarUserID);
                                maskedAvatars[i].setAttribute("apfp-user-id", avatarUserID);
                                maskedAvatars[i].insertBefore(APFPDiv, maskedAvatars[i].childNodes[0]);
                            }
                        }
                    }
                    else { return value; }
                }
                else { return value; }
            }
            else { return value; }
        }
        catch (error) { console.log(error); return value; }
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
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const ChatMessages = BdApi.findModule(m => m.default && m.default.toString().search("childrenRepliedMessage") > -1);
const chatAvatarPatch = () => BdApi.Patcher.after("ChatAvatarPatch", ChatMessages, "default", (that, args, value) => {
    const [props] = args;
    if (value.props.children.props.className.includes("groupStart") && !props.isSystemMessage) {
        const originalRef = typeof value.props.children.ref === "function" ? value.props.children.ref : null;
        value.props.children.ref = (e) => {
            if (!e) return originalRef ? originalRef(e) : e;
            if (!e.querySelector(".APFP")) {
                if (props.hasReply && props.childrenHeader.props.repliedMessage.message) {
                    const replyNode = e.querySelector(".repliedMessage-VokQwo");
                    const replyUserID = props.childrenHeader.props.repliedMessage.message.author.id;
                    let APFPDiv = document.createElement("div");
                    APFPDiv.className = "APFP";
                    APFPDiv.style = "position: absolute; left: 0px; width: 16px; height: 16px; border-radius: 50%; pointer-events: none; z-index: 1; user-select: none;";
                    APFPDiv.setAttribute("apfp-user-id", replyUserID);
                    replyNode.setAttribute("apfp-user-id", replyUserID);
                    replyNode.append(APFPDiv);
                }
                const avatarParentNode = e.querySelector(".contents-2mQqc9");
                const userID = props.childrenHeader.props.message.author.id;
                let APFPDiv = document.createElement("div");
                APFPDiv.className = "APFP";
                APFPDiv.style = "position: absolute; top: 0px; left: -56px; margin-top: calc(4px - .125rem); width: 40px; height: 40px; border-radius: 50%; pointer-events: none; z-index: 1;";
                APFPDiv.setAttribute("apfp-user-id", userID);
                avatarParentNode.setAttribute("apfp-user-id", userID);
                avatarParentNode.childNodes[1].insertBefore(APFPDiv, avatarParentNode.childNodes[1].childNodes[0]);
            }
            return originalRef ? originalRef(e) : e;
        };
    }
    return value;
});
const RTCUsers = BdApi.findModule((m) => m?.default?.displayName === 'RTCConnectionVoiceUsers');
const rtcUserPatch = () => BdApi.Patcher.after("RTCUsersPatch", RTCUsers, "default", (that, args, value) => {
    try {
        const originalRef = typeof value.ref === "function" ? value.ref : null;
        value.ref = (e) => {
            if (!e) return originalRef ? originalRef(e) : e;
            const avatarNode = e.querySelectorAll(".avatarContainer-2LLZwy");
            for (let i = 0; i < avatarNode.length; i++) {
                if (!avatarNode[i].hasAttribute("apfp-user-id")) {
                    const avatarUserID = value.props.children.props.children[0][i].props.user.id;
                    let APFPDiv = document.createElement("div");
                    APFPDiv.className = "APFP";
                    APFPDiv.style = "position: absolute; top: 2px; width: 24px; height: 24px; border-radius: 50%;";
                    APFPDiv.setAttribute("apfp-user-id", avatarUserID);
                    avatarNode[i].setAttribute("apfp-user-id", avatarUserID);
                    avatarNode[i].append(APFPDiv);
                }
            }
            return originalRef ? originalRef(e) : e;
        };
    }
    catch (error) { console.log(error) }
    return value;
});
const ConnectedCallAvatar = BdApi.findModuleByDisplayName("CallAvatar");
const connectedCallAvatarPatch = () => BdApi.Patcher.after("ConnectedCallAvatarPatch", ConnectedCallAvatar.prototype, "renderVoiceCallAvatar", (that, args, value) => {
    const instance = that;
    try {
        if (value.props.children.length <= 3) {
            const userID = instance._reactInternals.key;
            const APFP = {
                className: "APFP",
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "inherit",
                    height: "inherit",
                    borderRadius: "50%"
                },
                "apfp-user-id": userID
            };
            value.props.children.push(BdApi.React.createElement("div", APFP));
        }
    }
    catch (error) { console.log(error) }
    return value;
});
const SearchResultsPopout = BdApi.findModuleByDisplayName("SearchResultsPopout");
const searchResultsPopoutPatch = () => BdApi.Patcher.after("SearchResultsPopoutAvatarPatch", SearchResultsPopout.prototype, "render", (that, args, value) => {
    try {
        const originalRef = typeof value.ref === "function" ? value.ref : null;
        value.ref = (e) => {
            if (!e) return originalRef ? originalRef(e) : e;
            if (e.querySelector(".user-O3Czj0")) {
                const searchResults = e.querySelectorAll(".user-O3Czj0");
                for (let i = 0; i < searchResults.length; i++) {
                    if (!searchResults[i].querySelector(".APFP")) {
                        const userID = searchResults[i].__reactInternalInstance$.return.return.return.memoizedProps.result.id;
                        let APFPDiv = document.createElement("div");
                        APFPDiv.className = "APFP";
                        APFPDiv.style = "position: absolute; top: 8px; width: 18px; height: 18px; border-radius: 50%; margin-left: -23px;";
                        APFPDiv.setAttribute("apfp-user-id", userID);
                        searchResults[i].setAttribute("apfp-user-id", userID);
                        searchResults[i].querySelector(".displayedNick-3xxvzU").append(APFPDiv);
                    }
                }
            }
            return originalRef ? originalRef(e) : e;
        }
    }
    catch (error) { console.log(error) }
    return value;
});
const SearchResultMessages = BdApi.findModuleByDisplayName("SearchResult");
const resultMessagesPatch = () => BdApi.Patcher.after("ResultMessagesAvatarPatch", SearchResultMessages.prototype, "render", (that, args, value) => {
    try {
        const instance = that;
        if (instance.hitRef.current) {
            const result = instance.hitRef.current;
            if (!result.querySelector(".APFP")) {
                const userID = instance.props.result[0].author.id;
                const avatarParentNode = result.querySelector(".contents-2mQqc9");
                let APFPDiv = document.createElement("div");
                APFPDiv.className = "APFP";
                APFPDiv.style = "position: absolute; top: 0px; left: -56px; margin-top: calc(4px - .125rem); width: 40px; height: 40px; border-radius: 50%; pointer-events: none; z-index: 1;";
                APFPDiv.setAttribute("apfp-user-id", userID);
                avatarParentNode.setAttribute("apfp-user-id", userID);
                avatarParentNode.childNodes[1].insertBefore(APFPDiv, avatarParentNode.childNodes[1].childNodes[0]);
                if (result.querySelector(".repliedMessage-VokQwo") && !result.querySelector(".replyBadge-r1su3o")) {
                    const repliedMessage = result.querySelector(".repliedMessage-VokQwo");
                    const replyUserID = repliedMessage.__reactInternalInstance$.stateNode.__reactInternalInstance$.memoizedProps.children[1].props.message.author.id;
                    let APFPDiv = document.createElement("div");
                    APFPDiv.className = "APFP";
                    APFPDiv.style = "position: absolute; left: 0px; width: 16px; height: 16px; border-radius: 50%; pointer-events: none; z-index: 1; user-select: none;";
                    APFPDiv.setAttribute("apfp-user-id", replyUserID);
                    repliedMessage.setAttribute("apfp-user-id", replyUserID);
                    repliedMessage.append(APFPDiv);
                }
            }
        }
    }
    catch (error) { console.log(error) }
    return value;
});
const PinnedMessages = BdApi.findModule((m) => m?.default?.displayName === "ChannelPins");
const pinnedMessagesPatch = () => BdApi.Patcher.after("PinnedMessagesPatch", PinnedMessages, "default", (that, args, value) => {
    const instance = that;
    const [props] = args;
    console.log("Instance :", instance, "\nProps: ", props, "\nValue: ", value);
    try {
        const originalRef = typeof value.ref === "function" ? value.ref : null;
        value.ref = (e) => {
            if (!e) return originalRef ? originalRef(e) : e;
            if (e.querySelector(".contents-2mQqc9")) {
                const pinnedMessages = e.querySelectorAll(".contents-2mQqc9");
                for (let i = 0; i < pinnedMessages.length; i++) {
                    if (!pinnedMessages[i].querySelector(".APFP")) {
                        const userID = value.props.children.props.messages[i].author.id ? value.props.children.props.messages[i].author.id : undefined;
                        let APFPDiv = document.createElement("div");
                        APFPDiv.className = "APFP";
                        APFPDiv.style = "position: absolute; top: 0px; left: -56px; margin-top: calc(4px - .125rem); width: 40px; height: 40px; border-radius: 50%; pointer-events: none; z-index: 1;";
                        APFPDiv.setAttribute("apfp-user-id", userID);
                        pinnedMessages[i].setAttribute("apfp-user-id", userID);
                        pinnedMessages[i].childNodes[1].insertBefore(APFPDiv, pinnedMessages[i].childNodes[1].childNodes[0]);
                    }
                }
            }
            return originalRef ? originalRef(e) : e;
        }
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
    BdApi.Patcher.unpatchAll("ChatAvatarPatch");
    BdApi.Patcher.unpatchAll("RTCUsersPatch");
    BdApi.Patcher.unpatchAll("ConnectedCallAvatarPatch");
    BdApi.Patcher.unpatchAll("SearchResultsPopoutAvatarPatch");
    BdApi.Patcher.unpatchAll("ResultMessagesAvatarPatch");
    BdApi.Patcher.unpatchAll("PinnedMessagesPatch");
}
