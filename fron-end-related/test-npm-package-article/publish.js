(async () => {
  require("dotenv").config();
  // libs
  const ssri = require("ssri");
  const pack = require("libnpmpack");
  const fetch = require("npm-registry-fetch");

  // pack tarball & generate ingetrity
  const tarball = await pack("./pkg/");
  const integrity = ssri.fromData(tarball, {
    algorithms: [...new Set(["sha1", "sha512"])],
  });
  const apiKey = process.env.NPM_TOKEN;

  // craft manifest
  const name = "test-npm-package-article";
  const version = "1.0.0";
  const manifest = {
    _id: name,
    name: name,
    "dist-tags": {
      latest: version,
    },
    versions: {
      [version]: {
        _id: `${name}@${version}`,
        name,
        version,
        dist: {
          integrity: integrity.sha512[0].toString(),
          shasum: integrity.sha1[0].hexDigest(),
          tarball: "",
        },
        scripts: {},
        dependencies: {},
      },
    },
    _attachments: {
      0: {
        content_type: "application/octet-stream",
        data: tarball.toString("base64"),
        length: tarball.length,
      },
    },
  };

  // publish via PUT
  fetch(name, {
    "//registry.npmjs.org/:_authToken": apiKey,
    method: "PUT",
    body: manifest,
  });
})();
