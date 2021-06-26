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
        dmAvatarPatch();
        homePageAvatarPatch();
    }
    stop() {
        BdApi.Patcher.unpatchAll("DMAvatarPatch");
        BdApi.Patcher.unpatchAll("HomePageAvatarPatch");
    }

    observer(changes) { }
}

const DMAvatar = BdApi.findModuleByDisplayName("Clickable");
const dmAvatarPatch = () => BdApi.Patcher.after("DMAvatarPatch", DMAvatar.prototype, "render", (that, args, value) => {
    try {
        const userId = value._owner.stateNode._reactInternalFiber.return.return.return.return.return.return.return.stateNode.__reactInternalInstance$.return.return.return.return.return.return.memoizedProps.channel.recipients[0];
        let newDiv = {
            className: "APFP",
            style: {
                position: "absolute",
                height: "48px",
                width: "48px",
                pointerEvents: "none",
                borderRadius: "50%"
            },
            'apfp-user-id': userId
        }
        value.props.children.props.children.push(BdApi.React.createElement("div", newDiv));
    }
    catch (error) { }
    return value;
});
const HomePageAvatar = BdApi.findModuleByProps("AnimatedAvatar", "Sizes");
const homePageAvatarPatch = () => BdApi.Patcher.after("HomePageAvatarPatch", HomePageAvatar, "default", (that, args, value) => {
    try{
        const newChildren = new Array();
        let userId = value.props.children.props.children[0].props.children.props.src.substring(35, value.props.children.props.children[0].props.children.props.src.lastIndexOf("/"));
        newChildren[0] = value.props.children.props.children[0].props.children;
        value.props.children.props.children[0].props.children = newChildren;
        let newDiv = {
            className: "APFP",
            style: {
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                borderRadius: "50%"
            },
            'apfp-user-id': userId
        }
        value.props.children.props.children[0].props.children.push(BdApi.React.createElement("div", newDiv));
    }
    catch(error) { }
});