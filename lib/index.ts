import BeerReviewStack from "./BeerReviewStack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x"
  });

  new BeerReviewStack(app, "beer-review-stack");
  
  
  // Add more stacks
}
