import { Block } from "payload";

export const TweetCardBlock: Block = {
  slug: "TweetCard",
  fields: [
    {
      name: "tweetId",
      type: "text",
      required: true,
    },
  ],
};
