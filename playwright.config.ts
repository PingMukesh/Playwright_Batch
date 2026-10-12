import { defineConfig, devices } from "@playwright/test";

export default defineConfig({

    testDir: "./tests",

    timeout: 30000,

    expect: {
        timeout: 5000
    },

    fullyParallel: false,

    retries: 0,

    workers: 1,

    reporter: "html",

    use: {

        baseURL: "https://www.saucedemo.com",

        headless: false,

        screenshot: "only-on-failure",

        video: "retain-on-failure",

        trace: "on-first-retry"
    },

    projects: [
        {
            name: "chromium",

            use: {
                ...devices["Desktop Chrome"]
            }
        }
    ]
});