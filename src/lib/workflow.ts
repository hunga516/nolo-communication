import { Client } from "@upstash/workflow";

export const workflow = new Client({ token: process.env.QSTASH_TOKEN });

const { workflowRunId } = await workflow.trigger({
  url: "https://<YOUR_WORKFLOW_ENDPOINT>/<YOUR-WORKFLOW-ROUTE>",
  body: "hello there!",         // Optional body
  headers: { ... },             // Optional headers
  workflowRunId: "my-workflow", // Optional workflow run ID
  retries: 3                    // Optional retries for the initial request
});