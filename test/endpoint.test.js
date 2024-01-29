import { beforeAll, describe, expect, expectTypeOf, test } from "vitest";
import { startServer } from "../server.js";

let server;

beforeAll(async () => {
  server = await startServer();
});

describe("GET /", () => {
  test('should respond with "API is running"', async () => {
    const response = await fetch("http://localhost:3000/");
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(text).toBe("API is running");
  });
});
