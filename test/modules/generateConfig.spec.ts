import { WebhookClient } from "discord.js";
import { describe, assert, it } from "vitest";
import { generateConfig } from "../../src/modules/generateConfig.js";

describe("generateConfig", () => {
  it("is defined", () => {
    assert.isDefined(generateConfig, "generateConfig is not defined");
    assert.isFunction(generateConfig, "generateConfig is not a function");
  });

  it("should throw an error on missing environment", () => {
    delete process.env.TOKEN;
    assert.throw(generateConfig, "Missing required config variables");
  });

  it("should return expected object on valid environment", () => {
    process.env.TOKEN = "Naomi";
    process.env.MONGO_URI = "Was";
    process.env.HOME_GUILD = "Here";
    process.env.BOT_ID = "To";
    process.env.REPORT_CHANNEL = "Scream";
    process.env.DEBUG_HOOK
      = `https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    process.env.MOD_HOOK
      = `https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    process.env.MESSAGE_HOOK
      = `https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    process.env.WELCOME_HOOK
      = `https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    process.env.STARBOARD_HOOK
      = `https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    process.env.GITHUB_TOKEN = "meow";
    process.env.GHOST_KEY = "meow";
    process.env.GITHUB_APP_ID = "1";
    process.env.GITHUB_INSTALLATION_ID = "7";
    const result = generateConfig();
    assert.equal(result.token, process.env.TOKEN);
    assert.equal(result.mongoUrl, process.env.MONGO_URI);
    assert.equal(result.homeGuild, process.env.HOME_GUILD);
    assert.equal(result.botId, process.env.BOT_ID);
    assert.equal(result.reportChannel, process.env.REPORT_CHANNEL);
    assert.instanceOf(result.debugHook, WebhookClient);
    assert.instanceOf(result.modHook, WebhookClient);
    assert.instanceOf(result.messageHook, WebhookClient);
    assert.instanceOf(result.welcomeHook, WebhookClient);
    assert.instanceOf(result.starboardHook, WebhookClient);
    assert.equal(result.debugHook.url, process.env.DEBUG_HOOK);
    assert.equal(result.modHook.url, process.env.MOD_HOOK);
    assert.equal(result.welcomeHook.url, process.env.WELCOME_HOOK);
    assert.equal(result.messageHook.url, process.env.MESSAGE_HOOK);
    assert.equal(result.starboardHook.url, process.env.STARBOARD_HOOK);
    assert.equal(result.githubToken, process.env.GITHUB_TOKEN);
    assert.equal(result.ghostKey, process.env.GHOST_KEY);
    assert.equal(result.githubAppId,
      Number.parseInt(process.env.GITHUB_APP_ID, 10));
    assert.equal(
      result.githubInstallationId,
      Number.parseInt(process.env.GITHUB_INSTALLATION_ID, 10),
    );
  });
});
