import assert from "node:assert/strict";
import test from "node:test";
import {
  getTrimmedMessageLength,
  initialContactFormValues,
  MIN_CONTACT_MESSAGE_LENGTH,
  validateContactForm,
} from "../../src/lib/contact-form";

test("initialContactFormValues returns empty fields", () => {
  assert.deepEqual(initialContactFormValues(), {
    name: "",
    email: "",
    message: "",
  });
});

test("getTrimmedMessageLength ignores surrounding whitespace", () => {
  assert.equal(getTrimmedMessageLength("   hello world   "), 11);
});

test("validateContactForm returns errors for empty values", () => {
  const errors = validateContactForm(initialContactFormValues());

  assert.equal(errors.name, "Please enter your name.");
  assert.equal(errors.email, "Please enter your email.");
  assert.equal(errors.message, "Please add a short project brief.");
});

test("validateContactForm validates email pattern", () => {
  const errors = validateContactForm({
    name: "Ali",
    email: "ali-at-dot-ai",
    message: "a".repeat(MIN_CONTACT_MESSAGE_LENGTH),
  });

  assert.equal(errors.email, "Please enter a valid email address.");
});

test("validateContactForm enforces minimum message length", () => {
  const errors = validateContactForm({
    name: "Ali",
    email: "ali@dot.ai",
    message: "too short",
  });

  assert.equal(errors.message, "Please share at least 30 characters for context.");
});

test("validateContactForm passes with valid values", () => {
  const errors = validateContactForm({
    name: "Ali Hamza",
    email: "ali@dot.ai",
    message: "We need workflow automation for our logistics operations team.",
  });

  assert.deepEqual(errors, {});
});
