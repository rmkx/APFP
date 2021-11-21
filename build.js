const core = require("@actions/core");
const cleanCSS = require("clean-css");
const { writeFileSync } = require("fs");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URI);

async function read(query, type = "uid") {
    await client.connect();

    const res = await client
        .db("apfp")
        .collection("apfp")
        .find(query ? { [type]: query } : {})
        .toArray();

    await client.close();

    return res.length > 1 ? res : res[0];
}

function emplace(map, item, id) {
    const itemVal = map.get(item);
    if (!itemVal) map.set(item, [id]);
    else itemVal.push(id);
}

async function compile() {
    const data = await read();
    writeFileSync("./dist/apfp.json", JSON.stringify(data));

    const createRule = (uids, rules) =>
        `${uids
            .map(uid => `[apfp-user-id="${uid}"]`)
            .join()}{${rules.join("")}}`;

    const backgrounds = new Map(
        Object.entries({ animated: new Map(), static: new Map() })
    );

    for (const { img, aimg, uid } of data) {
        emplace(backgrounds.get("static"), img, uid);
        emplace(backgrounds.get("animated"), aimg, uid);
    }

    const raw = [...backgrounds]
        .map(([type, map]) => {
            return [...map]
                .map(([img, uids]) => {
                    return createRule(
                        uids,
                        type === "static"
                            ? [
                                  `--user-avatar-static:url("${img}");`,
                                  "--user-avatar-opacity:0;",
                              ]
                            : [`--user-avatar-playing:url("${img}");`]
                    );
                })
                .join("");
        })
        .join("");

    const output = new cleanCSS({
        level: {
            2: {
                all: true,
            },
        },
    }).minify(raw);

    return output.styles;
}

try {
    compile().then(css => writeFileSync("./dist/apfp.css", css));
} catch (err) {
    core.setFailed(err.message);
}
