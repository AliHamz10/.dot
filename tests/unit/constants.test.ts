import assert from "node:assert/strict";
import test from "node:test";
import { navItems, projects, socialLinks } from "../../src/lib/constants";

test("nav items contain required sections", () => {
  const hrefs = navItems.map((item) => item.href);
  assert.deepEqual(hrefs, ["#about", "#products", "#contact"]);
});

test("projects are populated with unique names", () => {
  assert.ok(projects.length >= 3, "Expected at least 3 projects for homepage presentation");
  const names = projects.map((project) => project.name);
  const uniqueNames = new Set(names);
  assert.equal(uniqueNames.size, names.length);
});

test("social links use secure https URLs", () => {
  for (const link of socialLinks) {
    assert.ok(link.href.startsWith("https://"), `Expected https URL for ${link.label}`);
  }
});
