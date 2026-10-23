import path from "node:path"
import { spawnSync } from "node:child_process"

class Runner {

    private readonly tags: string = "@frames";

    public run(): void {

        const cucumberPath = path.resolve("node_modules/@cucumber/cucumber/bin/cucumber.js");
        const result = spawnSync(
            process.execPath, [cucumberPath, "--config", "cucumber.cjs", "--tags", this.tags],
            {
                stdio: "inherit",
                shell: false
            }
        );


        if (result.error) {
            console.error("Failed to Start the Cucumber:", result.error);
            process.exitCode = 1;
            return;
        }

        if (result.status !== 0) {
            process.exitCode = result.status ?? 1;
        }
    }

}
new Runner().run();