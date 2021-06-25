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
    }
    stop() {
        BdApi.Patcher.unpatchAll("DMAvatarPatch");
    }

    observer(changes) { }
}

const DMAvatar = BdApi.findModuleByDisplayName("Clickable");
const dmAvatarPatch = () => BdApi.Patcher.after("DMAvatarPatch", DMAvatar.prototype, "render", (that, args, value) => {
    const [props] = args;
    try {
        const userId = value._owner.stateNode._reactInternalFiber.return.return.return.return.return.return.return.stateNode.__reactInternalInstance$.return.return.return.return.return.return.memoizedProps.channel.recipients[0];
        let newDiv = {
            className: "APFP",
            style: {
                position: "absolute",
                height: "48px",
                width: "48px",
                pointerEvents: "none"
            },
            'apfp-user-id': value._owner.stateNode._reactInternalFiber.return.return.return.return.return.return.return.stateNode.__reactInternalInstance$.return.return.return.return.return.return.memoizedProps.channel.recipients[0]
        }
        value.props.children.props.children.push(BdApi.React.createElement("div", newDiv));
        console.log("DM: ", props, value);
        return value;
    }
    catch (error) { }
});