import assert from "node:assert/strict";
import test from "node:test";
import { isLocale, localeLabels, localeList, translate } from "../lib/i18n";

test("ships the approved 2.1.5 locale set", () => {
  assert.deepEqual(localeList, ["en", "zh-CN", "de-DE", "fr-FR", "it-IT"]);
  assert.equal(localeLabels["zh-CN"], "简体中文");
  assert.equal(localeLabels["de-DE"], "Deutsch");
  assert.equal(localeLabels["fr-FR"], "Français");
  assert.equal(localeLabels["it-IT"], "Italiano");
});

test("translates representative navigation and workflow labels", () => {
  assert.equal(translate("zh-CN", "menu.shop"), "产品");
  assert.equal(translate("de-DE", "menu.shop"), "Produkte");
  assert.equal(translate("fr-FR", "nav.contact"), "Nous contacter");
  assert.equal(translate("it-IT", "catalog.title"), "Trova i guanti giusti per il tuo approvvigionamento.");
  assert.equal(translate("zh-CN", "form.send"), "发送询价");
});

test("rejects unknown locale values and falls back to English copy", () => {
  assert.equal(isLocale("zh-CN"), true);
  assert.equal(isLocale("zh"), false);
  assert.equal(isLocale(null), false);
  assert.equal(translate("de-DE", "missing.key", "Fallback copy"), "Fallback copy");
});
